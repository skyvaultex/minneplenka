import type { Metadata } from "next";
import { SITE_IS_UNDER_CONSTRUCTION } from "@/lib/site-mode";

const DEFAULT_SITE_URL =
  "https://minneplenka-studio.astute-llama-7250.chatgpt.site";

function resolveSiteUrl(value: string | undefined): string {
  if (!value) {
    return DEFAULT_SITE_URL;
  }

  try {
    const url = new URL(value.trim());

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return DEFAULT_SITE_URL;
    }

    url.hash = "";
    url.search = "";
    url.pathname = url.pathname.replace(/\/+$/, "");

    return url.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const SITE_CONFIG = {
  name: "MINNEPLENKA",
  displayName: "Minneplenka",
  photographer: "Max Preobrazhensky",
  url: siteUrl,
  locale: "en_US",
  language: "en-US",
  defaultTitle: "MINNEPLENKA — Architectural Photography in Minnesota",
  titleTemplate: "%s — MINNEPLENKA",
  description:
    "Architectural photography, property imagery, construction documentation, aerial photography, and film across Minnesota, Western Wisconsin, and beyond.",
  serviceAreas: [
    "Minneapolis",
    "Saint Paul",
    "Twin Cities",
    "Wayzata",
    "Minnetonka",
    "Lake Minnetonka",
    "Minnesota",
    "Western Wisconsin",
  ],
  specialties: [
    "Architectural Photography",
    "Real Estate Photography",
    "Construction Photography",
    "Drone & Aerial Photography",
    "Property Video & Film",
  ],
} as const;

export type OpenGraphType = "website" | "article";

export interface SeoImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface BuildMetadataOptions {
  /** A page-specific title. The studio name is appended automatically. */
  title?: string;
  description?: string;
  /** A root-relative canonical path or an absolute URL. */
  path?: string;
  image?: string | SeoImage;
  type?: OpenGraphType;
  keywords?: readonly string[];
  noIndex?: boolean;
}

/**
 * Resolve a root-relative route or asset path against the configured public URL.
 * Non-HTTP protocols are rejected so this can also be used for structured data.
 */
export function absoluteUrl(pathOrUrl = "/"): string {
  try {
    const url = new URL(pathOrUrl, `${SITE_CONFIG.url}/`);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return SITE_CONFIG.url;
    }

    return url.toString();
  } catch {
    return SITE_CONFIG.url;
  }
}

export function formatPageTitle(title?: string): string {
  const normalizedTitle = title?.trim();

  if (!normalizedTitle || normalizedTitle === SITE_CONFIG.name) {
    return SITE_CONFIG.defaultTitle;
  }

  return `${normalizedTitle} — ${SITE_CONFIG.name}`;
}

/**
 * Build complete, page-level Next.js metadata. The absolute title prevents a
 * parent title template from accidentally appending the brand twice.
 */
export function buildMetadata({
  title,
  description = SITE_CONFIG.description,
  path = "/",
  image,
  type = "website",
  keywords,
  noIndex = false,
}: BuildMetadataOptions = {}): Metadata {
  const effectiveTitle = SITE_IS_UNDER_CONSTRUCTION
    ? "Site under construction"
    : title;
  const effectiveDescription = SITE_IS_UNDER_CONSTRUCTION
    ? "Minneplenka is rebuilding its architectural photography, aerial, and film portfolio. Please check back soon."
    : description;
  const canonical = absoluteUrl(SITE_IS_UNDER_CONSTRUCTION ? "/" : path);
  const fullTitle = formatPageTitle(effectiveTitle);
  const normalizedImage: SeoImage | undefined =
    typeof image === "string" ? { url: image } : image;
  const socialImage = normalizedImage
    ? {
        url: absoluteUrl(normalizedImage.url),
        ...(normalizedImage.alt ? { alt: normalizedImage.alt } : {}),
        ...(normalizedImage.width ? { width: normalizedImage.width } : {}),
        ...(normalizedImage.height ? { height: normalizedImage.height } : {}),
      }
    : undefined;

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: { absolute: fullTitle },
    description: effectiveDescription,
    ...(keywords?.length ? { keywords: [...new Set(keywords)] } : {}),
    alternates: { canonical },
    authors: [
      {
        name: SITE_CONFIG.photographer,
        url: absoluteUrl("/about"),
      },
    ],
    creator: SITE_CONFIG.photographer,
    publisher: SITE_CONFIG.displayName,
    openGraph: {
      type,
      locale: SITE_CONFIG.locale,
      url: canonical,
      siteName: SITE_CONFIG.name,
      title: fullTitle,
      description: effectiveDescription,
      ...(socialImage ? { images: [socialImage] } : {}),
    },
    twitter: {
      card: socialImage ? "summary_large_image" : "summary",
      title: fullTitle,
      description: effectiveDescription,
      ...(socialImage ? { images: [socialImage.url] } : {}),
    },
    robots: noIndex || SITE_IS_UNDER_CONSTRUCTION
      ? { index: false, follow: true, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

/** Alias for teams that prefer the `create*` naming convention. */
export const createMetadata = buildMetadata;


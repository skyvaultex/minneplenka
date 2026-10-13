import { absoluteUrl, SITE_CONFIG } from "@/lib/seo";

export type JsonLdRecord = Record<string, unknown>;
export type JsonLdData = JsonLdRecord | readonly JsonLdRecord[];

export interface JsonLdProps {
  data: JsonLdData;
  id?: string;
}

/**
 * Serialize JSON-LD without allowing user-provided strings to terminate the
 * script element. Escaping the HTML-significant characters preserves valid
 * JSON while making the payload safe to place in `dangerouslySetInnerHTML`.
 */
export function serializeJsonLd(data: JsonLdData): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/** Backwards-friendly descriptive alias for the JSON-LD script component. */
export const StructuredData = JsonLd;

const studioId = `${SITE_CONFIG.url}/#studio`;
const photographerId = `${SITE_CONFIG.url}/#photographer`;

function normalizeUrls(values: readonly string[] | undefined): string[] | undefined {
  if (!values?.length) {
    return undefined;
  }

  const urls = values.map(absoluteUrl);
  return [...new Set(urls)];
}

export interface ProfessionalServiceJsonLdOptions {
  description?: string;
  url?: string;
  image?: string | readonly string[];
  areaServed?: readonly string[];
  sameAs?: readonly string[];
  email?: string;
}

export function buildProfessionalServiceJsonLd({
  description = SITE_CONFIG.description,
  url = SITE_CONFIG.url,
  image,
  areaServed = SITE_CONFIG.serviceAreas,
  sameAs,
  email,
}: ProfessionalServiceJsonLdOptions = {}): JsonLdRecord {
  const imageValues = typeof image === "string" ? [image] : image;
  const images = imageValues?.map((value) => absoluteUrl(value));

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": studioId,
    name: SITE_CONFIG.displayName,
    url: absoluteUrl(url),
    description,
    founder: { "@id": photographerId },
    areaServed: areaServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    knowsAbout: [...SITE_CONFIG.specialties],
    ...(images?.length ? { image: images.length === 1 ? images[0] : images } : {}),
    ...(sameAs?.length ? { sameAs: normalizeUrls(sameAs) } : {}),
    ...(email ? { email } : {}),
  };
}

export interface PersonJsonLdOptions {
  description?: string;
  url?: string;
  image?: string;
  sameAs?: readonly string[];
}

export function buildPersonJsonLd({
  description =
    "Photographer and founder of Minneplenka, working across architecture, real estate, construction, aerial imagery, and property film.",
  url = "/about",
  image,
  sameAs,
}: PersonJsonLdOptions = {}): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": photographerId,
    name: SITE_CONFIG.photographer,
    jobTitle: "Architectural and property photographer",
    url: absoluteUrl(url),
    description,
    worksFor: { "@id": studioId },
    ...(image ? { image: absoluteUrl(image) } : {}),
    ...(sameAs?.length ? { sameAs: normalizeUrls(sameAs) } : {}),
  };
}

export interface ServiceJsonLdOptions {
  name: string;
  description: string;
  /** The canonical service page path or absolute URL. */
  url: string;
  serviceType?: string;
  areaServed?: readonly string[];
  image?: string;
}

export function buildServiceJsonLd({
  name,
  description,
  url,
  serviceType = name,
  areaServed = SITE_CONFIG.serviceAreas,
  image,
}: ServiceJsonLdOptions): JsonLdRecord {
  const canonical = absoluteUrl(url);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${canonical.replace(/\/$/, "")}/#service`,
    name,
    serviceType,
    description,
    url: canonical,
    provider: { "@id": studioId },
    areaServed: areaServed.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    ...(image ? { image: absoluteUrl(image) } : {}),
  };
}

export interface BreadcrumbItem {
  name: string;
  /** A root-relative route or absolute URL. */
  url: string;
}

export function buildBreadcrumbListJsonLd(
  items: readonly BreadcrumbItem[],
): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

/** Concise alias matching schema.org's type name. */
export const buildBreadcrumbJsonLd = buildBreadcrumbListJsonLd;

export interface ImageObjectJsonLdOptions {
  url: string;
  alt: string;
  name?: string;
  caption?: string;
  width?: number;
  height?: number;
  representativeOfPage?: boolean;
  creatorName?: string;
}

export function buildImageObjectJsonLd({
  url,
  alt,
  name,
  caption,
  width,
  height,
  representativeOfPage,
  creatorName,
}: ImageObjectJsonLdOptions): JsonLdRecord {
  const contentUrl = absoluteUrl(url);

  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl,
    url: contentUrl,
    name: name ?? alt,
    description: alt,
    ...(caption ? { caption } : {}),
    ...(typeof width === "number" && width > 0 ? { width } : {}),
    ...(typeof height === "number" && height > 0 ? { height } : {}),
    ...(typeof representativeOfPage === "boolean"
      ? { representativeOfPage }
      : {}),
    ...(creatorName
      ? { creator: { "@type": "Person", name: creatorName } }
      : {}),
  };
}

export interface VideoObjectJsonLdOptions {
  name: string;
  description: string;
  contentUrl: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  width?: number;
  height?: number;
  creatorName?: string;
}

export function buildVideoObjectJsonLd({
  name,
  description,
  contentUrl,
  thumbnailUrl,
  uploadDate,
  duration,
  width,
  height,
  creatorName,
}: VideoObjectJsonLdOptions): JsonLdRecord {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    contentUrl: absoluteUrl(contentUrl),
    thumbnailUrl: absoluteUrl(thumbnailUrl),
    uploadDate,
    duration,
    ...(typeof width === "number" && width > 0 ? { width } : {}),
    ...(typeof height === "number" && height > 0 ? { height } : {}),
    ...(creatorName
      ? { creator: { "@type": "Person", name: creatorName } }
      : {}),
  };
}

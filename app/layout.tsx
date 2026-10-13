import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import { ConstructionScreen } from "@/components/construction-screen";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  JsonLd,
  buildPersonJsonLd,
  buildProfessionalServiceJsonLd,
} from "@/components/structured-data";
import { buildMetadata, SITE_CONFIG } from "@/lib/seo";
import { SITE_IS_UNDER_CONSTRUCTION } from "@/lib/site-mode";
import "./globals.css";

export const metadata: Metadata = {
  ...buildMetadata({
    title: SITE_CONFIG.name,
    path: "/",
    image: {
      url: "/images/icon-homes/icon-homes-hero.webp",
      alt: "Contemporary Minnesota residence with white cladding and a warm timber entry",
      width: 2200,
      height: 1226,
    },
  }),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7F7F4",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (SITE_IS_UNDER_CONSTRUCTION) {
    return (
      <html lang="en">
        <body>
          <a className="skip-link" href="#main-content">
            Skip to content
          </a>
          <main id="main-content">
            <ConstructionScreen />
          </main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-shell">
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
        <JsonLd
          id="studio-structured-data"
          data={[
            buildProfessionalServiceJsonLd({
              image: "/images/icon-homes/icon-homes-hero.webp",
              email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
            }),
            buildPersonJsonLd(),
          ]}
        />
      </body>
    </html>
  );
}

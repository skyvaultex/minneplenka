import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_CONFIG } from "@/lib/seo";
import { SITE_IS_UNDER_CONSTRUCTION } from "@/lib/site-mode";

export default function robots(): MetadataRoute.Robots {
  if (SITE_IS_UNDER_CONSTRUCTION) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      host: SITE_CONFIG.url,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_CONFIG.url,
  };
}

import type { MetadataRoute } from "next";
import { locations, projects, services } from "@/data";
import { absoluteUrl } from "@/lib/seo";
import { SITE_IS_UNDER_CONSTRUCTION } from "@/lib/site-mode";

export default function sitemap(): MetadataRoute.Sitemap {
  if (SITE_IS_UNDER_CONSTRUCTION) return [];

  const now = new Date();
  const staticRoutes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/work", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/locations", priority: 0.7, changeFrequency: "monthly" as const },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...locations.map((location) => ({
      url: absoluteUrl(`/locations/${location.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...projects
      .filter((project) => !project.isPlaceholder)
      .map((project) => ({
        url: absoluteUrl(`/work/${project.slug}`),
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.8,
      })),
  ];
}

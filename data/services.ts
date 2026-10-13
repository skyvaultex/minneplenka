import type { Service } from "@/types/content";

export const services = [
  {
    slug: "architectural-photography",
    name: "Architectural photography",
    indexLabel: "Architecture",
    statement: "Form. Light. Material.",
    introduction:
      "Measured images of buildings and interiors, shaped around the design rather than a formula.",
    deliverables: [
      "Exterior, interior, detail, and contextual site photography",
      "Advance planning around orientation, access, occupation, and available light",
      "Image sets prepared for websites, editorial submissions, project records, and presentations",
    ],
    idealFor: ["Architects", "Interior designers", "Homebuilders", "Developers"],
    closing:
      "The aim is a clear visual reading of the work—its proportions, materials, and place.",
    relatedProjectSlugs: [
      "wayzata-lakeside",
      "icon-homes-residence",
      "linden-courtyard",
      "pine-and-water",
    ],
    seo: {
      title: "Architectural Photographer Minneapolis | Minneplenka",
      description:
        "Architectural photography for architects, designers, builders, and developers across Minneapolis, Minnesota, and beyond.",
      canonicalPath: "/services/architectural-photography",
      keywords: [
        "architectural photographer Minneapolis",
        "architecture photography Minnesota",
        "interior photography Twin Cities",
      ],
      openGraphImage: "/images/wayzata-lakeside/wayzata-hero.webp",
    },
  },
  {
    slug: "real-estate-photography",
    name: "Real estate photography",
    indexLabel: "Real estate",
    statement: "A clear reading of the property.",
    introduction:
      "Complete, composed coverage for distinctive homes and considered listings.",
    deliverables: [
      "Interior and exterior still photography",
      "Architectural details and wider property context",
      "Daylight or dusk coverage selected around the property",
      "Web- and marketing-ready image sets",
    ],
    idealFor: ["Brokerages", "Individual agents", "Developers", "Private sellers"],
    closing:
      "Enough coverage to understand the home. Enough restraint to let it speak.",
    relatedProjectSlugs: [
      "frederick-avenue",
      "ferndale-residence",
      "woodland-house",
    ],
    seo: {
      title: "Real Estate Photography Minneapolis & Wayzata | Minneplenka",
      description:
        "Refined real estate photography for distinctive homes in Minneapolis, Wayzata, Minnetonka, Lake Minnetonka, and nearby communities.",
      canonicalPath: "/services/real-estate-photography",
      keywords: [
        "real estate photography Minneapolis",
        "real estate photographer Wayzata",
        "luxury home photography Minnetonka",
      ],
      openGraphImage: "/images/frederick-avenue/rear-elevation.webp",
    },
  },
  {
    slug: "construction-progress-photography",
    name: "Construction progress photography",
    indexLabel: "Construction",
    statement: "The work, as it takes form.",
    introduction:
      "Consistent visual records of active projects, from early structure through final handoff.",
    deliverables: [
      "Scheduled milestone or recurring site visits",
      "Repeatable viewpoints for clear progress comparison",
      "Site-wide context, trades at work, and material details",
      "Organized image libraries for stakeholder updates, case studies, and project archives",
    ],
    idealFor: ["General contractors", "Architects", "Owners", "Developers"],
    closing: "A disciplined record of decisions, craft, and change.",
    relatedProjectSlugs: ["mill-district-frame"],
    seo: {
      title: "Construction Photography Twin Cities | Minneplenka",
      description:
        "Construction progress photography for contractors, architects, owners, and developers across Minneapolis–Saint Paul and Minnesota.",
      canonicalPath: "/services/construction-progress-photography",
      keywords: [
        "construction photography Twin Cities",
        "construction progress photography Minneapolis",
        "Minnesota site documentation",
      ],
      openGraphImage: "/images/minneapolis-construction-frame.webp",
    },
  },
  {
    slug: "drone-aerial-photography",
    name: "Drone & aerial photography",
    indexLabel: "Aerial",
    statement: "Site, setting, scale.",
    introduction:
      "Aerial imagery that explains the relationship between a property and the landscape around it.",
    deliverables: [
      "Elevated and overhead still photography",
      "Site context, approach, roof form, shoreline, and surrounding development",
      "Construction milestones and broad property coverage",
      "Horizontal and vertical compositions where useful",
    ],
    idealFor: ["Architects", "Real estate teams", "Developers", "Contractors"],
    closing: "The wider view, composed with the same care as the details.",
    note:
      "Aerial work is planned around weather, site conditions, privacy, and applicable airspace requirements.",
    relatedProjectSlugs: [
      "wayzata-lakeside",
      "icon-homes-residence",
      "frederick-avenue",
      "st-croix-bluff",
      "pine-and-water",
    ],
    seo: {
      title: "Drone Real Estate Photography Minnesota | Minneplenka",
      description:
        "Drone and aerial photography for architecture, real estate, development, and construction projects across Minnesota and Western Wisconsin.",
      canonicalPath: "/services/drone-aerial-photography",
      keywords: [
        "drone real estate photography Minnesota",
        "aerial photography Minneapolis",
        "Lake Minnetonka drone photography",
      ],
      openGraphImage: "/images/icon-homes/aerial-front.webp",
    },
  },
  {
    slug: "property-video-film",
    name: "Property video & film",
    indexLabel: "Film",
    statement: "Spaces in motion.",
    introduction:
      "Short architectural films built from movement, atmosphere, and a deliberate sense of pace.",
    deliverables: [
      "Concise property and architectural films",
      "Exterior, interior, detail, and environmental sequences",
      "Optional aerial footage when conditions and scope permit",
      "Alternate crops or short edits for web and social use when requested",
    ],
    idealFor: ["Architects", "Homebuilders", "Developers", "Property marketers"],
    closing: "Not a room-by-room tour. A considered impression of place.",
    relatedProjectSlugs: [
      "icon-homes-residence",
      "pine-and-water",
      "ferndale-residence",
    ],
    seo: {
      title: "Architectural & Property Video Minnesota | Minneplenka",
      description:
        "Cinematic property films and architectural video for homes, buildings, and developments across Minnesota and beyond.",
      canonicalPath: "/services/property-video-film",
      keywords: [
        "property video Minnesota",
        "architectural film Minneapolis",
        "real estate video Lake Minnetonka",
      ],
      openGraphImage: "/images/icon-homes/icon-homes-hero.webp",
    },
  },
] as const satisfies readonly Service[];

export type ServiceRecord = (typeof services)[number];

export function getServiceBySlug(slug: string): ServiceRecord | undefined {
  return services.find((service) => service.slug === slug);
}

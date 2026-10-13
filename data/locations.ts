import type { LocationPage } from "@/types/content";

export const locations = [
  {
    slug: "minneapolis-twin-cities",
    name: "Minneapolis–Saint Paul",
    eyebrow: "Twin Cities, Minnesota",
    heading: "Architectural and property photography in Minneapolis–Saint Paul",
    introduction:
      "Photography for designed homes, occupied buildings, active construction, and distinctive listings across the Twin Cities.",
    sections: [
      {
        title: "Buildings in context",
        body: "Minneapolis and Saint Paul ask for more than a clean elevation. Streets, neighboring structures, mature trees, winter conditions, and the rhythm of the city all shape how a project is understood. Coverage can move from that wider setting to interiors, junctions, and material detail without losing the design’s central idea.",
      },
      {
        title: "Planning around the city",
        body: "Urban assignments are prepared around access, occupancy, façade orientation, seasonal daylight, and the hours when a site is quietest. For construction work, repeatable viewpoints create a useful record from structure through enclosure and completion.",
      },
      {
        title: "One considered image set",
        body: "Architectural, property, progress, aerial, and short-form film scopes can be coordinated when a project needs several kinds of coverage. The result is a consistent visual language rather than disconnected deliverables.",
      },
    ],
    servedCommunities: [
      "Minneapolis",
      "Saint Paul",
      "Edina",
      "Golden Valley",
      "St. Louis Park",
      "surrounding Twin Cities communities",
    ],
    serviceSlugs: [
      "architectural-photography",
      "real-estate-photography",
      "construction-progress-photography",
      "property-video-film",
    ],
    relatedProjectSlugs: ["linden-courtyard", "mill-district-frame"],
    seo: {
      title: "Architectural & Real Estate Photography Minneapolis | Minneplenka",
      description:
        "Architectural, real estate, and construction photography across Minneapolis–Saint Paul and surrounding Twin Cities communities.",
      canonicalPath: "/locations/minneapolis-twin-cities",
      keywords: [
        "architectural photographer Minneapolis",
        "real estate photography Minneapolis",
        "construction photography Twin Cities",
      ],
      openGraphImage: "/images/minneapolis-brick-courtyard.webp",
    },
  },
  {
    slug: "lake-minnetonka",
    name: "Lake Minnetonka",
    eyebrow: "Wayzata · Minnetonka · Lake Minnetonka",
    heading: "Photography for Lake Minnetonka architecture and homes",
    introduction:
      "Considered stills and film for waterfront architecture, custom homes, renovations, and distinctive properties west of Minneapolis.",
    sections: [
      {
        title: "The house and the water",
        body: "A lake property is read in two directions: inward through its rooms and outward toward shoreline, trees, and horizon. Coverage is structured to show both—the spatial logic of the home and the setting that gives it meaning.",
      },
      {
        title: "Light specific to the site",
        body: "Orientation, reflection, foliage, and weather can change a waterfront property by the hour. Planning identifies the light that best describes each elevation and interior, with dusk coverage used when it adds atmosphere rather than simply extending the shot list.",
      },
      {
        title: "Wayzata and Minnetonka",
        body: "Assignments in Wayzata, Minnetonka, and around the lake may combine architecture, real estate, detail, and wider site imagery. Aerial coverage is considered case by case according to the property, conditions, privacy, and applicable airspace requirements.",
      },
    ],
    servedCommunities: [
      "Wayzata",
      "Minnetonka",
      "Excelsior",
      "Orono",
      "Mound",
      "Lake Minnetonka communities",
    ],
    serviceSlugs: [
      "architectural-photography",
      "real-estate-photography",
      "drone-aerial-photography",
      "property-video-film",
    ],
    relatedProjectSlugs: [
      "wayzata-lakeside",
      "pine-and-water",
      "ferndale-residence",
      "woodland-house",
    ],
    seo: {
      title: "Lake Minnetonka Architectural & Home Photography | Minneplenka",
      description:
        "Architectural and luxury home photography in Wayzata, Minnetonka, and Lake Minnetonka, planned around place, natural light, and water.",
      canonicalPath: "/locations/lake-minnetonka",
      keywords: [
        "real estate photographer Wayzata",
        "luxury home photography Minnetonka",
        "Lake Minnetonka architectural photography",
      ],
      openGraphImage: "/images/wayzata-lakeside/lakefront-aerial.webp",
    },
  },
  {
    slug: "western-wisconsin",
    name: "Western Wisconsin",
    eyebrow: "St. Croix Valley and beyond",
    heading: "Architectural and property photography in Western Wisconsin",
    introduction:
      "Available for residential, architectural, construction, and development assignments across Western Wisconsin.",
    sections: [
      {
        title: "A wider sense of place",
        body: "Rural, wooded, river, and lake settings often carry as much visual weight as the building itself. Photography can move from the landscape and approach to rooms and material details, keeping the property’s relationship to the land legible throughout.",
      },
      {
        title: "Planned before arrival",
        body: "Travel, access, weather, sun direction, and the condition of the site are coordinated in advance. That preparation is especially useful for remote properties and active construction sites where a return visit is not always the best use of time.",
      },
      {
        title: "Stills, aerials, and film",
        body: "When a project benefits from several forms of coverage, still photography can be combined with aerial context or a concise property film. Scope is kept deliberate so each format contributes a distinct part of the story.",
      },
    ],
    servedCommunities: [
      "Hudson",
      "River Falls",
      "New Richmond",
      "St. Croix Valley",
      "Western Wisconsin communities",
    ],
    serviceSlugs: [
      "architectural-photography",
      "real-estate-photography",
      "construction-progress-photography",
      "drone-aerial-photography",
      "property-video-film",
    ],
    relatedProjectSlugs: ["st-croix-bluff"],
    seo: {
      title: "Real Estate & Architectural Photography Western Wisconsin | Minneplenka",
      description:
        "Architectural, real estate, construction, and aerial photography for properties and projects across Western Wisconsin and the St. Croix Valley.",
      canonicalPath: "/locations/western-wisconsin",
      keywords: [
        "real estate photography Western Wisconsin",
        "architectural photographer St. Croix Valley",
        "Wisconsin property photography",
      ],
      openGraphImage: "/images/wisconsin-bluff-aerial.webp",
    },
  },
] as const satisfies readonly LocationPage[];

export type LocationPageRecord = (typeof locations)[number];

export function getLocationBySlug(
  slug: string,
): LocationPageRecord | undefined {
  return locations.find((location) => location.slug === slug);
}

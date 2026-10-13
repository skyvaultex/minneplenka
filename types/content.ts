export const PROJECT_CATEGORIES = [
  "Architecture",
  "Real Estate",
  "Construction",
  "Aerial",
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const ARCHITECTURAL_STYLES = [
  "Modern",
  "Contemporary",
  "Traditional",
  "Scandinavian",
  "Transitional",
  "Industrial",
] as const;

export type ArchitecturalStyle = (typeof ARCHITECTURAL_STYLES)[number];

export const PROJECT_LOCATION_FILTERS = [
  "Minneapolis",
  "Wayzata",
  "Minnetonka",
  "Lake Minnetonka",
  "Twin Cities",
  "Western Wisconsin",
  "St. Croix Valley",
] as const;

export type ProjectLocationTag = (typeof PROJECT_LOCATION_FILTERS)[number];

export const IMAGE_LAYOUTS = [
  "full-bleed",
  "wide",
  "inset-left",
  "inset-right",
  "pair-left",
  "pair-right",
] as const;

export type ImageLayout = (typeof IMAGE_LAYOUTS)[number];

export type ImageAspect = "panorama" | "landscape" | "portrait" | "square";

export type ImageFocalPoint =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right";

export type ImagePath = `/images/${string}`;
export type FilmPath = `/films/${string}`;

export interface ImageAsset {
  src: ImagePath;
  width: number;
  height: number;
}

export interface EditorialImage extends ImageAsset {
  alt: string;
  caption?: string;
  aspect: ImageAspect;
  layout: ImageLayout;
  focalPoint?: ImageFocalPoint;
}

export interface ProjectFilm {
  src: FilmPath;
  poster: ImageAsset;
  title: string;
  caption: string;
  width: number;
  height: number;
  duration: string;
  durationIso: `PT${string}`;
  uploadDate: `${number}-${number}-${number}`;
}

export interface SeoRecord {
  title: string;
  description: string;
  canonicalPath: `/${string}` | "/";
  keywords: readonly string[];
  openGraphImage?: ImagePath;
  noIndex?: boolean;
}

export interface Project {
  slug: string;
  projectNumber: string;
  title: string;
  label: "Placeholder study" | "Commission";
  isPlaceholder: boolean;
  location: string;
  locationTags: readonly ProjectLocationTag[];
  category: ProjectCategory;
  style: ArchitecturalStyle;
  year: number;
  description: string;
  mediaLabel?: string;
  client?: string;
  searchKeywords: readonly string[];
  cover: EditorialImage;
  gallery: readonly EditorialImage[];
  film?: ProjectFilm;
  featured: boolean;
  relatedServiceSlug: ServiceSlug;
  relatedLocationSlug?: LocationPageSlug;
  seo: SeoRecord;
}

export type ServiceSlug =
  | "architectural-photography"
  | "real-estate-photography"
  | "construction-progress-photography"
  | "drone-aerial-photography"
  | "property-video-film";

export interface Service {
  slug: ServiceSlug;
  name: string;
  indexLabel: string;
  statement: string;
  introduction: string;
  deliverables: readonly string[];
  idealFor: readonly string[];
  closing: string;
  note?: string;
  relatedProjectSlugs: readonly string[];
  seo: SeoRecord;
}

export type LocationPageSlug =
  | "minneapolis-twin-cities"
  | "lake-minnetonka"
  | "western-wisconsin";

export interface LocationSection {
  title: string;
  body: string;
}

export interface LocationPage {
  slug: LocationPageSlug;
  name: string;
  eyebrow: string;
  heading: string;
  introduction: string;
  sections: readonly LocationSection[];
  servedCommunities: readonly string[];
  serviceSlugs: readonly ServiceSlug[];
  relatedProjectSlugs: readonly string[];
  seo: SeoRecord;
}

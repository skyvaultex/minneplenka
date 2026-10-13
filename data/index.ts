export {
  featuredProjects,
  getAdjacentProjects,
  getProjectBySlug,
  getProjectsByLocationTag,
  projects,
} from "./projects";
export type { ProjectRecord, ProjectSlug } from "./projects";

export { getServiceBySlug, services } from "./services";
export type { ServiceRecord } from "./services";

export { getLocationBySlug, locations } from "./locations";
export type { LocationPageRecord } from "./locations";

export { imageAssets } from "./image-assets";

export {
  ARCHITECTURAL_STYLES,
  IMAGE_LAYOUTS,
  PROJECT_CATEGORIES,
  PROJECT_LOCATION_FILTERS,
} from "@/types/content";
export type {
  ArchitecturalStyle,
  EditorialImage,
  ImageAspect,
  ImageFocalPoint,
  ImageLayout,
  ImageAsset,
  ImagePath,
  LocationPage,
  LocationPageSlug,
  LocationSection,
  Project,
  ProjectCategory,
  ProjectLocationTag,
  SeoRecord,
  Service,
  ServiceSlug,
} from "@/types/content";

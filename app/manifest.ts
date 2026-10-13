import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MINNEPLENKA",
    short_name: "MINNEPLENKA",
    description:
      "Architectural photography, property imagery, and film across Minnesota and beyond.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F7F4",
    theme_color: "#F7F7F4",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

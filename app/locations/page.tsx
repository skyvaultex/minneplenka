import Link from "next/link";
import { InquiryCta } from "@/components/inquiry-cta";
import { locations } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Service areas",
  description:
    "Architectural and property photography across Minneapolis–Saint Paul, Lake Minnetonka, Western Wisconsin, and beyond.",
  path: "/locations",
  image: "/images/lake-house-panorama.webp",
});

export default function LocationsPage() {
  return (
    <>
      <header className="page-hero">
        <p className="eyebrow">Service areas</p>
        <h1>Minnesota and beyond.</h1>
        <p className="page-intro">
          Based near Minneapolis and available for assignments throughout the
          region and farther afield.
        </p>
      </header>
      <section className="services-index" aria-label="Regional guides">
        <div className="services-list">
          {locations.map((location, index) => (
            <Link key={location.slug} href={`/locations/${location.slug}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{location.name}</h3>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <InquiryCta compact />
    </>
  );
}

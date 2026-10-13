import Link from "next/link";
import Image from "next/image";
import { InquiryCta } from "@/components/inquiry-cta";
import { services } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Photography services",
  description:
    "Architectural, real estate, construction, aerial photography, and property film across Minnesota and Western Wisconsin.",
  path: "/services",
  image: {
    url: "/images/frederick-avenue/kitchen.webp",
    alt: "Bright residential kitchen with white cabinetry, timber accents, and a central island",
    width: 2200,
    height: 1466,
  },
});

export default function ServicesPage() {
  return (
    <>
      <header className="page-hero">
        <p className="eyebrow">Services / Studio practice</p>
        <h1>Images shaped around the work.</h1>
        <p className="page-intro">
          Stills and film for designed spaces, distinctive properties, and
          projects taking form.
        </p>
      </header>

      <div className="service-media">
        <Image
          src="/images/frederick-avenue/kitchen.webp"
          alt="Bright residential kitchen with white cabinetry, timber accents, and a central island"
          fill
          sizes="100vw"
        />
      </div>

      <section className="services-index" aria-labelledby="service-index-title">
        <p className="eyebrow" id="service-index-title">Service index</p>
        <div className="services-list">
          {services.map((service, index) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.name}</h3>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <InquiryCta />
    </>
  );
}

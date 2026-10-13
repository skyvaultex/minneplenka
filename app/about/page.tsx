import Image from "next/image";
import Link from "next/link";
import { InquiryCta } from "@/components/inquiry-cta";
import { JsonLd, buildBreadcrumbListJsonLd } from "@/components/structured-data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Studio",
  description:
    "Meet Max Preobrazhensky and learn how Minneplenka approaches architecture, material, and natural light with an editorial eye.",
  path: "/about",
  image: {
    url: "/images/wayzata-lakeside/entrance-detail.webp",
    alt: "Stone and timber entrance beneath a curved covered opening",
    width: 2200,
    height: 1466,
  },
});

export default function AboutPage() {
  return (
    <>
      <article>
        <header className="about-hero">
          <p className="eyebrow">Studio / Max Preobrazhensky</p>
          <h1>Photographing architecture as it is experienced.</h1>
        </header>

        <div className="about-media">
          <Image
            src="/images/wayzata-lakeside/entrance-detail.webp"
            alt="Stone and timber entrance beneath a curved covered opening"
            fill
            sizes="100vw"
          />
        </div>

        <section className="about-deck">
          <p className="lead">Form. Light. Material.</p>
          <div className="about-body">
            <p>
              Minneplenka is the photography practice of Max Preobrazhensky,
              creating imagery for architecture, real estate, construction,
              aerial work, and property film across Minnesota and beyond.
            </p>
            <p>
              The approach begins with attention: how a plan opens into a room,
              where daylight settles, how materials meet, and how a building
              belongs to its landscape. The camera responds with restraint,
              preserving the quiet confidence of the work itself.
            </p>
            <p>
              Based in the Minneapolis area, the studio works across the Twin
              Cities, Lake Minnetonka, Western Wisconsin, and on assignments
              farther afield when the project calls for it.
            </p>
            <Link className="text-link" href="/contact">Discuss a project ↗</Link>
          </div>
        </section>
      </article>

      <InquiryCta compact />
      <JsonLd
        id="about-breadcrumbs"
        data={buildBreadcrumbListJsonLd([
          { name: "Home", url: "/" },
          { name: "Studio", url: "/about" },
        ])}
      />
    </>
  );
}

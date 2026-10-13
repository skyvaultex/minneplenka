import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryCta } from "@/components/inquiry-cta";
import { ProjectCard } from "@/components/project-card";
import { JsonLd, buildBreadcrumbListJsonLd } from "@/components/structured-data";
import {
  getLocationBySlug,
  getProjectBySlug,
  getServiceBySlug,
  locations,
} from "@/data";
import { buildMetadata } from "@/lib/seo";

type LocationPageProps = { params: Promise<{ slug: string }> };

const locationImages = {
  "minneapolis-twin-cities": "/images/minneapolis-brick-courtyard.webp",
  "lake-minnetonka": "/images/wayzata-lakeside/lakefront-aerial.webp",
  "western-wisconsin": "/images/wisconsin-bluff-aerial.webp",
} as const;

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  return buildMetadata({
    title: location.name,
    description: location.seo.description,
    path: location.seo.canonicalPath,
    image: location.seo.openGraphImage,
    keywords: location.seo.keywords,
  });
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const relatedProjects = location.relatedProjectSlugs
    .map(getProjectBySlug)
    .filter((project) => project !== undefined);
  const visualProject = relatedProjects.find((project) => !project.isPlaceholder);
  const image = visualProject?.cover.src ?? locationImages[location.slug];
  const imageAlt = visualProject?.cover.alt ?? `Architectural photography study for ${location.name}`;
  const relatedServices = location.serviceSlugs
    .map(getServiceBySlug)
    .filter((service) => service !== undefined);

  return (
    <>
      <article>
        <header className="location-hero">
          <p className="eyebrow">{location.eyebrow}</p>
          <h1>{location.heading}</h1>
        </header>

        <div className="location-media">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
          />
          {!visualProject ? <span className="placeholder-label">Studio study</span> : null}
        </div>

        <section className="location-deck">
          <p className="lead">{location.introduction}</p>
          <div className="location-body">
            {location.sections.map((section) => (
              <section key={section.title}>
                <p className="eyebrow">{section.title}</p>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="deliverables">
          <h2>Available services</h2>
          <ol>
            {relatedServices.map((service) => (
              <li key={service.slug}>
                <Link className="text-link" href={`/services/${service.slug}`}>{service.name} ↗</Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="deliverables">
          <h2>Selected communities</h2>
          <ol>{location.servedCommunities.map((community) => <li key={community}>{community}</li>)}</ol>
        </section>

        {relatedProjects.length ? (
          <section className="related-work">
            <p className="eyebrow">Regional studio work</p>
            <div className="related-work-grid">
              {relatedProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
            </div>
          </section>
        ) : null}
      </article>

      <InquiryCta compact />
      <JsonLd
        id={`location-${location.slug}-breadcrumbs`}
        data={buildBreadcrumbListJsonLd([
          { name: "Home", url: "/" },
          { name: "Service areas", url: "/locations" },
          { name: location.name, url: location.seo.canonicalPath },
        ])}
      />
    </>
  );
}

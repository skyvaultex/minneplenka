import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { InquiryCta } from "@/components/inquiry-cta";
import { ProjectCard } from "@/components/project-card";
import {
  JsonLd,
  buildBreadcrumbListJsonLd,
  buildServiceJsonLd,
} from "@/components/structured-data";
import { getProjectBySlug, getServiceBySlug, services } from "@/data";
import { buildMetadata } from "@/lib/seo";

type ServicePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.name,
    description: service.seo.description,
    path: service.seo.canonicalPath,
    image: service.seo.openGraphImage,
    keywords: service.seo.keywords,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedProjects = service.relatedProjectSlugs
    .map(getProjectBySlug)
    .filter((project) => project !== undefined);
  const visualProject = relatedProjects.find((project) => !project.isPlaceholder);
  const image = visualProject?.cover.src ?? service.seo.openGraphImage ?? "/images/minneapolis-brick-courtyard.webp";
  const imageAlt = visualProject?.cover.alt ?? `${service.name} studio study with material, light, and site context`;

  return (
    <>
      <article>
        <header className="service-hero">
          <p className="eyebrow">Services / {service.indexLabel}</p>
          <h1>{service.name}</h1>
        </header>

        <div className="service-media">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
          />
          {!visualProject ? <span className="placeholder-label">Studio study</span> : null}
        </div>

        <section className="service-deck">
          <p className="lead">{service.statement}</p>
          <div className="service-body">
            <p>{service.introduction}</p>
            <p>{service.closing}</p>
            {"note" in service && service.note ? <p>{service.note}</p> : null}
          </div>
        </section>

        <section className="deliverables">
          <h2>Scope</h2>
          <ol>
            {service.deliverables.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </section>

        <section className="deliverables">
          <h2>Ideal for</h2>
          <ol>
            {service.idealFor.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </section>

        {relatedProjects.length ? (
          <section className="related-work" aria-labelledby="related-work-title">
            <p className="eyebrow" id="related-work-title">Related studio work</p>
            <div className="related-work-grid">
              {relatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </section>
        ) : null}
      </article>

      <InquiryCta compact />

      <JsonLd
        id={`service-${service.slug}-structured-data`}
        data={[
          buildServiceJsonLd({
            name: service.name,
            description: service.seo.description,
            url: service.seo.canonicalPath,
            image,
          }),
          buildBreadcrumbListJsonLd([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: service.name, url: service.seo.canonicalPath },
          ]),
        ]}
      />
    </>
  );
}

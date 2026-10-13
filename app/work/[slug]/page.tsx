import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryCta } from "@/components/inquiry-cta";
import { ProjectGallery } from "@/components/project-gallery";
import {
  JsonLd,
  buildBreadcrumbListJsonLd,
  buildImageObjectJsonLd,
  buildVideoObjectJsonLd,
} from "@/components/structured-data";
import {
  getAdjacentProjects,
  getProjectBySlug,
  projects,
} from "@/data";
import { buildMetadata } from "@/lib/seo";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return buildMetadata({
    title: project.title,
    description: project.seo.description,
    path: project.seo.canonicalPath,
    image: {
      url: project.cover.src,
      alt: project.cover.alt,
      width: project.cover.width,
      height: project.cover.height,
    },
    keywords: project.seo.keywords,
    noIndex: project.seo.noIndex,
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const adjacent = getAdjacentProjects(project.slug);
  const structuredImages = project.gallery.map((image, index) =>
    buildImageObjectJsonLd({
      url: image.src,
      alt: image.alt,
      caption: image.caption,
      width: image.width,
      height: image.height,
      representativeOfPage: index === 0,
      creatorName: "Max Preobrazhensky",
    }),
  );
  const structuredFilm = project.film
    ? [
        buildVideoObjectJsonLd({
          name: project.film.title,
          description: project.film.caption,
          contentUrl: project.film.src,
          thumbnailUrl: project.film.poster.src,
          uploadDate: project.film.uploadDate,
          duration: project.film.durationIso,
          width: project.film.width,
          height: project.film.height,
          creatorName: "Max Preobrazhensky",
        }),
      ]
    : [];

  return (
    <>
      <article>
        <header className="project-hero">
          <div className="project-kicker">
            <span>{project.label} / {project.projectNumber}</span>
            <span>{project.mediaLabel ?? project.category} · {project.year}</span>
          </div>
          <h1>{project.title}</h1>
          <div className="project-intro">
            <dl>
              <dt>Place</dt><dd>{project.location}</dd>
              <dt>Type</dt><dd>{project.category}</dd>
              <dt>Style</dt><dd>{project.style}</dd>
              {project.client ? <><dt>For</dt><dd>{project.client}</dd></> : null}
            </dl>
            <p>{project.description}</p>
          </div>
        </header>

        <ProjectGallery
          images={project.gallery}
          title={project.title}
          film={project.film}
        />

        <aside className="page-width prose-small" style={{ marginBottom: "8rem" }}>
          <p className="eyebrow">Explore the context</p>
          <p>
            View the related <Link className="text-link" href={`/services/${project.relatedServiceSlug}`}>service</Link>
            {project.relatedLocationSlug ? (
              <> or the <Link className="text-link" href={`/locations/${project.relatedLocationSlug}`}>regional guide</Link></>
            ) : null}.
          </p>
        </aside>

        {adjacent ? (
          <nav className="project-nav" aria-label="Previous and next projects">
            <Link href={`/work/${adjacent.previous.slug}`}>
              <span>← Previous project</span>
              <strong>{adjacent.previous.title}</strong>
            </Link>
            <Link href={`/work/${adjacent.next.slug}`}>
              <span>Next project →</span>
              <strong>{adjacent.next.title}</strong>
            </Link>
          </nav>
        ) : null}
      </article>

      <InquiryCta compact />

      <JsonLd
        id={`project-${project.slug}-structured-data`}
        data={[
          buildBreadcrumbListJsonLd([
            { name: "Home", url: "/" },
            { name: "Work", url: "/work" },
            { name: project.title, url: `/work/${project.slug}` },
          ]),
          ...structuredImages,
          ...structuredFilm,
        ]}
      />
    </>
  );
}

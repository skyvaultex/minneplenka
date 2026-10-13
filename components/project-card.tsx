import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
  className?: string;
};

export function ProjectCard({ project, priority = false, className = "" }: ProjectCardProps) {
  const imageSizes = className.includes("home-lead")
    ? "(max-width: 640px) 100vw, (max-width: 1280px) 68vw, 66vw"
    : "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 42vw";

  return (
    <article className={`project-card ${className}`.trim()}>
      <Link href={`/work/${project.slug}`} aria-label={`View ${project.title}`}>
        <div className="project-image-wrap">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes={imageSizes}
            priority={priority}
            style={{ objectPosition: project.cover.focalPoint ?? "center" }}
          />
          {project.isPlaceholder ? (
            <span className="placeholder-label">Studio study</span>
          ) : null}
          {project.film ? (
            <span className="media-label">Film + stills</span>
          ) : null}
        </div>
        <div className="project-caption">
          <span>{project.projectNumber}</span>
          <h3>{project.title}</h3>
          <p>{project.location}</p>
          <span className="project-arrow" aria-hidden="true">↗</span>
        </div>
      </Link>
    </article>
  );
}

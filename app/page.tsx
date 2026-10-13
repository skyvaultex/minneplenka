import Image from "next/image";
import Link from "next/link";
import { InquiryCta } from "@/components/inquiry-cta";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getProjectBySlug, locations, services } from "@/data";

export default function HomePage() {
  const wayzata = getProjectBySlug("wayzata-lakeside")!;
  const iconHomes = getProjectBySlug("icon-homes-residence")!;
  const frederick = getProjectBySlug("frederick-avenue")!;

  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <Image
          src={iconHomes.cover.src}
          alt={iconHomes.cover.alt}
          width={iconHomes.cover.width}
          height={iconHomes.cover.height}
          sizes="100vw"
          priority
          fetchPriority="high"
          style={{ objectPosition: "62% center" }}
        />
        <p className="hero-index">Minnesota · Stills · Aerial · Film</p>
        <div className="hero-copy">
          <h1 id="home-title">Architecture, with intention.</h1>
          <p className="hero-intro">
            Editorial architectural photography, refined property imagery, and
            short-form film for places shaped by light and context.
          </p>
        </div>
      </section>

      <section className="studio-statement" aria-labelledby="studio-statement-title">
        <p className="eyebrow">Minneplenka / Studio</p>
        <h2 id="studio-statement-title">Buildings deserve a slower read.</h2>
        <p>
          Max Preobrazhensky photographs architecture through proportion,
          material, natural light, and the way a building belongs to its site.
        </p>
      </section>

      <SectionHeading
        eyebrow="Selected commissions / 2026"
        title="A measured view of place."
        aside={
          <p>
            Intentionally paced imagery for homes, civic buildings, and projects
            where clarity matters as much as atmosphere.
          </p>
        }
      />

      <section className="editorial-grid" aria-label="Selected projects">
        <ProjectCard project={wayzata} className="home-lead" />
        <ProjectCard project={frederick} className="home-detail" />
        <div className="home-grid-break" aria-hidden="true" />
        <ProjectCard project={iconHomes} className="home-tall" />
      </section>

      <article className="panorama film-feature">
        <Link href={`/work/${iconHomes.slug}#film`} aria-label={`Watch ${iconHomes.title} film`}>
          <div className="panorama-image">
            <Image
              src="/images/icon-homes/aerial-context.webp"
              alt="Aerial view of the Icon Homes residence within an autumn woodland"
              width={2200}
              height={1238}
              sizes="100vw"
            />
            <span className="media-label">Film · 01:18</span>
            <span className="film-play" aria-hidden="true">Play</span>
          </div>
          <div className="project-caption">
            <span>{iconHomes.projectNumber}</span>
            <h3>{iconHomes.title} — Project film</h3>
            <p>{iconHomes.location}</p>
            <span className="project-arrow" aria-hidden="true">↗</span>
          </div>
        </Link>
      </article>

      <section className="services-index" aria-labelledby="services-title">
        <SectionHeading
          eyebrow="Services"
          title={<span id="services-title">Still. Film. Context.</span>}
          aside={
            <p>
              Focused image sets for architects, homebuilders, developers,
              brokerages, and individuals with properties worth seeing clearly.
            </p>
          }
        />
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

      <section className="region-strip" aria-labelledby="region-title">
        <p className="eyebrow">Minnesota and beyond</p>
        <div className="region-content">
          <h2 id="region-title">Local knowledge, available farther afield.</h2>
          <nav className="region-links" aria-label="Featured service areas">
            {locations.map((location) => (
              <Link key={location.slug} href={`/locations/${location.slug}`}>
                {location.name} ↗
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <InquiryCta detailed />
    </>
  );
}

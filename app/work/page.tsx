import { Suspense } from "react";
import { PortfolioExplorer } from "@/components/portfolio-explorer";
import { InquiryCta } from "@/components/inquiry-cta";
import { projects } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Selected work",
  description:
    "Selected architectural, real estate, construction, and aerial photography studies from Minnesota and Western Wisconsin.",
  path: "/work",
  image: {
    url: "/images/wayzata-lakeside/wayzata-hero.webp",
    alt: "White lakeside residence framed by mature trees in Wayzata, Minnesota",
    width: 2200,
    height: 1466,
  },
});

export default function WorkPage() {
  return (
    <>
      <header className="page-hero">
        <p className="eyebrow">Portfolio / 2026</p>
        <h1>Selected work.</h1>
        <p className="page-intro">
          Commissioned architecture, property, aerial, and film work, followed
          by clearly marked studio studies. Every project opens as a standalone essay.
        </p>
      </header>
      <section className="work-shell" aria-label="Portfolio projects">
        <Suspense fallback={<p className="result-count">Loading work…</p>}>
          <PortfolioExplorer projects={projects} />
        </Suspense>
      </section>
      <InquiryCta compact />
    </>
  );
}

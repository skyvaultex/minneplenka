"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProjectCard } from "@/components/project-card";
import {
  ARCHITECTURAL_STYLES,
  PROJECT_CATEGORIES,
  PROJECT_LOCATION_FILTERS,
  type Project,
} from "@/types/content";

type FilterKey = "category" | "location" | "style" | "q";

export function PortfolioExplorer({ projects }: { projects: readonly Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const category = searchParams.get("category") ?? "All";
  const location = searchParams.get("location") ?? "";
  const style = searchParams.get("style") ?? "";
  const query = searchParams.get("q")?.trim() ?? "";

  const filtered = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase();

    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const matchesLocation =
        !location || (project.locationTags as readonly string[]).includes(location);
      const matchesStyle = !style || project.style === style;
      const searchable = [
        project.title,
        project.location,
        project.style,
        project.category,
        ...project.locationTags,
        ...project.searchKeywords,
      ]
        .join(" ")
        .toLocaleLowerCase();

      return (
        matchesCategory &&
        matchesLocation &&
        matchesStyle &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [category, location, projects, query, style]);

  function updateFilter(key: FilterKey, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    const normalized = value === "All" ? "" : value.trim();

    if (normalized) next.set(key, normalized);
    else next.delete(key);

    startTransition(() => {
      const serialized = next.toString();
      router.replace(serialized ? `${pathname}?${serialized}` : pathname, {
        scroll: false,
      });
    });
  }

  function clearFilters() {
    startTransition(() => router.replace(pathname, { scroll: false }));
  }

  const hasFilters = category !== "All" || Boolean(location || style || query);

  return (
    <div aria-busy={isPending}>
      <div className="filter-shell" aria-label="Portfolio filters">
        <div className="category-tabs" role="group" aria-label="Filter by category">
          {["All", ...PROJECT_CATEGORIES].map((item) => (
            <button
              key={item}
              type="button"
              data-active={category === item}
              aria-pressed={category === item}
              onClick={() => updateFilter("category", item)}
            >
              {item === "All" ? "All work" : item}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <label className="filter-control">
            <span className="sr-only">Filter by location</span>
            <select value={location} onChange={(event) => updateFilter("location", event.target.value)}>
              <option value="">Location</option>
              {PROJECT_LOCATION_FILTERS.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="filter-control">
            <span className="sr-only">Filter by architectural style</span>
            <select value={style} onChange={(event) => updateFilter("style", event.target.value)}>
              <option value="">Style</option>
              {ARCHITECTURAL_STYLES.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="filter-control search">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              placeholder="Search title, city, style, or keyword"
              onChange={(event) => updateFilter("q", event.target.value)}
            />
          </label>
          <div className="filter-actions">
            <span className="result-count" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </span>
            {hasFilters ? (
              <button className="clear-button" type="button" onClick={clearFilters}>
                Clear all
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {filtered.length ? (
        <div className="work-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="eyebrow">No matching projects</p>
          <h2>Try a wider view.</h2>
          <button className="clear-button" type="button" onClick={clearFilters}>
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

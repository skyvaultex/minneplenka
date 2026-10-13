import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">Page not found</p>
      <h1>404</h1>
      <p>The frame you’re looking for is no longer here.</p>
      <Link className="text-link" href="/work">Return to selected work ↗</Link>
    </section>
  );
}

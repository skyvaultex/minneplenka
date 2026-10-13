import Image from "next/image";

export function ConstructionScreen() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <article className="construction-screen" aria-labelledby="construction-title">
      <Image
        className="construction-image"
        src="/images/icon-homes/icon-homes-hero.webp"
        alt="Contemporary white residence with a warm timber entry on a wooded Minnesota site"
        fill
        sizes="100vw"
        priority
      />
      <div className="construction-shade" aria-hidden="true" />

      <header className="construction-header">
        <span className="construction-wordmark">Minneplenka</span>
        <span>Architectural photography</span>
      </header>

      <div className="construction-copy">
        <p className="construction-kicker">Portfolio in progress / 2026</p>
        <h1 id="construction-title">A sharper view is taking shape.</h1>
        <div className="construction-note">
          <p>
            The Minneplenka portfolio is being rebuilt around new architectural
            photography, aerial imagery, and film. Please check back soon.
          </p>
          {contactEmail ? (
            <a href={`mailto:${contactEmail}`}>Start a project ↗</a>
          ) : null}
        </div>
      </div>

      <footer className="construction-footer">
        <span>Minneapolis · Minnesota · Beyond</span>
        <span>Featured work · Icon Homes</span>
      </footer>
    </article>
  );
}

import Image from "next/image";

export function ConstructionScreen() {
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
        <span>Architectural photography &amp; film</span>
      </header>

      <div className="construction-copy">
        <p className="construction-kicker">Portfolio in progress</p>
        <h1 id="construction-title">Website under construction.</h1>
        <div className="construction-note">
          <p>
            A new Minneplenka portfolio is on the way. For architectural
            photography, aerial imagery, or film, get in touch.
          </p>
          <nav className="construction-contact" aria-label="Contact Minneplenka">
            <a href="mailto:maxym.vorotnik@gmail.com">maxym.vorotnik@gmail.com</a>
            <a href="tel:+16122351090">612 235 1090</a>
            <a href="https://www.instagram.com/minneplenka/">@minneplenka</a>
          </nav>
        </div>
      </div>

      <footer className="construction-footer">
        <span>Featured work &middot; Icon Homes</span>
        <span>
          Website by <a href="https://etherstep.com/">Etherstep</a>
        </span>
      </footer>
    </article>
  );
}

import Link from "next/link";

export function InquiryCta({
  compact = false,
  detailed = false,
}: {
  compact?: boolean;
  detailed?: boolean;
}) {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <section
      id={detailed ? "contact" : undefined}
      className={`${compact ? "inquiry-cta compact" : "inquiry-cta"}${detailed ? " detailed" : ""}`}
      aria-labelledby={detailed ? "home-contact-title" : undefined}
    >
      <div className="inquiry-label">
        <p className="eyebrow">{detailed ? "Inquire / New work" : "Begin a project"}</p>
        {detailed ? (
          <dl className="inquiry-facts">
            <div>
              <dt>Based</dt>
              <dd>Minneapolis–Saint Paul</dd>
            </div>
            <div>
              <dt>Available</dt>
              <dd>Minnesota, Western Wisconsin + travel</dd>
            </div>
          </dl>
        ) : null}
      </div>
      <div className="inquiry-main">
        <h2 id={detailed ? "home-contact-title" : undefined}>
          {detailed ? "A project in view?" : "Tell me what you’re building."}
        </h2>
        <div className="inquiry-actions">
          {detailed ? (
            <p>
              Share the location, project type, intended use, and preferred
              timing. Every inquiry goes directly to Max.
            </p>
          ) : null}
          <div className="inquiry-links">
            <Link className="text-link light" href="/contact">
              {detailed ? "Describe the project" : "Start an inquiry"}{" "}
              <span aria-hidden="true">↗</span>
            </Link>
            {detailed && contactEmail ? (
              <a className="text-link light" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

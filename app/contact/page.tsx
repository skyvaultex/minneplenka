import { ContactForm } from "@/components/contact-form";
import { JsonLd, buildBreadcrumbListJsonLd } from "@/components/structured-data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Inquire",
  description:
    "Tell Minneplenka about an architectural, real estate, construction, aerial, or property film assignment in Minnesota or beyond.",
  path: "/contact",
  image: "/images/lake-house-panorama.webp",
});

export default function ContactPage() {
  return (
    <>
      <header className="contact-hero">
        <p className="eyebrow">Inquire / New projects</p>
        <h1>Tell me what you’re building.</h1>
      </header>

      <section className="contact-layout" aria-label="Project inquiry">
        <aside className="contact-note">
          <p>
            Share the property, intended use, rough scope, and timing. A
            considered brief can begin with only the essentials.
          </p>
          <p>
            Based near Minneapolis. Available across Minnesota, Western
            Wisconsin, and for travel.
          </p>
        </aside>
        <ContactForm />
      </section>

      <JsonLd
        id="contact-breadcrumbs"
        data={buildBreadcrumbListJsonLd([
          { name: "Home", url: "/" },
          { name: "Inquire", url: "/contact" },
        ])}
      />
    </>
  );
}

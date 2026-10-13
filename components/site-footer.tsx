import Link from "next/link";
export function SiteFooter() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  return (
    <footer className="site-footer">
      <div>
        <Link className="wordmark" href="/">
          Minneplenka
        </Link>
        <p>Architectural photography by Max Preobrazhensky.</p>
      </div>
      <div className="footer-meta">
        <p>Minneapolis–Saint Paul</p>
        <p>Lake Minnetonka · Western Wisconsin</p>
        {contactEmail ? (
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        ) : (
          <Link href="/contact">Email via inquiry form</Link>
        )}
      </div>
      <div className="footer-meta footer-right">
        <Link href="/work">Selected work</Link>
        <Link href="/contact">Start an inquiry</Link>
        <p>© {new Date().getFullYear()} Minneplenka</p>
      </div>
    </footer>
  );
}

import Link from "next/link";

const navigation = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Inquire" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Minneplenka home">
        Minneplenka
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <details className="mobile-menu">
        <summary aria-label="Open navigation">
          <span>Menu</span>
          <span className="menu-lines" aria-hidden="true" />
        </summary>
        <nav aria-label="Mobile navigation">
          {navigation.map((item, index) => (
            <Link key={item.href} href={item.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}

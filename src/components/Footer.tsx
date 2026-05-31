import { ExternalLink } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  { href: "/schedule", label: "Schedule" },
  { href: "/groups", label: "Groups" },
  { href: "/traveler", label: "Traveler" },
  { href: "https://www.fifa.com/", label: "FIFA", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/70 pb-24 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_0.8fr] md:py-12">
        <div>
          <Link href="/" className="text-xl font-black tracking-tight text-accent">
            WatchWorldCup2026
          </Link>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Source-labeled broadcaster directory and local-time fixture guide
            for the FIFA World Cup 2026. Rights and availability can change, so
            confirm details with official broadcasters before subscribing.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">
            Not affiliated with FIFA. Affiliate placeholders are disclosed.
          </p>
        </div>
        <nav className="flex flex-wrap items-start gap-3 md:justify-end" aria-label="Footer">
          {footerLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold text-muted hover:border-accent hover:text-accent"
              >
                {link.label}
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-border px-4 py-2 text-sm font-bold text-muted hover:border-accent hover:text-accent"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </footer>
  );
}

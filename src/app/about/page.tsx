import type { Metadata } from "next";
import Link from "next/link";
import { Database, Globe, Shield } from "lucide-react";

import { MobileNav } from "@/components/MobileNav";
import { MotionFadeIn } from "@/components/MotionFadeIn";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "About",
  description:
    "About WatchWorldCup2026 — our mission, data sources, and disclaimers for World Cup 2026 broadcaster information.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pb-24 md:pb-0">
        <section className="stadium-grid relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,230,118,0.15),transparent_42%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
            <MotionFadeIn>
              <h1 className="max-w-3xl text-5xl font-black leading-tight md:text-6xl">About us</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                WatchWorldCup2026 is an independent broadcaster directory for the FIFA World Cup
                2026. We help fans find where to watch — legally and by country.
              </p>
            </MotionFadeIn>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
          <article className="rounded-card border border-border bg-surface p-6">
            <Globe className="h-8 w-8 text-accent" aria-hidden />
            <h2 className="mt-4 text-xl font-bold">Our mission</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Cut through the noise. We label every broadcaster entry with verification status,
              languages, and free vs paid options so you can decide quickly.
            </p>
          </article>
          <article className="rounded-card border border-border bg-surface p-6">
            <Database className="h-8 w-8 text-accent" aria-hidden />
            <h2 className="mt-4 text-xl font-bold">Data sources</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Broadcaster rights from official FIFA documentation and broadcaster announcements.
              Match schedule from FIFA&apos;s published fixture list. Live scores via football-data.org
              when available.
            </p>
          </article>
          <article className="rounded-card border border-border bg-surface p-6">
            <Shield className="h-8 w-8 text-accent" aria-hidden />
            <h2 className="mt-4 text-xl font-bold">Disclaimer</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              We are not affiliated with FIFA. Rights change — always confirm with official
              broadcasters before subscribing. VPN use may be restricted in some countries.
            </p>
          </article>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12">
          <p className="text-sm text-muted">
            Questions? Read our{" "}
            <Link href="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </Link>{" "}
            or return to the{" "}
            <Link href="/" className="text-accent hover:underline">
              home page
            </Link>
            .
          </p>
        </section>
      </main>
      <MobileNav />
    </>
  );
}

import type { Metadata } from "next";
import { Check, Shield, Zap } from "lucide-react";

import { AdSlot } from "@/components/AdSlot";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { MobileNav } from "@/components/MobileNav";
import { MotionFadeIn } from "@/components/MotionFadeIn";
import { Navbar } from "@/components/Navbar";
import { affiliateLinks } from "@/config/affiliates";

export const metadata: Metadata = {
  title: "Best VPN for World Cup 2026 Streaming",
  description:
    "Compare NordVPN and ExpressVPN for watching World Cup 2026 abroad. Affiliate placeholders with disclosure.",
};

const providers = [
  {
    name: "NordVPN",
    tagline: "Best all-round value",
    href: affiliateLinks.nordvpn,
    highlights: ["5,500+ servers", "Threat protection", "30-day guarantee"],
    price: "From $3.99/mo",
  },
  {
    name: "ExpressVPN",
    tagline: "Fastest streaming speeds",
    href: affiliateLinks.expressvpn,
    highlights: ["Lightway protocol", "94 countries", "30-day guarantee"],
    price: "From $6.67/mo",
  },
];

const comparison = [
  { feature: "Streaming speed", nord: "Excellent", express: "Best-in-class" },
  { feature: "Server count", nord: "5,500+", express: "3,000+" },
  { feature: "Countries", nord: "60+", express: "94" },
  { feature: "Money-back", nord: "30 days", express: "30 days" },
  { feature: "Simultaneous devices", nord: "10", express: "8" },
];

export default function VpnPage() {
  return (
    <>
      <Navbar />
      <main className="pb-24 md:pb-0">
        <section className="stadium-grid relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,230,118,0.18),transparent_40%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24">
            <MotionFadeIn>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent">
                <Shield className="h-4 w-4" aria-hidden />
                Streaming abroad
              </div>
              <h1 className="max-w-3xl text-5xl font-black leading-tight md:text-6xl">
                VPN Comparison for World Cup 2026
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                Traveling during the tournament? A VPN can help you reach home-country
                broadcasters — check local laws and broadcaster terms first.
              </p>
            </MotionFadeIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-6 md:grid-cols-2">
            {providers.map((provider) => (
              <article
                key={provider.name}
                className="rounded-card border border-border bg-surface p-6 md:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  {provider.tagline}
                </p>
                <h2 className="mt-2 text-3xl font-black">{provider.name}</h2>
                <p className="mt-2 text-2xl font-bold text-muted">{provider.price}</p>
                <ul className="mt-6 space-y-3">
                  {provider.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted">
                      <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={provider.href}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-black"
                >
                  <Zap className="h-4 w-4" aria-hidden />
                  Visit {provider.name}
                </a>
              </article>
            ))}
          </div>

          <div className="mt-12 overflow-x-auto rounded-card border border-border">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-4 py-3 font-bold">Feature</th>
                  <th className="px-4 py-3 font-bold">NordVPN</th>
                  <th className="px-4 py-3 font-bold">ExpressVPN</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-border/60">
                    <td className="px-4 py-3 text-muted">{row.feature}</td>
                    <td className="px-4 py-3 font-medium">{row.nord}</td>
                    <td className="px-4 py-3 font-medium">{row.express}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_320px]">
            <AffiliateDisclosure />
            <AdSlot size="sidebar" />
          </div>
        </section>
      </main>
      <MobileNav />
    </>
  );
}

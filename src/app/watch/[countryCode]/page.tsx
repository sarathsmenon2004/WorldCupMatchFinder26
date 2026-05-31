import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdSlot } from "@/components/AdSlot";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { BroadcasterCard } from "@/components/BroadcasterCard";
import { MatchList } from "@/components/MatchList";
import { MobileNav } from "@/components/MobileNav";
import { Navbar } from "@/components/Navbar";
import { affiliateLinks } from "@/config/affiliates";
import { broadcasterData } from "@/data/broadcasters";
import { getCountryBroadcast, listMatches } from "@/lib/data";
import { countryCodeSchema } from "@/lib/validation";

export const revalidate = 3600;

export function generateStaticParams() {
  return broadcasterData.map((country) => ({ countryCode: country.countryCode }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ countryCode: string }>;
}): Promise<Metadata> {
  const { countryCode } = await params;
  const parsed = countryCodeSchema.safeParse(countryCode);
  const country = parsed.success ? await getCountryBroadcast(parsed.data) : null;
  return {
    title: country
      ? `Where to Watch World Cup 2026 in ${country.country}`
      : "World Cup 2026 Broadcasters",
    description: country
      ? `Verified broadcaster options and local match times for ${country.country}.`
      : "Find World Cup 2026 broadcasters by country.",
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ countryCode: string }>;
}) {
  const { countryCode } = await params;
  const parsed = countryCodeSchema.safeParse(countryCode);
  if (!parsed.success) notFound();

  const country = await getCountryBroadcast(parsed.data);
  if (!country) notFound();

  const matches = (await listMatches()).slice(0, 5);

  return (
    <>
      <Navbar />
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 pb-24 md:grid-cols-[1fr_320px] md:pb-10">
        <section>
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-accent">{country.status}</p>
            <h1 className="mt-2 text-4xl font-black md:text-6xl">
              {country.flag} Where to Watch in {country.country}
            </h1>
            <p className="mt-4 max-w-3xl text-muted">
              Last verified {country.lastVerifiedAt}. Rights can change; use
              source-labeled entries and official broadcaster pages before purchase.
            </p>
          </div>

          {country.broadcasters.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {country.broadcasters.map((broadcaster) => (
                <BroadcasterCard key={broadcaster.name} broadcaster={broadcaster} />
              ))}
            </div>
          ) : (
            <div className="rounded-card border border-border bg-surface p-6">
              <h2 className="text-2xl font-bold">No confirmed live broadcaster yet</h2>
              <p className="mt-3 text-muted">{country.noConfirmedNote}</p>
              <a
                href={affiliateLinks.nordvpn}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-5 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-bold text-black"
              >
                VPN partner placeholder
              </a>
            </div>
          )}

          <section className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">Next 5 Matches</h2>
            <MatchList matches={matches} />
          </section>
        </section>
        <aside className="space-y-5">
          <AdSlot size="sidebar" />
          <AffiliateDisclosure />
          <Link href="/traveler" className="block rounded-card border border-border bg-surface p-5 font-bold text-accent">
            Traveling from here?
          </Link>
        </aside>
      </main>
      <MobileNav />
    </>
  );
}

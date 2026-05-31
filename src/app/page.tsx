import { Trophy } from "lucide-react";
import Link from "next/link";

import { AdSlot } from "@/components/AdSlot";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { CountdownTimer } from "@/components/CountdownTimer";
import { FavouriteTeamSection } from "@/components/FavouriteTeamSection";
import { GeoDetectedCard } from "@/components/GeoDetectedCard";
import { MobileNav } from "@/components/MobileNav";
import { MotionFadeIn } from "@/components/MotionFadeIn";
import { Navbar } from "@/components/Navbar";
import { NotificationSignup } from "@/components/NotificationSignup";
import { SearchBox } from "@/components/SearchBox";
import { listCountries, listMatches } from "@/lib/data";

export default async function Home() {
  const countries = await listCountries();
  const matches = await listMatches();
  const fallback = countries.find((country) => country.countryCode === "US") ?? countries[0];

  return (
    <>
      <Navbar />
      <main className="pb-24 md:pb-0">
        <section className="stadium-grid relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,230,118,0.22),transparent_38%),linear-gradient(to_bottom,rgba(10,10,10,0.25),var(--background))]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
            <MotionFadeIn>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/50 px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent">
                <Trophy className="h-4 w-4" aria-hidden />
                Verified broadcast directory
              </div>
              <h1 className="max-w-4xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
                Find Where to Watch the 2026 World Cup
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                Search official and source-labeled broadcasters by country,
                compare free and paid options, and see match times in your local
                timezone.
              </p>
              <div className="mt-8 max-w-3xl">
                <SearchBox countries={countries} />
              </div>
              <div className="mt-10 md:mt-12">
                <CountdownTimer />
              </div>
            </MotionFadeIn>
            <div className="space-y-5">
              <AdSlot size="banner" />
              <FavouriteTeamSection matches={matches} />
              <NotificationSignup />
              <GeoDetectedCard fallback={fallback} />
              <div className="rounded-card border border-border bg-surface p-5">
                <h2 className="text-xl font-bold">Traveling?</h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Compare where you are from with where you will be watching.
                </p>
                <Link href="/traveler" className="mt-4 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-bold text-black">
                  Open traveler mode
                </Link>
              </div>
              <AffiliateDisclosure />
            </div>
          </div>
        </section>
      </main>
      <MobileNav />
    </>
  );
}

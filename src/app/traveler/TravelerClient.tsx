"use client";

import { useMemo, useState } from "react";

import { BroadcasterCard } from "@/components/BroadcasterCard";
import type { CountryBroadcast } from "@/lib/types";

export function TravelerClient({ countries }: { countries: CountryBroadcast[] }) {
  const [from, setFrom] = useState("US");
  const [to, setTo] = useState("MX");
  const destination = useMemo(
    () => countries.find((country) => country.countryCode === to) ?? countries[0],
    [countries, to],
  );

  return (
    <section className="grid gap-6 md:grid-cols-[320px_1fr]">
      <div className="rounded-card border border-border bg-surface p-5">
        <label className="block text-sm font-bold text-muted" htmlFor="from">
          I&apos;m from
        </label>
        <select id="from" value={from} onChange={(event) => setFrom(event.target.value)} className="mt-2 w-full rounded-card border border-border bg-background p-3">
          {countries.map((country) => (
            <option key={country.countryCode} value={country.countryCode}>
              {country.flag} {country.country}
            </option>
          ))}
        </select>
        <label className="mt-5 block text-sm font-bold text-muted" htmlFor="to">
          Currently in
        </label>
        <select id="to" value={to} onChange={(event) => setTo(event.target.value)} className="mt-2 w-full rounded-card border border-border bg-background p-3">
          {countries.map((country) => (
            <option key={country.countryCode} value={country.countryCode}>
              {country.flag} {country.country}
            </option>
          ))}
        </select>
        <p className="mt-5 text-sm leading-6 text-muted">
          VPN laws and streaming rights differ by country. This tool is a
          directory, not legal advice; follow local law and broadcaster terms.
        </p>
      </div>
      <div>
        <h2 className="text-3xl font-black">
          {destination.flag} Watching in {destination.country}
        </h2>
        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-accent">
          Traveling from {from}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {destination.broadcasters.length > 0 ? (
            destination.broadcasters.map((broadcaster) => (
              <BroadcasterCard key={broadcaster.name} broadcaster={broadcaster} />
            ))
          ) : (
            <p className="rounded-card border border-border bg-surface p-5 text-muted">
              {destination.noConfirmedNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

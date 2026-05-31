"use client";

import { useEffect, useState } from "react";

import { BroadcasterCard } from "@/components/BroadcasterCard";
import type { CountryBroadcast } from "@/lib/types";

type GeoResponse = {
  countryCode: string;
  country: string;
};

export function GeoDetectedCard({ fallback }: { fallback: CountryBroadcast }) {
  const [country, setCountry] = useState<CountryBroadcast>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const geo = (await fetch("/api/geo").then((response) => response.json())) as GeoResponse;
        const result = await fetch(`/api/broadcasters/${geo.countryCode}`).then((response) => response.json());
        if (active && result.countryCode) setCountry(result as CountryBroadcast);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="rounded-card border border-accent/40 bg-surface p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            {loading ? "Detecting location" : "Detected country"}
          </p>
          <h2 className="mt-1 text-2xl font-bold">
            {country.flag} {country.country}
          </h2>
        </div>
        <span className="rounded-full border border-border px-3 py-1 text-xs uppercase text-muted">
          {country.status}
        </span>
      </div>
      {country.broadcasters[0] ? (
        <BroadcasterCard broadcaster={country.broadcasters[0]} />
      ) : (
        <p className="text-sm leading-6 text-muted">{country.noConfirmedNote}</p>
      )}
    </section>
  );
}

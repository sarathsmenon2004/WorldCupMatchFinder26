"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { CountryBroadcast } from "@/lib/types";

export function SearchBox({ countries }: { countries: CountryBroadcast[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return countries.slice(0, 8);
    return countries
      .filter(
        (country) =>
          country.country.toLowerCase().includes(normalized) ||
          country.countryCode.toLowerCase().includes(normalized),
      )
      .slice(0, 8);
  }, [countries, query]);

  function go(code: string) {
    router.push(`/watch/${code}`);
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center rounded-full border border-accent/40 bg-background/95 px-5 py-3 shadow-2xl">
        <Search className="mr-3 h-5 w-5 text-accent" aria-hidden />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter your country or region..."
          className="w-full bg-transparent text-base outline-none placeholder:text-muted"
        />
      </div>
      <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-card border border-border bg-background shadow-2xl">
        {matches.map((country) => (
          <button
            key={country.countryCode}
            type="button"
            onClick={() => go(country.countryCode)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-surface"
          >
            <span className="text-xl">{country.flag}</span>
            <span className="font-medium">{country.country}</span>
            <span className="ml-auto text-xs uppercase text-muted">{country.countryCode}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

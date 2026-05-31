"use client";

import { useMemo, useState } from "react";

import { BroadcasterCard } from "@/components/BroadcasterCard";
import { CountryFlag } from "@/components/CountryFlag";
import type { CountryBroadcast } from "@/lib/types";

function CountrySelect({
  id,
  label,
  value,
  countries,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  countries: CountryBroadcast[];
  onChange: (code: string) => void;
}) {
  const selected = countries.find((c) => c.countryCode === value);

  return (
    <div>
      <label className="block text-sm font-bold text-muted" htmlFor={id}>
        {label}
      </label>
      <div className="relative mt-2">
        {selected ? (
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2">
            <CountryFlag
              countryCode={selected.countryCode}
              emojiFallback={selected.flag}
              preferEmoji={selected.countryCode === "QA"}
              className="h-4 w-6"
            />
          </span>
        ) : null}
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-card border border-border bg-background py-3 pl-11 pr-10 text-sm font-medium outline-none focus:border-accent"
        >
          {countries.map((country) => (
            <option key={country.countryCode} value={country.countryCode}>
              {country.flag} {country.country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

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
        <CountrySelect
          id="from"
          label="I'm from"
          value={from}
          countries={countries}
          onChange={setFrom}
        />
        <div className="mt-5">
          <CountrySelect
            id="to"
            label="Currently in"
            value={to}
            countries={countries}
            onChange={setTo}
          />
        </div>
        <p className="mt-5 text-sm leading-6 text-muted">
          VPN laws and streaming rights differ by country. This tool is a
          directory, not legal advice; follow local law and broadcaster terms.
        </p>
      </div>
      <div>
        <h2 className="flex flex-wrap items-center gap-3 text-3xl font-black">
          <CountryFlag
            countryCode={destination.countryCode}
            emojiFallback={destination.flag}
            preferEmoji={destination.countryCode === "QA"}
            className="h-6 w-9 shrink-0"
          />
          <span>Watching in {destination.country}</span>
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

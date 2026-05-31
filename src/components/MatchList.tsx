import { CalendarPlus } from "lucide-react";

import { matchToIcs } from "@/lib/calendar";
import type { WorldCupMatch } from "@/lib/types";

function localTime(iso: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function MatchList({ matches }: { matches: WorldCupMatch[] }) {
  return (
    <div className="space-y-3">
      {matches.map((match) => {
        const ics = `data:text/calendar;charset=utf-8,${encodeURIComponent(matchToIcs(match))}`;
        return (
          <article key={match.matchNumber} className="rounded-card border border-border bg-surface p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  Match {match.matchNumber} · {match.phase}{match.group ? ` · Group ${match.group}` : ""}
                </p>
                <h3 className="mt-2 text-lg font-semibold">
                  {match.homeFlag} {match.homeTeam} vs {match.awayFlag} {match.awayTeam}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {localTime(match.kickoffUtc)} · {match.venue}, {match.city}
                </p>
              </div>
              <a
                href={ics}
                download={`fwc2026-match-${match.matchNumber}.ics`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-accent px-4 py-2 text-sm font-bold text-accent"
              >
                <CalendarPlus className="h-4 w-4" aria-hidden />
                Add to Calendar
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}

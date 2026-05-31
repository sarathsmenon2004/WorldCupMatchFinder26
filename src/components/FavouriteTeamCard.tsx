"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { TeamOption } from "@/data/groups";
import { getFavouriteTeam } from "@/lib/localStorage";
import type { WorldCupMatch } from "@/lib/types";

type Props = {
  matches: WorldCupMatch[];
};

function findNextMatch(matches: WorldCupMatch[], teamName: string) {
  const now = Date.now();
  return matches.find(
    (m) =>
      (m.homeTeam === teamName || m.awayTeam === teamName) &&
      new Date(m.kickoffUtc).getTime() > now,
  );
}

export function FavouriteTeamCard({ matches }: Props) {
  const [team, setTeam] = useState<TeamOption | null>(null);

  useEffect(() => {
    setTeam(getFavouriteTeam());
    function sync() {
      setTeam(getFavouriteTeam());
    }
    window.addEventListener("storage", sync);
    window.addEventListener("wwc2026:favouriteTeam", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("wwc2026:favouriteTeam", sync);
    };
  }, []);

  const nextMatch = useMemo(
    () => (team ? findNextMatch(matches, team.name) : null),
    [matches, team],
  );

  if (!team) return null;

  return (
    <div className="rounded-card border border-accent/30 bg-surface p-5">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Your team</p>
      <h2 className="mt-2 flex items-center gap-3 text-2xl font-black">
        <span className="text-3xl leading-none">{team.flag}</span>
        {team.name}
      </h2>
      {nextMatch ? (
        <div className="mt-4 rounded-card border border-border bg-background/60 p-4">
          <p className="text-xs uppercase tracking-[0.15em] text-muted">Next match</p>
          <p className="mt-2 font-bold">
            {nextMatch.homeFlag} {nextMatch.homeTeam}{" "}
            <span className="text-muted">vs</span>{" "}
            {nextMatch.awayFlag} {nextMatch.awayTeam}
          </p>
          <p className="mt-1 text-sm text-muted">
            {new Date(nextMatch.kickoffUtc).toLocaleString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted">No upcoming matches scheduled.</p>
      )}
      <Link
        href="/schedule"
        className="mt-4 inline-flex text-sm font-bold text-accent hover:underline"
      >
        View full schedule →
      </Link>
    </div>
  );
}

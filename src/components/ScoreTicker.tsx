"use client";

import { useEffect, useState } from "react";

import type { TickerScore } from "@/app/api/scores/route";

type ScoresResponse = {
  scores: TickerScore[];
  source: "live" | "schedule";
};

function formatScore(score: TickerScore) {
  if (score.status === "SCHEDULED") {
    const time = new Date(score.kickoffUtc).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${score.homeTeam} vs ${score.awayTeam} · ${time}`;
  }

  const home = score.homeScore ?? 0;
  const away = score.awayScore ?? 0;
  const suffix =
    score.status === "LIVE"
      ? score.minute ?? "LIVE"
      : "FT";
  return `${score.homeTeam} ${home}–${away} ${score.awayTeam} · ${suffix}`;
}

function ScoreItem({ score }: { score: TickerScore }) {
  const isLive = score.status === "LIVE";
  return (
    <span className="inline-flex shrink-0 items-center gap-2 px-6 text-xs font-bold uppercase tracking-wide md:text-sm">
      {isLive ? (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
      ) : null}
      <span className={isLive ? "text-accent" : "text-muted"}>
        {formatScore(score)}
      </span>
    </span>
  );
}

export function ScoreTicker() {
  const [data, setData] = useState<ScoresResponse | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch("/api/scores");
        if (!response.ok) return;
        const json = (await response.json()) as ScoresResponse;
        if (active) setData(json);
      } catch {
        /* ignore */
      }
    }

    load();
    const interval = window.setInterval(load, 60_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  if (!data?.scores.length) return null;

  const items = [...data.scores, ...data.scores];

  return (
    <div className="border-t border-border/60 bg-surface/50">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
        <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.25em] text-accent">
          {data.source === "live" ? "Live" : "Next"}
        </span>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="score-ticker-track flex w-max items-center">
            {items.map((score, index) => (
              <ScoreItem key={`${score.id}-${index}`} score={score} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

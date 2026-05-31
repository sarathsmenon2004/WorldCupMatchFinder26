"use client";

import { useMemo, useState } from "react";

import { AdSlot } from "@/components/AdSlot";
import { MatchList } from "@/components/MatchList";
import { schedulePhases } from "@/data/schedule";
import type { MatchPhase, WorldCupMatch } from "@/lib/types";

export function ScheduleClient({ matches }: { matches: WorldCupMatch[] }) {
  const [phase, setPhase] = useState<MatchPhase | "All">("All");

  const filtered = useMemo(
    () => (phase === "All" ? matches : matches.filter((match) => match.phase === phase)),
    [matches, phase],
  );

  const withAds: Array<{ type: "ad"; key: string } | { type: "matches"; items: WorldCupMatch[]; key: string }> = [];
  for (let index = 0; index < filtered.length; index += 10) {
    withAds.push({ type: "matches", items: filtered.slice(index, index + 10), key: `m-${index}` });
    if (index + 10 < filtered.length) withAds.push({ type: "ad", key: `a-${index}` });
  }

  return (
    <section>
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {(["All", ...schedulePhases] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setPhase(item)}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-bold ${
              phase === item ? "border-accent bg-accent text-black" : "border-border text-muted"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="space-y-5">
        {withAds.map((block) =>
          block.type === "ad" ? <AdSlot key={block.key} size="banner" /> : <MatchList key={block.key} matches={block.items} />,
        )}
      </div>
    </section>
  );
}

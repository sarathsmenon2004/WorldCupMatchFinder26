"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { allTeams, type TeamOption } from "@/data/groups";
import { getFavouriteTeam, setFavouriteTeam } from "@/lib/localStorage";

type Props = {
  onChange?: (team: TeamOption) => void;
};

export function FavouriteTeamPicker({ onChange }: Props) {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const saved = getFavouriteTeam();
    if (saved) setSelected(saved.name);
  }, []);

  function handleChange(name: string) {
    const team = allTeams.find((t) => t.name === name);
    if (!team) return;
    setSelected(name);
    setFavouriteTeam(team);
    onChange?.(team);
  }

  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <label htmlFor="favourite-team" className="block text-sm font-bold uppercase tracking-[0.15em] text-accent">
        Favourite team
      </label>
      <p className="mt-1 text-sm text-muted">Pick your team for quick access and match alerts.</p>
      <div className="relative mt-4">
        <select
          id="favourite-team"
          value={selected}
          onChange={(e) => handleChange(e.target.value)}
          className="w-full appearance-none rounded-card border border-border bg-background py-3 pl-4 pr-10 text-sm font-medium outline-none focus:border-accent"
        >
          <option value="">Select a team…</option>
          {allTeams.map((team) => (
            <option key={team.name} value={team.name}>
              {team.flag} {team.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
      </div>
    </div>
  );
}

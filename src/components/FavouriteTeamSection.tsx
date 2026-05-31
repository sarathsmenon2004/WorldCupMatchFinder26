"use client";

import { useRouter } from "next/navigation";

import { FavouriteTeamCard } from "@/components/FavouriteTeamCard";
import { FavouriteTeamPicker } from "@/components/FavouriteTeamPicker";
import type { WorldCupMatch } from "@/lib/types";

export function FavouriteTeamSection({ matches }: { matches: WorldCupMatch[] }) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <FavouriteTeamPicker onChange={() => router.refresh()} />
      <FavouriteTeamCard matches={matches} />
    </div>
  );
}

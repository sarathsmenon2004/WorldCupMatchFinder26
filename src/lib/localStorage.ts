import type { TeamOption } from "@/data/groups";

const PREFIX = "wwc2026:";

export type FavouriteTeam = TeamOption;

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(`${PREFIX}${key}`);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
}

export function getFavouriteTeam(): FavouriteTeam | null {
  return readJson<FavouriteTeam>("favouriteTeam");
}

export function setFavouriteTeam(team: FavouriteTeam) {
  writeJson("favouriteTeam", team);
  window.dispatchEvent(new CustomEvent("wwc2026:favouriteTeam"));
}

export function getMatchPushEnabled(): boolean {
  return readJson<boolean>("matchPushEnabled") ?? false;
}

export function setMatchPushEnabled(enabled: boolean) {
  writeJson("matchPushEnabled", enabled);
}

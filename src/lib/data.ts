import { broadcasterData, getCountry } from "@/data/broadcasters";
import { scheduleData } from "@/data/schedule";
import { createPublicSupabaseClient } from "@/lib/supabase";
import type { Broadcaster, CountryBroadcast, WorldCupMatch } from "@/lib/types";

type BroadcasterRow = {
  name: string;
  type: Broadcaster["type"];
  is_free: boolean;
  url: string;
  languages: string[];
  notes: string;
  affiliate_key: Broadcaster["affiliateKey"] | null;
};

type CountryRow = {
  country_code: string;
  country: string;
  flag: string;
  has_confirmed: boolean;
  no_confirmed_note: string | null;
  status: CountryBroadcast["status"];
  source_url: string;
  last_verified_at: string;
  broadcasters: BroadcasterRow[];
};

type MatchRow = {
  match_number: number;
  phase: WorldCupMatch["phase"];
  group_label: string | null;
  home_team: string;
  away_team: string;
  home_flag: string;
  away_flag: string;
  venue: string;
  city: string;
  kickoff_utc: string;
  source_url: string;
};

function mapBroadcaster(row: BroadcasterRow): Broadcaster {
  return {
    name: row.name,
    type: row.type,
    isFree: row.is_free,
    url: row.url,
    languages: row.languages,
    notes: row.notes,
    affiliateKey: row.affiliate_key ?? undefined,
  };
}

function mapCountry(row: CountryRow): CountryBroadcast {
  return {
    countryCode: row.country_code,
    country: row.country,
    flag: row.flag,
    hasConfirmed: row.has_confirmed,
    noConfirmedNote: row.no_confirmed_note,
    status: row.status,
    sourceUrl: row.source_url,
    lastVerifiedAt: row.last_verified_at,
    broadcasters: row.broadcasters.map(mapBroadcaster),
  };
}

function mapMatch(row: MatchRow): WorldCupMatch {
  return {
    matchNumber: row.match_number,
    phase: row.phase,
    group: row.group_label,
    homeTeam: row.home_team,
    awayTeam: row.away_team,
    homeFlag: row.home_flag,
    awayFlag: row.away_flag,
    venue: row.venue,
    city: row.city,
    kickoffUtc: row.kickoff_utc,
    sourceUrl: row.source_url,
  };
}

export async function listCountries() {
  const supabase = createPublicSupabaseClient();
  if (!supabase) return broadcasterData;

  const { data, error } = await supabase
    .from("countries")
    .select("*, broadcasters(*)")
    .order("country", { ascending: true });

  return error || !data ? broadcasterData : (data as CountryRow[]).map(mapCountry);
}

export async function getCountryBroadcast(countryCode: string) {
  const supabase = createPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("countries")
      .select("*, broadcasters(*)")
      .eq("country_code", countryCode)
      .maybeSingle();

    if (!error && data) return mapCountry(data as CountryRow);
  }

  const local = getCountry(countryCode);
  return local ?? null;
}

export async function listMatches() {
  const supabase = createPublicSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .order("match_number", { ascending: true });

    if (!error && data) return (data as MatchRow[]).map(mapMatch);
  }

  return scheduleData;
}

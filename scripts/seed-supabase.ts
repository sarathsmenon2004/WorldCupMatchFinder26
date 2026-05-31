import { createClient } from "@supabase/supabase-js";

import { broadcasterData } from "../src/data/broadcasters";
import { groups } from "../src/data/groups";
import { scheduleData } from "../src/data/schedule";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function main() {
  if (!url || !serviceRoleKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

const countries = broadcasterData.map((country) => ({
  country_code: country.countryCode,
  country: country.country,
  flag: country.flag,
  has_confirmed: country.hasConfirmed,
  no_confirmed_note: country.noConfirmedNote,
  status: country.status,
  source_url: country.sourceUrl,
  last_verified_at: country.lastVerifiedAt,
}));

const broadcasters = broadcasterData.flatMap((country) =>
  country.broadcasters.map((broadcaster) => ({
    country_code: country.countryCode,
    name: broadcaster.name,
    type: broadcaster.type,
    is_free: broadcaster.isFree,
    url: broadcaster.url,
    languages: broadcaster.languages,
    notes: broadcaster.notes,
    affiliate_key: broadcaster.affiliateKey ?? null,
  })),
);

const matches = scheduleData.map((match) => ({
  match_number: match.matchNumber,
  phase: match.phase,
  group_label: match.group,
  home_team: match.homeTeam,
  away_team: match.awayTeam,
  home_flag: match.homeFlag,
  away_flag: match.awayFlag,
  venue: match.venue,
  city: match.city,
  kickoff_utc: match.kickoffUtc,
  source_url: match.sourceUrl,
}));

const groupRows = groups.flatMap((group) =>
  group.teams.map((team, index) => ({
    group_label: group.group,
    slot: index + 1,
    team_name: team.name,
    flag: team.flag,
  })),
);

  type UntypedTable = {
    upsert: (rows: unknown[]) => Promise<{ error: { message: string } | null }>;
  };

  for (const [table, rows] of [
    ["countries", countries],
    ["broadcasters", broadcasters],
    ["matches", matches],
    ["groups", groupRows],
  ] as const) {
    const tableClient = supabase.from(table) as unknown as UntypedTable;
    const { error } = await tableClient.upsert(rows);
    if (error) throw new Error(`Failed to seed ${table}: ${error.message}`);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});

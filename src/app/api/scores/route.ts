import { listMatches } from "@/lib/data";
import type { WorldCupMatch } from "@/lib/types";

export const revalidate = 60;

export type TickerScore = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "LIVE" | "FINISHED" | "SCHEDULED";
  minute: string | null;
  kickoffUtc: string;
};

type FootballDataMatch = {
  id: number;
  status: string;
  minute: number | null;
  utcDate: string;
  competition?: { code?: string };
  homeTeam: { name: string; shortName: string };
  awayTeam: { name: string; shortName: string };
  score: {
    fullTime: { home: number | null; away: number | null };
  };
};

function mapApiMatch(match: FootballDataMatch): TickerScore {
  const live = match.status === "IN_PLAY" || match.status === "PAUSED";
  const finished = match.status === "FINISHED";
  return {
    id: String(match.id),
    homeTeam: match.homeTeam.shortName || match.homeTeam.name,
    awayTeam: match.awayTeam.shortName || match.awayTeam.name,
    homeScore: match.score.fullTime.home,
    awayScore: match.score.fullTime.away,
    status: live ? "LIVE" : finished ? "FINISHED" : "SCHEDULED",
    minute: live && match.minute != null ? `${match.minute}'` : null,
    kickoffUtc: match.utcDate,
  };
}

function mapLocalMatch(match: WorldCupMatch): TickerScore {
  return {
    id: String(match.matchNumber),
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    homeScore: null,
    awayScore: null,
    status: "SCHEDULED",
    minute: null,
    kickoffUtc: match.kickoffUtc,
  };
}

async function fetchLiveScores(): Promise<TickerScore[] | null> {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch(
      "https://api.football-data.org/v4/matches?competitions=WC&status=LIVE,IN_PLAY,PAUSED,FINISHED",
      {
        headers: { "X-Auth-Token": apiKey },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as { matches?: FootballDataMatch[] };
    const matches = (data.matches ?? []).filter(
      (m) => !m.competition?.code || m.competition.code === "WC",
    );
    if (matches.length === 0) return null;

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const recent = matches
      .filter((m) => {
        const kickoff = new Date(m.utcDate).getTime();
        return m.status === "IN_PLAY" || m.status === "PAUSED" || now - kickoff < oneDay;
      })
      .slice(0, 8)
      .map(mapApiMatch);

    return recent.length > 0 ? recent : null;
  } catch {
    return null;
  }
}

export async function GET() {
  const live = await fetchLiveScores();
  if (live) {
    return Response.json({ scores: live, source: "live" });
  }

  const matches = await listMatches();
  const now = Date.now();
  const upcoming = matches.filter((m) => new Date(m.kickoffUtc).getTime() > now);
  const next = upcoming[0] ?? matches[matches.length - 1];
  const scores = next ? [mapLocalMatch(next)] : [];

  return Response.json({ scores, source: "schedule" });
}

import type { WorldCupMatch } from "@/lib/types";

function escapeIcs(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

function stamp(value: string) {
  return value.replace(/[-:]/g, "").replace(".000", "");
}

export function matchToIcs(match: WorldCupMatch) {
  const start = new Date(match.kickoffUtc);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WatchWorldCup2026//Match Calendar//EN",
    "BEGIN:VEVENT",
    `UID:fwc2026-match-${match.matchNumber}@watchworldcup2026.com`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(start.toISOString())}`,
    `DTEND:${stamp(end.toISOString())}`,
    `SUMMARY:${escapeIcs(`${match.homeTeam} vs ${match.awayTeam}`)}`,
    `LOCATION:${escapeIcs(`${match.venue}, ${match.city}`)}`,
    `DESCRIPTION:${escapeIcs(`FIFA World Cup 2026 Match ${match.matchNumber}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

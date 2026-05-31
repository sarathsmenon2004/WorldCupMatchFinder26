import type { Metadata } from "next";

import { MobileNav } from "@/components/MobileNav";
import { Navbar } from "@/components/Navbar";
import { ScheduleClient } from "@/app/schedule/ScheduleClient";
import { listMatches } from "@/lib/data";

export const metadata: Metadata = {
  title: "World Cup 2026 Schedule",
  description: "All 104 FIFA World Cup 2026 matches with local time display and calendar downloads.",
};

export default async function SchedulePage() {
  const matches = await listMatches();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EventSeries",
    name: "FIFA World Cup 2026",
    startDate: matches[0]?.kickoffUtc,
    endDate: matches[matches.length - 1]?.kickoffUtc,
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 pb-24 md:pb-10">
        <h1 className="text-4xl font-black md:text-6xl">World Cup 2026 Schedule</h1>
        <p className="mt-4 max-w-3xl text-muted">
          Browse all 104 matches. Kickoff times display in your browser&apos;s
          local timezone, and each row can be saved as an `.ics` calendar event.
        </p>
        <div className="mt-8">
          <ScheduleClient matches={matches} />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <MobileNav />
    </>
  );
}

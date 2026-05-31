import Link from "next/link";

import { MobileNav } from "@/components/MobileNav";
import { Navbar } from "@/components/Navbar";
import { groups } from "@/data/groups";

export default function GroupsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 pb-24 md:pb-10">
        <h1 className="text-4xl font-black md:text-6xl">Groups</h1>
        <p className="mt-4 text-muted">
          The 12-group layout is ready for draw updates. Team links open your
          current-country watch page with a team filter placeholder.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {groups.map((group) => (
            <section key={group.group} className="rounded-card border border-border bg-surface p-5">
              <h2 className="text-2xl font-bold text-accent">Group {group.group}</h2>
              <div className="mt-4 space-y-2">
                {group.teams.map((team) => (
                  <Link
                    key={team.name}
                    href={`/watch/US?team=${encodeURIComponent(team.name)}`}
                    className="flex items-center gap-3 rounded-card border border-border bg-background p-3 hover:border-accent"
                  >
                    <span>{team.flag}</span>
                    <span>{team.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <MobileNav />
    </>
  );
}

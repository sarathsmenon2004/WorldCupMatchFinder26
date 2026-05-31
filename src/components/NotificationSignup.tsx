"use client";

import Link from "next/link";
import { useState } from "react";

import { allTeams } from "@/data/groups";
import { setFavouriteTeam, setMatchPushEnabled } from "@/lib/localStorage";

export function NotificationSignup() {
  const [email, setEmail] = useState("");
  const [teamName, setTeamName] = useState("");
  const [notifyBeforeMatch, setNotifyBeforeMatch] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/notifications/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, teamName, notifyBeforeMatch }),
      });

      const data = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }

      const team = allTeams.find((t) => t.name === teamName);
      if (team) setFavouriteTeam(team);
      if (notifyBeforeMatch) {
        setMatchPushEnabled(true);
        if ("Notification" in window && Notification.permission === "default") {
          await Notification.requestPermission();
        }
      }

      setStatus("success");
      setMessage("You're signed up! We'll notify you before your team's matches.");
      setEmail("");
      setTeamName("");
      setNotifyBeforeMatch(false);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <h2 className="text-xl font-bold">Match alerts</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        Get email updates and optional browser notifications 15 minutes before kickoff.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label htmlFor="notify-email" className="block text-sm font-bold text-muted">
            Email
          </label>
          <input
            id="notify-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-card border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="notify-team" className="block text-sm font-bold text-muted">
            Team preference
          </label>
          <select
            id="notify-team"
            required
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="mt-2 w-full rounded-card border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
          >
            <option value="">Select a team…</option>
            {allTeams.map((team) => (
              <option key={team.name} value={team.name}>
                {team.flag} {team.name}
              </option>
            ))}
          </select>
        </div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={notifyBeforeMatch}
            onChange={(e) => setNotifyBeforeMatch(e.target.checked)}
            className="mt-1 h-4 w-4 accent-accent"
          />
          <span className="text-sm leading-6 text-muted">
            Notify me 15 minutes before my team&apos;s matches (browser push when enabled)
          </span>
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-full bg-accent px-4 py-3 text-sm font-bold text-black disabled:opacity-60"
        >
          {status === "loading" ? "Signing up…" : "Sign up for alerts"}
        </button>
        {message ? (
          <p className={`text-sm ${status === "error" ? "text-red-400" : "text-accent"}`}>
            {message}
          </p>
        ) : null}
      </form>
      <p className="mt-4 text-xs text-muted">
        By signing up you agree to our{" "}
        <Link href="/privacy" className="text-accent hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

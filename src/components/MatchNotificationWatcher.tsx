"use client";

import { useEffect, useRef } from "react";

import { getFavouriteTeam, getMatchPushEnabled } from "@/lib/localStorage";
import type { WorldCupMatch } from "@/lib/types";

const NOTIFY_MINUTES = 15;
const notifiedKey = (matchNumber: number) => `wwc2026:notified:${matchNumber}`;

function wasNotified(matchNumber: number) {
  return sessionStorage.getItem(notifiedKey(matchNumber)) === "1";
}

function markNotified(matchNumber: number) {
  sessionStorage.setItem(notifiedKey(matchNumber), "1");
}

async function showMatchNotification(match: WorldCupMatch, teamName: string) {
  const title = `${teamName} match starting soon`;
  const body = `${match.homeFlag} ${match.homeTeam} vs ${match.awayFlag} ${match.awayTeam} in ${NOTIFY_MINUTES} minutes`;

  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: "SHOW_MATCH_NOTIFICATION",
      payload: { title, body, url: "/schedule" },
    });
    return;
  }

  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body, icon: "/icons/icon-192.svg" });
  }
}

export function MatchNotificationWatcher({ matches }: { matches: WorldCupMatch[] }) {
  const matchesRef = useRef(matches);
  matchesRef.current = matches;

  useEffect(() => {
    async function check() {
      if (!getMatchPushEnabled()) return;
      if (!("Notification" in window) || Notification.permission !== "granted") return;

      const team = getFavouriteTeam();
      if (!team) return;

      const now = Date.now();
      const windowMs = NOTIFY_MINUTES * 60 * 1000;

      for (const match of matchesRef.current) {
        if (match.homeTeam !== team.name && match.awayTeam !== team.name) continue;
        if (wasNotified(match.matchNumber)) continue;

        const kickoff = new Date(match.kickoffUtc).getTime();
        const diff = kickoff - now;
        if (diff > 0 && diff <= windowMs) {
          markNotified(match.matchNumber);
          await showMatchNotification(match, team.name);
        }
      }
    }

    check();
    const interval = window.setInterval(check, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return null;
}

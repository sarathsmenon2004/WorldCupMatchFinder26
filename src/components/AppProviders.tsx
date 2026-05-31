"use client";

import { useEffect, useState } from "react";

import { MatchNotificationWatcher } from "@/components/MatchNotificationWatcher";
import { PushNotificationPrompt } from "@/components/PushNotificationPrompt";
import type { WorldCupMatch } from "@/lib/types";

export function AppProviders() {
  const [matches, setMatches] = useState<WorldCupMatch[]>([]);

  useEffect(() => {
    fetch("/api/schedule")
      .then((r) => r.json())
      .then((data: WorldCupMatch[] | { matches?: WorldCupMatch[] }) => {
        setMatches(Array.isArray(data) ? data : (data.matches ?? []));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <MatchNotificationWatcher matches={matches} />
      <PushNotificationPrompt />
    </>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";

const target = new Date("2026-06-11T17:00:00.000Z").getTime();

export function CountdownTimer() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const parts = useMemo(() => {
    const remaining = Math.max(0, target - now);
    const days = Math.floor(remaining / 86_400_000);
    const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
    const mins = Math.floor((remaining % 3_600_000) / 60_000);
    const secs = Math.floor((remaining % 60_000) / 1000);
    return { days, hours, mins, secs };
  }, [now]);

  return (
    <div className="grid grid-cols-4 gap-3">
      {Object.entries(parts).map(([label, value]) => (
        <div key={label} className="rounded-card border border-accent/30 bg-black/30 p-3 text-center">
          <div className="text-2xl font-black text-accent md:text-4xl">{value}</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">{label}</div>
        </div>
      ))}
    </div>
  );
}

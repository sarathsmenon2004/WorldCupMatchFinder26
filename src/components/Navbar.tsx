"use client";

import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ScoreTicker } from "@/components/ScoreTicker";

export function Navbar() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="shrink-0 text-lg font-black tracking-tight text-accent">
          WatchWorldCup2026
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-muted lg:flex">
          <Link href="/schedule" className="hover:text-accent">Schedule</Link>
          <Link href="/groups" className="hover:text-accent">Groups</Link>
          <Link href="/traveler" className="hover:text-accent">Traveler</Link>
          <Link href="/vpn" className="hover:text-accent">VPN</Link>
        </nav>
        <button
          type="button"
          onClick={toggle}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-accent"
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
      <ScoreTicker />
    </header>
  );
}

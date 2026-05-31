import { ExternalLink, ShieldCheck, Tv } from "lucide-react";

import { safeOutboundUrl } from "@/config/affiliates";
import type { Broadcaster } from "@/lib/types";

export function BroadcasterCard({ broadcaster }: { broadcaster: Broadcaster }) {
  return (
    <article className="rounded-card border border-border bg-surface p-5 shadow-sm transition hover:border-accent/70">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{broadcaster.name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{broadcaster.notes}</p>
        </div>
        <Tv className="h-5 w-5 shrink-0 text-accent" aria-hidden />
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide">
        <span className="rounded-full bg-accent px-3 py-1 text-black">
          {broadcaster.isFree ? "Free" : "Paid"}
        </span>
        <span className="rounded-full border border-border px-3 py-1">
          {broadcaster.type}
        </span>
        {broadcaster.languages.map((language) => (
          <span key={language} className="rounded-full border border-border px-3 py-1">
            {language}
          </span>
        ))}
      </div>
      <a
        href={safeOutboundUrl(broadcaster.url)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-black transition hover:scale-[1.02]"
      >
        <ShieldCheck className="h-4 w-4" aria-hidden />
        Watch Now
        <ExternalLink className="h-4 w-4" aria-hidden />
      </a>
    </article>
  );
}

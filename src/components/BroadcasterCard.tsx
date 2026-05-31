import { ExternalLink, ShieldCheck, Tv } from "lucide-react";

import { safeOutboundUrl } from "@/config/affiliates";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Broadcaster } from "@/lib/types";

export function BroadcasterCard({ broadcaster }: { broadcaster: Broadcaster }) {
  return (
    <Card className="transition hover:border-accent/70">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">{broadcaster.name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{broadcaster.notes}</p>
        </div>
        <Tv className="h-5 w-5 shrink-0 text-accent" aria-hidden />
      </div>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide">
        <Badge className="border-accent bg-accent text-black">
          {broadcaster.isFree ? "Free" : "Paid"}
        </Badge>
        <Badge>{broadcaster.type}</Badge>
        {broadcaster.languages.map((language) => (
          <Badge key={language}>
            {language}
          </Badge>
        ))}
      </div>
      <Button asChild className="mt-6">
        <a
          href={safeOutboundUrl(broadcaster.url)}
          target="_blank"
          rel="noopener noreferrer sponsored"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden />
          Watch Now
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </Button>
    </Card>
  );
}

"use client";

import { Check, Copy, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";

type Props = {
  title: string;
  url: string;
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const whatsappHref = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-muted">
        <Share2 className="h-4 w-4" aria-hidden />
        Share
      </span>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold text-muted transition hover:border-accent hover:text-accent"
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        WhatsApp
      </a>
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold text-muted transition hover:border-accent hover:text-accent"
      >
        <XIcon className="h-4 w-4" />
        X / Twitter
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold text-muted transition hover:border-accent hover:text-accent"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-accent" aria-hidden />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" aria-hidden />
            Copy link
          </>
        )}
      </button>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { MobileNav } from "@/components/MobileNav";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for WatchWorldCup2026 — data collection, cookies, and third-party services.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-12 pb-24 md:pb-12">
        <h1 className="text-4xl font-black md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-muted">Last updated: May 31, 2026</p>

        <div className="prose prose-invert mt-10 space-y-8 text-muted [&_h2]:text-foreground [&_h2]:font-bold">
          <section>
            <h2 className="text-xl">Overview</h2>
            <p className="mt-3 leading-7">
              WatchWorldCup2026 (&quot;we&quot;, &quot;our&quot;, &quot;the site&quot;) helps users find
              FIFA World Cup 2026 broadcasters by country. This policy explains what data we
              collect and how we use it.
            </p>
          </section>

          <section>
            <h2 className="text-xl">Information we collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
              <li>
                <strong className="text-foreground">Approximate location</strong> — via IP
                geolocation (ipapi.co) to suggest your country. We do not store your IP on our
                servers.
              </li>
              <li>
                <strong className="text-foreground">Email signups</strong> — if you subscribe to
                match alerts, we store your email, team preference, and notification settings in
                Supabase.
              </li>
              <li>
                <strong className="text-foreground">Local preferences</strong> — theme, favourite
                team, and notification settings stored in your browser (localStorage).
              </li>
              <li>
                <strong className="text-foreground">Analytics</strong> — Google Analytics may
                collect usage data if configured.
              </li>
              <li>
                <strong className="text-foreground">Advertising</strong> — Google AdSense may use
                cookies to serve personalized ads if enabled.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl">Third-party services</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
              <li>Google AdSense and Google Analytics</li>
              <li>ipapi.co (IP geolocation)</li>
              <li>Supabase (email notification storage)</li>
              <li>football-data.org (live scores, server-side only)</li>
              <li>Affiliate partners (NordVPN, ExpressVPN, broadcasters)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl">Cookies</h2>
            <p className="mt-3 leading-7">
              We use essential cookies for site functionality. Third-party ad and analytics
              partners may set their own cookies. You can manage cookies through your browser
              settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl">Your rights</h2>
            <p className="mt-3 leading-7">
              You may request access to or deletion of email signup data by contacting us. You
              can clear local preferences by clearing your browser storage.
            </p>
          </section>

          <section>
            <h2 className="text-xl">Contact</h2>
            <p className="mt-3 leading-7">
              For privacy inquiries, contact{" "}
              <a href="mailto:privacy@watchworldcup2026.com" className="text-accent hover:underline">
                privacy@watchworldcup2026.com
              </a>
              .
            </p>
          </section>

          <p className="text-sm">
            <Link href="/" className="text-accent hover:underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <MobileNav />
    </>
  );
}

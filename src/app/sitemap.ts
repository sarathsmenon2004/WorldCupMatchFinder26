import type { MetadataRoute } from "next";

import { broadcasterData } from "@/data/broadcasters";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://watchworldcup2026.com";
  return [
    "",
    "/schedule",
    "/groups",
    "/traveler",
    "/vpn",
    "/about",
    "/privacy",
    ...broadcasterData.map((country) => `/watch/${country.countryCode}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: path === "" ? 1 : 0.8,
  }));
}

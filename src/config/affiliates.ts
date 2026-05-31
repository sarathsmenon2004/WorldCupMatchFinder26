export const affiliateLinks = {
  nordvpn: process.env.AFFILIATE_NORDVPN_URL ?? "https://example.com/nordvpn",
  expressvpn:
    process.env.AFFILIATE_EXPRESSVPN_URL ?? "https://example.com/expressvpn",
  dazn: process.env.AFFILIATE_DAZN_URL ?? "https://example.com/dazn",
  peacock: process.env.AFFILIATE_PEACOCK_URL ?? "https://example.com/peacock",
  fubo: process.env.AFFILIATE_FUBO_URL ?? "https://example.com/fubo",
} as const;

export function isAllowedOutboundUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function safeOutboundUrl(url: string) {
  return isAllowedOutboundUrl(url) ? url : "https://www.fifa.com/";
}

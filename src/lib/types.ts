export type BroadcasterType = "tv" | "streaming" | "both";
export type VerificationStatus = "confirmed" | "unconfirmed" | "needs_review";
export type MatchPhase =
  | "Group Stage"
  | "Round of 32"
  | "Round of 16"
  | "Quarter-finals"
  | "Semi-finals"
  | "Third Place"
  | "Final";

export type Broadcaster = {
  name: string;
  type: BroadcasterType;
  isFree: boolean;
  url: string;
  languages: string[];
  notes: string;
  affiliateKey?: "nordvpn" | "expressvpn" | "dazn" | "peacock" | "fubo";
};

export type CountryBroadcast = {
  countryCode: string;
  country: string;
  flag: string;
  hasConfirmed: boolean;
  noConfirmedNote: string | null;
  status: VerificationStatus;
  sourceUrl: string;
  lastVerifiedAt: string;
  broadcasters: Broadcaster[];
};

export type WorldCupMatch = {
  matchNumber: number;
  phase: MatchPhase;
  group: string | null;
  homeTeam: string;
  awayTeam: string;
  homeFlag: string;
  awayFlag: string;
  venue: string;
  city: string;
  kickoffUtc: string;
  sourceUrl: string;
};

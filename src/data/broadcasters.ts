import { affiliateLinks } from "@/config/affiliates";
import type { Broadcaster, CountryBroadcast } from "@/lib/types";

const sourceUrl =
  "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026";
const lastVerifiedAt = "2026-05-31";

const urls: Record<string, string> = {
  fifa: "https://www.fifa.com/",
  fox: "https://www.foxsports.com/",
  telemundo: "https://www.telemundo.com/",
  bbc: "https://www.bbc.co.uk/sport/football",
  itv: "https://www.itv.com/football",
  sbs: "https://www.sbs.com.au/sport",
  bell: "https://www.tsn.ca/",
  tvazteca: "https://www.tvazteca.com/aztecadeportes/",
  dazn: affiliateLinks.dazn,
  peacock: affiliateLinks.peacock,
  fubo: affiliateLinks.fubo,
  nordvpn: affiliateLinks.nordvpn,
};

function broadcaster(
  name: string,
  type: Broadcaster["type"],
  isFree: boolean,
  url = urls.fifa,
  languages: string[] = ["Local"],
  notes = "Rights/status should be rechecked before publication.",
  affiliateKey?: Broadcaster["affiliateKey"],
): Broadcaster {
  return { name, type, isFree, url, languages, notes, affiliateKey };
}

function country(
  countryCode: string,
  countryName: string,
  flag: string,
  broadcasters: Broadcaster[],
  status: CountryBroadcast["status"] = "needs_review",
  noConfirmedNote: string | null = null,
): CountryBroadcast {
  return {
    countryCode,
    country: countryName,
    flag,
    hasConfirmed: broadcasters.length > 0 && !noConfirmedNote,
    noConfirmedNote,
    status,
    sourceUrl,
    lastVerifiedAt,
    broadcasters,
  };
}

const noConfirmed =
  "No verified live broadcaster is listed yet. Check FIFA's official channels and local rights announcements before match day.";

export const broadcasterData: CountryBroadcast[] = [
  country("US", "United States", "🇺🇸", [
    broadcaster("FOX Sports", "both", false, urls.fox, ["English"], "US English-language coverage.", "fubo"),
    broadcaster("Telemundo", "tv", false, urls.telemundo, ["Spanish"], "US Spanish-language coverage."),
    broadcaster("Peacock", "streaming", false, urls.peacock, ["Spanish"], "Spanish-language streaming.", "peacock"),
  ]),
  country("GB", "United Kingdom", "🇬🇧", [
    broadcaster("BBC", "both", true, urls.bbc, ["English"], "Free-to-air UK coverage."),
    broadcaster("ITV", "both", true, urls.itv, ["English"], "Free-to-air UK coverage."),
  ]),
  country("AU", "Australia", "🇦🇺", [broadcaster("SBS", "both", true, urls.sbs)]),
  country("CA", "Canada", "🇨🇦", [broadcaster("CTV", "tv", true, urls.bell), broadcaster("TSN", "both", false, urls.bell), broadcaster("RDS", "both", false, urls.bell, ["French"])]),
  country("MX", "Mexico", "🇲🇽", [broadcaster("TelevisaUnivision", "both", true), broadcaster("TV Azteca", "tv", true, urls.tvazteca), broadcaster("ViX", "streaming", false)]),
  country("DE", "Germany", "🇩🇪", [broadcaster("ARD", "tv", true), broadcaster("ZDF", "tv", true), broadcaster("Magenta Sport", "streaming", false)]),
  country("FR", "France", "🇫🇷", [broadcaster("M6", "tv", true), broadcaster("beIN Sports", "both", false)]),
  country("BR", "Brazil", "🇧🇷", [broadcaster("Grupo Globo", "both", true), broadcaster("CazeTV", "streaming", true), broadcaster("SBT", "tv", true)]),
  country("AR", "Argentina", "🇦🇷", [broadcaster("Telefe", "tv", true), broadcaster("TyC Sports", "both", false), broadcaster("TV Publica", "tv", true)]),
  country("JP", "Japan", "🇯🇵", [broadcaster("NHK", "tv", true), broadcaster("DAZN", "streaming", false, urls.dazn, ["Japanese"], "Streaming option.", "dazn"), broadcaster("Nippon TV", "tv", true)]),
  country("ES", "Spain", "🇪🇸", [broadcaster("RTVE", "both", true), broadcaster("DAZN", "streaming", false, urls.dazn, ["Spanish"], "Streaming option.", "dazn")]),
  country("IT", "Italy", "🇮🇹", [broadcaster("RAI", "tv", true), broadcaster("DAZN", "streaming", false, urls.dazn, ["Italian"], "Streaming option.", "dazn")]),
  country("NL", "Netherlands", "🇳🇱", [broadcaster("NOS", "both", true)]),
  country("PT", "Portugal", "🇵🇹", [broadcaster("Sport TV", "both", false)]),
  country("KR", "South Korea", "🇰🇷", [broadcaster("KBS", "tv", true), broadcaster("MBC", "tv", true), broadcaster("SBS", "tv", true)]),
  country("CN", "China", "🇨🇳", [broadcaster("CCTV", "tv", true)]),
  country("SG", "Singapore", "🇸🇬", [broadcaster("Mediacorp", "both", true)]),
  country("ID", "Indonesia", "🇮🇩", [broadcaster("TVRI", "tv", true)]),
  country("ZA", "South Africa", "🇿🇦", [broadcaster("SABC", "tv", true)]),
  country("NG", "Nigeria", "🇳🇬", [broadcaster("DStv", "tv", false), broadcaster("SuperSport", "both", false)]),
  country("SA", "Saudi Arabia", "🇸🇦", [broadcaster("beIN Sports", "both", false)]),
  country("AE", "United Arab Emirates", "🇦🇪", [broadcaster("beIN Sports", "both", false)]),
  country("TR", "Turkey", "🇹🇷", [broadcaster("TRT", "both", true)]),
  country("PL", "Poland", "🇵🇱", [broadcaster("TVP", "both", true)]),
  country("IN", "India", "🇮🇳", [], "unconfirmed", noConfirmed),
  country("BD", "Bangladesh", "🇧🇩", [], "unconfirmed", noConfirmed),
  country("PK", "Pakistan", "🇵🇰", [], "unconfirmed", noConfirmed),
  country("NZ", "New Zealand", "🇳🇿", [broadcaster("TVNZ", "tv", true), broadcaster("TVNZ+", "streaming", true)]),
  country("BE", "Belgium", "🇧🇪", [broadcaster("VRT", "both", true), broadcaster("RTBF", "both", true)]),
  country("SE", "Sweden", "🇸🇪", [broadcaster("SVT", "tv", true), broadcaster("TV4", "both", false)]),
  country("NO", "Norway", "🇳🇴", [broadcaster("NRK", "tv", true), broadcaster("TV2", "both", false)]),
  country("DK", "Denmark", "🇩🇰", [broadcaster("DR", "tv", true), broadcaster("TV2", "both", false)]),
  country("FI", "Finland", "🇫🇮", [broadcaster("Yle", "both", true), broadcaster("MTV3", "tv", false)]),
  country("GR", "Greece", "🇬🇷", [broadcaster("ERT", "both", true)]),
  country("CZ", "Czech Republic", "🇨🇿", [broadcaster("Czech Television", "both", true)]),
  country("HU", "Hungary", "🇭🇺", [broadcaster("MTVA", "both", true)]),
  country("RO", "Romania", "🇷🇴", [broadcaster("Antena", "tv", true)]),
  country("HR", "Croatia", "🇭🇷", [broadcaster("HRT", "both", true)]),
  country("RS", "Serbia", "🇷🇸", [broadcaster("Arena Sport", "both", false)]),
  country("KZ", "Kazakhstan", "🇰🇿", [broadcaster("QAZTRK", "tv", true)]),
  country("KH", "Cambodia", "🇰🇭", [broadcaster("Hang Meas", "tv", true)]),
  country("PH", "Philippines", "🇵🇭", [broadcaster("Aleph Group", "both", false)]),
  country("HK", "Hong Kong", "🇭🇰", [broadcaster("Now TV", "both", false), broadcaster("ViuTV", "tv", true)]),
  country("MO", "Macau", "🇲🇴", [broadcaster("TDM", "tv", true)]),
  country("MN", "Mongolia", "🇲🇳", [broadcaster("MME", "both", true)]),
  country("BO", "Bolivia", "🇧🇴", [broadcaster("Red Uno", "tv", true), broadcaster("Unitel", "tv", true)]),
  country("CL", "Chile", "🇨🇱", [broadcaster("Chilevision", "tv", true)]),
  country("CO", "Colombia", "🇨🇴", [broadcaster("Caracol TV", "tv", true), broadcaster("Canal RCN", "tv", false)]),
  country("EC", "Ecuador", "🇪🇨", [broadcaster("Teleamazonas", "tv", true)]),
  country("PE", "Peru", "🇵🇪", [broadcaster("America Television", "tv", true)]),
  country("PY", "Paraguay", "🇵🇾", [broadcaster("Trece", "tv", true), broadcaster("Unicanal", "tv", true)]),
  country("CR", "Costa Rica", "🇨🇷", [broadcaster("Teletica", "tv", true)]),
  country("HN", "Honduras", "🇭🇳", [broadcaster("Televicentro", "tv", true)]),
  country("SV", "El Salvador", "🇸🇻", [broadcaster("TCS", "both", false)]),
  country("GT", "Guatemala", "🇬🇹", [broadcaster("Chapin TV", "both", false)]),
  country("NI", "Nicaragua", "🇳🇮", [broadcaster("Televideo", "tv", true)]),
  country("PA", "Panama", "🇵🇦", [broadcaster("RPC", "tv", true), broadcaster("TVN", "tv", false)]),
  country("NP", "Nepal", "🇳🇵", [broadcaster("Acepro Media", "both", false)]),
  country("MV", "Maldives", "🇲🇻", [broadcaster("ICE Networks", "both", false)]),
  country("IR", "Iran", "🇮🇷", [broadcaster("IRIB TV3", "tv", true)]),
  country("IL", "Israel", "🇮🇱", [broadcaster("KAN", "both", true)]),
  country("RU", "Russia", "🇷🇺", [broadcaster("Match TV", "tv", true)]),
  country("IS", "Iceland", "🇮🇸", [broadcaster("RUV", "both", true)]),
  country("MT", "Malta", "🇲🇹", [broadcaster("PBS", "tv", true)]),
  country("BG", "Bulgaria", "🇧🇬", [broadcaster("BNT", "tv", true)]),
  country("AL", "Albania", "🇦🇱", [broadcaster("TV Klan", "tv", true)]),
  country("GE", "Georgia", "🇬🇪", [broadcaster("GPB", "tv", true)]),
  country("AM", "Armenia", "🇦🇲", [broadcaster("AMPTV", "tv", true)]),
  country("AZ", "Azerbaijan", "🇦🇿", [broadcaster("ITV", "tv", true)]),
  country("FJ", "Fiji", "🇫🇯", [broadcaster("Fijian Broadcasting Corporation", "tv", true)]),
  country("NE", "Niger", "🇳🇪", [broadcaster("ORTN", "tv", true)]),
  country("QA", "MENA Region", "🌍", [broadcaster("beIN Sports", "both", false)]),
];

export function getCountry(code: string) {
  return broadcasterData.find((countryItem) => countryItem.countryCode === code);
}

const groupTeams: Record<string, Array<{ name: string; flag: string }>> = {
  A: [
    { name: "Mexico", flag: "🇲🇽" },
    { name: "South Africa", flag: "🇿🇦" },
    { name: "South Korea", flag: "🇰🇷" },
    { name: "Czechia", flag: "🇨🇿" },
  ],
  B: [
    { name: "Canada", flag: "🇨🇦" },
    { name: "Switzerland", flag: "🇨🇭" },
    { name: "Qatar", flag: "🇶🇦" },
    { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  ],
  C: [
    { name: "Brazil", flag: "🇧🇷" },
    { name: "Morocco", flag: "🇲🇦" },
    { name: "Haiti", flag: "🇭🇹" },
    { name: "Scotland", flag: "🏴" },
  ],
  D: [
    { name: "United States", flag: "🇺🇸" },
    { name: "Paraguay", flag: "🇵🇾" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Turkiye", flag: "🇹🇷" },
  ],
  E: [
    { name: "Germany", flag: "🇩🇪" },
    { name: "Curacao", flag: "🇨🇼" },
    { name: "Ivory Coast", flag: "🇨🇮" },
    { name: "Ecuador", flag: "🇪🇨" },
  ],
  F: [
    { name: "Netherlands", flag: "🇳🇱" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "Tunisia", flag: "🇹🇳" },
    { name: "Sweden", flag: "🇸🇪" },
  ],
  G: [
    { name: "Belgium", flag: "🇧🇪" },
    { name: "Egypt", flag: "🇪🇬" },
    { name: "Iran", flag: "🇮🇷" },
    { name: "New Zealand", flag: "🇳🇿" },
  ],
  H: [
    { name: "Spain", flag: "🇪🇸" },
    { name: "Cape Verde", flag: "🇨🇻" },
    { name: "Saudi Arabia", flag: "🇸🇦" },
    { name: "Uruguay", flag: "🇺🇾" },
  ],
  I: [
    { name: "France", flag: "🇫🇷" },
    { name: "Senegal", flag: "🇸🇳" },
    { name: "Norway", flag: "🇳🇴" },
    { name: "Iraq", flag: "🇮🇶" },
  ],
  J: [
    { name: "Argentina", flag: "🇦🇷" },
    { name: "Algeria", flag: "🇩🇿" },
    { name: "Austria", flag: "🇦🇹" },
    { name: "Jordan", flag: "🇯🇴" },
  ],
  K: [
    { name: "Portugal", flag: "🇵🇹" },
    { name: "Uzbekistan", flag: "🇺🇿" },
    { name: "Colombia", flag: "🇨🇴" },
    { name: "DR Congo", flag: "🇨🇩" },
  ],
  L: [
    { name: "England", flag: "🏴" },
    { name: "Croatia", flag: "🇭🇷" },
    { name: "Ghana", flag: "🇬🇭" },
    { name: "Panama", flag: "🇵🇦" },
  ],
};

export const groups = Object.entries(groupTeams).map(([group, teams]) => ({
  group,
  teams,
}));

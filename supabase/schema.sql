create table if not exists public.countries (
  country_code text primary key check (country_code ~ '^[A-Z]{2}$'),
  country text not null,
  flag text not null,
  has_confirmed boolean not null default false,
  no_confirmed_note text,
  status text not null check (status in ('confirmed', 'unconfirmed', 'needs_review')),
  source_url text not null check (source_url like 'https://%'),
  last_verified_at date not null
);

create table if not exists public.broadcasters (
  id bigint generated always as identity primary key,
  country_code text not null references public.countries(country_code) on delete cascade,
  name text not null,
  type text not null check (type in ('tv', 'streaming', 'both')),
  is_free boolean not null,
  url text not null check (url like 'https://%'),
  languages text[] not null default '{}',
  notes text not null default '',
  affiliate_key text check (affiliate_key in ('nordvpn', 'expressvpn', 'dazn', 'peacock', 'fubo'))
);

create table if not exists public.matches (
  match_number integer primary key check (match_number between 1 and 104),
  phase text not null,
  group_label text,
  home_team text not null,
  away_team text not null,
  home_flag text not null default '🏳️',
  away_flag text not null default '🏳️',
  venue text not null,
  city text not null,
  kickoff_utc timestamptz not null,
  source_url text not null check (source_url like 'https://%')
);

create table if not exists public.groups (
  group_label text not null,
  slot integer not null check (slot between 1 and 4),
  team_name text not null,
  flag text not null default '🏳️',
  primary key (group_label, slot)
);

alter table public.countries enable row level security;
alter table public.broadcasters enable row level security;
alter table public.matches enable row level security;
alter table public.groups enable row level security;

create policy "public read countries" on public.countries for select using (true);
create policy "public read broadcasters" on public.broadcasters for select using (true);
create policy "public read matches" on public.matches for select using (true);
create policy "public read groups" on public.groups for select using (true);

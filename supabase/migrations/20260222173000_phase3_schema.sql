-- Phase 3: Supabase schema + RLS for BazaarLane marketplace

create extension if not exists pgcrypto;

-- Useful helper trigger for updated_at fields
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- 1) profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_url text,
  city text,
  phone text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger trg_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- 2) categories
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  icon text,
  parent_id uuid references public.categories(id) on delete set null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

-- 3) listings
do $$
begin
  if not exists (select 1 from pg_type where typname = 'listing_condition') then
    create type public.listing_condition as enum ('new', 'like_new', 'good', 'fair', 'used');
  end if;

  if not exists (select 1 from pg_type where typname = 'listing_status') then
    create type public.listing_status as enum ('draft', 'active', 'sold', 'archived');
  end if;
end
$$;

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete restrict,
  title text not null check (char_length(title) >= 6),
  description text not null check (char_length(description) >= 20),
  price numeric(12,2) not null check (price >= 0),
  is_negotiable boolean not null default true,
  condition public.listing_condition not null,
  city text not null,
  postal_code text,
  latitude double precision,
  longitude double precision,
  status public.listing_status not null default 'active',
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create trigger trg_listings_updated_at
before update on public.listings
for each row
execute function public.set_updated_at();

-- 4) listing_images
create table if not exists public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  storage_path text not null,
  public_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  unique (listing_id, sort_order)
);

-- 5) favorites
create table if not exists public.favorites (
  profile_id uuid not null references public.profiles(id) on delete cascade,
  listing_id uuid not null references public.listings(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (profile_id, listing_id)
);

-- 6) conversations
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  seller_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  check (buyer_id <> seller_id),
  unique (listing_id, buyer_id, seller_id)
);

create trigger trg_conversations_updated_at
before update on public.conversations
for each row
execute function public.set_updated_at();

-- 7) messages
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) > 0),
  created_at timestamptz not null default timezone('utc', now())
);

-- Indexes for browse/search/sort flows
create index if not exists idx_categories_active_sort on public.categories (is_active, sort_order);
create index if not exists idx_listings_status_created_at on public.listings (status, created_at desc);
create index if not exists idx_listings_category_status_created on public.listings (category_id, status, created_at desc);
create index if not exists idx_listings_city_status_created on public.listings (city, status, created_at desc);
create index if not exists idx_listings_price_status on public.listings (price, status);
create index if not exists idx_listings_owner on public.listings (owner_id);
create index if not exists idx_listing_images_listing_sort on public.listing_images (listing_id, sort_order);
create index if not exists idx_favorites_profile_created on public.favorites (profile_id, created_at desc);
create index if not exists idx_favorites_listing on public.favorites (listing_id);
create index if not exists idx_conversations_buyer_updated on public.conversations (buyer_id, updated_at desc);
create index if not exists idx_conversations_seller_updated on public.conversations (seller_id, updated_at desc);
create index if not exists idx_conversations_listing on public.conversations (listing_id);
create index if not exists idx_messages_conversation_created on public.messages (conversation_id, created_at asc);

-- Optional text-search helper index for title/description search
create index if not exists idx_listings_search_tsv
on public.listings
using gin (to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(description, '')));

-- Seed categories (idempotent via slug conflict)
insert into public.categories (name, slug, icon, sort_order)
values
  ('Electronics', 'electronics', '💻', 1),
  ('Home & Garden', 'home-garden', '🏡', 2),
  ('Fashion', 'fashion', '👕', 3),
  ('Vehicles', 'vehicles', '🚗', 4),
  ('Hobbies', 'hobbies', '🎸', 5),
  ('Kids', 'kids', '🧸', 6),
  ('Property', 'property', '🏠', 7),
  ('Services', 'services', '🛠️', 8)
on conflict (slug) do update
set
  name = excluded.name,
  icon = excluded.icon,
  sort_order = excluded.sort_order,
  is_active = true;

-- Enable RLS on all user-facing tables
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;
alter table public.favorites enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- profiles policies: public read, owner manage
create policy "Profiles are publicly readable"
on public.profiles
for select
using (true);

create policy "Users can insert own profile"
on public.profiles
for insert
with check (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- categories policies: public read only
create policy "Categories are publicly readable"
on public.categories
for select
using (is_active = true);

-- listings policies
-- public can read active listings
create policy "Active listings are publicly readable"
on public.listings
for select
using (status = 'active');

-- authenticated users can create listings (as themselves)
create policy "Authenticated users can create own listings"
on public.listings
for insert
to authenticated
with check (auth.uid() = owner_id);

-- only owner can edit/delete their listing
create policy "Owners can update their listings"
on public.listings
for update
to authenticated
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "Owners can delete their listings"
on public.listings
for delete
to authenticated
using (auth.uid() = owner_id);

-- listing_images policies
create policy "Listing images of active listings are publicly readable"
on public.listing_images
for select
using (
  exists (
    select 1
    from public.listings l
    where l.id = listing_images.listing_id
      and l.status = 'active'
  )
);

create policy "Listing owners can manage listing images"
on public.listing_images
for all
to authenticated
using (
  exists (
    select 1
    from public.listings l
    where l.id = listing_images.listing_id
      and l.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.listings l
    where l.id = listing_images.listing_id
      and l.owner_id = auth.uid()
  )
);

-- favorites policies: users manage their own favorites
create policy "Users can read own favorites"
on public.favorites
for select
to authenticated
using (auth.uid() = profile_id);

create policy "Users can add own favorites"
on public.favorites
for insert
to authenticated
with check (auth.uid() = profile_id);

create policy "Users can remove own favorites"
on public.favorites
for delete
to authenticated
using (auth.uid() = profile_id);

-- conversations policies: only participants can read/create/update
create policy "Participants can read conversations"
on public.conversations
for select
to authenticated
using (auth.uid() = buyer_id or auth.uid() = seller_id);

create policy "Users can create conversations they participate in"
on public.conversations
for insert
to authenticated
with check (
  (auth.uid() = buyer_id or auth.uid() = seller_id)
  and exists (
    select 1
    from public.listings l
    where l.id = conversations.listing_id
      and l.owner_id = conversations.seller_id
  )
);

create policy "Participants can update conversations"
on public.conversations
for update
to authenticated
using (auth.uid() = buyer_id or auth.uid() = seller_id)
with check (auth.uid() = buyer_id or auth.uid() = seller_id);

-- messages policies: only conversation participants can read/send
create policy "Participants can read messages"
on public.messages
for select
to authenticated
using (
  exists (
    select 1
    from public.conversations c
    where c.id = messages.conversation_id
      and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())
  )
);

create policy "Participants can send messages"
on public.messages
for insert
to authenticated
with check (
  auth.uid() = sender_id
  and exists (
    select 1
    from public.conversations c
    where c.id = messages.conversation_id
      and (c.buyer_id = auth.uid() or c.seller_id = auth.uid())
  )
);

-- Create listings table
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  description text,
  price numeric(12,2) not null check (price >= 0),
  category text not null,
  cover_url text,
  status text not null default 'active' check (status in ('active','sold','hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.listings enable row level security;

-- Policies: public can view active listings; owners can view/manage their own
create policy if not exists "Public can view active listings"
  on public.listings for select
  using (status = 'active');

create policy if not exists "Users can view own listings"
  on public.listings for select to authenticated
  using (auth.uid() = user_id);

create policy if not exists "Users can insert own listings"
  on public.listings for insert to authenticated
  with check (auth.uid() = user_id);

create policy if not exists "Users can update own listings"
  on public.listings for update to authenticated
  using (auth.uid() = user_id);

create policy if not exists "Users can delete own listings"
  on public.listings for delete to authenticated
  using (auth.uid() = user_id);

-- Update timestamp trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_listings_updated_at on public.listings;
create trigger trg_listings_updated_at
before update on public.listings
for each row execute function public.handle_updated_at();

-- Messages table for buyer-seller messaging
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null,
  receiver_id uuid not null,
  listing_id uuid references public.listings(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy if not exists "Users can send messages as themselves"
  on public.messages for insert to authenticated
  with check (auth.uid() = sender_id);

create policy if not exists "Users can view their own conversations"
  on public.messages for select to authenticated
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

-- Wallets and transactions
create table if not exists public.wallets (
  user_id uuid primary key,
  balance numeric(14,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.wallets enable row level security;

create policy if not exists "Users can view own wallet"
  on public.wallets for select to authenticated
  using (auth.uid() = user_id);

create policy if not exists "Users cannot directly modify wallet"
  on public.wallets for update to authenticated
  using (false);

create or replace trigger trg_wallets_updated_at
before update on public.wallets
for each row execute function public.handle_updated_at();

create table if not exists public.wallet_topups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  amount numeric(14,2) not null check (amount > 0),
  status text not null default 'pending' check (status in ('pending','paid','failed')),
  provider text default 'shopier',
  provider_ref text,
  created_at timestamptz not null default now()
);

alter table public.wallet_topups enable row level security;

create policy if not exists "Users can create their own topups"
  on public.wallet_topups for insert to authenticated
  with check (auth.uid() = user_id and amount > 0);

create policy if not exists "Users can view their own topups"
  on public.wallet_topups for select to authenticated
  using (auth.uid() = user_id);

-- disallow client updates/deletes for security; will be handled via edge functions
create policy if not exists "Users cannot update topups"
  on public.wallet_topups for update to authenticated
  using (false);
create policy if not exists "Users cannot delete topups"
  on public.wallet_topups for delete to authenticated
  using (false);

create table if not exists public.withdrawal_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  amount numeric(14,2) not null check (amount > 0),
  status text not null default 'pending' check (status in ('pending','approved','rejected','paid')),
  note text,
  created_at timestamptz not null default now()
);

alter table public.withdrawal_requests enable row level security;

create policy if not exists "Users can create their own withdrawals"
  on public.withdrawal_requests for insert to authenticated
  with check (auth.uid() = user_id and amount > 0);

create policy if not exists "Users can view their own withdrawals"
  on public.withdrawal_requests for select to authenticated
  using (auth.uid() = user_id);

create policy if not exists "Users cannot update withdrawals"
  on public.withdrawal_requests for update to authenticated
  using (false);

create policy if not exists "Users cannot delete withdrawals"
  on public.withdrawal_requests for delete to authenticated
  using (false);

-- Storage bucket for listing images
insert into storage.buckets (id, name, public)
values ('listing-images', 'listing-images', true)
on conflict (id) do nothing;

-- Storage policies
create policy if not exists "Public can view listing images"
  on storage.objects for select
  using (bucket_id = 'listing-images');

create policy if not exists "Users can upload own listing images"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'listing-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy if not exists "Users can update own listing images"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'listing-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

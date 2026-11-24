-- =====================================================================
-- DARYEEL WELLNESS — Supabase schema
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
-- Safe to run again: it only creates what is missing and refreshes policies.
--
-- Security model
--   • Row Level Security is ON for every table.
--   • Anyone (anon key) can READ categories, products and product images.
--   • Only signed-in users listed in public.admins can INSERT / UPDATE / DELETE.
--   • The service_role key is never needed by the website.
-- =====================================================================

-- ---------- Categories ----------
create table if not exists public.categories (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name           text not null,                 -- English name
  name_so        text,                          -- Somali name
  tagline        text,
  tagline_so     text,
  description    text,
  description_so text,
  cover_image    text,                          -- image path shown on the category card
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now()
);

-- ---------- Products ----------
create table if not exists public.products (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name              text not null,              -- English / brand name
  name_so           text,                       -- Somali name, when different
  brand             text,
  aliases           text[] not null default '{}',   -- extra search terms
  category_id       uuid not null references public.categories (id) on delete restrict,
  subcategory       text check (subcategory in ('general', 'ingredients', 'oils')),
  facts             text,                       -- pack facts, e.g. "500 mg · 100 capsules"
  description       text not null default '',   -- English
  description_so    text not null default '',   -- Somali
  benefits          jsonb,                      -- [{ "en": "...", "so": "..." }, ...] or null = "being verified"
  supplied_benefits jsonb,                      -- benefits supplied by Daryeel Wellness, shown as-is
  caution           jsonb,                      -- { "en": "...", "so": "..." }
  image_labels      jsonb,                      -- optional label per image
  price             numeric(10, 2) check (price is null or price >= 0),   -- null = price not shown
  images            text[] not null default '{}',   -- paths in the product-images bucket; first = main photo
  in_stock          boolean not null default true,
  is_featured       boolean not null default false,
  sort_order        integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists products_category_id_idx on public.products (category_id);

-- Keep updated_at current on every edit.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- ---------- Admins ----------
-- One row per user allowed to manage the shop (the owner's auth user id).
-- There is deliberately NO policy that lets anyone insert here from the website:
-- add admins only from this SQL editor.
create table if not exists public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- ---------- Row Level Security ----------
alter table public.categories enable row level security;
alter table public.products   enable row level security;
alter table public.admins     enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.categories, public.products to anon, authenticated;
grant insert, update, delete on public.categories, public.products to authenticated;
grant select on public.admins to authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- Categories
drop policy if exists "Categories are public"        on public.categories;
drop policy if exists "Admins can add categories"    on public.categories;
drop policy if exists "Admins can edit categories"   on public.categories;
drop policy if exists "Admins can delete categories" on public.categories;
create policy "Categories are public"        on public.categories for select to anon, authenticated using (true);
create policy "Admins can add categories"    on public.categories for insert to authenticated with check (public.is_admin());
create policy "Admins can edit categories"   on public.categories for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete categories" on public.categories for delete to authenticated using (public.is_admin());

-- Products
drop policy if exists "Products are public"        on public.products;
drop policy if exists "Admins can add products"    on public.products;
drop policy if exists "Admins can edit products"   on public.products;
drop policy if exists "Admins can delete products" on public.products;
create policy "Products are public"        on public.products for select to anon, authenticated using (true);
create policy "Admins can add products"    on public.products for insert to authenticated with check (public.is_admin());
create policy "Admins can edit products"   on public.products for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete products" on public.products for delete to authenticated using (public.is_admin());

-- Admins: a signed-in user may only see whether they themselves are an admin.
drop policy if exists "Users can see their own admin row" on public.admins;
create policy "Users can see their own admin row" on public.admins for select to authenticated using (user_id = auth.uid());

-- ---------- Storage: public bucket for product photos ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/webp', 'image/jpeg', 'image/png', 'image/avif'])
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Product images are public"        on storage.objects;
drop policy if exists "Admins can upload product images" on storage.objects;
drop policy if exists "Admins can update product images" on storage.objects;
drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Product images are public"        on storage.objects for select to anon, authenticated using (bucket_id = 'product-images');
create policy "Admins can upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and public.is_admin());
create policy "Admins can update product images" on storage.objects for update to authenticated using (bucket_id = 'product-images' and public.is_admin()) with check (bucket_id = 'product-images' and public.is_admin());
create policy "Admins can delete product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and public.is_admin());

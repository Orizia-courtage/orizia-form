create extension if not exists pgcrypto;

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('blog', 'actualite')),
  slug text not null unique,
  title text not null,
  excerpt text default '',
  content text not null,
  cover_image_url text default '',
  author text not null default 'Cindy Urbansky',
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.articles enable row level security;

create policy "Published articles are public"
on public.articles for select
using (is_published = true);

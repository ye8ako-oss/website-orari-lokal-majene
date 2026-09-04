-- Jalankan SETELAH versi aplikasi dengan author_id sudah dideploy dan diuji.

-- Hapus policy lama yang memberi setiap pengguna terautentikasi akses penuh.
drop policy if exists "Admin can delete news" on public.berita;
drop policy if exists "Admin can insert news" on public.berita;
drop policy if exists "Admin can update news" on public.berita;
drop policy if exists "Authenticated users can read news" on public.berita;
drop policy if exists "Public can read published news" on public.berita;

create or replace function public.current_admin_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.admin_users
  where user_id = auth.uid() and aktif = true
  limit 1;
$$;

grant execute on function public.current_admin_role() to authenticated;

alter table public.berita enable row level security;

drop policy if exists "published news is public" on public.berita;
create policy "published news is public"
on public.berita for select
using (publish = true);

drop policy if exists "admins read newsroom" on public.berita;
create policy "admins read newsroom"
on public.berita for select to authenticated
using (public.current_admin_role() in ('ADMIN', 'SUPER_ADMIN'));

drop policy if exists "admins create own news" on public.berita;
create policy "admins create own news"
on public.berita for insert to authenticated
with check (
  public.current_admin_role() in ('ADMIN', 'SUPER_ADMIN')
  and author_id = auth.uid()
);

drop policy if exists "admins update own news" on public.berita;
create policy "admins update own news"
on public.berita for update to authenticated
using (
  public.current_admin_role() = 'SUPER_ADMIN'
  or author_id = auth.uid()
)
with check (
  public.current_admin_role() = 'SUPER_ADMIN'
  or author_id = auth.uid()
);

drop policy if exists "super admins delete news" on public.berita;
create policy "super admins delete news"
on public.berita for delete to authenticated
using (public.current_admin_role() = 'SUPER_ADMIN');

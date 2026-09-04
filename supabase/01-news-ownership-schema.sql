-- Jalankan pertama melalui Supabase Dashboard > SQL Editor.
-- Aman dijalankan saat versi website lama masih aktif.

alter table public.berita
  add column if not exists author_id uuid references auth.users(id) on delete set null;

create index if not exists berita_author_id_idx on public.berita (author_id);

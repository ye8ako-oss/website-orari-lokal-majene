---
Task ID: 1
Agent: Main (Z.ai Code)
Task: Membangun website resmi ORARI Lokal Majene (Organisasi Amatir Radio Indonesia) yang modern, elegan, profesional, responsif, SEO friendly, dan siap dikembangkan menjadi CMS WordPress.

Work Log:
- Eksplorasi struktur proyek Next.js 16 yang sudah ada (shadcn/ui, Tailwind v4, Prisma, dst.)
- Generate 9 gambar bertema komunikasi radio via z-ai image CLI:
  - hero-radio.jpg, profile-kegiatan.jpg, news-1/2/3.jpg, gallery-1..6.jpg
- Setup layout.tsx: font Inter (body) + Poppins (heading) via next/font/google, metadata SEO berbahasa Indonesia (title, description, keywords, openGraph), lang="id"
- Setup globals.css: tema warna ORARI (primary #003366, secondary #B30000), animasi kustom (radio-pulse, wave-spread, float, loading-bar), reveal classes (fade up/left/right/zoom/fade), custom scrollbar, bg-grid-pattern, media query prefers-reduced-motion
- Buat src/lib/orari-data.ts: semua konten dipisahkan dari view (identitas, menu, profil, fungsi, layanan, CORE, berita, dokumen, statistik, galeri) — WordPress-ready
- Buat komponen ORARI di src/components/orari/:
  - logo.tsx (SVG perisai + gelombang radio ORARI)
  - icon-map.ts (pemetaan nama ikon string -> Lucide)
  - scroll-reveal.tsx (IntersectionObserver untuk fade in/up)
  - section-heading.tsx (judul section seragam)
  - header.tsx (sticky, scroll spy, mobile menu hamburger)
  - hero.tsx (gambar + overlay biru + deskripsi, tanpa tombol CTA)
  - profil.tsx (dua kolom: foto + tentang/sejarah/visi/misi/tujuan/nilai)
  - fungsi.tsx (7 kartu fungsi ORARI dengan ikon)
  - layanan.tsx (8 kartu: UNAR, IAR, KTA, SIORDIG, dll)
  - core.tsx (CORE dengan latar biru gelap, aksen merah, sub-section lengkap)
  - berita.tsx (3 berita dengan foto/tanggal/ringkasan/tombol)
  - dokumen.tsx (8 jenis dokumen dengan badge PDF)
  - informasi.tsx (panel callsign YH8FB, repeater 146.620 MHz, dll)
  - statistik.tsx (counter animation via useCounter hook)
  - galeri.tsx (grid + zoom + lightbox modal dengan navigasi keyboard)
  - kontak.tsx (alamat, email, WhatsApp, Google Maps embed, sosial media)
  - footer.tsx (logo, alamat, menu, sosial, callsign, copyright)
  - back-to-top.tsx (tombol muncul setelah scroll)
  - loading-screen.tsx (animasi logo + gelombang + loading bar)
- Buat src/hooks/use-counter.ts (counter animation dengan requestAnimationFrame + easing)
- Komposisi src/app/page.tsx (flex kolom min-h-screen agar footer sticky bottom)
- Perbaiki error: ikon `Frequency` tidak ada di lucide-react -> ganti dengan `RadioTower`
- Perbaiki lint error: setState sinkron dalam effect di scroll-reveal -> pindahkan penanganan reduced-motion ke CSS media query
- Verifikasi dengan Agent Browser: halaman render tanpa error, navigasi smooth-scroll berfungsi, lightbox galeri berfungsi (prev/next/keyboard), mobile menu hamburger berfungsi, back-to-top berfungsi, lint bersih

Stage Summary:
- Website ORARI Lokal Majene lengkap dengan 14 section, 100% responsif, animasi fade/counter/lightbox
- Struktur file rapi: konten terpisah di orari-data.ts (siap WordPress), komponen modular di src/components/orari/
- Warna identitas ORARI (#003366 + #B30000), font Inter + Poppins
- SEO: metadata lengkap, lang="id", semantic HTML, ARIA labels
- Aksesibilitas: prefers-reduced-motion, keyboard navigation, sr-only ready
- Lint: 0 error, 0 warning
- Browser-verified: render bersih, semua interaksi utama berfungsi

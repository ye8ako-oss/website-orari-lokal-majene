"use client";

/* ============================================================
   HEADER STICKY
   ------------------------------------------------------------
   - Logo ORARI + nama organisasi di kiri
   - Menu navigasi di kanan (desktop)
   - Tombol hamburger untuk mobile
   - Tetap terlihat saat halaman digulir (sticky)
   - Latar berubah dari transparan ke putih saat scroll
   - Scroll spy: menu aktif menyesuaikan section terlihat
   ============================================================ */
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil", href: "/profil" },
  { label: "Berita", href: "#berita" },
  { label: "Layanan", href: "#layanan" },
  { label: "Dokumen", href: "#dokumen" },
  { label: "Kontak", href: "#kontak" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/[0.08] bg-[#00152d]/20 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* IDENTITAS */}
          <Link
            href="#beranda"
            className="flex items-center gap-2.5"
            aria-label="ORARI Lokal Majene"
          >
            <Image
              src="/images/logo-orari-lokal-majene.png"
              alt="Logo ORARI"
              width={60}
              height={60}
              className="h-14 w-14 object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]"
            />

            <div className="leading-none">
              <div className="text-sm font-bold tracking-tight text-white sm:text-base">
                ORARI LOKAL MAJENE
              </div>

              <div className="mt-1 text-[8px] font-medium uppercase tracking-[0.16em] text-white/65 sm:text-[9px]">
                ORGANISASI AMATIR RADIO INDONESIA
              </div>
            </div>
          </Link>

          {/* NAVIGASI */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-medium transition-colors ${
                  index === 0 ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {item.label}

                {index === 0 && (
                  <span className="absolute -bottom-[11px] left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-red-500" />
                )}
              </Link>
            ))}
          </nav>

          {/* MOBILE MENU PLACEHOLDER */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
              aria-label="Buka menu"
            >
              MENU
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

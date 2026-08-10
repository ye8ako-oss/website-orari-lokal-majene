"use client";

/* ============================================================
   HEADER STICKY + SCROLL SPY
   ------------------------------------------------------------
   - Logo ORARI + nama organisasi di kiri
   - Menu navigasi di kanan (desktop)
   - Tombol hamburger untuk mobile
   - Tetap terlihat saat halaman digulir (fixed)
   - Latar berubah dari transparan ke putih saat scroll
   - Scroll spy: menu aktif menyesuaikan section yang terlihat
   ============================================================ */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil", href: "/profil" },
  { label: "Berita", href: "#berita" },
  { label: "Layanan", href: "#layanan" },
  { label: "Dokumen", href: "#dokumen" },
  { label: "Kontak", href: "#kontak" },
];

export function Header() {
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState("beranda");
  const [scrolled, setScrolled] = useState(false);

  /* ============================================================
     DETEKSI SCROLL
     ------------------------------------------------------------
     Mengubah tampilan header ketika halaman mulai digulir.
     ============================================================ */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ============================================================
     SCROLL SPY
     ------------------------------------------------------------
     Mendeteksi section yang sedang terlihat di layar.
     ============================================================ */
  useEffect(() => {
    /* Jika sedang berada di halaman Profil,
       menu Profil menjadi aktif. */
    if (pathname === "/profil") {
      setActiveSection("profil");
      return;
    }

    /* Scroll spy hanya digunakan di halaman utama. */
    if (pathname !== "/") {
      return;
    }

    const sectionIds = ["beranda", "berita", "layanan", "dokumen", "kontak"];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  /* ============================================================
     TENTUKAN MENU AKTIF
     ============================================================ */
  const isActive = (href: string) => {
    if (href === "/profil") {
      return pathname === "/profil";
    }

    if (pathname !== "/") {
      return false;
    }

    const sectionId = href.replace("#", "");

    return activeSection === sectionId;
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200/60 bg-white/95 shadow-sm backdrop-blur-md"
            : "border-white/[0.08] bg-[#00152d]/20 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ==================================================
              IDENTITAS
              ================================================== */}
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
              <div
                className={`text-sm font-bold tracking-tight transition-colors sm:text-base ${
                  scrolled ? "text-[#123b63]" : "text-white"
                }`}
              >
                ORARI LOKAL MAJENE
              </div>

              <div
                className={`mt-1 text-[8px] font-medium uppercase tracking-[0.16em] transition-colors sm:text-[9px] ${
                  scrolled ? "text-slate-500" : "text-white/65"
                }`}
              >
                ORGANISASI AMATIR RADIO INDONESIA
              </div>
            </div>
          </Link>

          {/* ==================================================
              NAVIGASI DESKTOP
              ================================================== */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    active
                      ? scrolled
                        ? "text-[#123b63]"
                        : "text-white"
                      : scrolled
                        ? "text-slate-500 hover:text-[#123b63]"
                        : "text-white/75 hover:text-white"
                  }`}
                >
                  {item.label}

                  {/* GARIS MENU AKTIF */}
                  {active && (
                    <span
                      className={`absolute -bottom-[11px] left-0 right-0 mx-auto h-[2px] w-full rounded-full ${
                        scrolled ? "bg-red-600" : "bg-red-500"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ==================================================
              MOBILE MENU
              ================================================== */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              className={`rounded-md border px-3 py-2 text-xs font-medium backdrop-blur-sm transition ${
                scrolled
                  ? "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              }`}
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

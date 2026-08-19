"use client";

/* ============================================================
   HEADER STICKY + SCROLL SPY + MOBILE MENU
   ------------------------------------------------------------
   - Logo ORARI + nama organisasi di kiri
   - Menu navigasi di kanan (desktop)
   - Tombol MENU untuk mobile
   - Menu mobile dapat dibuka/tutup
   - Tetap terlihat saat halaman digulir (fixed)
   - Latar berubah dari transparan ke putih saat scroll
   - Scroll spy: menu aktif menyesuaikan section yang terlihat
   ============================================================ */

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Berita", href: "/#berita" },
  { label: "Layanan", href: "/layanan" },
  { label: "Dokumen", href: "/dokumen" },
  { label: "Kontak", href: "/#kontak" },
];

export function Header() {
  const pathname = usePathname();

  const [activeSection, setActiveSection] = useState("beranda");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ============================================================
     DETEKSI SCROLL
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
     ============================================================ */
  useEffect(() => {
    if (pathname === "/profil") {
      setActiveSection("profil");
      return;
    }

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
     TUTUP MENU MOBILE SAAT PINDAH HALAMAN
     ============================================================ */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* ============================================================
     TENTUKAN MENU AKTIF
     ============================================================ */
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && activeSection === "beranda";
    }

    if (href === "/profil") {
      return pathname === "/profil";
    }

    if (href === "/layanan") {
      return pathname === "/layanan";
    }

    if (href === "/dokumen") {
      return pathname === "/dokumen";
    }

    if (href === "/#berita") {
      return pathname === "/" && activeSection === "berita";
    }

    if (href === "/#kontak") {
      return pathname === "/" && activeSection === "kontak";
    }

    return false;
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
            href="/"
            className="flex items-center gap-2.5"
            aria-label="ORARI Lokal Majene"
            onClick={() => setMenuOpen(false)}
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
              MOBILE MENU BUTTON
              ================================================== */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className={`rounded-md border px-3 py-2 text-xs font-medium backdrop-blur-sm transition ${
                scrolled
                  ? "border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              }`}
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? "TUTUP" : "MENU"}
            </button>
          </div>
        </div>

        {/* ==================================================
            MOBILE NAVIGATION
            ================================================== */}
        {menuOpen && (
          <div
            className={`border-t ${
              scrolled
                ? "border-slate-200/70 bg-white/98"
                : "border-white/10 bg-[#00152d]/95"
            }`}
          >
            <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
              <div className="flex flex-col">
                {navItems.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`border-b py-3 text-sm font-medium transition-colors last:border-b-0 ${
                        scrolled
                          ? active
                            ? "border-slate-200 text-[#123b63]"
                            : "border-slate-100 text-slate-600 hover:text-[#123b63]"
                          : active
                            ? "border-white/10 text-white"
                            : "border-white/10 text-white/75 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

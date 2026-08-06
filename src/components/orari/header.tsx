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
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X, Radio } from "lucide-react";
import { OrariLogo } from "./logo";
import { NAV_MENU, ORG_INFO } from "@/lib/orari-data";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  /* Deteksi scroll untuk mengubah latar header */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll spy — tandai menu yang sesuai section terlihat */
  useEffect(() => {
    const sections = NAV_MENU.map((m) => m.href.replace("#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Kunci scroll body ketika menu mobile terbuka */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-white/80 backdrop-blur-sm py-3",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* ====== KIRI: Logo + Nama Organisasi ====== */}
          <a
            href="#beranda"
            className="flex items-center gap-3 group"
            aria-label="Beranda ORARI Lokal Majene"
          >
            <Image
              src="/images/logo-orlok-majene.png"
              alt="Logo ORARI Lokal Majene"
              width={56}
              height={56}
              className="transition-transform duration-300 group-hover:scale-105"
            />

            <div className="flex flex-col leading-tight">
              <span className="font-heading font-bold text-[#003366] text-lg">
                ORARI Lokal Majene
              </span>

              <span className="text-xs text-gray-600">
                Organisasi Amatir Radio Indonesia
              </span>

              <span className="text-[11px] text-[#B30000] font-medium">
                YH8FB • Kabupaten Majene • Sulawesi Barat
              </span>
            </div>
          </a>

          {/* ====== KANAN: Menu Navigasi (Desktop) ====== */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Navigasi utama"
          >
            {NAV_MENU.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-[#003366]"
                      : "text-foreground/70 hover:text-[#003366]",
                  )}
                >
                  {item.label}
                  {/* Garis bawah indikator menu aktif */}
                  <span
                    className={cn(
                      "absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-[#B30000] transition-transform duration-300 origin-left",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              );
            })}
          </nav>

          {/* ====== Tombol Hamburger (Mobile) ====== */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[#003366] hover:bg-[#003366]/5 transition-colors"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ====== PANEL MENU MOBILE ====== */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 bg-white border-t",
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav
          className="px-4 py-3 flex flex-col gap-1"
          aria-label="Navigasi mobile"
        >
          {NAV_MENU.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2 px-3 py-3 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#003366]/5 text-[#003366]"
                    : "text-foreground/80 hover:bg-muted",
                )}
              >
                <Radio size={16} className="text-[#B30000]" />
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Header;

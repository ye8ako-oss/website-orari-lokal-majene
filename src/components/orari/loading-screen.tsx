"use client";

/* ============================================================
   LOADING SCREEN
   ------------------------------------------------------------
   Animasi loading singkat saat halaman pertama dimuat.
   Menampilkan logo ORARI dengan gelombang radio berdenyut.
   Hilang otomatis setelah halaman siap.
   ============================================================ */
import { useEffect, useState } from "react";
import { OrariLogo } from "./logo";

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    /* Sembunyikan setelah halaman siap (max 1.2s) */
    const t1 = setTimeout(() => setHidden(true), 900);
    const t2 = setTimeout(() => setRemoved(true), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  /* Setelah animasi selesai, hapus dari DOM */
  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden={hidden}
    >
      {/* Logo berdenyut */}
      <div className="relative">
        <OrariLogo size={72} className="animate-radio-pulse" />
        {/* Gelombang menyebar */}
        <span className="absolute inset-0 rounded-full border-2 border-[#003366]/30 animate-wave-spread" />
      </div>
      {/* Teks loading */}
      <p className="mt-6 font-heading font-semibold text-[#003366] tracking-wide">
        ORARI Lokal Majene
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Organisasi Amatir Radio Indonesia
      </p>
      {/* Bar loading */}
      <div className="mt-6 h-1 w-40 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-gradient-to-r from-[#003366] to-[#B30000]"
          style={{ animation: "loading-bar 1.2s ease-out forwards" }}
        />
      </div>
    </div>
  );
}

export default LoadingScreen;

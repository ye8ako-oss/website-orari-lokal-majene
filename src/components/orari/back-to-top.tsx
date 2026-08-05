"use client";

/* ============================================================
   KOMPONEN BackToTop
   ------------------------------------------------------------
   Tombol untuk kembali ke atas halaman. Muncul setelah pengguna
   menggulir ke bawah. Memakai smooth scroll bawaan CSS.
   ============================================================ */
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#003366] text-white shadow-lg shadow-[#003366]/30 hover:bg-[#B30000] transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ArrowUp size={22} />
      {/* Lingkaran pulsasi dekoratif */}
      <span className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-0" />
    </button>
  );
}

export default BackToTop;

"use client";

/* ============================================================
   SECTION GALERI
   ------------------------------------------------------------
   Galeri foto modern dengan:
   - Grid layout responsif
   - Efek zoom saat hover
   - Lightbox (modal) saat foto diklik
   ============================================================ */
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { GALERI } from "@/lib/orari-data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { cn } from "@/lib/utils";

export function Galeri() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isOpen = lightboxIndex !== null;

  /* Tutup lightbox */
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  /* Navigasi foto sebelumnya */
  const showPrev = useCallback(() => {
    setLightboxIndex((cur) =>
      cur === null ? cur : (cur - 1 + GALERI.length) % GALERI.length
    );
  }, []);

  /* Navigasi foto berikutnya */
  const showNext = useCallback(() => {
    setLightboxIndex((cur) => (cur === null ? cur : (cur + 1) % GALERI.length));
  }, []);

  /* Navigasi keyboard pada lightbox */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeLightbox, showPrev, showNext]);

  return (
    <section id="galeri" className="py-20 sm:py-24 bg-muted/40 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dokumentasi Kegiatan"
          title="Galeri ORARI"
          description="Dokumentasi kegiatan komunikasi radio, latihan, dan aktivitas ORARI Lokal Majene."
        />

        {/* Grid galeri */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {GALERI.map((item, idx) => (
            <ScrollReveal
              key={item.src}
              variant="zoom"
              delay={idx * 60}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-2xl shadow-sm",
                /* Beberapa foto mengisi dua kolom agar layout dinamis */
                idx === 0 && "col-span-2 lg:col-span-1",
                idx === 3 && "lg:row-span-1"
              )}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="block w-full h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[#003366]/40 rounded-2xl"
                aria-label={`Buka foto: ${item.alt}`}
              >
                <div className="relative aspect-square sm:aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay gelap saat hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 via-[#003366]/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Ikon zoom di tengah */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white">
                      <ZoomIn size={22} />
                    </span>
                  </div>
                  {/* Caption foto */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-sm font-medium drop-shadow">{item.alt}</p>
                  </div>
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ====== LIGHTBOX (Modal Foto Besar) ====== */}
      {isOpen && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau foto galeri"
        >
          {/* Tombol tutup */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Tutup"
          >
            <X size={24} />
          </button>

          {/* Tombol sebelumnya */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Foto sebelumnya"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Foto besar */}
          <div
            className="relative w-full max-w-4xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALERI[lightboxIndex].src}
              alt={GALERI[lightboxIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
            <p className="absolute bottom-3 left-0 right-0 text-center text-white text-sm">
              {GALERI[lightboxIndex].alt} — {lightboxIndex + 1} / {GALERI.length}
            </p>
          </div>

          {/* Tombol berikutnya */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Foto berikutnya"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  );
}

export default Galeri;

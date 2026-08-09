/* ============================================================
   SECTION HERO (BERANDA)
   ------------------------------------------------------------
   - Foto latar bertema komunikasi radio
   - Overlay biru transparan sesuai identitas ORARI
   - Judul besar + subjudul + lokasi + deskripsi
   - Tanpa tombol "Bergabung" karena ini website informasi resmi
   ============================================================ */
import Image from "next/image";
import { MapPin } from "lucide-react";
import { ORG_INFO } from "@/lib/orari-data";

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      aria-label="Beranda"
    >
      {/* =====================================================
          GAMBAR LATAR
      ====================================================== */}
      <Image
        src="/images/banner1.png"
        alt="Operator radio amatir dengan menara antena saat matahari terbenam"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* =====================================================
          OVERLAY BIRU
          Nuansa biru Hero lama tetap dipertahankan.
      ====================================================== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/90 via-[#003366]/75 to-[#001f3f]/85" />

      {/* Pola sangat halus */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />

      {/* =====================================================
          KONTEN HERO
          Seluruh komposisi dibuat lebih kecil dan sedikit
          lebih ke tengah.
      ====================================================== */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl text-center">
          {/* =================================================
              JUDUL
          ================================================== */}
          <h1 className="font-heading font-extrabold leading-[0.92] drop-shadow-lg">
            <span className="block text-3xl tracking-[0.15em] text-white sm:text-4xl lg:text-5xl">
              ORARI
            </span>

            <span className="mt-1 block text-3xl tracking-tight text-red-500 sm:text-4xl lg:text-5xl">
              LOKAL MAJENE
            </span>
          </h1>

          {/* =================================================
              SUBJUDUL
          ================================================== */}
          <p className="mt-4 text-sm font-semibold tracking-[0.08em] text-white/90 sm:text-base">
            YH8FB · CLUB STATION
          </p>

          {/* =================================================
              KALIMAT UTAMA
          ================================================== */}
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            Komunikasi, teknologi, dan pengabdian amatir radio.
          </p>

          {/* =================================================
              LOKASI
          ================================================== */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/75 sm:text-sm">
            <MapPin size={15} className="shrink-0 text-[#ff6b6b]" />

            <span>
              {ORG_INFO.region} — {ORG_INFO.province}
            </span>
          </div>

          {/* =================================================
              GARIS AKSEN
          ================================================== */}
          <div className="mx-auto mt-5 h-0.5 w-28 rounded-full bg-gradient-to-r from-[#B30000] via-[#ff4d4d] to-transparent" />

          {/* =================================================
              PANEL RADIO
          ================================================== */}
          <div className="mx-auto mt-5 w-full max-w-md overflow-hidden rounded-xl border border-white/[0.08] bg-[#00152d]/25 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md">
            {/* ===============================================
                ON AIR
            ================================================ */}
            <div className="px-3 pt-1.5 pb-1">
              <div className="flex items-center justify-center gap-2.5">
                {/* Gelombang kiri */}
                <div className="flex h-4 w-[75px] items-center justify-end gap-[2px] overflow-hidden">
                  {[5, 9, 13, 7, 11, 6, 9, 5].map((height, index) => (
                    <span
                      key={`left-${index}`}
                      className="w-[2px] rounded-full bg-sky-300/65 animate-pulse"
                      style={{
                        height: `${height}px`,
                        animationDelay: `${index * 60}ms`,
                        animationDuration: "1.3s",
                      }}
                    />
                  ))}
                </div>

                {/* ON AIR */}
                <div className="flex shrink-0 items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
                  </span>

                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-red-400 sm:text-sm">
                    ON AIR
                  </span>
                </div>

                {/* Gelombang kanan */}
                <div className="flex h-4 w-[75px] items-center justify-start gap-[2px] overflow-hidden">
                  {[5, 9, 13, 7, 11, 6, 9, 5].map((height, index) => (
                    <span
                      key={`right-${index}`}
                      className="w-[2px] rounded-full bg-sky-300/65 animate-pulse"
                      style={{
                        height: `${height}px`,
                        animationDelay: `${index * 60}ms`,
                        animationDuration: "1.3s",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ===============================================
                INFORMASI RADIO

                YH8FB       BASE STATION       145.250 MHz
                YH8FBR      REPEATER - RPU      146.620 MHz
            ================================================ */}
            <div className="grid grid-cols-3 border-t border-white/[0.07]">
              {/* KOLOM CALLSIGN */}
              <div className="px-3 py-2 text-left">
                <div className="text-[10px] font-semibold leading-5 text-white sm:text-xs">
                  YH8FB
                </div>

                <div className="text-[10px] font-semibold leading-5 text-white sm:text-xs">
                  YH8FBR
                </div>
              </div>

              {/* KOLOM JENIS STASIUN */}
              <div className="border-x border-white/[0.07] px-2 py-2 text-center">
                <div className="text-[9px] font-semibold leading-5 uppercase tracking-[0.08em] text-sky-200/85 sm:text-[10px]">
                  BASE STATION
                </div>

                <div className="text-[9px] font-semibold leading-5 uppercase tracking-[0.08em] text-red-300/75 sm:text-[10px]">
                  REPEATER - RPU
                </div>
              </div>

              {/* KOLOM FREKUENSI */}
              <div className="px-3 py-2 text-right">
                <div className="text-[10px] font-medium leading-5 text-white/90 sm:text-xs">
                  145.250 MHz
                </div>

                <div className="text-[10px] font-medium leading-5 text-white/90 sm:text-xs">
                  146.620 MHz
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}
      <a
        href="#profil"
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/55 transition-colors hover:text-white"
        aria-label="Gulir ke bawah"
      >
        <span className="text-[9px] uppercase tracking-[0.22em]">Scroll</span>

        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/40 p-1">
          <span className="h-1.5 w-1 rounded-full bg-white animate-bounce" />
        </span>
      </a>
    </section>
  );
}

export default Hero;

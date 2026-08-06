/* ============================================================
   SECTION HERO (BERANDA)
   ------------------------------------------------------------
   - Foto latar bertema komunikasi radio
   - Overlay biru transparan sesuai identitas ORARI
   - Judul besar + subjudul + lokasi + deskripsi
   - Tanpa tombol "Bergabung" karena ini website informasi resmi
   ============================================================ */
import Image from "next/image";
import { MapPin, Radio } from "lucide-react";
import { ORG_INFO } from "@/lib/orari-data";

export function Hero() {
  return (
    <section
      id="beranda"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      aria-label="Beranda"
    >
      {/* ====== Gambar Latar ====== */}
      <Image
        src="/images/banner1.png"
        alt="Operator radio amatir dengan menara antena saat matahari terbenam"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* ====== Overlay Biru Transparan ====== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#003366]/90 via-[#003366]/75 to-[#001f3f]/85" />
      {/* Pola gelombang halus di pojok */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* ====== Konten Hero ====== */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Badge kecil */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-sm text-white/90 mb-6">
            <Radio size={14} className="text-white" />
            <span className="font-medium">
              {ORG_INFO.region}, {ORG_INFO.province}
            </span>
          </div>

          {/* Judul Besar */}
          <h1 className="font-heading font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight drop-shadow-lg">
            ORARI Lokal Majene
          </h1>

          {/* Subjudul */}
          <p className="mt-3 text-lg sm:text-xl text-white/90 font-medium">
            {ORG_INFO.fullName}
          </p>

          {/* Lokasi */}
          <div className="mt-4 flex items-center gap-2 text-white/80">
            <MapPin size={18} className="text-[#ff6b6b]" />
            <span>
              {ORG_INFO.region} — {ORG_INFO.province}
            </span>
          </div>

          {/* Garis pemisah */}
          <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#B30000] to-transparent" />

          {/* Deskripsi */}
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/85 max-w-2xl">
            {ORG_INFO.description}
          </p>
        </div>
      </div>

      {/* ====== Indikator Scroll (panah ke bawah) ====== */}
      <a
        href="#profil"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        aria-label="Gulir ke bawah"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border-2 border-white/50 p-1">
          <span className="h-2 w-1 rounded-full bg-white animate-bounce" />
        </span>
      </a>
    </section>
  );
}

export default Hero;

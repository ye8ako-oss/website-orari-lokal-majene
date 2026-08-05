/* ============================================================
   SECTION CORE
   ------------------------------------------------------------
   CORE = Communication In Rescue & Emergency
   Satuan tugas ORARI yang menangani komunikasi pada situasi
   penyelamatan dan keadaan darurat.

   Berisi: Pengertian, Tujuan, Fungsi, Ruang Lingkup,
   Peralatan, Kegiatan, Dokumentasi, Mitra Kerja.

   Menggunakan ikon: Radio, Emergency, Rescue, Disaster,
   Communication.
   ============================================================ */
import {
  Radio,
  Siren,
  LifeBuoy,
  CloudRain,
  Satellite,
  Wrench,
  CalendarDays,
  Handshake,
  Info,
  Target,
  Settings,
} from "lucide-react";
import { CORE_DATA } from "@/lib/orari-data";
import { ScrollReveal } from "./scroll-reveal";

export function Core() {
  return (
    <section
      id="core"
      className="relative py-20 sm:py-24 scroll-mt-20 overflow-hidden bg-[#003366]"
    >
      {/* Pola gelombang halus di latar */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      {/* Aksen gradien merah */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#B30000]/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#1a4d80]/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ====== Header Section ====== */}
        <ScrollReveal variant="fade" className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="h-px w-6 bg-[#ff6b6b]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#ff6b6b]">
              Satuan Tugas Khusus
            </span>
            <span className="h-px w-6 bg-[#ff6b6b]" />
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white">
            {CORE_DATA.title}
          </h2>
          <p className="mt-3 text-lg text-white/80 font-medium">
            {CORE_DATA.subtitle}
          </p>
          <p className="mt-5 text-white/75 leading-relaxed">
            {CORE_DATA.pengertian}
          </p>
        </ScrollReveal>

        {/* ====== Grid Ikon Kategori CORE ====== */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { icon: Radio, label: "Radio" },
            { icon: Siren, label: "Emergency" },
            { icon: LifeBuoy, label: "Rescue" },
            { icon: CloudRain, label: "Disaster" },
            { icon: Satellite, label: "Communication" },
          ].map((item, idx) => (
            <ScrollReveal key={item.label} variant="zoom" delay={idx * 80}>
              <div className="flex flex-col items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-colors">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B30000] text-white">
                  <item.icon size={22} />
                </span>
                <span className="text-sm font-medium text-white/90">{item.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ====== Detail CORE (Tujuan, Fungsi, Ruang Lingkup, Peralatan, Kegiatan) ====== */}
        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {/* Tujuan */}
          <ScrollReveal variant="up">
            <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#B30000] text-white">
                  <Target size={20} />
                </span>
                <h3 className="font-heading font-semibold text-white text-lg">Tujuan</h3>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">{CORE_DATA.tujuan}</p>
            </div>
          </ScrollReveal>

          {/* Fungsi */}
          <ScrollReveal variant="up" delay={80}>
            <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#B30000] text-white">
                  <Info size={20} />
                </span>
                <h3 className="font-heading font-semibold text-white text-lg">Fungsi</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                {CORE_DATA.fungsi.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#ff6b6b] mt-1 shrink-0">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Ruang Lingkup */}
          <ScrollReveal variant="up" delay={160}>
            <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#B30000] text-white">
                  <CloudRain size={20} />
                </span>
                <h3 className="font-heading font-semibold text-white text-lg">Ruang Lingkup</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                {CORE_DATA.ruangLingkup.map((r, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#ff6b6b] mt-1 shrink-0">●</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Peralatan */}
          <ScrollReveal variant="up">
            <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#B30000] text-white">
                  <Wrench size={20} />
                </span>
                <h3 className="font-heading font-semibold text-white text-lg">Peralatan</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                {CORE_DATA.peralatan.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <Settings size={14} className="text-[#ff6b6b] mt-1 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Kegiatan */}
          <ScrollReveal variant="up" delay={80}>
            <div className="h-full rounded-2xl bg-white/5 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#B30000] text-white">
                  <CalendarDays size={20} />
                </span>
                <h3 className="font-heading font-semibold text-white text-lg">Kegiatan</h3>
              </div>
              <ul className="space-y-2 text-sm text-white/80">
                {CORE_DATA.kegiatan.map((k, i) => (
                  <li key={i} className="flex gap-2">
                    <CalendarDays size={14} className="text-[#ff6b6b] mt-1 shrink-0" />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Dokumentasi */}
          <ScrollReveal variant="up" delay={160}>
            <div className="h-full rounded-2xl bg-gradient-to-br from-[#B30000]/30 to-[#003366]/30 border border-[#B30000]/30 p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#B30000]">
                  <Satellite size={20} />
                </span>
                <h3 className="font-heading font-semibold text-white text-lg">Dokumentasi</h3>
              </div>
              <p className="text-sm text-white/80 leading-relaxed">
                Dokumentasi kegiatan CORE ORARI Lokal Majene dapat dilihat pada
                galeri kegiatan. Setiap aktivasi posko dan latihan komunikasi
                darurat tercatat sebagai bahan evaluasi dan pelaporan.
              </p>
              <a
                href="#galeri"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-[#ff6b6b] transition-colors"
              >
                Lihat Galeri →
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* ====== Mitra Kerja CORE ====== */}
        <ScrollReveal variant="fade" className="mt-14">
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#B30000] text-white">
                <Handshake size={20} />
              </span>
              <h3 className="font-heading font-semibold text-white text-lg">Mitra Kerja</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CORE_DATA.mitraKerja.map((m, i) => (
                <div
                  key={i}
                  className="rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-center text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
                >
                  {m}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Core;

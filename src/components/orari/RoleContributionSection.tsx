"use client";

import {
  Radio,
  Building2,
  GraduationCap,
  HeartHandshake,
  RadioTower,
} from "lucide-react";

const roles = [
  {
    number: "01",
    title: "Komunikasi Darurat",
    description:
      "Mendukung komunikasi saat bencana dan keadaan darurat ketika sarana komunikasi umum mengalami gangguan.",
    icon: Radio,
  },
  {
    number: "02",
    title: "Mitra Pemerintah",
    description:
      "Berkolaborasi dengan pemerintah daerah dan instansi terkait dalam berbagai kegiatan pelayanan masyarakat.",
    icon: Building2,
  },
  {
    number: "03",
    title: "Pembinaan Anggota",
    description:
      "Meningkatkan kompetensi anggota melalui pelatihan, edukasi radio amatir, dan pengembangan keterampilan komunikasi.",
    icon: GraduationCap,
  },
  {
    number: "04",
    title: "Pengabdian Masyarakat",
    description:
      "Berpartisipasi dalam kegiatan sosial, kemanusiaan, dan program yang memberikan manfaat langsung bagi masyarakat.",
    icon: HeartHandshake,
  },
  {
    number: "05",
    title: "Kesiapsiagaan Komunikasi",
    description:
      "Menjaga kesiapan jaringan komunikasi alternatif yang dapat digunakan dalam berbagai kondisi dan situasi darurat.",
    icon: RadioTower,
  },
];

export default function RoleContributionSection() {
  return (
    <section
      aria-labelledby="role-contribution-title"
      className="relative overflow-hidden bg-[#003366] py-20 sm:py-24"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('/images/banne2.png')",
        }}
      />

      {/* Overlay — biru dibuat lebih ringan */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#003366]/55 via-[#003366]/40 to-[#001f3f]/60"
      />

      {/* ============================================================
          ORNAMEN RADIO WAVE — SANGAT SAMAR
          ============================================================ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Gelombang kiri */}
        <div className="absolute -left-24 top-16 h-[420px] w-[420px] rounded-full border border-white/[0.035]" />

        <div className="absolute -left-16 top-28 h-[350px] w-[350px] rounded-full border border-white/[0.035]" />

        <div className="absolute -left-8 top-40 h-[280px] w-[280px] rounded-full border border-white/[0.035]" />

        {/* Gelombang kanan */}
        <div className="absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full border border-[#B30000]/[0.08]" />

        <div className="absolute -right-16 bottom-8 h-[350px] w-[350px] rounded-full border border-[#B30000]/[0.06]" />

        <div className="absolute -right-8 bottom-16 h-[280px] w-[280px] rounded-full border border-[#B30000]/[0.05]" />
      </div>

      {/* ============================================================
          CONTENT
          ============================================================ */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============================================================
            HEADER SECTION
            ============================================================ */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <p className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-yellow-300 backdrop-blur-sm sm:text-xs">
            Pengabdian untuk Masyarakat
          </p>

          {/* Judul */}
          <h2
            id="role-contribution-title"
            className="font-heading mt-5 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:whitespace-nowrap lg:text-4xl"
          >
            Peran dan Pengabdian <span className="text-[#B30000]">ORARI</span>{" "}
            Lokal Majene
          </h2>

          {/* Aksen */}
          <div className="mx-auto mt-5 flex items-center justify-center gap-1.5">
            <span className="h-1 w-10 rounded-full bg-white/70" />
            <span className="h-1 w-16 rounded-full bg-[#B30000]" />
            <span className="h-1 w-10 rounded-full bg-yellow-300/80" />
          </div>

          {/* Deskripsi */}
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
            Sebagai organisasi radio amatir yang berorientasi pada pengabdian,
            ORARI Lokal Majene berperan aktif dalam mendukung komunikasi
            darurat, kegiatan sosial, pembinaan anggota, dan pelayanan kepada
            masyarakat.
          </p>
        </div>

        {/* ============================================================
            5 CARD
            ============================================================ */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <article
                key={role.number}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/[0.97] p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-yellow-300/40 hover:shadow-2xl"
              >
                {/* Aksen atas */}
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#003366] via-[#B30000] to-yellow-400 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Nomor */}
                <span className="absolute right-5 top-5 font-heading text-xs font-bold tracking-[0.18em] text-slate-300 transition-colors duration-300 group-hover:text-[#B30000]/50">
                  {role.number}
                </span>

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#003366]/10 text-[#003366] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#003366] group-hover:text-white">
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                {/* Judul */}
                <h3 className="font-heading mt-6 text-lg font-bold leading-snug text-slate-900">
                  {role.title}
                </h3>

                {/* Garis aksen */}
                <div className="mt-4 h-1 w-10 rounded-full bg-[#B30000] transition-all duration-300 group-hover:w-16" />

                {/* Deskripsi */}
                <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
                  {role.description}
                </p>

                {/* Aksen bawah */}
                <div className="mt-6 flex items-center gap-1">
                  <span className="h-1 w-5 rounded-full bg-[#003366]" />
                  <span className="h-1 w-2 rounded-full bg-[#B30000]" />
                  <span className="h-1 w-1 rounded-full bg-yellow-400" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

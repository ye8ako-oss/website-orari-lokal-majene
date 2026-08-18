/* ============================================================
   SECTION PROFIL
   ------------------------------------------------------------
   Desain dua kolom:
   - Kiri : foto kegiatan ORARI
   - Kanan: Tentang, Sejarah, Visi, Misi, Tujuan, Nilai
   ============================================================ */
import Image from "next/image";
import { Target, Eye, Flag, Heart } from "lucide-react";
import { PROFIL } from "@/lib/orari-data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";

export function Profil() {
  return (
    <section id="profil" className="py-20 sm:py-24 bg-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Profil Organisasi"
          title="Tentang ORARI Lokal Majene"
          description="Mengenal lebih dekat organisasi amatir radio resmi di Kabupaten Majene, Sulawesi Barat."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* ====== KOLOM KIRI: Foto Kegiatan ====== */}
          <ScrollReveal variant="left" className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/profile-kegiatan.jpg"
                alt="Kegiatan ORARI Lokal Majene di lapangan"
                width={1344}
                height={768}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="w-full h-[420px] sm:h-[520px] object-cover"
              />
              {/* Overlay gradien biru */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/60 via-transparent to-transparent" />
              {/* Label foto */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white font-semibold text-lg drop-shadow">
                  Kegiatan Komunikasi Radio Amatir
                </p>
                <p className="text-white/80 text-sm">
                  Kabupaten Majene, Sulawesi Barat
                </p>
              </div>
            </div>
            {/* Aksen merah di pojok */}
            <div className="absolute -top-3 -left-3 h-20 w-20 border-t-4 border-l-4 border-[#B30000] rounded-tl-2xl -z-0" />
          </ScrollReveal>

          {/* ====== KOLOM KANAN: Konten Profil ====== */}
          <ScrollReveal variant="right" className="space-y-6">
            {/* Tentang */}
            <div>
              <h3 className="font-heading font-semibold text-xl text-[#003366] mb-2">
                Tentang Organisasi
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {PROFIL.tentang}
              </p>
            </div>

            {/* Sejarah */}
            <div className="rounded-xl bg-muted/50 border border-border p-5">
              <h3 className="font-heading font-semibold text-lg text-[#003366] mb-2">
                Sejarah Singkat
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {PROFIL.sejarah}
              </p>
            </div>

            {/* Visi & Misi */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Visi */}
              <div className="rounded-xl border border-[#003366]/15 bg-[#003366]/[0.03] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#003366] text-white">
                    <Eye size={18} />
                  </span>
                  <h4 className="font-heading font-semibold text-[#003366]">
                    Visi
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {PROFIL.visi}
                </p>
              </div>
              {/* Misi */}
              <div className="rounded-xl border border-[#003366]/15 bg-[#003366]/[0.03] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#003366] text-white">
                    <Target size={18} />
                  </span>
                  <h4 className="font-heading font-semibold text-[#003366]">
                    Misi
                  </h4>
                </div>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {PROFIL.misi.map((m, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-[#B30000] mt-1 shrink-0">•</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tujuan */}
            <div className="rounded-xl border border-border p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#B30000] text-white">
                  <Flag size={18} />
                </span>
                <h4 className="font-heading font-semibold text-[#003366]">
                  Tujuan Organisasi
                </h4>
              </div>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                {PROFIL.tujuan.map((t, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#B30000] font-bold mt-0.5 shrink-0">
                      {i + 1}.
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nilai Organisasi */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#003366] text-white">
                  <Heart size={18} />
                </span>
                <h4 className="font-heading font-semibold text-[#003366]">
                  Nilai Organisasi
                </h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {PROFIL.nilai.map((n, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border p-3 hover:border-[#003366]/40 hover:shadow-sm transition-all"
                  >
                    <p className="font-semibold text-[#003366] text-sm">
                      {n.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {n.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default Profil;

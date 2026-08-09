/* ============================================================
   SECTION BERITA
   ------------------------------------------------------------
   Menampilkan tiga berita terbaru. Setiap berita terdiri dari
   foto, judul, tanggal, ringkasan, dan tombol "Baca Selengkapnya".
   ============================================================ */
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import { BERITA } from "@/lib/orari-data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";

export function Berita() {
  return (
    <section id="berita" className="py-20 sm:py-24 bg-muted/40 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Informasi Terkini"
          title="Berita & Kegiatan"
          description="Ikuti kabar terbaru seputar kegiatan dan informasi ORARI Lokal Majene."
        />

        {/* Grid berita */}
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {BERITA.map((item, idx) => (
            <ScrollReveal key={item.title} variant="up" delay={idx * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white border border-border shadow-sm hover:shadow-xl transition-all duration-300">
                {/* Foto berita */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Tanggal badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur px-3 py-1 text-xs font-medium text-[#003366] shadow">
                    <Calendar size={12} className="text-[#B30000]" />
                    {item.date}
                  </div>
                </div>

                {/* Konten berita */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading font-semibold text-[#003366] text-lg leading-snug line-clamp-2 group-hover:text-[#B30000] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {item.excerpt}
                  </p>
                  {/* Tombol baca selengkapnya */}
                  <a
                    href="/berita/hut-orari-58"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#003366] hover:text-[#B30000] transition-colors"
                  >
                    Baca Selengkapnya
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </a>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Berita;

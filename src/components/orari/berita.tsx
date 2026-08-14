/* ============================================================
   BERANDA — BERITA + BANNER/PENGUMUMAN + PORTAL
   ------------------------------------------------------------
   Berita berada di sisi kiri. Banner/pengumuman dan portal
   berada di sisi kanan agar beranda tetap ringkas.
   ============================================================ */
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { BERITA } from "@/lib/orari-data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { Portal } from "./portal";

export function Berita() {
  const latest = BERITA.slice(0, 3);

  return (
    <section
      id="berita"
      className="scroll-mt-20 bg-slate-50 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.75fr)] lg:items-start lg:gap-12">
          {/* ==================================================
              KIRI — BERITA TERKINI
              ================================================== */}
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Informasi Terkini"
              title="Berita Terkini"
              description="Ikuti kabar terbaru seputar kegiatan ORARI Lokal Majene."
              align="left"
              className="max-w-xl"
            />

            <div className="mt-8 space-y-5">
              {latest.map((item, idx) => (
                <ScrollReveal
                  key={`${item.title}-${idx}`}
                  variant="up"
                  delay={idx * 80}
                >
                  <article className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[minmax(220px,0.9fr)_minmax(0,1.1fr)]">
                    <div className="relative min-h-[220px] overflow-hidden sm:min-h-[250px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 38vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="flex flex-col justify-center p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Calendar size={13} className="text-[#B30000]" />
                        <span>{item.date}</span>
                      </div>

                      <h3 className="mt-3 font-heading text-xl font-bold leading-snug text-[#003366] transition-colors group-hover:text-[#B30000] sm:text-2xl">
                        {item.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {item.excerpt}
                      </p>

                      <a
                        href="/berita/hut-orari-58"
                        className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#003366] transition-colors hover:text-[#B30000]"
                      >
                        Baca Selengkapnya
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </a>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-6">
              <a
                href="#berita"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#003366] transition-colors hover:text-[#B30000]"
              >
                Lihat semua berita
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* ==================================================
              KANAN — BANNER/PENGUMUMAN + PORTAL
              ================================================== */}
          <aside className="min-w-0 lg:pt-[2px]">
            <ScrollReveal variant="right">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B30000]">
                      Pengumuman
                    </p>
                    <h3 className="mt-0.5 font-heading text-lg font-bold text-[#003366]">
                      Hari Jadi Majene 481
                    </h3>
                  </div>
                </div>

                <div className="relative bg-slate-100">
                  <Image
                    src="/images/banner-hjm481.png"
                    alt="Banner Hari Jadi Majene ke-481 tahun 2026 dari ORARI Lokal Majene"
                    width={1024}
                    height={1536}
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="h-auto max-h-[240px] w-full object-contain sm:max-h-[320px] lg:max-h-none"
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right" delay={100} className="mt-7">
              <Portal />
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Berita;

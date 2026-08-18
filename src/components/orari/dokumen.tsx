/* ============================================================
   SECTION DOKUMEN
   ------------------------------------------------------------
   Daftar dokumen resmi organisasi: AD/ART, MoU, PKS, Peraturan,
   Surat Edaran, Formulir, Panduan, dan dokumen lainnya.
   Setiap item memakai ikon PDF.
   ============================================================ */
import { FileText, Eye } from "lucide-react";
import { DOKUMEN } from "@/lib/orari-data";
import { getIcon } from "./icon-map";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";

export function Dokumen() {
  return (
    <section id="dokumen" className="py-20 sm:py-24 bg-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pusat Dokumen"
          title="Dokumen Resmi Organisasi"
          description="Akses berbagai dokumen resmi ORARI Lokal Majene yang dapat diunduh oleh anggota, mitra kerja, dan masyarakat."
        />

        {/* Grid dokumen */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DOKUMEN.map((item, idx) => {
            const Icon = getIcon(item.icon);
            return (
              <ScrollReveal key={item.title} variant="up" delay={idx * 60}>
                <a
                  href={item.url || "#dokumen"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-white p-5 hover:border-[#003366]/40 hover:shadow-lg transition-all duration-300"
                >
                  {/* Header: ikon dokumen + badge PDF */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#003366]/5 text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-colors duration-300">
                      <Icon size={24} />
                    </span>
                    {/* Badge PDF */}
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#B30000]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#B30000]">
                      <FileText size={11} />
                      PDF
                    </span>
                  </div>

                  <h3 className="font-heading font-semibold text-[#003366] text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed flex-1">
                    {item.desc}
                  </p>

                  {/* Tombol unduh */}
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#003366] group-hover:text-[#B30000] transition-colors">
                    <Eye size={13} />
                    Lihat Dokumen
                  </span>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Dokumen;

/* ============================================================
   SECTION LAYANAN
   ------------------------------------------------------------
   Kartu layanan keanggotaan dan administrasi ORARI:
   UNAR, IAR, KTA, SIORDIG, ORARI Pusat, Download Formulir,
   Peraturan & Pedoman, serta Informasi Frekuensi.
   ============================================================ */
import { ArrowUpRight } from "lucide-react";
import { LAYANAN } from "@/lib/orari-data";
import { getIcon } from "./icon-map";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";

export function Layanan() {
  return (
    <section id="layanan" className="py-20 sm:py-24 bg-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Layanan & Informasi"
          title="Layanan ORARI Lokal Majene"
          description="Berbagai layanan keanggotaan, administrasi, dan informasi resmi yang dapat diakses oleh anggota maupun masyarakat umum."
        />

        {/* Grid kartu layanan */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LAYANAN.map((item, idx) => {
            const Icon = getIcon(item.icon);
            return (
              <ScrollReveal key={item.title} variant="up" delay={idx * 60}>
                <a
                  href="#kontak"
                  className="group block h-full rounded-2xl border border-border bg-white p-6 hover:border-[#003366]/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  {/* Aksen garis atas saat hover */}
                  <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#003366] to-[#B30000] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                  <div className="flex items-start justify-between mb-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#003366]/5 text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-colors duration-300">
                      <Icon size={24} />
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="text-muted-foreground group-hover:text-[#B30000] group-hover:rotate-45 transition-all duration-300"
                    />
                  </div>

                  <h3 className="font-heading font-semibold text-[#003366] text-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Layanan;

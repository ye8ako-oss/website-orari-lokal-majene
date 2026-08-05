/* ============================================================
   SECTION FUNGSI ORARI
   ------------------------------------------------------------
   Menampilkan fungsi ORARI sebagai organisasi amatir radio
   sesuai AD/ART dan ketentuan nasional. Setiap fungsi
   ditampilkan dalam kartu dengan ikon modern.
   ============================================================ */
import { FUNGSI_ORARI } from "@/lib/orari-data";
import { getIcon } from "./icon-map";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";

export function Fungsi() {
  return (
    <section id="fungsi" className="py-20 sm:py-24 bg-muted/40 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Peran & Fungsi"
          title="Fungsi ORARI"
          description="Fungsi ORARI sebagai organisasi amatir radio sesuai AD/ART ORARI dan ketentuan nasional yang berlaku."
        />

        {/* Grid kartu fungsi */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FUNGSI_ORARI.map((item, idx) => {
            const Icon = getIcon(item.icon);
            return (
              <ScrollReveal key={item.title} variant="up" delay={idx * 80}>
                <article className="group h-full rounded-2xl bg-white border border-border p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {/* Ikon dalam lingkaran */}
                  <div className="relative mb-4">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#003366] to-[#1a4d80] text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Icon size={26} />
                    </span>
                    {/* Titik aksen merah */}
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#B30000] ring-2 ring-white" />
                  </div>
                  {/* Nomor urut */}
                  <span className="text-xs font-bold text-[#B30000] tracking-widest">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 font-heading font-semibold text-lg text-[#003366]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Fungsi;

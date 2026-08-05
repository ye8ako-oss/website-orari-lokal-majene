/* ============================================================
   SECTION INFORMASI ORGANISASI
   ------------------------------------------------------------
   Panel informasi teknis radio ORARI Lokal Majene:
   Callsign, Base Station, Repeater, Offset, dan Wilayah.
   ============================================================ */
import { Radio, Signal, Waves, MapPin, Antenna, Gauge } from "lucide-react";
import { ORG_INFO } from "@/lib/orari-data";
import { ScrollReveal } from "./scroll-reveal";

/* Daftar informasi yang ditampilkan di panel */
const INFO_ITEMS = [
  { icon: Radio, label: "Callsign Lokal", value: ORG_INFO.callsign, highlight: true },
  { icon: Antenna, label: "Base Station", value: ORG_INFO.baseStation },
  { icon: Waves, label: "Repeater", value: ORG_INFO.repeater },
  { icon: Gauge, label: "Offset", value: ORG_INFO.offset },
  { icon: Signal, label: "Mode", value: "FM / Voice" },
  { icon: MapPin, label: "Wilayah", value: ORG_INFO.wilayah },
];

export function Informasi() {
  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Panel utama dengan gradien biru ORARI */}
        <ScrollReveal variant="up">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#003366] via-[#0a2a4a] to-[#001f3f] p-8 sm:p-12 shadow-2xl">
            {/* Pola gelombang dekoratif */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20" />
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#B30000]/15 blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-[1fr_2fr] gap-8 items-center">
              {/* Kiri: judul panel */}
              <div>
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="h-px w-6 bg-[#ff6b6b]" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#ff6b6b]">
                    Informasi Teknis
                  </span>
                </div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white leading-tight">
                  Informasi Organisasi
                </h2>
                <p className="mt-3 text-white/75 text-sm leading-relaxed">
                  Data callsign dan frekuensi resmi ORARI Lokal Majene untuk
                  komunikasi radio amatir di wilayah Kabupaten Majene.
                </p>
              </div>

              {/* Kanan: grid informasi */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {INFO_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-xl border p-4 transition-colors ${
                      item.highlight
                        ? "bg-[#B30000]/20 border-[#B30000]/40"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <item.icon size={16} className="text-[#ff6b6b]" />
                      <span className="text-xs font-medium uppercase tracking-wide text-white/60">
                        {item.label}
                      </span>
                    </div>
                    <p
                      className={`font-heading font-bold ${
                        item.highlight ? "text-2xl text-white" : "text-lg text-white"
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Informasi;

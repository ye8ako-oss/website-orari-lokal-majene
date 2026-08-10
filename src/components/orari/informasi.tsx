import { Radio, Signal, Waves, MapPin, Antenna, Gauge } from "lucide-react";

import { ORG_INFO } from "@/lib/orari-data";
import { ScrollReveal } from "./scroll-reveal";

const INFO_ITEMS = [
  {
    icon: Radio,
    label: "Callsign Lokal",
    value: ORG_INFO.callsign,
    highlight: true,
  },
  {
    icon: Antenna,
    label: "Base Station",
    value: ORG_INFO.baseStation,
  },
  {
    icon: Waves,
    label: "Repeater",
    value: ORG_INFO.repeater,
  },
  {
    icon: Gauge,
    label: "Offset",
    value: ORG_INFO.offset,
  },
  {
    icon: Signal,
    label: "Mode",
    value: "FM / Voice",
  },
  {
    icon: MapPin,
    label: "Wilayah",
    value: ORG_INFO.wilayah,
  },
];

export function Informasi() {
  return (
    <section id="informasi" className="scroll-mt-24 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#003b66] via-[#063b66] to-[#17213f] p-6 shadow-xl sm:p-8">
            {/* Dekorasi */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/5" />

            <div className="relative z-10 grid min-w-0 items-center gap-8 lg:grid-cols-[1fr_2fr]">
              {/* KIRI — JUDUL */}
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2">
                  <span className="h-px w-6 bg-[#ff6b6b]" />

                  <span className="text-xs font-semibold uppercase tracking-widest text-[#ff6b6b]">
                    Informasi Teknis
                  </span>
                </div>

                <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-white">
                  Informasi
                  <br />
                  Organisasi
                </h2>

                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
                  Data callsign dan frekuensi resmi ORARI Lokal Majene untuk
                  komunikasi radio amatir di wilayah Kabupaten Majene.
                </p>
              </div>

              {/* KANAN — DATA INFORMASI */}
              <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {INFO_ITEMS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className={`min-w-0 rounded-xl border p-4 ${
                        item.highlight
                          ? "border-[#B30000]/40 bg-[#B30000]/20"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <Icon size={16} className="shrink-0 text-[#ff6b6b]" />

                        <span className="text-xs font-medium uppercase tracking-wide text-white/60">
                          {item.label}
                        </span>
                      </div>

                      <p
                        className={`break-words font-heading font-bold ${
                          item.highlight
                            ? "text-2xl text-white"
                            : "text-lg text-white"
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Informasi;

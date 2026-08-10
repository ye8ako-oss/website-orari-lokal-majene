/* ============================================================
   FOOTER
   ------------------------------------------------------------
   Ringkas tanpa menu navigasi. Informasi teknis radio yang
   sebelumnya berada di Portal dipindahkan ke sini.
   ============================================================ */
import {
  Radio,
  Antenna,
  Waves,
  Gauge,
  Signal,
  MapPin,
} from "lucide-react";
import { ORG_INFO } from "@/lib/orari-data";

const TECH_INFO = [
  { icon: Radio, label: "Callsign", value: ORG_INFO.callsign },
  { icon: Antenna, label: "Base Station", value: ORG_INFO.baseStation },
  { icon: Waves, label: "Repeater", value: ORG_INFO.repeater },
  { icon: Gauge, label: "Offset", value: ORG_INFO.offset },
  { icon: Signal, label: "Mode", value: "FM / Voice" },
  { icon: MapPin, label: "Wilayah", value: ORG_INFO.wilayah },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto bg-[#001f3f] text-white">
      <div className="h-1 bg-gradient-to-r from-[#003366] via-[#B30000] to-[#003366]" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ==================================================
            INFORMASI TEKNIS
            ================================================== */}
        <div className="border-b border-white/10 pb-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ff6b6b]">
                Informasi Teknis
              </p>
              <h2 className="mt-1 font-heading text-lg font-bold text-white">
                ORARI Lokal Majene
              </h2>
            </div>
            <p className="max-w-xl text-xs leading-5 text-white/55 sm:text-right">
              Informasi callsign, frekuensi, dan parameter komunikasi radio yang digunakan di wilayah Kabupaten Majene.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {TECH_INFO.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="shrink-0 text-[#ff6b6b]" />
                    <span className="truncate text-[10px] font-semibold uppercase tracking-wide text-white/45">
                      {item.label}
                    </span>
                  </div>
                  <p className="mt-2 truncate font-heading text-sm font-bold text-white">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================================================
            COPYRIGHT
            ================================================== */}
        <div className="flex flex-col gap-2 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} ORARI Lokal Majene</p>
          <p>Organisasi Amatir Radio Indonesia · Kabupaten Majene · Sulawesi Barat</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

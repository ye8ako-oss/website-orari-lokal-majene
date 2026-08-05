"use client";

/* ============================================================
   SECTION STATISTIK
   ------------------------------------------------------------
   Counter animation: angka naik dari 0 ke nilai target
   ketika section masuk viewport. Menampilkan jumlah anggota,
   kegiatan, mitra, dan operator.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Users, CalendarDays, Handshake, Headset } from "lucide-react";
import { STATISTIK } from "@/lib/orari-data";
import { useCounter } from "@/hooks/use-counter";
import { ScrollReveal } from "./scroll-reveal";

/* Ikon untuk tiap statistik */
const STAT_ICONS = [Users, CalendarDays, Handshake, Headset];

/* Kartu statistik individual dengan counter */
function StatCard({
  value,
  label,
  suffix,
  start,
  icon: Icon,
}: {
  value: number;
  label: string;
  suffix: string;
  start: boolean;
  icon: typeof Users;
}) {
  const count = useCounter(value, start);
  return (
    <div className="text-center">
      <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
        <Icon size={28} />
      </span>
      <div className="font-heading font-extrabold text-4xl sm:text-5xl text-white tabular-nums">
        {count}
        <span className="text-[#ff6b6b]">{suffix}</span>
      </div>
      <p className="mt-2 text-sm sm:text-base text-white/70 font-medium">{label}</p>
    </div>
  );
}

export function Statistik() {
  const [start, setStart] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Picu counter ketika section terlihat */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-[#B30000] overflow-hidden">
      {/* Pola dekoratif */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[#003366]/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal variant="fade" className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
            ORARI Lokal Majene dalam Angka
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATISTIK.map((stat, idx) => (
            <ScrollReveal key={stat.label} variant="up" delay={idx * 100}>
              <StatCard
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                start={start}
                icon={STAT_ICONS[idx]}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistik;

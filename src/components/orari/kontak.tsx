/* ============================================================
   KONTAK + LOKASI + FOTO KETUA
   ------------------------------------------------------------
   Dibuat ringkas agar bagian bawah beranda tidak memanjang.
   ============================================================ */
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Map,
} from "lucide-react";
import { ORG_INFO } from "@/lib/orari-data";
import { ScrollReveal } from "./scroll-reveal";

const SOCIAL_ICONS = [Facebook, Instagram, Youtube, MessageCircle];

export function Kontak() {
  const mapsQuery = encodeURIComponent(
    "Jl. AP. Pettarani, Labuang Utara, Banggae Timur, Majene, Sulawesi Barat",
  );
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <section id="kontak" className="scroll-mt-20 bg-white py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          {/* ==================================================
              KONTAK & LOKASI
              ================================================== */}
          <ScrollReveal variant="left">
            <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B30000]">
                    Hubungi Kami
                  </p>
                  <h2 className="mt-1 font-heading text-2xl font-bold text-[#003366] sm:text-3xl">
                    Kontak & Lokasi
                  </h2>
                </div>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#003366]/15 bg-white px-3.5 py-2 text-xs font-semibold text-[#003366] transition-colors hover:border-[#003366] hover:bg-[#003366] hover:text-white"
                >
                  <Map size={14} />
                  Buka Peta
                </a>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#003366]/10 text-[#003366]">
                      <MapPin size={17} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Sekretariat
                      </p>
                      <p className="mt-1 text-sm leading-5 text-slate-700">
                        {ORG_INFO.address.line1}, {ORG_INFO.address.line2},{" "}
                        {ORG_INFO.address.line3}, {ORG_INFO.address.line4},{" "}
                        {ORG_INFO.address.line5}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={`mailto:${ORG_INFO.email}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-[#003366]/20"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#003366]/10 text-[#003366]">
                      <Mail size={17} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Email
                      </p>
                      <p className="mt-1 break-all text-sm font-medium text-slate-700">
                        {ORG_INFO.email}
                      </p>
                    </div>
                  </div>
                </a>

                <div className="rounded-xl border border-slate-200 bg-white p-4 sm:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#B30000]/10 text-[#B30000]">
                        <Phone size={17} />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          WhatsApp
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Hubungi pengurus melalui nomor resmi berikut.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {ORG_INFO.whatsapp.map((wa) => (
                        <a
                          key={wa.value}
                          href={`https://wa.me/${wa.value}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/10 px-3 py-1.5 text-xs font-semibold text-[#1a7a3a] transition-colors hover:bg-[#25D366]/20"
                        >
                          <MessageCircle size={13} />
                          {wa.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <iframe
                  src={mapsEmbed}
                  title="Lokasi ORARI Lokal Majene di Google Maps"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-medium text-slate-500">
                  Ikuti Kami:
                </span>
                {ORG_INFO.social.map((s, idx) => {
                  const Icon = SOCIAL_ICONS[idx] ?? MessageCircle;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      aria-label={s.name}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#003366] ring-1 ring-slate-200 transition-colors hover:bg-[#003366] hover:text-white"
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* ==================================================
              FOTO KETUA
              ================================================== */}
          <ScrollReveal variant="right">
            <div className="relative h-full overflow-hidden rounded-2xl bg-[#001f3f]">
              <Image
                src="/images/foto-ketua.png"
                alt="Ketua ORARI Lokal Majene"
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-top"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#00152d] via-[#00152d]/15 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  Ketua
                </p>
                <h3 className="mt-1 font-heading text-2xl font-bold text-white">
                  ABD. MUNAJAT, SE.,MM
                </h3>
                <p className="mt-1 text-sm font-medium text-white/80">YG8GOR</p>
                <p className="mt-1 text-sm text-white/75">ORARI Lokal Majene</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default Kontak;

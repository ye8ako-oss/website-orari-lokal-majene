/* ============================================================
   SECTION KONTAK
   ------------------------------------------------------------
   - Alamat lengkap ORARI Lokal Majene
   - Email resmi
   - Nomor WhatsApp (klik untuk chat)
   - Google Maps embed
   - Ikon media sosial
   ============================================================ */
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Clock,
} from "lucide-react";
import { ORG_INFO } from "@/lib/orari-data";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";

/* Ikon media sosial */
const SOCIAL_ICONS = [Facebook, Instagram, Youtube, MessageCircle];

export function Kontak() {
  /* URL Google Maps embed untuk alamat ORARI Lokal Majene */
  const mapsQuery = encodeURIComponent(
    "Jl. AP. Pettarani, Labuang Utara, Banggae Timur, Majene, Sulawesi Barat"
  );
  const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <section id="kontak" className="py-20 sm:py-24 bg-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Hubungi Kami"
          title="Kontak & Lokasi"
          description="Silakan hubungi ORARI Lokal Majene melalui kontak resmi berikut atau kunjungi langsung sekretariat organisasi."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          {/* ====== KIRI: Informasi Kontak ====== */}
          <ScrollReveal variant="left" className="space-y-5">
            {/* Alamat */}
            <div className="flex gap-4 rounded-2xl border border-border p-5 hover:border-[#003366]/30 hover:shadow-sm transition-all">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#003366] text-white">
                <MapPin size={22} />
              </span>
              <div>
                <h3 className="font-heading font-semibold text-[#003366]">Alamat Sekretariat</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {ORG_INFO.address.line1}
                  <br />
                  {ORG_INFO.address.line2}
                  <br />
                  {ORG_INFO.address.line3}
                  <br />
                  {ORG_INFO.address.line4}
                  <br />
                  {ORG_INFO.address.line5}
                </p>
              </div>
            </div>

            {/* Email */}
            <a
              href={`mailto:${ORG_INFO.email}`}
              className="flex gap-4 rounded-2xl border border-border p-5 hover:border-[#003366]/30 hover:shadow-sm transition-all group"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#003366] text-white">
                <Mail size={22} />
              </span>
              <div>
                <h3 className="font-heading font-semibold text-[#003366]">Email Resmi</h3>
                <p className="mt-1 text-sm text-muted-foreground group-hover:text-[#B30000] transition-colors">
                  {ORG_INFO.email}
                </p>
              </div>
            </a>

            {/* WhatsApp */}
            <div className="flex gap-4 rounded-2xl border border-border p-5 hover:border-[#003366]/30 hover:shadow-sm transition-all">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#B30000] text-white">
                <Phone size={22} />
              </span>
              <div className="flex-1">
                <h3 className="font-heading font-semibold text-[#003366]">WhatsApp</h3>
                <div className="mt-1 flex flex-col sm:flex-row gap-2">
                  {ORG_INFO.whatsapp.map((wa) => (
                    <a
                      key={wa.value}
                      href={`https://wa.me/${wa.value}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366]/10 px-3 py-1.5 text-sm font-medium text-[#1a7a3a] hover:bg-[#25D366]/20 transition-colors"
                    >
                      <MessageCircle size={14} />
                      {wa.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="flex gap-4 rounded-2xl border border-border p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#003366] text-white">
                <Clock size={22} />
              </span>
              <div>
                <h3 className="font-heading font-semibold text-[#003366]">Jam Operasional</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Senin – Jumat: 08.00 – 16.00 WITA
                  <br />
                  Net Aliran Frekuensi: Setiap hari pukul 20.00 WITA
                </p>
              </div>
            </div>

            {/* Media Sosial */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-sm font-medium text-muted-foreground">Ikuti Kami:</span>
              {ORG_INFO.social.map((s, idx) => {
                const Icon = SOCIAL_ICONS[idx] ?? MessageCircle;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-[#003366] hover:bg-[#003366] hover:text-white transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </ScrollReveal>

          {/* ====== KANAN: Peta Google Maps ====== */}
          <ScrollReveal variant="right" className="relative">
            <div className="h-full min-h-[420px] rounded-2xl overflow-hidden border border-border shadow-md">
              <iframe
                src={mapsEmbed}
                title="Lokasi ORARI Lokal Majene di Google Maps"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 420 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            {/* Pin label di pojok peta */}
            <div className="absolute top-4 left-4 rounded-full bg-white shadow-md px-4 py-2 flex items-center gap-2">
              <MapPin size={16} className="text-[#B30000]" />
              <span className="text-sm font-semibold text-[#003366]">ORARI Lokal Majene</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default Kontak;

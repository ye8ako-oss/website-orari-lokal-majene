/* ============================================================
   FOOTER
   ------------------------------------------------------------
   Footer elegan berisi:
   - Logo ORARI + nama organisasi + alamat singkat
   - Menu singkat (navigasi cepat)
   - Media sosial
   - Hak cipta
   Back-to-top ditangani komponen terpisah (BackToTop).
   ============================================================ */
import {
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  MapPin,
  Mail,
  Radio,
} from "lucide-react";
import { OrariLogo } from "./logo";
import { ORG_INFO, NAV_MENU } from "@/lib/orari-data";

const SOCIAL_ICONS = [Facebook, Instagram, Youtube, MessageCircle];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#001f3f] text-white mt-auto">
      {/* Garis aksen merah di atas footer */}
      <div className="h-1 bg-gradient-to-r from-[#003366] via-[#B30000] to-[#003366]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* ====== KOLOM 1: Logo + Nama + Alamat ====== */}
          <div>
            <div className="flex items-center gap-3">
              <OrariLogo size={48} />
              <div>
                <p className="font-heading font-bold text-lg leading-tight">
                  ORARI Lokal Majene
                </p>
                <p className="text-xs text-white/60">Organisasi Amatir Radio Indonesia</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Media informasi resmi ORARI Lokal Majene — wadah pembinaan dan
              pengembangan amatir radio di Kabupaten Majene, Sulawesi Barat.
            </p>
            {/* Alamat singkat */}
            <div className="mt-4 flex items-start gap-2 text-sm text-white/60">
              <MapPin size={16} className="mt-0.5 shrink-0 text-[#ff6b6b]" />
              <span>
                {ORG_INFO.address.line1}, {ORG_INFO.address.line2},
                <br />
                {ORG_INFO.address.line3}, {ORG_INFO.address.line4}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-white/60">
              <Mail size={16} className="text-[#ff6b6b]" />
              <a
                href={`mailto:${ORG_INFO.email}`}
                className="hover:text-white transition-colors"
              >
                {ORG_INFO.email}
              </a>
            </div>
          </div>

          {/* ====== KOLOM 2: Menu Singkat ====== */}
          <div className="md:justify-self-center">
            <h4 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
              <Radio size={16} className="text-[#ff6b6b]" />
              Menu Navigasi
            </h4>
            <ul className="grid grid-cols-2 gap-2">
              {NAV_MENU.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ====== KOLOM 3: Media Sosial + Informasi ====== */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
              <Radio size={16} className="text-[#ff6b6b]" />
              Terhubung
            </h4>
            <p className="text-sm text-white/70 mb-4">
              Ikuti media sosial kami untuk informasi terbaru seputar kegiatan
              ORARI Lokal Majene.
            </p>
            {/* Ikon media sosial */}
            <div className="flex flex-wrap gap-3">
              {ORG_INFO.social.map((s, idx) => {
                const Icon = SOCIAL_ICONS[idx] ?? MessageCircle;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-[#B30000] hover:border-[#B30000] transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
            {/* Callsign badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-4 py-2">
              <span className="text-xs text-white/60">Callsign:</span>
              <span className="font-heading font-bold text-[#ff6b6b]">{ORG_INFO.callsign}</span>
              <span className="text-white/30">|</span>
              <span className="text-xs text-white/60">{ORG_INFO.repeater}</span>
            </div>
          </div>
        </div>

        {/* ====== Bagian Bawah: Hak Cipta ====== */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-white/60">
            © {year} ORARI Lokal Majene. Hak Cipta Dilindungi.
          </p>
          <p className="text-xs text-white/50">
            Organisasi Amatir Radio Indonesia · Kabupaten Majene · Sulawesi Barat
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

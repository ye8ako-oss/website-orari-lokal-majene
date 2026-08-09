/* ============================================================
   HALAMAN UTAMA — ORARI LOKAL MAJENE
   ------------------------------------------------------------
   Menggabungkan semua section menjadi satu halaman utuh dengan
   navigasi smooth-scroll. Struktur:
     1. Loading Screen (animasi awal)
     2. Header sticky
     3. Hero
     4. Profil
     5. Fungsi ORARI
     6. Layanan
     7. CORE
     8. Berita
     9. Dokumen
    10. Informasi Organisasi
    11. Statistik (counter)
    12. Galeri (lightbox)
    13. Kontak (Google Maps)
    14. Footer (sticky bottom)
    15. Back To Top

   Layout memakai flex kolom + min-h-screen agar footer selalu
   menempel di bawah saat konten pendek, dan terdorong ke bawah
   secara natural saat konten panjang.
   ============================================================ */
import Link from "next/link";
import {
  Building2,
  Radio,
  RadioTower,
  ShieldCheck,
  Users,
  Handshake,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* ============================================================
          HERO PROFIL
          ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#003366] via-[#06477f] to-[#001f3f]">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/20" />
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
              Profil Organisasi
            </p>

            <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              ORARI
              <span className="block mt-1 text-red-400">LOKAL MAJENE</span>
            </h1>

            <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-red-500 to-red-300" />

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Organisasi Amatir Radio Indonesia di Kabupaten Majene, Provinsi
              Sulawesi Barat, yang menjadi wadah pengembangan komunikasi radio,
              teknologi komunikasi, dan pengabdian kepada masyarakat.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          TENTANG
          ============================================================ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#003366]">
                Tentang Kami
              </p>

              <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Tentang ORARI Lokal Majene
              </h2>

              <div className="mt-5 h-1 w-20 rounded-full bg-[#B30000]" />

              <div className="mt-7 space-y-5 text-base leading-8 text-slate-600">
                <p>
                  <strong className="font-semibold text-slate-800">
                    ORARI Lokal Majene
                  </strong>{" "}
                  merupakan bagian dari Organisasi Amatir Radio Indonesia yang
                  berada di Kabupaten Majene, Provinsi Sulawesi Barat.
                </p>

                <p>
                  ORARI Lokal Majene menjadi wadah bagi anggota amatir radio
                  dalam mengembangkan kemampuan komunikasi radio, teknologi
                  komunikasi, serta pengabdian kepada masyarakat.
                </p>

                <p>
                  Dalam menjalankan perannya, ORARI Lokal Majene turut mendukung
                  komunikasi pada berbagai kegiatan serta dapat memberikan
                  dukungan komunikasi radio dalam kondisi darurat dan keadaan
                  emergency, sesuai dengan ketentuan dan kewenangan yang
                  berlaku.
                </p>
              </div>
            </div>

            {/* Identitas singkat */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#003366] text-white">
                  <Building2 size={21} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Identitas
                  </p>
                  <h3 className="font-heading text-lg font-bold text-slate-900">
                    ORARI Lokal Majene
                  </h3>
                </div>
              </div>

              <div className="mt-7 divide-y divide-slate-200">
                <div className="flex items-start justify-between gap-5 py-4 first:pt-0">
                  <span className="text-sm text-slate-500">
                    Organisasi induk
                  </span>
                  <span className="text-right text-sm font-semibold text-slate-800">
                    Organisasi Amatir Radio Indonesia
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 py-4">
                  <span className="text-sm text-slate-500">Club Station</span>
                  <span className="font-heading text-sm font-bold tracking-[0.08em] text-[#003366]">
                    YH8FB
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 py-4">
                  <span className="text-sm text-slate-500">Repeater / RPU</span>
                  <span className="font-heading text-sm font-bold tracking-[0.08em] text-[#B30000]">
                    YH8FBR
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 py-4">
                  <span className="text-sm text-slate-500">Wilayah</span>
                  <span className="text-right text-sm font-semibold text-slate-800">
                    Kabupaten Majene
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 py-4 pb-0">
                  <span className="text-sm text-slate-500">Provinsi</span>
                  <span className="text-right text-sm font-semibold text-slate-800">
                    Sulawesi Barat
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PERAN & KONTRIBUSI
          ============================================================ */}
      <section className="bg-slate-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#003366]">
              Peran & Kontribusi
            </p>

            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Komunikasi dan Pengabdian
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Peran ORARI Lokal Majene tidak hanya berkaitan dengan komunikasi
              radio, tetapi juga pengembangan kemampuan, teknologi, dan dukungan
              komunikasi bagi masyarakat.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Komunikasi Radio */}
            <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#003366]/10 text-[#003366] transition-colors group-hover:bg-[#003366] group-hover:text-white">
                <Radio size={23} />
              </div>

              <h3 className="font-heading mt-5 text-lg font-bold text-slate-900">
                Komunikasi Radio
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Mengembangkan kemampuan dan pemanfaatan komunikasi radio sebagai
                sarana komunikasi yang efektif.
              </p>
            </article>

            {/* Dukungan Kegiatan */}
            <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#003366]/10 text-[#003366] transition-colors group-hover:bg-[#003366] group-hover:text-white">
                <Users size={23} />
              </div>

              <h3 className="font-heading mt-5 text-lg font-bold text-slate-900">
                Dukungan Kegiatan
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Memberikan dukungan komunikasi radio dalam berbagai kegiatan
                masyarakat dan kegiatan lainnya sesuai kebutuhan.
              </p>
            </article>

            {/* Darurat & Emergency */}
            <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#B30000] transition-colors group-hover:bg-[#B30000] group-hover:text-white">
                <ShieldCheck size={23} />
              </div>

              <h3 className="font-heading mt-5 text-lg font-bold text-slate-900">
                Darurat & Emergency
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Mendukung komunikasi radio dalam kondisi darurat dan keadaan
                emergency sesuai ketentuan yang berlaku.
              </p>
            </article>

            {/* Teknologi & Pengabdian */}
            <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#003366]/10 text-[#003366] transition-colors group-hover:bg-[#003366] group-hover:text-white">
                <RadioTower size={23} />
              </div>

              <h3 className="font-heading mt-5 text-lg font-bold text-slate-900">
                Teknologi & Pengabdian
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Mengembangkan pengetahuan teknologi komunikasi radio dan
                pemanfaatannya untuk kegiatan sosial serta pengabdian.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================================
          SINERGI PEMERINTAH DAERAH
          ============================================================ */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#003366] to-[#001f3f] shadow-xl">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              {/* Visual panel */}
              <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden p-8 sm:p-12">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
                  <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
                  <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
                </div>

                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                  <Handshake size={38} />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 sm:p-12 lg:p-14">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-200">
                  Sinergi & Kolaborasi
                </p>

                <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Bersama Membangun Komunikasi
                </h2>

                <p className="mt-6 text-base leading-8 text-white/75">
                  ORARI Lokal Majene berkomitmen membangun sinergi dan
                  kolaborasi dengan Pemerintah Kabupaten Majene dalam mendukung
                  pengembangan komunikasi radio, penyebarluasan informasi,
                  edukasi masyarakat, serta pemanfaatan teknologi komunikasi
                  untuk kepentingan masyarakat dan daerah.
                </p>

                <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <MapPin size={19} className="mt-0.5 shrink-0 text-red-300" />

                  <p className="text-sm leading-6 text-white/70">
                    Kabupaten Majene, Provinsi Sulawesi Barat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          PENUTUP
          ============================================================ */}
      <section className="border-t border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Radio className="mx-auto text-[#003366]" size={28} />

          <h2 className="font-heading mt-4 text-2xl font-bold text-slate-900">
            ORARI Lokal Majene
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Komunikasi, teknologi, dan pengabdian amatir radio.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#003366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#00264d]"
          >
            Kembali ke Beranda
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}

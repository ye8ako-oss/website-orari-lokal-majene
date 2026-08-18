import { Header } from "@/components/orari/header";
import {
  ArrowRight,
  Radio,
  ShieldAlert,
  Building2,
  GraduationCap,
  CheckCircle2,
  Activity,
  Network,
} from "lucide-react";

export default function LayananPage() {
  return (
    <main className="min-h-screen bg-white text-[#12385f]">
      {/* =========================================================
          HERO LAYANAN
         ========================================================= */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
        {/* Dekorasi lingkaran */}
        <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full border border-[#003b70]/10" />
        <div className="pointer-events-none absolute -right-16 -top-12 h-56 w-56 rounded-full border border-[#b30000]/10" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-[#b30000]" />
              <span className="text-sm font-bold uppercase tracking-[0.28em] text-[#b30000]">
                Layanan ORARI
              </span>
            </div>

            <h1 className="font-heading text-5xl font-bold leading-[0.95] tracking-tight text-[#003b70] sm:text-6xl lg:text-7xl">
              Satu jaringan komunikasi.
              <br />
              <span className="text-[#b30000]">Berbagai kebutuhan.</span>
            </h1>

            <p className="mt-8 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              ORARI Lokal Majene hadir melalui komunikasi radio untuk mendukung
              kegiatan kemanusiaan, pemerintahan, pendidikan, kebencanaan, dan
              komunikasi anggota.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CORE — LAYANAN UTAMA
         ========================================================= */}
      <section className="pb-8 sm:pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#003b70] via-[#064b86] to-[#002c55] p-7 text-white shadow-xl sm:p-10 lg:p-12">
            {/* Dekorasi */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rounded-full border border-white/10" />

            <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                      <ShieldAlert size={28} />
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-200">
                        Layanan Utama
                      </p>
                      <h2 className="mt-1 text-3xl font-bold sm:text-4xl">
                        CORE
                      </h2>
                    </div>
                  </div>

                  <p className="mt-7 text-sm font-semibold uppercase tracking-wide text-blue-200">
                    Communication & Radio Emergency
                  </p>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-blue-50/80">
                    Dukungan komunikasi radio untuk kebutuhan keadaan darurat,
                    kebencanaan, dan situasi yang membutuhkan koordinasi
                    komunikasi lapangan.
                  </p>
                </div>

                <div className="shrink-0">
                  <div className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-blue-100">
                    Siap mendukung komunikasi
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-3">
                {[
                  "Dukungan komunikasi keadaan darurat",
                  "Koordinasi komunikasi lapangan",
                  "Pemanfaatan jaringan amatir radio",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm text-blue-50/90"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-blue-200"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DUA LAYANAN — PEMERINTAH + RPU
         ========================================================= */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* PEMERINTAH */}
            <article className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9">
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#003b70]/8 text-[#003b70]">
                  <Building2 size={27} />
                </div>

                <span className="rounded-full bg-[#b30000]/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#b30000]">
                  Berdasarkan MoU
                </span>
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#b30000]">
                02 · Pemerintah
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#003b70] sm:text-3xl">
                Dukungan Komunikasi Pemerintahan
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Dukungan komunikasi radio untuk berbagai kegiatan pemerintah
                yang telah disepakati dalam kerja sama dengan ORARI Lokal
                Majene.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Dukungan komunikasi kegiatan",
                  "Koordinasi komunikasi lapangan",
                  "Pemanfaatan jaringan anggota",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-600"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-[#003b70]"
                    />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#003b70]">
                Dukungan komunikasi
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </article>

            {/* RPU */}
            <article className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="grid h-full lg:grid-cols-[1.05fr_0.95fr]">
                {/* Informasi */}
                <div className="p-7 sm:p-9">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#003b70] text-white">
                      <Radio size={27} />
                    </div>

                    <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#003b70] shadow-sm">
                      Jaringan Radio
                    </span>
                  </div>

                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#b30000]">
                    03 · RPU
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-[#003b70] sm:text-3xl">
                    Radio Pancar Ulang
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Jaringan komunikasi yang membantu memperluas jangkauan
                    komunikasi radio anggota dalam wilayah layanan.
                  </p>

                  {/* Panel status */}
                  <div className="mt-7 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Activity size={15} className="text-[#b30000]" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Jaringan
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-[#003b70]">
                        RPU ORARI
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Network size={15} className="text-[#003b70]" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Fungsi
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-[#003b70]">
                        Komunikasi
                      </p>
                    </div>
                  </div>
                </div>

                {/* Foto */}
                <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
                  <img
                    src="/images/layanan-radio.png"
                    alt="Ilustrasi jaringan komunikasi radio"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#003b70]/70 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-black/20 p-4 backdrop-blur-md">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Jaringan komunikasi
                    </p>
                    <p className="mt-1 text-sm font-bold text-white">
                      Terhubung melalui radio
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          PEMBINAAN
         ========================================================= */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <article className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-[#003b70]/[0.03]" />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#b30000]/8 text-[#b30000]">
                    <GraduationCap size={27} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b30000]">
                      04 · Pendidikan
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-[#003b70] sm:text-3xl">
                      Pembinaan & Edukasi
                    </h2>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
                  Pengenalan komunikasi radio dan pembinaan kegiatan amatir
                  radio untuk lingkungan pendidikan, termasuk universitas, SMA,
                  dan sederajat.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {["Universitas", "SMA", "SMK", "Sederajat"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-[#003b70]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-[#003b70]/10 bg-[#003b70]/[0.03]">
                  <GraduationCap
                    size={48}
                    strokeWidth={1.3}
                    className="text-[#003b70]"
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================
          ALUR — DARI SINYAL MENJADI DUKUNGAN
         ========================================================= */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b30000]">
              Cara Kami Bekerja
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#003b70] sm:text-4xl">
              Dari sinyal menjadi dukungan.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Komunikasi radio menjadi penghubung antara kebutuhan, koordinasi,
              dan dukungan di lapangan.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Kebutuhan",
                desc: "Memahami kebutuhan komunikasi.",
              },
              {
                number: "02",
                title: "Koordinasi",
                desc: "Menyiapkan dukungan dan jaringan.",
              },
              {
                number: "03",
                title: "Komunikasi",
                desc: "Menghubungkan komunikasi radio.",
              },
              {
                number: "04",
                title: "Dukungan",
                desc: "Mendukung kegiatan di lapangan.",
              },
            ].map((item, index) => (
              <div
                key={item.number}
                className="relative rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span className="text-xs font-bold tracking-widest text-[#b30000]">
                  {item.number}
                </span>

                <h3 className="mt-5 text-lg font-bold text-[#003b70]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.desc}
                </p>

                {index < 3 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-slate-200 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          PENUTUP
         ========================================================= */}
      <section className="pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#003b70] px-7 py-10 text-white sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full border border-white/10" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
                  ORARI Lokal Majene
                </p>

                <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                  Butuh dukungan komunikasi?
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100/75">
                  Hubungi ORARI Lokal Majene untuk informasi mengenai layanan
                  dan dukungan komunikasi yang tersedia.
                </p>
              </div>

              <a
                href="/#kontak"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#003b70] transition hover:bg-blue-50"
              >
                Hubungi Kami
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

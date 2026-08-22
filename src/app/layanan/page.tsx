import {
  ArrowRight,
  Radio,
  RadioTower,
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
          LAYANAN — CORE
         ========================================================= */}
      <section className="pb-8 sm:pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <article className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#f8fbff] via-[#eaf3fb] to-[#d9e9f6] text-[#12385f] shadow-xl ring-1 ring-[#003b70]/10">
            {/* Dekorasi */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#003b70]/10" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-52 w-52 rounded-full border border-[#b30000]/10" />

            <div className="grid lg:grid-cols-[1fr_0.9fr]">
              {/* FOTO CORE */}
              <div className="relative order-first min-h-[260px] overflow-hidden bg-[#eaf3fb] sm:min-h-[320px] lg:order-last lg:min-h-full">
                <img
                  src="/images/layanan-core.png"
                  alt="Layanan CORE ORARI Lokal Majene"
                  className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-700 group-hover:scale-[1.02]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#003b70]/10 lg:bg-gradient-to-r lg:from-[#eaf3fb]/30 lg:via-transparent lg:to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/55 p-4 shadow-sm backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#003b70]/70">
                    Communication & Radio Emergency
                  </p>

                  <p className="mt-1 text-sm font-bold text-[#003b70]">
                    Dukungan komunikasi keadaan darurat
                  </p>
                </div>
              </div>

              {/* INFORMASI CORE */}
              <div className="relative p-7 sm:p-10 lg:p-12">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#003b70]/8 text-[#003b70] ring-1 ring-[#003b70]/10">
                    <RadioTower size={28} />
                  </div>

                  <span className="rounded-full border border-[#003b70]/10 bg-white/60 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#003b70] shadow-sm">
                    Layanan Utama
                  </span>
                </div>

                <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-[#b30000]">
                  01 · CORE
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#003b70] sm:text-4xl">
                  Communication & Radio Emergency
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Dukungan komunikasi radio untuk kebutuhan keadaan darurat,
                  kebencanaan, dan situasi yang membutuhkan koordinasi
                  komunikasi lapangan.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    "Dukungan komunikasi keadaan darurat",
                    "Koordinasi komunikasi lapangan",
                    "Pemanfaatan jaringan amatir radio",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-[#003b70]/10 bg-white/55 p-4 text-sm text-slate-600 shadow-sm"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#003b70]"
                      />

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================
          LAYANAN PENDUKUNG
         ========================================================= */}
      <section className="py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b30000]">
              Layanan Pendukung
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#003b70] sm:text-3xl">
              Dukungan komunikasi untuk berbagai kebutuhan
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* PEMERINTAH */}
            <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src="/images/layanan-dukom-pemerintah.png"
                  alt="Dukungan komunikasi pemerintahan ORARI Lokal Majene"
                  className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#003b70]/20 via-transparent to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#b30000] shadow-sm">
                    Berdasarkan MoU
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#003b70]/80 text-white backdrop-blur-sm">
                  <Building2 size={22} />
                </div>
              </div>

              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b30000]">
                  02 · Pemerintah
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#003b70]">
                  Dukungan Komunikasi Pemerintahan
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Dukungan komunikasi radio untuk berbagai kegiatan pemerintah
                  yang telah disepakati dalam kerja sama dengan ORARI Lokal
                  Majene.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Dukungan komunikasi kegiatan",
                    "Koordinasi komunikasi lapangan",
                    "Pemanfaatan jaringan anggota",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-600"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-[#003b70]"
                      />

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* RPU */}
            <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src="/images/layanan-radio.png"
                  alt="Jaringan Radio Pancar Ulang ORARI Lokal Majene"
                  className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#003b70]/20 via-transparent to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#003b70] shadow-sm">
                    Jaringan Radio
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#003b70]/80 text-white backdrop-blur-sm">
                  <Radio size={22} />
                </div>
              </div>

              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b30000]">
                  03 · RPU
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#003b70]">
                  Radio Pancar Ulang
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Jaringan komunikasi yang membantu memperluas jangkauan
                  komunikasi radio anggota dalam wilayah layanan.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
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

                  <div className="rounded-2xl bg-slate-50 p-4">
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
            </article>

            {/* PEMBINAAN */}
            <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src="/images/layanan-pendidikan-pembinaan.png"
                  alt="Pembinaan dan edukasi komunikasi radio ORARI Lokal Majene"
                  className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02]"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#003b70]/20 via-transparent to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#003b70] shadow-sm">
                    Pendidikan
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#003b70]/80 text-white backdrop-blur-sm">
                  <GraduationCap size={22} />
                </div>
              </div>

              <div className="p-7">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b30000]">
                  04 · Pendidikan
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#003b70]">
                  Pembinaan & Edukasi
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Pengenalan komunikasi radio dan pembinaan kegiatan amatir
                  radio untuk lingkungan pendidikan, termasuk universitas, SMA,
                  dan sederajat.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Universitas", "SMA", "SMK", "Sederajat"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-[#003b70]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          ALUR
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

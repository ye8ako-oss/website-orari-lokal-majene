/* ============================================================
   HALAMAN PROFIL — ORARI LOKAL MAJENE
   ============================================================ */
import Footer from "@/components/orari/footer";
import RoleContributionSection from "@/components/orari/RoleContributionSection";
import OrganizationStructureSection from "@/components/orari/OrganizationStructureSection";

export default function ProfilPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {/* ============================================================
          HERO PROFIL
          ============================================================ */}
      <section className="relative min-h-[520px] overflow-hidden">
        {/* Background profil */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/profil-hero.png')",
          }}
        />

        {/* Overlay */}
        <div
          className="
            absolute inset-0
            bg-[#001f3f]/40
            bg-gradient-to-r
            from-[#001f3f]
            via-[#003366]/95
            to-[#001f3f]/45
            sm:from-[#001f3f]
            sm:via-[#003366]/95
            sm:to-transparent
          "
        />

        {/* Content */}
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
              Profil Organisasi
            </p>

            <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              ORARI
              <span className="mt-1 block text-red-400">LOKAL MAJENE</span>
            </h1>

            <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-red-500 to-red-300" />

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
              Bagian dari Organisasi Amatir Radio Indonesia (ORARI) berkomitmen
              membangun komunikasi radio, teknologi, dan pengabdian bagi
              masyarakat di Kabupaten Majene.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          DASAR ORGANISASI & SEJARAH
          ============================================================ */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ========================================================
              HEADING
              ======================================================== */}
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#003366]">
              Dasar Organisasi & Sejarah
            </p>

            <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Mengenal <span className="text-[#B30000]">ORARI</span> Lokal
              Majene
            </h2>

            {/* Identitas Club Station */}
            <div className="mx-auto mt-6 text-center">
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-[#B30000]/40 sm:w-24" />

                <span className="font-heading text-2xl font-extrabold tracking-[0.18em] text-[#003366] sm:text-3xl">
                  YH8FB
                </span>

                <div className="h-px w-16 bg-[#B30000]/40 sm:w-24" />
              </div>

              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
                Club Station · ORARI Lokal Majene
              </p>
            </div>
          </div>

          {/* ========================================================
              3 KOLOM
              ======================================================== */}
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* ======================================================
                KOLOM 1 — ORARI LOKAL MAJENE
                ====================================================== */}
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#003366]">
                ORARI Lokal Majene
              </p>

              <h3 className="font-heading mt-3 text-2xl font-bold leading-tight text-slate-900">
                Bagian dari ORARI
              </h3>

              <div className="mt-5 h-1 w-14 rounded-full bg-[#B30000]" />

              <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
                <p>
                  <strong className="font-semibold text-slate-800">
                    ORARI Lokal Majene
                  </strong>{" "}
                  merupakan bagian dari Organisasi Amatir Radio Indonesia
                  (ORARI), yang menjalankan organisasi berdasarkan AD/ART ORARI.
                </p>

                <p>
                  ORARI merupakan organisasi tunggal bagi segenap Amatir Radio
                  Indonesia, bersifat mandiri dan non-politik, serta diakui oleh
                  pemerintah.
                </p>
              </div>

              {/* Highlight */}
              <div className="mt-8 rounded-2xl bg-[#003366] p-5 text-white">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-200">
                  Kedudukan ORARI
                </p>

                <p className="mt-2 font-heading text-lg font-bold leading-snug">
                  Cadangan Nasional di Bidang Komunikasi Radio
                </p>
              </div>
            </article>

            {/* ======================================================
                KOLOM 2 — SEJARAH ORARI
                ====================================================== */}
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B30000]">
                Sejarah ORARI
              </p>

              <h3 className="font-heading mt-3 text-2xl font-bold leading-tight text-slate-900">
                Perjalanan ORARI
              </h3>

              <div className="mt-7 space-y-7 border-l-2 border-slate-200 pl-6">
                {/* 1968 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-[#B30000]" />

                  <p className="font-heading text-sm font-extrabold tracking-[0.12em] text-[#003366]">
                    9 JULI 1968
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    ORARI dibentuk di Jakarta sebagai wadah tunggal bagi Amatir
                    Radio Indonesia. Pada awal berdirinya, nama organisasi
                    adalah Organisasi Radio Amatir Republik Indonesia.
                  </p>
                </div>

                {/* 1971 */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-[#003366]" />

                  <p className="font-heading text-sm font-extrabold tracking-[0.12em] text-[#003366]">
                    1971 — MUNAS II
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Nama organisasi kemudian disempurnakan menjadi
                    <strong className="font-semibold text-slate-800">
                      {" "}
                      Organisasi Amatir Radio Indonesia (ORARI).
                    </strong>
                  </p>
                </div>

                {/* Perkembangan */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-[#003366]" />

                  <p className="font-heading text-sm font-extrabold tracking-[0.12em] text-[#003366]">
                    PERKEMBANGAN ORGANISASI
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    ORARI kemudian berkembang ke berbagai wilayah Indonesia
                    dengan struktur organisasi Pusat, Daerah, dan Lokal.
                  </p>
                </div>

                {/* Hingga kini */}
                <div className="relative">
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-[#B30000]" />

                  <p className="font-heading text-sm font-extrabold tracking-[0.12em] text-[#003366]">
                    HINGGA KINI
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    ORARI terus berkembang dalam komunikasi radio, teknologi,
                    pembinaan Amatir Radio, serta pengabdian kepada masyarakat.
                  </p>
                </div>
              </div>
            </article>

            {/* ======================================================
                KOLOM 3 — IARU REGION 3
                ====================================================== */}
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#003366]">
                ORARI & Dunia Amatir Radio
              </p>

              <h3 className="font-heading mt-3 text-2xl font-bold leading-tight text-slate-900">
                IARU Region 3
              </h3>

              <div className="mt-5 h-1 w-14 rounded-full bg-[#B30000]" />

              <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600">
                <p>
                  ORARI merupakan bagian dari komunitas Amatir Radio dunia dan
                  menjadi anggota{" "}
                  <strong className="font-semibold text-slate-800">
                    International Amateur Radio Union (IARU) Region 3
                  </strong>
                  , yang mewadahi organisasi Amatir Radio di kawasan
                  Asia-Pasifik.
                </p>

                <p>
                  Melalui IARU Region 3, ORARI terhubung dengan komunitas Amatir
                  Radio di kawasan Asia-Pasifik serta turut berkontribusi dalam
                  pengembangan dan perlindungan kepentingan Amateur Radio
                  Service.
                </p>
              </div>

              {/* IARU Highlight */}
              <div className="mt-8 rounded-2xl border border-[#003366]/10 bg-white p-5">
                <p className="font-heading text-xl font-extrabold tracking-[0.08em] text-[#003366]">
                  IARU REGION 3
                </p>

                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Asia — Pacific
                </p>

                <div className="mt-4 h-px bg-slate-200" />

                <p className="mt-4 text-xs leading-6 text-slate-500">
                  Bagian dari komunitas Amatir Radio internasional di kawasan
                  Asia-Pasifik.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================================
          PERAN & PENGABDIAN
          ============================================================ */}
      <RoleContributionSection />

      {/* ============================================================
          STRUKTUR ORGANISASI
          ============================================================ */}
      <OrganizationStructureSection />

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <Footer />
    </main>
  );
}

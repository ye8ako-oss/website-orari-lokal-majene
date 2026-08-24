"use client";

export default function OrganizationStructureSection() {
  return (
    <section
      aria-labelledby="organization-structure-title"
      className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      {/* ============================================================
          ORNAMEN RADIO WAVE — SANGAT SAMAR
          ============================================================ */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-48 top-20 h-[480px] w-[480px] rounded-full border border-[#003366]/[0.025]" />
        <div className="absolute -left-32 top-32 h-[360px] w-[360px] rounded-full border border-[#003366]/[0.02]" />

        <div className="absolute -right-48 bottom-0 h-[480px] w-[480px] rounded-full border border-[#B30000]/[0.018]" />
        <div className="absolute -right-32 bottom-16 h-[360px] w-[360px] rounded-full border border-[#B30000]/[0.015]" />
      </div>

      {/* ============================================================
          CONTENT
          ============================================================ */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ============================================================
            HEADER
            ============================================================ */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#003366]">
            Struktur Organisasi
          </p>

          <h2
            id="organization-structure-title"
            className="font-heading mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Kepengurusan <span className="text-[#B30000]">ORARI</span> Lokal
            Majene
          </h2>

          <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#B30000]" />
        </header>

        {/* ============================================================
            STRUKTUR ORGANISASI
            ============================================================ */}
        <div className="mx-auto mt-10 max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5 lg:p-7">
            <div className="overflow-hidden rounded-2xl bg-white">
              <img
                src="/images/struktur.png"
                alt="Bagan struktur organisasi ORARI Lokal Majene"
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* ============================================================
            AKSEN BAWAH
            ============================================================ */}
        <div
          aria-hidden="true"
          className="mx-auto mt-8 flex max-w-xs items-center justify-center gap-2"
        >
          <span className="h-px flex-1 bg-slate-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#003366]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#B30000]" />
          <span className="h-px flex-1 bg-slate-200" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HALAMAN ARSIP BERITA — ORARI LOKAL MAJENE
   ------------------------------------------------------------
   Menampilkan seluruh berita yang sudah dipublikasikan.
   Pagination: 9 berita per halaman.
   ============================================================ */

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";

import { supabase } from "@/lib/supabase";

type Berita = {
  id: number;
  created_at: string;
  judul: string;
  slug: string;
  isi: string;
  gambar: string | null;
  publish: boolean;
};

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const BERITA_PER_PAGE = 9;

/* ============================================================
   BERSIHKAN HTML UNTUK RINGKASAN
   ============================================================ */

function stripHtml(html: string) {
  return html
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/?p>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getRingkasan(isi: string) {
  const teksBersih = stripHtml(isi);

  return teksBersih.length > 180
    ? `${teksBersih.substring(0, 180).trim()}...`
    : teksBersih;
}

/* ============================================================
   FORMAT TANGGAL
   ============================================================ */

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ============================================================
   AMBIL DATA BERITA
   ============================================================ */

async function getBerita() {
  const { data, error } = await supabase
    .from("berita")
    .select("id, created_at, judul, slug, isi, gambar, publish")
    .eq("publish", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Gagal mengambil daftar berita:", error);
    return [];
  }

  return (data ?? []) as Berita[];
}

/* ============================================================
   HALAMAN BERITA
   ============================================================ */

export default async function BeritaPage({ searchParams }: PageProps) {
  const berita = await getBerita();

  const params = await searchParams;

  const requestedPage = Number(params.page ?? "1");

  const totalPages = Math.max(1, Math.ceil(berita.length / BERITA_PER_PAGE));

  const currentPage =
    Number.isInteger(requestedPage) &&
    requestedPage >= 1 &&
    requestedPage <= totalPages
      ? requestedPage
      : 1;

  const startIndex = (currentPage - 1) * BERITA_PER_PAGE;

  const beritaHalaman = berita.slice(startIndex, startIndex + BERITA_PER_PAGE);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* =====================================================
          HEADER HALAMAN
          ===================================================== */}

      <section className="bg-[#003366] px-4 py-10 text-white sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b6b]">
              INFORMASI TERKINI
            </p>

            <h1 className="mt-2 font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Berita ORARI Lokal Majene
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 sm:text-base">
              Informasi dan kabar terbaru seputar kegiatan ORARI Lokal Majene.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          DAFTAR BERITA
          ===================================================== */}

      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-7xl">
          {beritaHalaman.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-sm text-slate-500">
                Belum ada berita yang diterbitkan.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {beritaHalaman.map((item) => {
                const ringkasan = getRingkasan(item.isi);

                return (
                  <article
                    key={item.id}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* FOTO */}

                    <Link
                      href={`/berita/${item.slug}`}
                      className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
                    >
                      {item.gambar ? (
                        <Image
                          src={item.gambar}
                          alt={item.judul}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-slate-400">
                          Tidak ada foto
                        </div>
                      )}
                    </Link>

                    {/* INFORMASI */}

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <Calendar size={13} className="text-[#B30000]" />

                        <span>{formatTanggal(item.created_at)}</span>
                      </div>

                      <h2 className="mt-3 font-heading text-xl font-bold leading-snug text-[#003366] transition-colors group-hover:text-[#B30000]">
                        {item.judul}
                      </h2>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {ringkasan}
                      </p>

                      <Link
                        href={`/berita/${item.slug}`}
                        className="mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-semibold text-[#003366] transition-colors hover:text-[#B30000]"
                      >
                        Baca Selengkapnya
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* =================================================
              PAGINATION
              ================================================= */}

          {totalPages > 1 && (
            <nav
              aria-label="Navigasi halaman berita"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              {/* SEBELUMNYA */}

              {currentPage > 1 ? (
                <Link
                  href={`/berita?page=${currentPage - 1}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#003366] transition-colors hover:border-[#003366] hover:bg-[#003366] hover:text-white"
                >
                  <ArrowLeft size={15} />
                  Sebelumnya
                </Link>
              ) : (
                <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-slate-100 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-300">
                  <ArrowLeft size={15} />
                  Sebelumnya
                </span>
              )}

              {/* NOMOR HALAMAN */}

              <div className="flex items-center gap-1">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => {
                  const isActive = page === currentPage;

                  return (
                    <Link
                      key={page}
                      href={page === 1 ? "/berita" : `/berita?page=${page}`}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                        isActive
                          ? "bg-[#003366] text-white"
                          : "border border-slate-200 bg-white text-[#003366] hover:bg-slate-100"
                      }`}
                    >
                      {page}
                    </Link>
                  );
                })}
              </div>

              {/* BERIKUTNYA */}

              {currentPage < totalPages ? (
                <Link
                  href={`/berita?page=${currentPage + 1}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-[#003366] transition-colors hover:border-[#003366] hover:bg-[#003366] hover:text-white"
                >
                  Berikutnya
                  <ArrowRight size={15} />
                </Link>
              ) : (
                <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-slate-100 bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-300">
                  Berikutnya
                  <ArrowRight size={15} />
                </span>
              )}
            </nav>
          )}

          {/* =================================================
              INFORMASI JUMLAH BERITA
              ================================================= */}

          {berita.length > 0 && (
            <p className="mt-5 text-center text-xs text-slate-400">
              Menampilkan {startIndex + 1}–
              {Math.min(startIndex + BERITA_PER_PAGE, berita.length)} dari{" "}
              {berita.length} berita
            </p>
          )}
        </div>
      </section>

      {/* =====================================================
          KEMBALI KE BERANDA
          ===================================================== */}

      <section className="px-4 pb-12 sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-7xl border-t border-slate-200 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#003366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B30000]"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>
        </div>
      </section>
    </main>
  );
}

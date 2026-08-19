/* ============================================================
   BERANDA — BERITA + BANNER/PENGUMUMAN + PORTAL
   ------------------------------------------------------------
   Berita dan banner diambil langsung dari Supabase.
   Banner aktif berganti otomatis.
   ============================================================ */

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";
import { Portal } from "./portal";
import { BannerSlider } from "./banner-slider";

type BeritaData = {
  id: number;
  created_at: string;
  judul: string;
  slug: string;
  isi: string;
  gambar: string | null;
  publish: boolean;
};

type BannerData = {
  id: number;
  judul: string;
  gambar: string | null;
  urutan: number | null;
  aktif: boolean;
};

export async function Berita() {
  const [
    { data: latest, error: beritaError },
    { data: bannerData, error: bannerError },
  ] = await Promise.all([
    supabase
      .from("berita")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(3),

    supabase
      .from("banner")
      .select("id, judul, gambar, urutan, aktif")
      .eq("aktif", true)
      .order("urutan", {
        ascending: true,
      }),
  ]);

  console.log("DATA BERITA HOMEPAGE:", latest);

  console.log("ERROR BERITA HOMEPAGE:", beritaError);

  console.log("DATA BANNER HOMEPAGE:", bannerData);

  console.log("ERROR BANNER HOMEPAGE:", bannerError);

  if (beritaError) {
    console.error("Gagal mengambil berita:", beritaError);
  }

  if (bannerError) {
    console.error("Gagal mengambil banner:", bannerError);
  }

  const beritaTerbaru: BeritaData[] = latest ?? [];

  const bannerAktif: BannerData[] = (bannerData ?? []).filter(
    (item): item is BannerData => Boolean(item.gambar),
  );

  return (
    <section
      id="berita"
      className="scroll-mt-20 bg-slate-50 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.75fr)] lg:items-start lg:gap-12">
          {/* ==================================================
              KIRI — BERITA TERKINI
              ================================================== */}
          <div className="min-w-0">
            <SectionHeading
              eyebrow="Informasi Terkini"
              title="Berita Terkini"
              description="Ikuti kabar terbaru seputar kegiatan ORARI Lokal Majene."
              align="left"
              className="max-w-xl"
            />

            <div className="mt-8 space-y-5">
              {beritaTerbaru.length === 0 ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
                  Belum ada berita yang diterbitkan.
                </div>
              ) : (
                beritaTerbaru.map((item, idx) => {
                  const tanggal = new Date(item.created_at).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  );

                  const teksBersih = item.isi
                    .replace(/<img\b[^>]*>/gi, "")
                    .replace(/<br\s*\/?>/gi, " ")
                    .replace(/<\/p>/gi, " ")
                    .replace(/<[^>]*>/g, "")
                    .replace(/&nbsp;/gi, " ")
                    .replace(/&amp;/gi, "&")
                    .replace(/&lt;/gi, "<")
                    .replace(/&gt;/gi, ">")
                    .replace(/&quot;/gi, '"')
                    .replace(/&#39;/gi, "'")
                    .replace(/\s+/g, " ")
                    .trim();

                  const ringkasan =
                    teksBersih.length > 160
                      ? `${teksBersih.substring(0, 160).trim()}...`
                      : teksBersih;

                  return (
                    <ScrollReveal key={item.id} variant="up" delay={idx * 80}>
                      <article className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[minmax(220px,0.9fr)_minmax(0,1.1fr)]">
                        {/* FOTO */}
                        <div className="relative min-h-[220px] overflow-hidden bg-slate-100 sm:min-h-[250px]">
                          {item.gambar ? (
                            <img
                              src={item.gambar}
                              alt={item.judul}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="flex h-full min-h-[220px] items-center justify-center text-sm text-slate-400">
                              Tidak ada foto
                            </div>
                          )}
                        </div>

                        {/* INFORMASI BERITA */}
                        <div className="flex flex-col justify-center p-5 sm:p-6">
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            <Calendar size={13} className="text-[#B30000]" />

                            <span>{tanggal}</span>
                          </div>

                          <h3 className="mt-3 font-heading text-xl font-bold leading-snug text-[#003366] transition-colors group-hover:text-[#B30000] sm:text-2xl">
                            {item.judul}
                          </h3>

                          <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600">
                            {ringkasan}
                          </p>

                          <Link
                            href={`/berita/${item.slug}`}
                            className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#003366] transition-colors hover:text-[#B30000]"
                          >
                            Baca Selengkapnya
                            <ArrowRight
                              size={16}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </Link>
                        </div>
                      </article>
                    </ScrollReveal>
                  );
                })
              )}
            </div>

            <div className="mt-6">
              <Link
                href="#berita"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#003366] transition-colors hover:text-[#B30000]"
              >
                Lihat semua berita
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* ==================================================
              KANAN — BANNER/PENGUMUMAN + PORTAL
              ================================================== */}
          <aside className="min-w-0 lg:pt-[2px]">
            <ScrollReveal variant="right">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* JUDUL PENGUMUMAN */}
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B30000]">
                      INFROMASI TERKINI
                    </p>

                    <h3 className="mt-0.5 font-heading text-lg font-bold text-[#003366]">
                      ORARI Lokal Majene
                    </h3>
                  </div>
                </div>

                {/* BANNER DARI SUPABASE */}
                <div className="bg-slate-100 p-3 sm:p-4">
                  <div className="mx-auto w-full max-w-md">
                    <BannerSlider
                      banners={bannerAktif.map((item) => ({
                        id: item.id,
                        judul: item.judul,
                        gambar: item.gambar!,
                      }))}
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="right" delay={100} className="mt-7">
              <Portal />
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Berita;

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

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
  params: Promise<{
    slug: string;
  }>;
};

const BASE_URL = "https://orarilokalmajene.vercel.app";

/* =========================================================
   AMBIL DATA BERITA
========================================================= */

async function getBerita(slug: string) {
  const { data: berita, error } = await supabase
    .from("berita")
    .select("*")
    .eq("slug", slug)
    .eq("publish", true)
    .single<Berita>();

  if (error || !berita) {
    return null;
  }

  return berita;
}

/* =========================================================
   SEO SETIAP BERITA
========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const berita = await getBerita(slug);

  if (!berita) {
    return {
      title: "Berita Tidak Ditemukan",
      description: "Berita ORARI Lokal Majene tidak ditemukan.",
    };
  }

  const description = berita.isi.replace(/\s+/g, " ").trim().slice(0, 160);

  const url = `${BASE_URL}/berita/${berita.slug}`;

  return {
    title: berita.judul,

    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: berita.judul,

      description,

      url,

      siteName: "ORARI Lokal Majene",

      locale: "id_ID",

      type: "article",

      publishedTime: berita.created_at,

      authors: ["ORARI Lokal Majene"],

      images: berita.gambar
        ? [
            {
              url: berita.gambar,
              alt: berita.judul,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",

      title: berita.judul,

      description,

      images: berita.gambar ? [berita.gambar] : undefined,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =========================================================
   HALAMAN DETAIL BERITA
========================================================= */

export default async function BeritaDetail({ params }: PageProps) {
  const { slug } = await params;

  const berita = await getBerita(slug);

  if (!berita) {
    notFound();
  }

  const tanggal = new Date(berita.created_at).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-white">
      {/* =====================================================
          HEADER ARTIKEL
      ===================================================== */}

      <section className="bg-[#003366] px-4 py-8 text-white sm:px-6 sm:py-10">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>

          <div className="mt-8 sm:mt-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 sm:text-sm">
              <Calendar size={14} />
              {tanggal}
            </div>

            <h1 className="max-w-4xl font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              {berita.judul}
            </h1>
          </div>
        </div>
      </section>

      {/* =====================================================
          ARTIKEL
      ===================================================== */}

      <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* FOTO UTAMA */}

        {berita.gambar && (
          <figure>
            <div className="relative overflow-hidden rounded-xl bg-gray-100 shadow-sm sm:rounded-2xl">
              <Image
                src={berita.gambar}
                alt={berita.judul}
                width={1600}
                height={1000}
                className="h-auto max-h-[650px] w-full object-cover"
                priority
              />
            </div>

            <figcaption className="mt-3 text-center text-xs text-gray-400 sm:text-sm">
              {berita.judul}
            </figcaption>
          </figure>
        )}

        {/* =====================================================
            ISI BERITA
        ===================================================== */}

        <div className="mx-auto mt-8 max-w-3xl sm:mt-10">
          <div className="text-[17px] leading-8 text-gray-700 sm:text-lg sm:leading-8">
            {berita.isi.split(/\r?\n/).map((paragraf, index) => {
              const teks = paragraf.trim();

              if (!teks) {
                return <div key={index} className="h-3" />;
              }

              return (
                <p key={index} className="mb-5 last:mb-0">
                  {teks}
                </p>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            KEMBALI
        ===================================================== */}

        <div className="mx-auto mt-12 max-w-3xl border-t border-gray-200 pt-6 sm:mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#003366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B30000]"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>
        </div>
      </article>
    </main>
  );
}

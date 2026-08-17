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
   BERSIHKAN HTML UNTUK DESCRIPTION SEO
   ========================================================= */

function stripHtml(html: string) {
  return html
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

  const description = stripHtml(berita.isi).slice(0, 160);

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

      <section className="bg-[#003366] px-4 py-4 text-white sm:px-6 sm:py-5">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>

          <div className="mt-3 sm:mt-4">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90">
              <Calendar size={14} />
              {tanggal}
            </div>

            <h1 className="max-w-5xl font-heading text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
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

            Isi berasal dari Tiptap dalam bentuk HTML.
            HTML harus dirender sebagai HTML agar:
            - Bold
            - Italic
            - Heading
            - List
            - Link
            - Blockquote
            - Foto pendukung
            dapat tampil dengan benar.
            ===================================================== */}

        <div className="mx-auto mt-8 max-w-3xl sm:mt-10">
          <div
            className="
              text-[17px] leading-8 text-gray-700
              sm:text-lg sm:leading-8

              [&_p]:mb-5
              [&_p:last-child]:mb-0

              [&_strong]:font-bold
              [&_em]:italic

              [&_h2]:mb-4
              [&_h2]:mt-8
              [&_h2]:font-heading
              [&_h2]:text-2xl
              [&_h2]:font-bold
              [&_h2]:leading-tight
              [&_h2]:text-[#003366]

              [&_h3]:mb-3
              [&_h3]:mt-7
              [&_h3]:font-heading
              [&_h3]:text-xl
              [&_h3]:font-bold
              [&_h3]:leading-tight
              [&_h3]:text-[#003366]

              [&_ul]:mb-5
              [&_ul]:ml-6
              [&_ul]:list-disc
              [&_ul]:space-y-2

              [&_ol]:mb-5
              [&_ol]:ml-6
              [&_ol]:list-decimal
              [&_ol]:space-y-2

              [&_li]:pl-1

              [&_a]:font-medium
              [&_a]:text-[#003366]
              [&_a]:underline
              [&_a]:underline-offset-2
              hover:[&_a]:text-[#B30000]

              [&_blockquote]:my-7
              [&_blockquote]:border-l-4
              [&_blockquote]:border-[#B30000]
              [&_blockquote]:bg-slate-50
              [&_blockquote]:px-5
              [&_blockquote]:py-3
              [&_blockquote]:italic
              [&_blockquote]:text-gray-600

              [&_img]:my-8
              [&_img]:block
              [&_img]:h-auto
              [&_img]:w-full
              [&_img]:max-w-full
              [&_img]:rounded-xl
              [&_img]:object-contain
              [&_img]:shadow-sm
              sm:[&_img]:rounded-2xl
            "
            dangerouslySetInnerHTML={{
              __html: berita.isi,
            }}
          />
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

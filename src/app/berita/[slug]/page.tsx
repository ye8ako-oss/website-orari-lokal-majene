import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";

export default function BeritaDetail() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header sederhana */}
      <section className="bg-[#003366] px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>

          <div className="mt-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm">
              <Calendar size={15} />
              11–12 Juli 2026
            </div>

            <h1 className="max-w-4xl font-heading text-3xl font-bold leading-tight md:text-5xl">
              ORARI Lokal Majene Gelar Apel Siaga dan Perkemahan dalam
              Memperingati HUT ke-58 ORARI
            </h1>

            <p className="mt-4 text-white/75">
              Desyta Barane Beach, Kelurahan Baurung, Kabupaten Majene
            </p>
          </div>
        </div>
      </section>

      {/* Isi berita */}
      <article className="mx-auto max-w-5xl px-6 py-10">
        {/* Foto utama */}
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src="/images/hut-orari.jpeg"
            alt="Kegiatan HUT ke-58 ORARI Lokal Majene"
            width={1600}
            height={1000}
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        {/* Caption */}
        <p className="mt-3 text-center text-sm text-gray-500">
          Kegiatan ORARI Lokal Majene dalam rangka memperingati HUT ke-58 ORARI,
          11–12 Juli 2026.
        </p>

        {/* Teks berita */}
        <div className="prose prose-lg mt-10 max-w-none text-gray-700">
          <p>
            Dalam rangka memperingati Hari Ulang Tahun ORARI ke-58 tahun 2026,
            ORARI Lokal Majene melaksanakan apel siaga bersama RAPI, Pramuka,
            serta Desa/Kelurahan Tangguh Bencana (DESTANA).
          </p>

          <p>
            Kegiatan dilaksanakan selama dua hari, Sabtu–Minggu, 11–12 Juli
            2026, bertempat di Desyta Barane Beach, Kelurahan Baurung, Kabupaten
            Majene.
          </p>

          <p>
            Selain apel siaga, kegiatan juga dirangkaikan dengan perkemahan
            selama satu malam serta sosialisasi pra-JOTA kepada kakak-kakak
            Pramuka yang nantinya akan mengikuti kegiatan Jambore On The Air
            (JOTA).
          </p>

          <p>
            ORARI Lokal Majene juga melaksanakan sosialisasi CORE (Communication
            In Rescue & Emergency) kepada Desa/Kelurahan Tangguh Bencana
            (DESTANA) dari Kelurahan Baru dan Kelurahan Rangas.
          </p>

          <p>
            Kegiatan ini menjadi bagian dari peran ORARI Lokal Majene dalam
            membangun kesiapsiagaan komunikasi serta memperkuat sinergi dengan
            unsur masyarakat dan organisasi terkait.
          </p>
        </div>

        {/* Kembali */}
        <div className="mt-12 border-t border-gray-200 pt-6">
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

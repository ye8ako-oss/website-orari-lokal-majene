import { LoadingScreen } from "@/components/orari/loading-screen";
import { Header } from "@/components/orari/header";
import { Hero } from "@/components/orari/hero";
import { Berita } from "@/components/orari/berita";
import { Kontak } from "@/components/orari/kontak";
import { Footer } from "@/components/orari/footer";
import { BackToTop } from "@/components/orari/back-to-top";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <LoadingScreen />

      <Header />

      <main className="flex-1">
        {/* Hero — dipertahankan sesuai desain yang sudah dikunci */}
        <Hero />

        {/* Berita + Banner/Pengumuman + Portal */}
        <Berita />

        {/* Kontak + Lokasi + Foto Ketua */}
        <Kontak />
      </main>

      {/* Informasi teknis + Copyright */}
      <Footer />

      <BackToTop />
    </div>
  );
}

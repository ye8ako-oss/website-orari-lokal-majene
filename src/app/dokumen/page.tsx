import { Dokumen } from "@/components/orari/dokumen";
import { Header } from "@/components/orari/header";
import { Footer } from "@/components/orari/footer";
import { BackToTop } from "@/components/orari/back-to-top";

export default function DokumenPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-[72px]">
        <Dokumen />
      </main>

      <Footer />

      <BackToTop />
    </div>
  );
}

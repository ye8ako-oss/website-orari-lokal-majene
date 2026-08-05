/* ============================================================
   HALAMAN UTAMA — ORARI LOKAL MAJENE
   ------------------------------------------------------------
   Menggabungkan semua section menjadi satu halaman utuh dengan
   navigasi smooth-scroll. Struktur:
     1. Loading Screen (animasi awal)
     2. Header sticky
     3. Hero
     4. Profil
     5. Fungsi ORARI
     6. Layanan
     7. CORE
     8. Berita
     9. Dokumen
    10. Informasi Organisasi
    11. Statistik (counter)
    12. Galeri (lightbox)
    13. Kontak (Google Maps)
    14. Footer (sticky bottom)
    15. Back To Top

   Layout memakai flex kolom + min-h-screen agar footer selalu
   menempel di bawah saat konten pendek, dan terdorong ke bawah
   secara natural saat konten panjang.
   ============================================================ */
import { LoadingScreen } from "@/components/orari/loading-screen";
import { Header } from "@/components/orari/header";
import { Hero } from "@/components/orari/hero";
import { Profil } from "@/components/orari/profil";
import { Fungsi } from "@/components/orari/fungsi";
import { Layanan } from "@/components/orari/layanan";
import { Core } from "@/components/orari/core";
import { Berita } from "@/components/orari/berita";
import { Dokumen } from "@/components/orari/dokumen";
import { Informasi } from "@/components/orari/informasi";
import { Statistik } from "@/components/orari/statistik";
import { Galeri } from "@/components/orari/galeri";
import { Kontak } from "@/components/orari/kontak";
import { Footer } from "@/components/orari/footer";
import { BackToTop } from "@/components/orari/back-to-top";

export default function Home() {
  return (
    /* Wrapper flex kolom agar footer menempel di bawah */
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Animasi loading awal */}
      <LoadingScreen />

      {/* Header sticky di atas */}
      <Header />

      {/* Konten utama */}
      <main className="flex-1">
        {/* Hero / Beranda */}
        <Hero />
        {/* Profil Organisasi */}
        <Profil />
        {/* Fungsi ORARI */}
        <Fungsi />
        {/* Layanan */}
        <Layanan />
        {/* CORE (Communication In Rescue & Emergency) */}
        <Core />
        {/* Berita */}
        <Berita />
        {/* Dokumen */}
        <Dokumen />
        {/* Informasi Organisasi */}
        <Informasi />
        {/* Statistik dengan counter */}
        <Statistik />
        {/* Galeri dengan lightbox */}
        <Galeri />
        {/* Kontak + Google Maps */}
        <Kontak />
      </main>

      {/* Footer menempel di bawah */}
      <Footer />

      {/* Tombol kembali ke atas */}
      <BackToTop />
    </div>
  );
}

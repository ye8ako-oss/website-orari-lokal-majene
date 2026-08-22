"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  ImagePlus,
  LogOut,
  Newspaper,
  Plus,
  Sparkles,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type CleaningResult = {
  berita: number;
  banner: number;
  dokumen: number;
  total: number;
};

export default function AdminPage() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [cleaning, setCleaning] = useState(false);

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      setUserEmail(user.email ?? "");
      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  /*
   * ============================================================
   * MENGAMBIL STORAGE PATH DARI URL
   * ============================================================
   */
  function getStoragePathFromUrl(
    url: string | null,
    bucket: string,
  ): string | null {
    if (!url) {
      return null;
    }

    try {
      const marker = `/storage/v1/object/public/${bucket}/`;

      const posisi = url.indexOf(marker);

      if (posisi === -1) {
        console.warn(`URL tidak berasal dari bucket ${bucket}:`, url);

        return null;
      }

      const path = url.substring(posisi + marker.length);

      if (!path) {
        return null;
      }

      return decodeURIComponent(path);
    } catch (error) {
      console.error(`ERROR MENGAMBIL STORAGE PATH BUCKET ${bucket}:`, error);

      return null;
    }
  }

  /*
   * ============================================================
   * BERSIHKAN BUCKET
   *
   * referencePaths = file yang masih digunakan database
   * bucket         = nama bucket Supabase Storage
   * ============================================================
   */
  async function cleanBucket(
    bucket: "berita" | "banner" | "dokumen",
    referencePaths: Set<string>,
  ): Promise<number> {
    console.log("=================================");
    console.log("MEMERIKSA BUCKET:", bucket);
    console.log("FILE YANG MASIH DIGUNAKAN:", [...referencePaths]);
    console.log("=================================");

    /*
     * Ambil isi root bucket.
     *
     * Saat ini file-file kita berada langsung di root bucket.
     */
    const { data: daftarStorage, error: storageError } = await supabase.storage
      .from(bucket)
      .list("", {
        limit: 1000,
        sortBy: {
          column: "name",
          order: "asc",
        },
      });

    if (storageError) {
      console.error(`ERROR MEMBACA STORAGE ${bucket}:`, storageError);

      throw new Error(`Gagal membaca Storage bucket ${bucket}.`);
    }

    /*
     * Cari file yang tidak digunakan.
     */
    const fileTidakTerpakai = (daftarStorage ?? [])
      .filter((file) => {
        /*
         * Abaikan folder.
         */
        if (!file.id) {
          return false;
        }

        /*
         * Untuk root bucket, nama file menjadi storage path.
         */
        return !referencePaths.has(file.name);
      })
      .map((file) => file.name);

    console.log(`FILE TIDAK TERPAKAI DI ${bucket}:`, fileTidakTerpakai);

    if (fileTidakTerpakai.length === 0) {
      return 0;
    }

    /*
     * Hapus file yang tidak digunakan.
     */
    const { data: hasilHapus, error: hapusError } = await supabase.storage
      .from(bucket)
      .remove(fileTidakTerpakai);

    if (hapusError) {
      console.error(`ERROR MENGHAPUS FILE DARI ${bucket}:`, hapusError);

      throw new Error(`Gagal menghapus file dari bucket ${bucket}.`);
    }

    console.log(`HASIL PEMBERSIHAN ${bucket}:`, hasilHapus);

    return fileTidakTerpakai.length;
  }

  /*
   * ============================================================
   * PEMBERSIHAN STORAGE SEMUA BUCKET
   * ============================================================
   */
  async function handleCleanStorage() {
    const yakin = window.confirm(
      "Sistem akan memeriksa Storage Berita, Banner, dan Dokumen.\n\n" +
        "File yang masih digunakan oleh website TIDAK akan dihapus.\n\n" +
        "Hanya file yang tidak lagi digunakan yang akan dibersihkan.\n\n" +
        "Lanjutkan pembersihan?",
    );

    if (!yakin) {
      return;
    }

    setCleaning(true);

    try {
      /*
       * ========================================================
       * 1. BERITA
       * ========================================================
       */

      const { data: beritaDatabase, error: beritaError } = await supabase
        .from("berita")
        .select("gambar");

      if (beritaError) {
        console.error("ERROR MEMBACA TABEL BERITA:", beritaError);

        throw new Error("Gagal membaca data berita.");
      }

      const fotoBeritaDipakai = new Set<string>();

      (beritaDatabase ?? []).forEach((item) => {
        const path = getStoragePathFromUrl(item.gambar, "berita");

        if (path) {
          fotoBeritaDipakai.add(path);
        }
      });

      /*
       * ========================================================
       * 2. BANNER
       * ========================================================
       */

      const { data: bannerDatabase, error: bannerError } = await supabase
        .from("banner")
        .select("gambar");

      if (bannerError) {
        console.error("ERROR MEMBACA TABEL BANNER:", bannerError);

        throw new Error("Gagal membaca data banner.");
      }

      const fotoBannerDipakai = new Set<string>();

      (bannerDatabase ?? []).forEach((item) => {
        const path = getStoragePathFromUrl(item.gambar, "banner");

        if (path) {
          fotoBannerDipakai.add(path);
        }
      });

      /*
       * ========================================================
       * 3. DOKUMEN
       * ========================================================
       */

      const { data: dokumenDatabase, error: dokumenError } = await supabase
        .from("dokumen")
        .select("file_url");

      if (dokumenError) {
        console.error("ERROR MEMBACA TABEL DOKUMEN:", dokumenError);

        throw new Error("Gagal membaca data dokumen.");
      }

      const fileDokumenDipakai = new Set<string>();

      (dokumenDatabase ?? []).forEach((item) => {
        const path = getStoragePathFromUrl(item.file_url, "dokumen");

        if (path) {
          fileDokumenDipakai.add(path);
        }
      });

      /*
       * ========================================================
       * 4. BERSIHKAN KETIGA BUCKET
       * ========================================================
       */

      const jumlahBerita = await cleanBucket("berita", fotoBeritaDipakai);

      const jumlahBanner = await cleanBucket("banner", fotoBannerDipakai);

      const jumlahDokumen = await cleanBucket("dokumen", fileDokumenDipakai);

      const hasil: CleaningResult = {
        berita: jumlahBerita,
        banner: jumlahBanner,
        dokumen: jumlahDokumen,
        total: jumlahBerita + jumlahBanner + jumlahDokumen,
      };

      /*
       * ========================================================
       * HASIL
       * ========================================================
       */

      if (hasil.total === 0) {
        alert(
          "Pembersihan selesai.\n\n" +
            "Tidak ditemukan file yang tidak terpakai.\n\n" +
            "Semua file Storage masih digunakan oleh konten website.",
        );
      } else {
        alert(
          "PEMBERSIHAN STORAGE SELESAI\n\n" +
            `Berita   : ${hasil.berita} file\n` +
            `Banner   : ${hasil.banner} file\n` +
            `Dokumen  : ${hasil.dokumen} file\n` +
            "-------------------------\n" +
            `TOTAL    : ${hasil.total} file`,
        );
      }
    } catch (error) {
      console.error("ERROR PEMBERSIHAN STORAGE:", error);

      alert(
        error instanceof Error
          ? `Pembersihan Storage gagal.\n\n${error.message}\n\nTidak ada proses lanjutan yang dilakukan.`
          : "Terjadi kesalahan saat membersihkan Storage.",
      );
    } finally {
      setCleaning(false);
    }
  }

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#001f3f]" />

          <p className="text-sm text-gray-500">Memuat dashboard...</p>
        </div>
      </main>
    );
  }

  /*
   * ============================================================
   * DASHBOARD
   * ============================================================
   */

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* =====================================================
            HEADER
            ===================================================== */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                ORARI Lokal Majene
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[#001f3f] sm:text-3xl">
                Dashboard Admin
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Login sebagai:{" "}
                <span className="font-medium text-gray-700">{userEmail}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </div>
        </div>

        {/* =====================================================
            MENU KELOLA KONTEN
            ===================================================== */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#001f3f] sm:text-2xl">
              Kelola Konten Website
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Pilih jenis konten yang ingin ditambahkan atau dikelola. Tidak
              perlu membuka VS Code untuk menambahkan konten.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* =================================================
                BERITA
                ================================================= */}
            <button
              type="button"
              onClick={() => router.push("/admin/berita")}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-[#001f3f] hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#001f3f]">
                  <Newspaper size={24} />
                </div>

                <Plus
                  size={20}
                  className="text-gray-400 transition group-hover:text-[#001f3f]"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#001f3f]">
                Tambah Berita
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Tulis, tambahkan foto, dan terbitkan berita terbaru ORARI Lokal
                Majene.
              </p>

              <div className="mt-5 text-sm font-semibold text-[#001f3f] transition group-hover:text-[#B30000]">
                Buka Pengelolaan Berita →
              </div>
            </button>

            {/* =================================================
                BANNER
                ================================================= */}
            <button
              type="button"
              onClick={() => router.push("/admin/banner")}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-[#B30000] hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#B30000]">
                  <ImagePlus size={24} />
                </div>

                <Plus
                  size={20}
                  className="text-gray-400 transition group-hover:text-[#B30000]"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#001f3f]">
                Tambah Banner
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Tambahkan banner yang nantinya dapat tampil bergantian pada
                halaman depan website.
              </p>

              <div className="mt-5 text-sm font-semibold text-[#001f3f] transition group-hover:text-[#B30000]">
                Buka Pengelolaan Banner →
              </div>
            </button>

            {/* =================================================
                DOKUMEN
                ================================================= */}
            <button
              type="button"
              onClick={() => router.push("/admin/dokumen")}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-green-600 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <FileText size={24} />
                </div>

                <Plus
                  size={20}
                  className="text-gray-400 transition group-hover:text-green-700"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#001f3f]">
                Tambah Dokumen
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Upload dokumen yang akan tersedia melalui portal website ORARI
                Lokal Majene.
              </p>

              <div className="mt-5 text-sm font-semibold text-[#001f3f] transition group-hover:text-green-700">
                Buka Pengelolaan Dokumen →
              </div>
            </button>
          </div>
        </div>

        {/* =====================================================
            PEMBERSIH STORAGE
            ===================================================== */}
        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Sparkles size={22} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#001f3f] sm:text-xl">
                    Pemeliharaan Storage
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Bersihkan file yang sudah tidak digunakan.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-500">
                Sistem akan memeriksa Storage <strong>berita</strong>,{" "}
                <strong>banner</strong>, dan <strong>dokumen</strong>. File yang
                masih digunakan oleh konten website akan tetap aman.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCleanStorage}
              disabled={cleaning}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-amber-500 px-5 py-3 text-sm font-semibold text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {cleaning ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Sparkles size={17} />
              )}

              {cleaning ? "Membersihkan..." : "Bersihkan Storage"}
            </button>
          </div>
        </div>

        {/* =====================================================
            INFORMASI
            ===================================================== */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm leading-6 text-blue-800">
            <strong>Dashboard Admin:</strong> seluruh konten website nantinya
            dapat dikelola dari halaman ini. Berita, banner, dan dokumen tidak
            perlu lagi ditambahkan melalui VS Code.
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Eye,
  Newspaper,
  Plus,
  Trash2,
  Loader2,
  Sparkles,
} from "lucide-react";
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

export default function KelolaBeritaPage() {
  const router = useRouter();

  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [cleaning, setCleaning] = useState(false);

  useEffect(() => {
    async function loadBerita() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("ERROR MEMUAT BERITA:", error);
        alert("Berita gagal dimuat.");
      } else {
        setBerita(data ?? []);
      }

      setLoading(false);
    }

    loadBerita();
  }, [router]);

  function formatTanggal(tanggal: string) {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function getRingkasan(isi: string) {
    const teksBersih = isi
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

    return teksBersih.length > 180
      ? `${teksBersih.substring(0, 180).trim()}...`
      : teksBersih;
  }

  function getStoragePathFromUrl(url: string): string | null {
    try {
      const marker = "/storage/v1/object/public/berita/";

      const posisi = url.indexOf(marker);

      if (posisi === -1) {
        return null;
      }

      const path = url.substring(posisi + marker.length);

      if (!path) {
        return null;
      }

      return decodeURIComponent(path);
    } catch (error) {
      console.error("ERROR STORAGE PATH:", error);
      return null;
    }
  }

  async function hapusFotoStorage(urlFoto: string | null) {
    if (!urlFoto) {
      return true;
    }

    const storagePath = getStoragePathFromUrl(urlFoto);

    if (!storagePath) {
      return false;
    }

    const { error } = await supabase.storage
      .from("berita")
      .remove([storagePath]);

    if (error) {
      console.error("ERROR HAPUS FOTO:", error);
      return false;
    }

    return true;
  }

  async function handleDelete(item: Berita) {
    const yakin = window.confirm(
      `Apakah Anda yakin ingin menghapus berita:\n\n"${item.judul}"?\n\nBerita dan foto terkait akan dihapus dan tidak dapat dikembalikan.`,
    );

    if (!yakin) {
      return;
    }

    setDeletingId(item.id);

    const { error } = await supabase.from("berita").delete().eq("id", item.id);

    if (error) {
      console.error("ERROR HAPUS BERITA:", error);

      alert("Berita gagal dihapus.");

      setDeletingId(null);
      return;
    }

    await hapusFotoStorage(item.gambar);

    setBerita((data) => data.filter((beritaItem) => beritaItem.id !== item.id));

    setDeletingId(null);
  }

  async function handleCleanUnusedPhotos() {
    const yakin = window.confirm(
      "Sistem akan mencari file foto di Storage yang tidak lagi digunakan oleh berita.\n\n" +
        "Foto yang masih digunakan oleh berita TIDAK akan dihapus.\n\n" +
        "Lanjutkan pembersihan?",
    );

    if (!yakin) {
      return;
    }

    setCleaning(true);

    try {
      /*
       * ============================================================
       * LANGKAH 1
       * Ambil seluruh berita dan kumpulkan nama file yang masih
       * digunakan.
       * ============================================================
       */

      const { data: beritaDatabase, error: beritaError } = await supabase
        .from("berita")
        .select("gambar");

      if (beritaError) {
        console.error("ERROR MENGAMBIL DATA BERITA:", beritaError);

        alert("Gagal membaca data berita.\n\nTidak ada file yang dihapus.");

        setCleaning(false);
        return;
      }

      const fotoYangDipakai = new Set<string>();

      (beritaDatabase ?? []).forEach((item) => {
        if (!item.gambar) {
          return;
        }

        const storagePath = getStoragePathFromUrl(item.gambar);

        if (!storagePath) {
          return;
        }

        /*
         * Kita hanya menggunakan nama file karena foto berita
         * saat ini berada langsung di root bucket.
         */
        const namaFile = storagePath.split("/").pop();

        if (namaFile) {
          fotoYangDipakai.add(decodeURIComponent(namaFile));
        }
      });

      console.log("FOTO YANG MASIH DIGUNAKAN:", Array.from(fotoYangDipakai));

      /*
       * ============================================================
       * LANGKAH 2
       * Ambil file dari root bucket berita.
       * ============================================================
       */

      const { data: daftarStorage, error: storageError } =
        await supabase.storage.from("berita").list("", {
          limit: 1000,
          sortBy: {
            column: "name",
            order: "asc",
          },
        });

      if (storageError) {
        console.error("ERROR MEMBACA STORAGE BERITA:", storageError);

        alert(
          "Gagal membaca isi Storage.\n\n" +
            "Pastikan policy SELECT untuk bucket berita sudah tersedia.\n\n" +
            "Tidak ada file yang dihapus.",
        );

        setCleaning(false);
        return;
      }

      /*
       * ============================================================
       * LANGKAH 3
       * Cari file yang ada di Storage tetapi tidak digunakan
       * oleh berita mana pun.
       * ============================================================
       */

      const fotoTidakTerpakai = (daftarStorage ?? [])
        .filter((file) => {
          /*
           * Abaikan folder.
           */
          if (!file.id) {
            return false;
          }

          return !fotoYangDipakai.has(file.name);
        })
        .map((file) => file.name);

      console.log("FOTO TIDAK TERPAKAI:", fotoTidakTerpakai);

      /*
       * Tidak ada file yang perlu dibersihkan.
       */
      if (fotoTidakTerpakai.length === 0) {
        alert(
          "Tidak ada foto tidak terpakai.\n\nSemua foto di Storage saat ini masih digunakan oleh berita.",
        );

        setCleaning(false);
        return;
      }

      /*
       * ============================================================
       * LANGKAH 4
       * Hapus hanya foto yang tidak digunakan.
       * ============================================================
       */

      const { data: hasilHapus, error: hapusError } = await supabase.storage
        .from("berita")
        .remove(fotoTidakTerpakai);

      if (hapusError) {
        console.error("ERROR MEMBERSIHKAN FOTO:", hapusError);

        alert(
          "Sebagian atau seluruh foto tidak berhasil dibersihkan.\n\n" +
            "Silakan periksa Storage dan policy DELETE.",
        );

        setCleaning(false);
        return;
      }

      console.log("HASIL PEMBERSIHAN FOTO:", hasilHapus);

      alert(
        `Pembersihan selesai.\n\n${fotoTidakTerpakai.length} foto tidak terpakai telah dihapus.\n\nFoto yang masih digunakan oleh berita tetap aman.`,
      );
    } catch (error) {
      console.error("ERROR PEMBERSIHAN FOTO:", error);

      alert(
        "Terjadi kesalahan saat membersihkan foto.\n\nTidak ada tindakan lanjutan yang dilakukan.",
      );
    } finally {
      setCleaning(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 size={28} className="mx-auto animate-spin text-[#001f3f]" />

          <p className="mt-3 text-sm text-gray-500">
            Memuat pengelolaan berita...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#001f3f]">
                <Newspaper size={24} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  ORARI Lokal Majene
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#001f3f] sm:text-3xl">
                  Pengelolaan Berita
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Kelola berita yang terdapat pada website ORARI Lokal Majene.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <ArrowLeft size={16} />
              Kembali ke Admin
            </button>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#001f3f]">
                Daftar Berita
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Total {berita.length} berita tersimpan.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleCleanUnusedPhotos}
                disabled={cleaning}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-500 px-5 py-3 text-sm font-semibold text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cleaning ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Sparkles size={17} />
                )}

                {cleaning ? "Membersihkan..." : "Bersihkan Foto Tidak Terpakai"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/berita/tambah")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#001f3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#003b6f]"
              >
                <Plus size={17} />
                Tambah Berita Baru
              </button>
            </div>
          </div>
        </div>

        {/* DAFTAR BERITA */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          {berita.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Newspaper size={26} />
              </div>

              <p className="mt-4 font-semibold text-gray-600">
                Belum ada berita.
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Silakan tambahkan berita pertama.
              </p>

              <button
                type="button"
                onClick={() => router.push("/admin/berita/tambah")}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#001f3f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003b6f]"
              >
                <Plus size={16} />
                Tambah Berita
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {berita.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-gray-200 transition hover:border-gray-300 hover:shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* FOTO */}
                    <div className="relative h-56 w-full shrink-0 bg-gray-100 lg:h-auto lg:w-64">
                      {item.gambar ? (
                        <img
                          src={item.gambar}
                          alt={item.judul}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full min-h-56 items-center justify-center text-sm text-gray-400">
                          Tidak ada foto
                        </div>
                      )}
                    </div>

                    {/* ISI */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              item.publish
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {item.publish ? "Terbit" : "Draft"}
                          </span>

                          <span className="text-xs text-gray-400">
                            {formatTanggal(item.created_at)}
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-bold text-[#001f3f]">
                          {item.judul}
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                          /berita/{item.slug}
                        </p>

                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                          {getRingkasan(item.isi)}
                        </p>
                      </div>

                      {/* AKSI */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.publish && (
                          <button
                            type="button"
                            onClick={() => router.push(`/berita/${item.slug}`)}
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                          >
                            <Eye size={15} />
                            Lihat
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            router.push(`/admin/berita/edit/${item.id}`)
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-[#001f3f] px-4 py-2 text-xs font-semibold text-[#001f3f] transition hover:bg-[#001f3f] hover:text-white"
                        >
                          <Edit size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          disabled={deletingId === item.id}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-600 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 size={15} />

                          {deletingId === item.id ? "Menghapus..." : "Hapus"}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

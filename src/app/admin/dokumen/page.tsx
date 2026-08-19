"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  FileText,
  Plus,
  Trash2,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Dokumen = {
  id: number;
  created_at: string;
  nama: string;
  judul: string;
  file_url: string;
  publish: boolean;
};

export default function DokumenPage() {
  const router = useRouter();

  const [dokumen, setDokumen] = useState<Dokumen[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    async function loadDokumen() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data, error, count } = await supabase
        .from("dokumen")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      console.log("=================================");
      console.log("TES ADMIN DOKUMEN");
      console.log("DATA:", data);
      console.log("JUMLAH DATA:", data?.length);
      console.log("COUNT SUPABASE:", count);
      console.log("ERROR:", error);
      console.log("=================================");

      if (error) {
        console.error("ERROR MEMUAT DOKUMEN:", error);
      } else {
        setDokumen(data ?? []);
      }

      setLoading(false);
    }

    loadDokumen();
  }, [router]);

  function getStoragePathFromUrl(url: string): string | null {
    try {
      const marker = "/storage/v1/object/public/dokumen/";

      const posisi = url.indexOf(marker);

      if (posisi === -1) {
        console.error("URL FILE TIDAK BERASAL DARI BUCKET dokumen:", url);

        return null;
      }

      const path = url.substring(posisi + marker.length);

      if (!path) {
        return null;
      }

      return decodeURIComponent(path);
    } catch (error) {
      console.error("ERROR MENGAMBIL STORAGE PATH:", error);

      return null;
    }
  }

  async function hapusFileStorage(fileUrl: string) {
    const storagePath = getStoragePathFromUrl(fileUrl);

    if (!storagePath) {
      console.error("STORAGE PATH DOKUMEN TIDAK DITEMUKAN.");
      return false;
    }

    console.log("FILE DOKUMEN YANG AKAN DIHAPUS:", storagePath);

    const { data, error } = await supabase.storage
      .from("dokumen")
      .remove([storagePath]);

    if (error) {
      console.error("ERROR HAPUS FILE DOKUMEN:", error);
      return false;
    }

    console.log("FILE DOKUMEN BERHASIL DIHAPUS:", data);

    return true;
  }

  async function handleDelete(item: Dokumen) {
    const yakin = window.confirm(
      `Apakah Anda yakin ingin menghapus dokumen "${item.judul}"?\n\nData dokumen dan file PDF di Storage akan dihapus dan tidak dapat dikembalikan.`,
    );

    if (!yakin) {
      return;
    }

    setDeletingId(item.id);

    console.log("=================================");
    console.log("MULAI HAPUS DOKUMEN");
    console.log("ID:", item.id);
    console.log("NAMA:", item.nama);
    console.log("JUDUL:", item.judul);
    console.log("FILE:", item.file_url);
    console.log("=================================");

    /*
     * LANGKAH 1
     * Hapus data dari tabel dokumen
     */
    const { error: deleteError } = await supabase
      .from("dokumen")
      .delete()
      .eq("id", item.id);

    if (deleteError) {
      console.error("ERROR HAPUS DATA DOKUMEN:", deleteError);

      alert("Dokumen gagal dihapus dari database.\n\nSilakan coba lagi.");

      setDeletingId(null);
      return;
    }

    console.log("DATA DOKUMEN BERHASIL DIHAPUS DARI DATABASE.");

    /*
     * LANGKAH 2
     * Hapus file dari Storage
     */
    const fileBerhasilDihapus = await hapusFileStorage(item.file_url);

    /*
     * LANGKAH 3
     * Hilangkan dari tampilan dashboard
     */
    setDokumen((data) =>
      data.filter((dokumenItem) => dokumenItem.id !== item.id),
    );

    setDeletingId(null);

    if (!fileBerhasilDihapus) {
      alert(
        "Data dokumen berhasil dihapus dari database.\n\nNamun file PDF di Storage tidak berhasil dihapus. Silakan periksa bucket dokumen.",
      );
    } else {
      alert("Dokumen berhasil dihapus.");
    }

    console.log("PROSES HAPUS DOKUMEN SELESAI.");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 size={28} className="mx-auto animate-spin text-[#001f3f]" />

          <p className="mt-3 text-sm text-gray-500">
            Memuat pengelolaan dokumen...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <FileText size={24} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  ORARI Lokal Majene
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#001f3f] sm:text-3xl">
                  Pengelolaan Dokumen
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Kelola dokumen yang tersedia pada website.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => router.push("/admin")}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <ArrowLeft size={16} />
                Dashboard
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/dokumen/tambah")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#001f3f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003b6f]"
              >
                <Plus size={17} />
                Tambah Dokumen
              </button>
            </div>
          </div>
        </div>

        {/* DAFTAR DOKUMEN */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#001f3f]">Daftar Dokumen</h2>

            <p className="mt-1 text-sm text-gray-500">
              Dokumen yang tersedia untuk digunakan pada website.
            </p>
          </div>

          {dokumen.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
              <FileText size={40} className="mx-auto text-gray-300" />

              <p className="mt-3 font-medium text-gray-500">
                Belum ada dokumen.
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Klik Tambah Dokumen untuk mengunggah dokumen baru.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {dokumen.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-gray-200 p-5 transition hover:border-gray-300 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    {/* INFORMASI */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                          {item.nama}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            item.publish
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.publish ? "Tampil" : "Draft"}
                        </span>
                      </div>

                      <h3 className="mt-3 text-lg font-bold text-[#001f3f]">
                        {item.judul}
                      </h3>

                      <p className="mt-2 break-all text-xs text-gray-400">
                        {item.file_url}
                      </p>
                    </div>

                    {/* AKSI */}
                    <div className="flex shrink-0 flex-wrap gap-2">
                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        <ExternalLink size={15} />
                        Buka
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          router.push(`/admin/dokumen/edit/${item.id}`)
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
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

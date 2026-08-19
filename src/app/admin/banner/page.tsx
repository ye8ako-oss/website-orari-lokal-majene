"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Edit, ImagePlus, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Banner = {
  id: number;
  created_at: string;
  judul: string;
  gambar: string | null;
  urutan: number | null;
  aktif: boolean;
  published_at: string | null;
};

export default function BannerPage() {
  const router = useRouter();

  const [banner, setBanner] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    async function loadBanner() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("banner")
        .select("*")
        .order("urutan", {
          ascending: true,
        });

      if (error) {
        console.error("ERROR MEMUAT BANNER:", error);
      } else {
        setBanner(data ?? []);
      }

      setLoading(false);
    }

    loadBanner();
  }, [router]);

  async function handleDelete(item: Banner) {
    const yakin = window.confirm(
      `Apakah Anda yakin ingin menghapus banner "${item.judul}"?\n\nBanner dan gambar terkait akan dihapus dan tidak dapat dikembalikan.`,
    );

    if (!yakin) {
      return;
    }

    setDeletingId(item.id);

    console.log("=================================");
    console.log("MULAI HAPUS BANNER");
    console.log("ID:", item.id);
    console.log("JUDUL:", item.judul);
    console.log("GAMBAR:", item.gambar);
    console.log("=================================");

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        alert("Sesi login sudah tidak valid. Silakan login kembali.");

        router.replace("/admin/login");
        return;
      }

      const response = await fetch("/api/admin/banner/delete", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },

        body: JSON.stringify({
          id: item.id,
          gambar: item.gambar,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("ERROR API HAPUS BANNER:", result);

        alert(result.error ?? "Banner gagal dihapus.");

        return;
      }

      setBanner((data) =>
        data.filter((bannerItem) => bannerItem.id !== item.id),
      );

      alert("Banner dan gambar berhasil dihapus.");

      console.log("BANNER BERHASIL DIHAPUS:", item.id);
    } catch (error) {
      console.error("ERROR HAPUS BANNER:", error);

      alert("Terjadi kesalahan saat menghapus banner.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#001f3f]" />

          <p className="text-sm text-gray-500">Memuat pengelolaan banner...</p>
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
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#B30000]">
                <ImagePlus size={24} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  ORARI Lokal Majene
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#001f3f] sm:text-3xl">
                  Pengelolaan Banner
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Kelola banner yang digunakan pada website.
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
                onClick={() => router.push("/admin/banner/tambah")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#001f3f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003b6f]"
              >
                <Plus size={17} />
                Tambah Banner
              </button>
            </div>
          </div>
        </div>

        {/* DAFTAR BANNER */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#001f3f]">Daftar Banner</h2>

            <p className="mt-1 text-sm text-gray-500">
              Banner yang tersedia untuk digunakan pada halaman depan website.
            </p>
          </div>

          {banner.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
              <ImagePlus size={40} className="mx-auto text-gray-300" />

              <p className="mt-3 font-medium text-gray-500">
                Belum ada banner.
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Klik Tambah Banner untuk mengunggah banner baru.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {banner.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-gray-200 transition hover:border-gray-300 hover:shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* GAMBAR */}
                    <div className="w-full shrink-0 bg-gray-100 lg:w-[420px]">
                      {item.gambar ? (
                        <div className="aspect-[16/7] w-full">
                          <img
                            src={item.gambar}
                            alt={item.judul}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[16/7] items-center justify-center text-sm text-gray-400">
                          Tidak ada gambar
                        </div>
                      )}
                    </div>

                    {/* INFORMASI */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              item.aktif
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {item.aktif ? "Aktif" : "Nonaktif"}
                          </span>

                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            Urutan {item.urutan ?? 1}
                          </span>
                        </div>

                        <h3 className="mt-3 text-lg font-bold text-[#001f3f]">
                          {item.judul}
                        </h3>

                        <p className="mt-2 break-all text-xs text-gray-400">
                          {item.gambar}
                        </p>
                      </div>

                      {/* AKSI */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            router.push(`/admin/banner/edit/${item.id}`)
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

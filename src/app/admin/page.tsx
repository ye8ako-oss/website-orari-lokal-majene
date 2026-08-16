"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function AdminPage() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    async function loadAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      setUserEmail(user.email ?? "");

      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("ERROR BERITA ADMIN:", error);
      } else {
        console.log("DATA BERITA ADMIN:", data);
        setBerita(data ?? []);
      }

      setLoading(false);
    }

    loadAdmin();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  function formatTanggal(tanggal: string) {
    return new Date(tanggal).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  function getStoragePathFromUrl(url: string): string | null {
    try {
      const marker = "/storage/v1/object/public/berita/";

      const posisi = url.indexOf(marker);

      if (posisi === -1) {
        console.error("URL FOTO TIDAK BERASAL DARI BUCKET BERITA:", url);
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

  async function hapusFotoStorage(urlFoto: string | null) {
    if (!urlFoto) {
      console.log("BERITA TIDAK MEMILIKI FOTO.");
      return;
    }

    const storagePath = getStoragePathFromUrl(urlFoto);

    if (!storagePath) {
      console.error("STORAGE PATH FOTO TIDAK DITEMUKAN.");
      return;
    }

    console.log("FOTO BERITA YANG AKAN DIHAPUS:", storagePath);

    const { data, error } = await supabase.storage
      .from("berita")
      .remove([storagePath]);

    if (error) {
      console.error("ERROR HAPUS FOTO STORAGE:", error);
      return;
    }

    console.log("FOTO BERITA BERHASIL DIHAPUS:", data);
  }

  async function handleDelete(
    id: number,
    judul: string,
    gambar: string | null,
  ) {
    const yakin = window.confirm(
      `Apakah Anda yakin ingin menghapus berita "${judul}"?\n\nBerita dan foto terkait akan dihapus dan tidak dapat dikembalikan.`,
    );

    if (!yakin) {
      return;
    }

    setDeletingId(id);

    console.log("MULAI HAPUS BERITA:", id, judul);

    const { error: deleteError } = await supabase
      .from("berita")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("ERROR HAPUS BERITA:", deleteError);

      alert("Berita gagal dihapus. Silakan coba lagi.");

      setDeletingId(null);
      return;
    }

    console.log("BERITA BERHASIL DIHAPUS DARI DATABASE.");

    await hapusFotoStorage(gambar);

    setBerita((data) => data.filter((item) => item.id !== id));

    setDeletingId(null);

    console.log("PROSES HAPUS BERITA SELESAI.");
  }

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

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
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
              onClick={handleLogout}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Keluar
            </button>
          </div>
        </div>

        {/* RINGKASAN */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Berita</p>

            <p className="mt-2 text-3xl font-bold text-[#001f3f]">
              {berita.length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Berita Terbit</p>

            <p className="mt-2 text-3xl font-bold text-green-600">
              {berita.filter((item) => item.publish).length}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Draft</p>

            <p className="mt-2 text-3xl font-bold text-gray-500">
              {berita.filter((item) => !item.publish).length}
            </p>
          </div>
        </div>

        {/* DAFTAR BERITA */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#001f3f]">Berita</h2>

              <p className="mt-1 text-sm text-gray-500">
                Kelola berita ORARI Lokal Majene.
              </p>
            </div>

            <button
              onClick={() => router.push("/admin/berita/tambah")}
              className="rounded-lg bg-[#001f3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#003b6f]"
            >
              + Tambah Berita
            </button>
          </div>

          {berita.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
              <p className="font-medium text-gray-500">Belum ada berita.</p>

              <p className="mt-1 text-sm text-gray-400">
                Klik tombol Tambah Berita untuk membuat berita pertama.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {berita.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-gray-200 transition hover:border-gray-300 hover:shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* FOTO */}
                    <div className="relative h-52 w-full shrink-0 bg-gray-100 sm:h-auto sm:w-56">
                      {item.gambar ? (
                        <img
                          src={item.gambar}
                          alt={item.judul}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full min-h-52 items-center justify-center text-sm text-gray-400">
                          Tidak ada foto
                        </div>
                      )}
                    </div>

                    {/* KONTEN */}
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
                          {item.isi}
                        </p>
                      </div>

                      {/* AKSI */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.publish && (
                          <button
                            type="button"
                            onClick={() => router.push(`/berita/${item.slug}`)}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                          >
                            Lihat
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            router.push(`/admin/berita/edit/${item.id}`)
                          }
                          className="rounded-lg border border-[#001f3f] px-4 py-2 text-xs font-semibold text-[#001f3f] transition hover:bg-[#001f3f] hover:text-white"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item.id, item.judul, item.gambar)
                          }
                          disabled={deletingId === item.id}
                          className="rounded-lg border border-red-600 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
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

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Banner = {
  id: number;
  created_at: string;
  judul: string;
  gambar: string;
  urutan: number | null;
  aktif: boolean;
  published_at: string | null;
};

export default function EditBannerPage() {
  const router = useRouter();
  const params = useParams();

  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [judul, setJudul] = useState("");
  const [urutan, setUrutan] = useState("1");
  const [aktif, setAktif] = useState(true);
  const [gambar, setGambar] = useState("");

  useEffect(() => {
    async function loadBanner() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      if (!id) {
        router.replace("/admin/banner");
        return;
      }

      const { data, error } = await supabase
        .from("banner")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        console.error("ERROR MEMUAT BANNER:", error);

        alert("Banner tidak ditemukan.");

        router.replace("/admin/banner");
        return;
      }

      const banner = data as Banner;

      setJudul(banner.judul ?? "");
      setGambar(banner.gambar ?? "");
      setUrutan(String(banner.urutan ?? 1));
      setAktif(banner.aktif ?? false);

      setLoading(false);
    }

    loadBanner();
  }, [id, router]);

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!judul.trim()) {
      alert("Judul banner wajib diisi.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("banner")
      .update({
        judul: judul.trim(),
        urutan: Number(urutan) || 1,
        aktif,
      })
      .eq("id", id);

    if (error) {
      console.error("ERROR UPDATE BANNER:", error);

      alert("Banner gagal diperbarui.");

      setSaving(false);
      return;
    }

    alert("Banner berhasil diperbarui.");

    router.push("/admin/banner");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#001f3f]" />

          <p className="text-sm text-gray-500">Memuat banner...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
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
                  Edit Banner
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Perbarui informasi banner.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => router.push("/admin/banner")}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <ArrowLeft size={16} />
              Kembali
            </button>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSave}
          className="rounded-2xl bg-white p-5 shadow-sm sm:p-6"
        >
          {/* PREVIEW */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Preview Banner
            </label>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
              {gambar ? (
                <div className="aspect-[16/7] w-full">
                  <img
                    src={gambar}
                    alt={judul}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center text-sm text-gray-400">
                  Tidak ada gambar
                </div>
              )}
            </div>
          </div>

          {/* JUDUL */}
          <div className="mb-5">
            <label
              htmlFor="judul"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Judul Banner
            </label>

            <input
              id="judul"
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Masukkan judul banner"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/10"
            />
          </div>

          {/* URUTAN */}
          <div className="mb-5">
            <label
              htmlFor="urutan"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Urutan Banner
            </label>

            <input
              id="urutan"
              type="number"
              min="1"
              value={urutan}
              onChange={(e) => setUrutan(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/10"
            />

            <p className="mt-1 text-xs text-gray-400">
              Angka lebih kecil akan ditampilkan lebih dahulu.
            </p>
          </div>

          {/* AKTIF */}
          <div className="mb-6 rounded-xl border border-gray-200 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={aktif}
                onChange={(e) => setAktif(e.target.checked)}
                className="mt-1 h-4 w-4"
              />

              <span>
                <span className="block text-sm font-semibold text-gray-700">
                  Banner aktif
                </span>

                <span className="mt-1 block text-xs leading-5 text-gray-500">
                  Banner aktif dapat digunakan oleh website pada halaman depan.
                </span>
              </span>
            </label>
          </div>

          {/* TOMBOL */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/banner")}
              className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#001f3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#003b6f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={17} />

              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

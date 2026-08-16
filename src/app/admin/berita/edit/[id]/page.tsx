"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function EditBeritaPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [judul, setJudul] = useState("");
  const [slug, setSlug] = useState("");
  const [isi, setIsi] = useState("");
  const [gambar, setGambar] = useState("");
  const [fileGambar, setFileGambar] = useState<File | null>(null);
  const [publish, setPublish] = useState(true);

  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

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
        .eq("id", id)
        .single<Berita>();

      if (error || !data) {
        console.error("ERROR MEMUAT BERITA:", error);
        setError("Berita tidak ditemukan.");
        setLoadingData(false);
        return;
      }

      setJudul(data.judul);
      setSlug(data.slug);
      setIsi(data.isi);
      setGambar(data.gambar ?? "");
      setPublish(data.publish);

      console.log("FOTO LAMA SAAT EDIT:", data.gambar);

      setLoadingData(false);
    }

    loadBerita();
  }, [id, router]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setError("");
    setFileGambar(file);

    if (file) {
      console.log("FOTO BARU DIPILIH:", file.name);
    }
  }

  function getStoragePathFromUrl(url: string): string | null {
    try {
      const marker = "/storage/v1/object/public/berita/";

      const posisi = url.indexOf(marker);

      if (posisi === -1) {
        console.error("URL FOTO LAMA BUKAN URL STORAGE BERITA:", url);
        return null;
      }

      const path = url.substring(posisi + marker.length);

      if (!path) {
        return null;
      }

      return decodeURIComponent(path);
    } catch (err) {
      console.error("ERROR MENGAMBIL STORAGE PATH:", err);

      return null;
    }
  }

  async function uploadFoto(): Promise<string | null> {
    if (!fileGambar) {
      return gambar || null;
    }

    const tipeYangDiizinkan = ["image/jpeg", "image/png", "image/webp"];

    if (!tipeYangDiizinkan.includes(fileGambar.type)) {
      setError("Format foto harus JPG, PNG, atau WebP.");
      return null;
    }

    const ukuranMaksimal = 5 * 1024 * 1024;

    if (fileGambar.size > ukuranMaksimal) {
      setError("Ukuran foto maksimal 5 MB.");
      return null;
    }

    setUploading(true);
    setError("");

    try {
      const ekstensi = fileGambar.name.split(".").pop()?.toLowerCase() || "jpg";

      const namaFile = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 12)}.${ekstensi}`;

      console.log("UPLOAD FOTO BARU:", namaFile);

      const { error: uploadError } = await supabase.storage
        .from("berita")
        .upload(namaFile, fileGambar, {
          cacheControl: "3600",
          upsert: false,
          contentType: fileGambar.type,
        });

      if (uploadError) {
        console.error("ERROR UPLOAD FOTO:", uploadError);
        setError("Foto gagal diunggah.");
        return null;
      }

      const { data } = supabase.storage.from("berita").getPublicUrl(namaFile);

      if (!data.publicUrl) {
        setError("URL foto tidak berhasil dibuat.");
        return null;
      }

      console.log("URL FOTO BARU:", data.publicUrl);

      return data.publicUrl;
    } catch (err) {
      console.error("ERROR UPLOAD FOTO:", err);
      setError("Terjadi kesalahan saat mengunggah foto.");
      return null;
    } finally {
      setUploading(false);
    }
  }

  async function hapusFotoLama(urlFotoLama: string) {
    console.log("MEMULAI HAPUS FOTO LAMA:", urlFotoLama);

    const storagePath = getStoragePathFromUrl(urlFotoLama);

    if (!storagePath) {
      console.error("STORAGE PATH FOTO LAMA TIDAK DITEMUKAN.");
      return;
    }

    console.log("STORAGE PATH YANG AKAN DIHAPUS:", storagePath);

    const { data, error } = await supabase.storage
      .from("berita")
      .remove([storagePath]);

    if (error) {
      console.error("ERROR HAPUS FOTO LAMA:", error);
      return;
    }

    console.log("FOTO LAMA BERHASIL DIHAPUS:", data);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    // Simpan URL foto lama SEBELUM melakukan perubahan apa pun.
    const fotoLama = gambar || null;

    console.log("FOTO LAMA SEBELUM UPDATE:", fotoLama);

    let urlGambar = gambar;

    // =====================================================
    // 1. Jika memilih foto baru, upload terlebih dahulu
    // =====================================================
    if (fileGambar) {
      const hasilUpload = await uploadFoto();

      if (!hasilUpload) {
        setLoading(false);
        return;
      }

      urlGambar = hasilUpload;

      console.log("FOTO BARU SIAP DISIMPAN:", urlGambar);
    }

    // =====================================================
    // 2. Update database
    // =====================================================
    const { error: updateError } = await supabase
      .from("berita")
      .update({
        judul,
        slug,
        isi,
        gambar: urlGambar || null,
        publish,
      })
      .eq("id", id);

    if (updateError) {
      console.error("ERROR UPDATE BERITA:", updateError);

      setError("Berita gagal diperbarui.");
      setLoading(false);

      return;
    }

    console.log("DATABASE BERHASIL DIUPDATE.");

    // =====================================================
    // 3. Setelah database berhasil diperbarui,
    //    hapus foto lama jika memang mengganti foto
    // =====================================================
    if (fileGambar && fotoLama && fotoLama !== urlGambar) {
      console.log("FOTO BERUBAH. FOTO LAMA AKAN DIHAPUS.");

      await hapusFotoLama(fotoLama);
    } else {
      console.log("TIDAK ADA FOTO LAMA YANG PERLU DIHAPUS.");
    }

    // =====================================================
    // 4. Kembali ke dashboard
    // =====================================================
    router.push("/admin");
    router.refresh();
  }

  if (loadingData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500">Memuat berita...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="text-sm font-medium text-[#001f3f] hover:underline"
          >
            ← Kembali ke Dashboard
          </button>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              ORARI Lokal Majene
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#001f3f]">
              Edit Berita
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Perbarui informasi berita.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* JUDUL */}
            <div>
              <label
                htmlFor="judul"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Judul Berita
              </label>

              <input
                id="judul"
                type="text"
                value={judul}
                onChange={(event) => setJudul(event.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20"
              />
            </div>

            {/* SLUG */}
            <div>
              <label
                htmlFor="slug"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Slug
              </label>

              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20"
              />
            </div>

            {/* ISI */}
            <div>
              <label
                htmlFor="isi"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Isi Berita
              </label>

              <textarea
                id="isi"
                value={isi}
                onChange={(event) => setIsi(event.target.value)}
                required
                rows={12}
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20"
              />
            </div>

            {/* FOTO */}
            <div>
              <label
                htmlFor="gambar"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Foto Berita
              </label>

              {gambar && !fileGambar && (
                <div className="mb-4">
                  <p className="mb-2 text-sm text-gray-600">Foto saat ini:</p>

                  <img
                    src={gambar}
                    alt={judul}
                    className="max-h-80 w-full rounded-xl object-cover"
                  />
                </div>
              )}

              <input
                id="gambar"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={uploading || loading}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none file:mr-4 file:rounded-md file:border-0 file:bg-[#001f3f] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#003b6f] disabled:cursor-not-allowed disabled:opacity-60"
              />

              {fileGambar && (
                <p className="mt-2 text-sm text-gray-600">
                  Foto baru dipilih: <strong>{fileGambar.name}</strong>
                </p>
              )}

              <p className="mt-2 text-xs text-gray-400">
                Pilih foto baru hanya jika ingin mengganti foto. Format JPG,
                PNG, atau WebP. Maksimal 5 MB.
              </p>

              {uploading && (
                <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm font-medium text-blue-700">
                  Mengunggah foto baru...
                </div>
              )}
            </div>

            {/* STATUS */}
            <div className="rounded-lg border border-gray-200 p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={publish}
                  onChange={(event) => setPublish(event.target.checked)}
                  className="h-4 w-4"
                />

                <span className="text-sm font-semibold text-gray-700">
                  Terbitkan berita
                </span>
              </label>

              <p className="mt-2 text-xs text-gray-400">
                Jika tidak dicentang, berita menjadi Draft dan tidak tampil di
                website.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* TOMBOL */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => router.push("/admin")}
                disabled={loading || uploading}
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={loading || uploading}
                className="rounded-lg bg-[#001f3f] px-6 py-3 font-semibold text-white hover:bg-[#003b6f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading
                  ? "Mengunggah Foto..."
                  : loading
                    ? "Menyimpan..."
                    : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

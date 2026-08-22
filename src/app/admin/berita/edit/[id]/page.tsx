"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import NewsEditor from "@/components/orari/news-editor";

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

  /*
   * ============================================================
   * MEMUAT BERITA
   * ============================================================
   */
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
      setIsi(data.isi ?? "");
      setGambar(data.gambar ?? "");
      setPublish(data.publish);

      setLoadingData(false);
    }

    void loadBerita();
  }, [id, router]);

  /*
   * ============================================================
   * FOTO UTAMA
   * ============================================================
   */
  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setError("");
    setFileGambar(file);
  }

  function getNamaFileDariUrl(url: string) {
    try {
      const pathname = new URL(url).pathname;
      const bagian = pathname.split("/");

      return decodeURIComponent(bagian[bagian.length - 1]);
    } catch {
      return null;
    }
  }

  async function hapusFotoLama(urlFotoLama: string) {
    const namaFileLama = getNamaFileDariUrl(urlFotoLama);

    if (!namaFileLama) {
      console.warn(
        "Nama file foto lama tidak dapat dibaca dari URL:",
        urlFotoLama,
      );

      return;
    }

    const { error } = await supabase.storage
      .from("berita")
      .remove([namaFileLama]);

    if (error) {
      console.error("ERROR HAPUS FOTO LAMA:", error);
    } else {
      console.log("FOTO LAMA BERHASIL DIHAPUS:", namaFileLama);
    }
  }

  /*
   * ============================================================
   * UPLOAD FOTO UTAMA
   * ============================================================
   */
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return null;
      }

      const ekstensi = fileGambar.name.split(".").pop()?.toLowerCase() || "jpg";

      const namaFile = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 12)}.${ekstensi}`;

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

      return data.publicUrl;
    } catch (err) {
      console.error("ERROR UPLOAD FOTO:", err);

      setError("Terjadi kesalahan saat mengunggah foto.");

      return null;
    } finally {
      setUploading(false);
    }
  }

  /*
   * ============================================================
   * SIMPAN PERUBAHAN
   * ============================================================
   */
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

    if (!judul.trim()) {
      setError("Judul berita wajib diisi.");
      setLoading(false);
      return;
    }

    if (!slug.trim()) {
      setError("Slug berita wajib diisi.");
      setLoading(false);
      return;
    }

    if (!isi || isi === "<p></p>") {
      setError("Isi berita wajib diisi.");
      setLoading(false);
      return;
    }

    /*
     * Simpan foto utama lama.
     */
    const fotoLama = gambar || null;

    let urlGambar = gambar;

    /*
     * Jika admin memilih foto utama baru,
     * upload terlebih dahulu.
     */
    if (fileGambar) {
      const hasilUpload = await uploadFoto();

      if (!hasilUpload) {
        setLoading(false);
        return;
      }

      urlGambar = hasilUpload;
    }

    /*
     * Update berita.
     *
     * Isi berita berasal langsung dari NewsEditor.
     */
    const { error: updateError } = await supabase
      .from("berita")
      .update({
        judul: judul.trim(),
        slug: slug.trim(),
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

    /*
     * Jika foto utama diganti,
     * hapus foto utama lama.
     */
    if (fileGambar && fotoLama && fotoLama !== urlGambar) {
      await hapusFotoLama(fotoLama);
    }

    /*
     * Kembali ke dashboard.
     */
    router.push("/admin");
    router.refresh();
  }

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */
  if (loadingData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 size={28} className="mx-auto animate-spin text-[#001f3f]" />

          <p className="mt-3 text-sm text-gray-500">Memuat berita...</p>
        </div>
      </main>
    );
  }

  /*
   * ============================================================
   * HALAMAN
   * ============================================================
   */
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
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
              Perbarui berita dengan editor profesional.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ==================================================
                JUDUL
                ================================================== */}
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

            {/* ==================================================
                SLUG
                ================================================== */}
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

              <p className="mt-2 text-xs text-gray-400">
                Slug digunakan sebagai alamat berita.
              </p>
            </div>

            {/* ==================================================
                EDITOR
                ================================================== */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Isi Berita
              </label>

              <NewsEditor
                value={isi}
                onChange={setIsi}
                disabled={loading || uploading}
              />
            </div>

            {/* ==================================================
                FOTO UTAMA
                ================================================== */}
            <div>
              <label
                htmlFor="gambar"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Foto Utama Berita
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
                Pilih foto baru hanya jika ingin mengganti foto utama. Format
                JPG, PNG, atau WebP. Maksimal 5 MB.
              </p>

              {uploading && (
                <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm font-medium text-blue-700">
                  Mengunggah foto utama...
                </div>
              )}
            </div>

            {/* ==================================================
                STATUS
                ================================================== */}
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

            {/* ==================================================
                ERROR
                ================================================== */}
            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* ==================================================
                TOMBOL
                ================================================== */}
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

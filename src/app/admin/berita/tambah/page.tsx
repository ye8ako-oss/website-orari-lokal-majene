"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import NewsEditor from "@/components/orari/news-editor";

export default function TambahBeritaPage() {
  const router = useRouter();

  const [judul, setJudul] = useState("");
  const [slug, setSlug] = useState("");
  const [isi, setIsi] = useState("");
  const [gambar, setGambar] = useState("");
  const [fileGambar, setFileGambar] = useState<File | null>(null);
  const [publish, setPublish] = useState(true);

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function buatSlug(judulBerita: string) {
    return judulBerita
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleJudulChange(value: string) {
    setJudul(value);

    if (!slug || slug === buatSlug(judul)) {
      setSlug(buatSlug(value));
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setError("");
    setFileGambar(file);
    setGambar("");
  }

  async function uploadFotoUtama(): Promise<string | null> {
    if (!fileGambar) {
      return null;
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
        console.error("ERROR UPLOAD FOTO UTAMA:", uploadError);

        setError("Foto gagal diunggah. Periksa policy Storage Supabase.");

        return null;
      }

      const { data } = supabase.storage.from("berita").getPublicUrl(namaFile);

      if (!data.publicUrl) {
        setError("URL foto tidak berhasil dibuat.");

        return null;
      }

      setGambar(data.publicUrl);

      return data.publicUrl;
    } catch (err) {
      console.error("ERROR UPLOAD FOTO UTAMA:", err);

      setError("Terjadi kesalahan saat mengunggah foto.");

      return null;
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void simpanBerita();
  }

  async function simpanBerita() {
    setLoading(true);
    setError("");

    try {
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

      /*
       * NewsEditor sudah mengirim HTML terbaru melalui onChange.
       */
      const isiHTML = isi.trim();

      if (!isiHTML || isiHTML === "<p></p>" || isiHTML === "<p><br></p>") {
        setError("Isi berita wajib diisi.");
        setLoading(false);
        return;
      }

      let urlGambar = gambar;

      if (fileGambar) {
        const hasilUpload = await uploadFotoUtama();

        if (!hasilUpload) {
          setLoading(false);
          return;
        }

        urlGambar = hasilUpload;
      }

      const publishedAt = publish ? new Date().toISOString() : null;

      const { error: insertError } = await supabase.from("berita").insert({
        judul: judul.trim(),
        slug: slug.trim(),
        isi: isiHTML,
        gambar: urlGambar || null,
        publish,
        published_at: publishedAt,
      });

      if (insertError) {
        console.error("ERROR SIMPAN BERITA:", insertError);

        setError("Berita gagal disimpan. Silakan coba lagi.");

        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("ERROR SIMPAN BERITA:", err);

      setError("Terjadi kesalahan saat menyimpan berita.");

      setLoading(false);
    }
  }

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
              Tambah Berita
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Buat berita dengan editor profesional untuk teks, foto pendukung,
              tautan, daftar, dan formatting lainnya.
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
                onChange={(event) => handleJudulChange(event.target.value)}
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20 disabled:bg-gray-100"
                placeholder="Masukkan judul berita"
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
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20 disabled:bg-gray-100"
                placeholder="judul-berita"
              />

              <p className="mt-2 text-xs text-gray-400">
                Slug digunakan sebagai alamat berita. Judul dan slug boleh
                berbeda.
              </p>
            </div>

            {/* EDITOR BERITA */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Isi Berita
              </label>

              <NewsEditor value={isi} onChange={setIsi} disabled={loading} />
            </div>

            {/* FOTO UTAMA */}
            <div>
              <label
                htmlFor="gambar"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Foto Utama Berita
              </label>

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
                  Foto dipilih: <strong>{fileGambar.name}</strong>
                </p>
              )}

              <p className="mt-2 text-xs text-gray-400">
                Foto utama tampil sebagai gambar utama berita. Format JPG, PNG,
                atau WebP. Maksimal 5 MB.
              </p>

              {uploading && (
                <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm font-medium text-blue-700">
                  Mengunggah foto utama...
                </div>
              )}

              {gambar && !uploading && (
                <div className="mt-4">
                  <p className="mb-2 text-sm font-semibold text-gray-700">
                    Foto utama berhasil diunggah
                  </p>

                  <img
                    src={gambar}
                    alt="Preview foto utama berita"
                    className="max-h-80 w-full rounded-xl object-cover"
                  />
                </div>
              )}
            </div>

            {/* PUBLISH */}
            <div className="rounded-lg border border-gray-200 p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={publish}
                  onChange={(event) => setPublish(event.target.checked)}
                  disabled={loading}
                  className="h-4 w-4"
                />

                <span className="text-sm font-semibold text-gray-700">
                  Terbitkan berita
                </span>
              </label>

              <p className="mt-2 text-xs text-gray-400">
                Jika dicentang, berita akan langsung berstatus Terbit. Waktu
                publikasi dicatat otomatis.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* BUTTON */}
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
                    : "Simpan Berita"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

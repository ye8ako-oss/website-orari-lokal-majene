"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function TambahBannerPage() {
  const router = useRouter();

  const [judul, setJudul] = useState("");
  const [fileBanner, setFileBanner] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setError("");
    setFileBanner(file);
  }

  async function uploadBanner(): Promise<string | null> {
    if (!fileBanner) {
      setError("Banner wajib dipilih.");
      return null;
    }

    const tipeYangDiizinkan = ["image/jpeg", "image/png", "image/webp"];

    if (!tipeYangDiizinkan.includes(fileBanner.type)) {
      setError("Format banner harus JPG, PNG, atau WebP.");
      return null;
    }

    const ukuranMaksimal = 5 * 1024 * 1024;

    if (fileBanner.size > ukuranMaksimal) {
      setError("Ukuran banner maksimal 5 MB.");
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

      const ekstensi = fileBanner.name.split(".").pop()?.toLowerCase() || "jpg";

      const namaFile = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 12)}.${ekstensi}`;

      const { error: uploadError } = await supabase.storage
        .from("banner")
        .upload(namaFile, fileBanner, {
          cacheControl: "3600",
          upsert: false,
          contentType: fileBanner.type,
        });

      if (uploadError) {
        console.error("ERROR UPLOAD BANNER:", uploadError);

        setError("Banner gagal diunggah. Periksa policy Storage Supabase.");

        return null;
      }

      const { data } = supabase.storage.from("banner").getPublicUrl(namaFile);

      if (!data.publicUrl) {
        setError("URL banner tidak berhasil dibuat.");
        return null;
      }

      return data.publicUrl;
    } catch (err) {
      console.error("ERROR UPLOAD BANNER:", err);

      setError("Terjadi kesalahan saat mengunggah banner.");

      return null;
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
        setError("Judul banner wajib diisi.");
        setLoading(false);
        return;
      }

      if (!fileBanner) {
        setError("Silakan pilih file banner.");
        setLoading(false);
        return;
      }

      const urlBanner = await uploadBanner();

      if (!urlBanner) {
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from("banner").insert({
        judul: judul.trim(),
        gambar: urlBanner,
        aktif: true,
      });

      if (insertError) {
        console.error("ERROR SIMPAN BANNER:", insertError);

        setError(
          "Banner berhasil diunggah tetapi gagal disimpan ke database. Periksa tabel dan policy Supabase.",
        );

        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("ERROR SIMPAN BANNER:", err);

      setError("Terjadi kesalahan saat menyimpan banner.");

      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* KEMBALI */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="text-sm font-medium text-[#001f3f] hover:underline"
          >
            ← Kembali ke Dashboard
          </button>
        </div>

        {/* FORM */}
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          {/* HEADER */}
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              ORARI Lokal Majene
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#001f3f]">
              Tambah Banner
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Tambahkan banner yang akan ditampilkan secara bergantian pada
              halaman depan website.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* JUDUL */}
            <div>
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
                onChange={(event) => setJudul(event.target.value)}
                required
                disabled={loading}
                placeholder="Contoh: Hari Jadi Majene ke-481"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                Judul digunakan sebagai identitas banner di dashboard admin.
              </p>
            </div>

            {/* FILE BANNER */}
            <div>
              <label
                htmlFor="banner"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                File Banner
              </label>

              <input
                id="banner"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={uploading || loading}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none file:mr-4 file:rounded-md file:border-0 file:bg-[#001f3f] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#003b6f] disabled:cursor-not-allowed disabled:opacity-60"
              />

              {fileBanner && (
                <p className="mt-2 text-sm text-gray-600">
                  File dipilih: <strong>{fileBanner.name}</strong>
                </p>
              )}

              <p className="mt-2 text-xs text-gray-400">
                Format JPG, PNG, atau WebP. Maksimal 5 MB.
              </p>
            </div>

            {/* PREVIEW */}
            {fileBanner && (
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Preview Banner
                </p>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                  <img
                    src={URL.createObjectURL(fileBanner)}
                    alt="Preview banner"
                    className="h-auto max-h-[500px] w-full object-contain"
                  />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Banner akan ditampilkan dalam area banner di halaman depan dan
                  bergantian dengan banner lainnya.
                </p>
              </div>
            )}

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
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#001f3f] px-6 py-3 font-semibold text-white hover:bg-[#003b6f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Mengunggah Banner...
                  </>
                ) : loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Banner"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

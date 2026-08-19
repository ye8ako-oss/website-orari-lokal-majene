"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Loader2, Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function TambahDokumenPage() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [publish, setPublish] = useState(true);
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cekLogin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      setCheckingAuth(false);
    }

    cekLogin();
  }, [router]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;

    setError("");
    setFile(selectedFile);
  }

  function formatUkuranFile(bytes: number) {
    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!nama.trim()) {
      setError("Nama dokumen wajib diisi.");
      return;
    }

    if (!judul.trim()) {
      setError("Judul dokumen wajib diisi.");
      return;
    }

    if (!file) {
      setError("Silakan pilih file dokumen.");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    /*
     * Batasi ukuran file.
     * Untuk sementara maksimal 10 MB.
     */
    const ukuranMaksimal = 10 * 1024 * 1024;

    if (file.size > ukuranMaksimal) {
      setError("Ukuran file maksimal 10 MB.");
      return;
    }

    setLoading(true);

    try {
      /*
       * Nama file dibuat unik agar tidak bentrok
       * dengan file dokumen lainnya.
       */
      const ekstensi = file.name.split(".").pop()?.toLowerCase() || "bin";

      const namaFile = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}.${ekstensi}`;

      /*
       * Upload file ke bucket "dokumen".
       */
      const { error: uploadError } = await supabase.storage
        .from("dokumen")
        .upload(namaFile, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type || "application/octet-stream",
        });

      if (uploadError) {
        console.error("ERROR UPLOAD DOKUMEN:", uploadError);

        setError(
          "File gagal diunggah. Pastikan bucket dokumen sudah tersedia dan izin upload sudah benar.",
        );

        setLoading(false);
        return;
      }

      /*
       * Ambil URL publik file.
       */
      const { data: publicUrlData } = supabase.storage
        .from("dokumen")
        .getPublicUrl(namaFile);

      const fileUrl = publicUrlData.publicUrl;

      if (!fileUrl) {
        setError("URL dokumen tidak berhasil dibuat.");
        setLoading(false);
        return;
      }

      /*
       * Simpan informasi dokumen ke tabel dokumen.
       */
      const { error: insertError } = await supabase.from("dokumen").insert({
        nama: nama.trim(),
        judul: judul.trim(),
        file_url: fileUrl,
        publish,
      });

      if (insertError) {
        console.error("ERROR SIMPAN DOKUMEN:", insertError);

        /*
         * Jika database gagal menyimpan,
         * file yang baru saja di-upload kita coba hapus
         * agar tidak menjadi file yatim di storage.
         */
        await supabase.storage.from("dokumen").remove([namaFile]);

        setError("Dokumen gagal disimpan ke database.");
        setLoading(false);
        return;
      }

      /*
       * Berhasil.
       * Kembali ke dashboard admin.
       */
      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error("ERROR TAMBAH DOKUMEN:", err);

      setError("Terjadi kesalahan saat menambahkan dokumen.");
      setLoading(false);
    }
  }

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 size={28} className="mx-auto animate-spin text-[#001f3f]" />

          <p className="mt-3 text-sm text-gray-500">Memeriksa akses admin...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
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

        {/* CARD */}
        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          {/* HEADER */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <FileText size={24} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  ORARI Lokal Majene
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#001f3f] sm:text-3xl">
                  Tambah Dokumen
                </h1>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Upload dokumen yang nantinya dapat diakses melalui portal website
              ORARI Lokal Majene.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NAMA */}
            <div>
              <label
                htmlFor="nama"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Nama Dokumen
              </label>

              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(event) => setNama(event.target.value)}
                placeholder="Contoh: Surat Keputusan"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20"
              />

              <p className="mt-2 text-xs text-gray-400">
                Nama singkat untuk mengenali dokumen di dashboard.
              </p>
            </div>

            {/* JUDUL */}
            <div>
              <label
                htmlFor="judul"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Judul Dokumen
              </label>

              <input
                id="judul"
                type="text"
                value={judul}
                onChange={(event) => setJudul(event.target.value)}
                placeholder="Contoh: Surat Keputusan Ketua ORARI Lokal Majene Tahun 2026"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20"
              />

              <p className="mt-2 text-xs text-gray-400">
                Judul yang akan ditampilkan kepada pengunjung website.
              </p>
            </div>

            {/* FILE */}
            <div>
              <label
                htmlFor="file"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                File Dokumen
              </label>

              <input
                id="file"
                type="file"
                onChange={handleFileChange}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none file:mr-4 file:rounded-md file:border-0 file:bg-[#001f3f] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#003b6f] disabled:cursor-not-allowed disabled:opacity-60"
              />

              {file && (
                <div className="mt-3 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
                  <FileText size={20} className="shrink-0 text-[#001f3f]" />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-700">
                      {file.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {formatUkuranFile(file.size)}
                    </p>
                  </div>
                </div>
              )}

              <p className="mt-2 text-xs text-gray-400">
                Maksimal ukuran file 10 MB.
              </p>
            </div>

            {/* STATUS */}
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
                  Tampilkan di website
                </span>
              </label>

              <p className="mt-2 text-xs text-gray-400">
                Jika tidak dicentang, dokumen disimpan sebagai draft dan belum
                ditampilkan kepada pengunjung.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm leading-6 text-red-600">
                {error}
              </div>
            )}

            {/* TOMBOL */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => router.push("/admin")}
                disabled={loading}
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#001f3f] px-6 py-3 font-semibold text-white transition hover:bg-[#003b6f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Simpan Dokumen
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

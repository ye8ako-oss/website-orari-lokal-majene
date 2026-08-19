"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileText, Loader2, Save } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Dokumen = {
  id: number;
  created_at: string;
  nama: string;
  judul: string;
  file_url: string;
  publish: boolean;
};

export default function EditDokumenPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [publish, setPublish] = useState(true);
  const [fileUrl, setFileUrl] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDokumen() {
      if (!id || Number.isNaN(id)) {
        setError("ID dokumen tidak valid.");
        setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("dokumen")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("ERROR MEMUAT DOKUMEN:", error);

        setError("Dokumen tidak ditemukan.");
        setLoading(false);
        return;
      }

      const dokumen = data as Dokumen;

      setNama(dokumen.nama);
      setJudul(dokumen.judul);
      setPublish(dokumen.publish);
      setFileUrl(dokumen.file_url);

      setLoading(false);
    }

    loadDokumen();
  }, [id, router]);

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

    if (!id || Number.isNaN(id)) {
      setError("ID dokumen tidak valid.");
      return;
    }

    setSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { error: updateError } = await supabase
        .from("dokumen")
        .update({
          nama: nama.trim(),
          judul: judul.trim(),
          publish,
        })
        .eq("id", id);

      if (updateError) {
        console.error("ERROR UPDATE DOKUMEN:", updateError);

        setError("Perubahan dokumen gagal disimpan.");
        setSaving(false);
        return;
      }

      alert("Dokumen berhasil diperbarui.");

      router.push("/admin/dokumen");
      router.refresh();
    } catch (err) {
      console.error("ERROR EDIT DOKUMEN:", err);

      setError("Terjadi kesalahan saat memperbarui dokumen.");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="text-center">
          <Loader2 size={28} className="mx-auto animate-spin text-[#001f3f]" />

          <p className="mt-3 text-sm text-gray-500">Memuat dokumen...</p>
        </div>
      </main>
    );
  }

  if (error && !nama && !judul) {
    return (
      <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <button
            type="button"
            onClick={() => router.push("/admin/dokumen")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#001f3f] hover:underline"
          >
            <ArrowLeft size={16} />
            Kembali ke Dokumen
          </button>

          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <FileText size={44} className="mx-auto text-gray-300" />

            <h1 className="mt-4 text-xl font-bold text-[#001f3f]">
              Dokumen Tidak Ditemukan
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Dokumen yang ingin diedit tidak dapat ditemukan.
            </p>

            <button
              type="button"
              onClick={() => router.push("/admin/dokumen")}
              className="mt-6 rounded-lg bg-[#001f3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#003b6f]"
            >
              Kembali ke Daftar Dokumen
            </button>
          </div>
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
            onClick={() => router.push("/admin/dokumen")}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#001f3f] hover:underline"
          >
            <ArrowLeft size={16} />
            Kembali ke Dokumen
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
                  Edit Dokumen
                </h1>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Perbarui informasi dokumen yang ditampilkan pada website.
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
                disabled={saving}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20 disabled:bg-gray-100"
              />
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
                disabled={saving}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20 disabled:bg-gray-100"
              />
            </div>

            {/* FILE SAAT INI */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                File Dokumen Saat Ini
              </label>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <FileText
                    size={20}
                    className="mt-0.5 shrink-0 text-[#001f3f]"
                  />

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-700">
                      File PDF tersimpan
                    </p>

                    <p className="mt-1 break-all text-xs text-gray-400">
                      {fileUrl}
                    </p>

                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs font-semibold text-[#001f3f] hover:underline"
                    >
                      Buka file →
                    </a>
                  </div>
                </div>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Pada tahap ini file PDF tidak diubah.
              </p>
            </div>

            {/* STATUS */}
            <div className="rounded-lg border border-gray-200 p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={publish}
                  onChange={(event) => setPublish(event.target.checked)}
                  disabled={saving}
                  className="h-4 w-4"
                />

                <span className="text-sm font-semibold text-gray-700">
                  Tampilkan di website
                </span>
              </label>

              <p className="mt-2 text-xs text-gray-400">
                Jika tidak dicentang, dokumen akan menjadi draft dan tidak
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
                onClick={() => router.push("/admin/dokumen")}
                disabled={saving}
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#001f3f] px-6 py-3 font-semibold text-white transition hover:bg-[#003b6f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Simpan Perubahan
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

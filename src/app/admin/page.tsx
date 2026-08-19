"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, ImagePlus, LogOut, Newspaper, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      setUserEmail(user.email ?? "");
      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
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
      <div className="mx-auto max-w-6xl">
        {/* =====================================================
            HEADER
            ===================================================== */}
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
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <LogOut size={16} />
              Keluar
            </button>
          </div>
        </div>

        {/* =====================================================
            MENU KELOLA KONTEN
            ===================================================== */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#001f3f] sm:text-2xl">
              Kelola Konten Website
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Pilih jenis konten yang ingin ditambahkan atau dikelola. Tidak
              perlu membuka VS Code untuk menambahkan konten.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* =================================================
                BERITA
                ================================================= */}
            <button
              type="button"
              onClick={() => router.push("/admin/berita")}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-[#001f3f] hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#001f3f]">
                  <Newspaper size={24} />
                </div>

                <Plus
                  size={20}
                  className="text-gray-400 transition group-hover:text-[#001f3f]"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#001f3f]">
                Tambah Berita
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Tulis, tambahkan foto, dan terbitkan berita terbaru ORARI Lokal
                Majene.
              </p>

              <div className="mt-5 text-sm font-semibold text-[#001f3f] transition group-hover:text-[#B30000]">
                Buka Pengelolaan Berita →
              </div>
            </button>

            {/* =================================================
                BANNER
                ================================================= */}
            <button
              type="button"
              onClick={() => router.push("/admin/banner")}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-[#B30000] hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#B30000]">
                  <ImagePlus size={24} />
                </div>

                <Plus
                  size={20}
                  className="text-gray-400 transition group-hover:text-[#B30000]"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#001f3f]">
                Tambah Banner
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Tambahkan banner yang nantinya dapat tampil bergantian pada
                halaman depan website.
              </p>

              <div className="mt-5 text-sm font-semibold text-[#001f3f] transition group-hover:text-[#B30000]">
                Buka Pengelolaan Banner →
              </div>
            </button>

            {/* =================================================
                DOKUMEN
                ================================================= */}
            <button
              type="button"
              onClick={() => router.push("/admin/dokumen")}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-left transition duration-200 hover:-translate-y-1 hover:border-green-600 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  <FileText size={24} />
                </div>

                <Plus
                  size={20}
                  className="text-gray-400 transition group-hover:text-green-700"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-[#001f3f]">
                Tambah Dokumen
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Upload dokumen yang akan tersedia melalui portal website ORARI
                Lokal Majene.
              </p>

              <div className="mt-5 text-sm font-semibold text-[#001f3f] transition group-hover:text-green-700">
                Buka Pengelolaan Dokumen →
              </div>
            </button>
          </div>
        </div>

        {/* =====================================================
            INFORMASI
            ===================================================== */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm leading-6 text-blue-800">
            <strong>Dashboard Admin:</strong> seluruh konten website nantinya
            dapat dikelola dari halaman ini. Berita, banner, dan dokumen tidak
            perlu lagi ditambahkan melalui VS Code.
          </p>
        </div>
      </div>
    </main>
  );
}

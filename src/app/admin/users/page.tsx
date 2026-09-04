"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type AdminUser = {
  id: number;
  user_id: string;
  username: string;
  nama: string;
  role: string;
  aktif: boolean;
  created_at: string;
};

export default function AdminUsersPage() {
  const router = useRouter();

  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [username, setUsername] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");

  async function loadAdmins() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        router.replace("/admin/login");
        return;
      }

      const response = await fetch("/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("ERROR MEMUAT ADMIN:", result.error);
        alert(result.error || "Gagal memuat daftar admin.");
        return;
      }

      setAdmins(result.admins ?? []);
    } catch (error) {
      console.error("ERROR:", error);
      alert("Terjadi kesalahan saat memuat admin.");
    } finally {
      setLoading(false);
    }
  }
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    loadAdmins();
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  async function handleTambahAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username.trim() || !nama.trim() || !password) {
      alert("Username, nama, dan password wajib diisi.");
      return;
    }

    if (password.length < 8) {
      alert("Password minimal 8 karakter.");
      return;
    }

    setSaving(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        alert("Sesi login tidak ditemukan. Silakan login kembali.");
        router.replace("/admin/login");
        return;
      }

      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          username,
          nama,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Gagal membuat admin baru.");
        return;
      }

      alert(result.message || "Admin berhasil dibuat.");

      setUsername("");
      setNama("");
      setPassword("");

      await loadAdmins();
    } catch (error) {
      console.error("ERROR MENAMBAH ADMIN:", error);
      alert("Terjadi kesalahan saat menambahkan admin.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <button
                type="button"
                onClick={() => router.push("/admin")}
                className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#001f3f]"
              >
                <ArrowLeft size={16} />
                Kembali ke Dashboard
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#001f3f]">
                  <ShieldCheck size={25} />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                    ORARI Lokal Majene
                  </p>

                  <h1 className="mt-1 text-2xl font-bold text-[#001f3f] sm:text-3xl">
                    Manajemen Admin
                  </h1>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-500">
                Halaman khusus Super Admin untuk mengelola akun administrator
                website.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Keluar
            </button>
          </div>
        </div>

        {/* FORM TAMBAH ADMIN */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#001f3f]">
              Tambah Admin Baru
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Buat akun admin baru tanpa membuka VS Code.
            </p>
          </div>

          <form onSubmit={handleTambahAdmin}>
            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Contoh: ADMINMAJENE"
                  autoComplete="username"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/10"
                />

                <p className="mt-1.5 text-xs text-gray-400">
                  Hanya huruf dan angka.
                </p>
              </div>

              <div>
                <label
                  htmlFor="nama"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Nama Admin
                </label>

                <input
                  id="nama"
                  type="text"
                  value={nama}
                  onChange={(event) => setNama(event.target.value)}
                  placeholder="Nama lengkap admin"
                  autoComplete="name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimal 8 karakter"
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/10"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#001f3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#003366] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Plus size={17} />
                )}

                {saving ? "Membuat Admin..." : "Tambah Admin"}
              </button>
            </div>
          </form>
        </div>

        {/* DAFTAR ADMIN */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#001f3f]">Daftar Admin</h2>

            <p className="mt-1 text-sm text-gray-500">
              Daftar akun yang memiliki akses ke dashboard admin.
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-32 items-center justify-center">
              <Loader2 size={28} className="animate-spin text-[#001f3f]" />
            </div>
          ) : admins.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
              <p className="text-sm text-gray-500">Belum ada data admin.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Username
                    </th>

                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Nama
                    </th>

                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Role
                    </th>

                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {admins.map((admin) => (
                    <tr
                      key={admin.id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-4 py-4">
                        <span className="font-bold text-[#001f3f]">
                          {admin.username}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-700">
                        {admin.nama}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            admin.role === "SUPER_ADMIN"
                              ? "bg-red-50 text-[#B30000]"
                              : "bg-blue-50 text-[#003366]"
                          }`}
                        >
                          {admin.role}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            admin.aktif
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {admin.aktif ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <button
                          type="button"
                          disabled={admin.role === "SUPER_ADMIN"}
                          title={
                            admin.role === "SUPER_ADMIN"
                              ? "Super Admin tidak dapat dihapus dari halaman ini."
                              : "Hapus admin"
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Trash2 size={15} />
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* INFORMASI KEAMANAN */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <p className="text-sm leading-6 text-blue-800">
            <strong>Catatan keamanan:</strong> hanya akun dengan role{" "}
            <strong>SUPER_ADMIN</strong> yang dapat membuat admin baru. Password
            tidak disimpan di tabel <strong>admin_users</strong>, tetapi
            dikelola oleh Supabase Authentication.
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  KeyRound,
  Loader2,
  Plus,
  ShieldCheck,
  Trash2,
  Power,
  X,
  AlertTriangle,
} from "lucide-react";
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

  const [resetAdmin, setResetAdmin] = useState<AdminUser | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [resetPasswordConfirm, setResetPasswordConfirm] = useState("");
  const [resetting, setResetting] = useState(false);

  const [statusAdmin, setStatusAdmin] = useState<AdminUser | null>(null);
  const [statusSaving, setStatusSaving] = useState(false);

  const [deleteAdmin, setDeleteAdmin] = useState<AdminUser | null>(null);
  const [deleting, setDeleting] = useState(false);

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

  function bukaResetPassword(admin: AdminUser) {
    if (admin.role === "SUPER_ADMIN") {
      return;
    }

    setResetAdmin(admin);
    setResetPassword("");
    setResetPasswordConfirm("");
  }

  function tutupResetPassword() {
    if (resetting) {
      return;
    }

    setResetAdmin(null);
    setResetPassword("");
    setResetPasswordConfirm("");
  }

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!resetAdmin) {
      return;
    }

    if (!resetPassword) {
      alert("Password baru wajib diisi.");
      return;
    }

    if (resetPassword.length < 8) {
      alert("Password minimal 8 karakter.");
      return;
    }

    if (resetPassword !== resetPasswordConfirm) {
      alert("Konfirmasi password tidak sama.");
      return;
    }

    setResetting(true);

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
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          user_id: resetAdmin.user_id,
          password: resetPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Gagal mereset password admin.");
        return;
      }

      alert(
        result.message ||
          `Password admin ${resetAdmin.username} berhasil direset.`,
      );

      tutupResetPassword();
    } catch (error) {
      console.error("ERROR RESET PASSWORD:", error);
      alert("Terjadi kesalahan saat mereset password admin.");
    } finally {
      setResetting(false);
    }
  }

  function bukaStatusAdmin(admin: AdminUser) {
    if (admin.role === "SUPER_ADMIN") {
      return;
    }

    setStatusAdmin(admin);
  }

  function tutupStatusAdmin() {
    if (statusSaving) {
      return;
    }

    setStatusAdmin(null);
  }

  async function handleStatusAdmin() {
    if (!statusAdmin) {
      return;
    }

    setStatusSaving(true);

    const akanDiaktifkan = !statusAdmin.aktif;

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
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          action: "status",
          user_id: statusAdmin.user_id,
          aktif: akanDiaktifkan,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Gagal mengubah status admin.");
        return;
      }

      alert(
        result.message ||
          `Admin ${statusAdmin.username} berhasil ${
            akanDiaktifkan ? "diaktifkan" : "dinonaktifkan"
          }.`,
      );

      setStatusAdmin(null);

      await loadAdmins();
    } catch (error) {
      console.error("ERROR STATUS ADMIN:", error);
      alert("Terjadi kesalahan saat mengubah status admin.");
    } finally {
      setStatusSaving(false);
    }
  }

  function bukaHapusAdmin(admin: AdminUser) {
    if (admin.role === "SUPER_ADMIN") {
      return;
    }

    setDeleteAdmin(admin);
  }

  function tutupHapusAdmin() {
    if (deleting) {
      return;
    }

    setDeleteAdmin(null);
  }

  async function handleHapusAdmin() {
    if (!deleteAdmin) {
      return;
    }

    setDeleting(true);

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
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          user_id: deleteAdmin.user_id,
        }),
      });

      const responseText = await response.text();

      let result: {
        error?: string;
        message?: string;
      } = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          console.error("Response DELETE bukan JSON:", responseText);
        }
      }

      alert(
        result.message ||
          `Admin ${deleteAdmin.username} berhasil dihapus secara permanen.`,
      );

      setDeleteAdmin(null);

      await loadAdmins();
    } catch (error) {
      console.error("ERROR HAPUS ADMIN:", error);
      alert("Terjadi kesalahan saat menghapus admin.");
    } finally {
      setDeleting(false);
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
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#003366]">
              Manajemen Admin
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Kelola akun administrator website ORARI Lokal Majene.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <ArrowLeft size={16} />
              Kembali
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg bg-[#003366] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#00264d]"
            >
              Keluar
            </button>
          </div>
        </div>

        {/* FORM TAMBAH ADMIN */}
        <section className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#003366]">
              <Plus size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">Tambah Admin</h2>

              <p className="text-sm text-gray-500">
                Buat akun administrator baru.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleTambahAdmin}
            className="grid gap-4 md:grid-cols-3"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Username / Callsign
              </label>

              <input
                type="text"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value.toUpperCase())
                }
                autoComplete="off"
                placeholder="Contoh: YE8AKO"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#003366] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Nama Lengkap
              </label>

              <input
                type="text"
                value={nama}
                onChange={(event) => setNama(event.target.value)}
                placeholder="Nama lengkap admin"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#003366] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="Minimal 8 karakter"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#003366] focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-[#003366] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00264d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Plus size={17} />
                    Tambah Admin
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* DAFTAR ADMIN */}
        <section className="rounded-2xl bg-white shadow-sm">
          <div className="border-b border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#003366]">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Daftar Admin
                </h2>

                <p className="text-sm text-gray-500">
                  Daftar akun administrator yang terdaftar di sistem.
                </p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 p-10 text-sm text-gray-500">
              <Loader2 size={18} className="animate-spin" />
              Memuat data admin...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">
                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Username
                    </th>

                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Nama
                    </th>

                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Role
                    </th>

                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-xs font-bold uppercase tracking-wide text-gray-500">
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
                      <td className="px-5 py-4">
                        <span className="font-semibold text-[#003366]">
                          {admin.username}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-700">
                        {admin.nama}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            admin.role === "SUPER_ADMIN"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {admin.role === "SUPER_ADMIN"
                            ? "SUPER ADMIN"
                            : "ADMIN"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            admin.aktif
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {admin.aktif ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {admin.role !== "SUPER_ADMIN" && (
                            <>
                              <button
                                type="button"
                                onClick={() => bukaResetPassword(admin)}
                                title={`Reset password ${admin.username}`}
                                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-[#003366] transition hover:bg-blue-50"
                              >
                                <KeyRound size={15} />
                                Reset Password
                              </button>

                              <button
                                type="button"
                                onClick={() => bukaStatusAdmin(admin)}
                                title={
                                  admin.aktif
                                    ? `Nonaktifkan ${admin.username}`
                                    : `Aktifkan ${admin.username}`
                                }
                                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                                  admin.aktif
                                    ? "border-orange-200 text-orange-600 hover:bg-orange-50"
                                    : "border-green-200 text-green-600 hover:bg-green-50"
                                }`}
                              >
                                <Power size={15} />
                                {admin.aktif ? "Nonaktifkan" : "Aktifkan"}
                              </button>
                            </>
                          )}

                          <button
                            type="button"
                            onClick={() => bukaHapusAdmin(admin)}
                            disabled={admin.role === "SUPER_ADMIN"}
                            title={
                              admin.role === "SUPER_ADMIN"
                                ? "Super Admin tidak dapat dihapus."
                                : "Hapus permanen admin"
                            }
                            className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Trash2 size={15} />
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* MODAL RESET PASSWORD */}
      {resetAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Reset Password
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Admin{" "}
                  <span className="font-semibold text-[#003366]">
                    {resetAdmin.username}
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={tutupResetPassword}
                disabled={resetting}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password Baru
                </label>

                <input
                  type="password"
                  value={resetPassword}
                  onChange={(event) => setResetPassword(event.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#003366] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Konfirmasi Password
                </label>

                <input
                  type="password"
                  value={resetPasswordConfirm}
                  onChange={(event) =>
                    setResetPasswordConfirm(event.target.value)
                  }
                  placeholder="Ulangi password baru"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-[#003366] focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={tutupResetPassword}
                  disabled={resetting}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={resetting}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#003366] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00264d] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {resetting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <KeyRound size={16} />
                      Reset Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL AKTIF / NONAKTIF */}
      {statusAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    statusAdmin.aktif
                      ? "bg-orange-50 text-orange-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  <Power size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {statusAdmin.aktif ? "Nonaktifkan Admin" : "Aktifkan Admin"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {statusAdmin.username} — {statusAdmin.nama}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={tutupStatusAdmin}
                disabled={statusSaving}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            <div
              className={`rounded-xl p-4 text-sm leading-relaxed ${
                statusAdmin.aktif
                  ? "bg-orange-50 text-orange-800"
                  : "bg-green-50 text-green-800"
              }`}
            >
              {statusAdmin.aktif ? (
                <>
                  Admin <strong>{statusAdmin.username}</strong> akan
                  dinonaktifkan. Akun tetap tersimpan di sistem, tetapi admin
                  tersebut tidak dapat login dan mengakses dashboard sampai
                  diaktifkan kembali.
                </>
              ) : (
                <>
                  Admin <strong>{statusAdmin.username}</strong> akan diaktifkan
                  kembali dan dapat login serta mengakses dashboard seperti
                  biasa.
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={tutupStatusAdmin}
                disabled={statusSaving}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleStatusAdmin}
                disabled={statusSaving}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  statusAdmin.aktif
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {statusSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Power size={16} />
                    {statusAdmin.aktif ? "Nonaktifkan" : "Aktifkan"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HAPUS PERMANEN */}
      {deleteAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <AlertTriangle size={21} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Hapus Permanen Admin
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={tutupHapusAdmin}
                disabled={deleting}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            <div className="rounded-xl bg-red-50 p-4 text-sm leading-relaxed text-red-800">
              <p>Anda akan menghapus akun admin:</p>

              <div className="mt-3 rounded-lg bg-white p-3">
                <p className="font-bold text-[#003366]">
                  {deleteAdmin.username}
                </p>

                <p className="mt-1 text-gray-700">{deleteAdmin.nama}</p>
              </div>

              <p className="mt-3">
                Akun login di Supabase Auth dan data admin di database akan
                dihapus secara permanen.
              </p>

              <p className="mt-2 font-semibold">
                Jika nanti diperlukan, callsign ini dapat dibuat kembali sebagai
                admin baru.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={tutupHapusAdmin}
                disabled={deleting}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleHapusAdmin}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Menghapus...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Hapus Permanen
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

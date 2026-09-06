"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, KeyRound, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL_DOMAIN = "@admin.orarilokalmajene.local";

export default function AdminPasswordPage() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function checkAdmin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("username, role, aktif")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError) {
        console.error("ERROR MEMUAT DATA ADMIN:", adminError);
        setError("Gagal memuat data akun.");
        setLoading(false);
        return;
      }

      if (!adminData || !adminData.aktif) {
        await supabase.auth.signOut();
        router.replace("/admin/login");
        return;
      }

      /*
       * Halaman ini khusus ADMIN biasa.
       * SUPER_ADMIN tidak menggunakan halaman ini.
       */
      if (adminData.role !== "ADMIN" && adminData.role !== "SUPER_ADMIN") {
        router.replace("/admin");
        return;
      }

      setUsername(adminData.username);
      setUserRole(adminData.role);
      setUserEmail(user.email ?? "");
      setLoading(false);
    }

    checkAdmin();
  }, [router]);

  async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Semua kolom password wajib diisi.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password baru minimal 8 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password baru tidak sama.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("Password baru harus berbeda dari password saat ini.");
      return;
    }

    setSaving(true);

    try {
      /*
       * Ambil akun yang sedang login.
       */
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        setError("Sesi login tidak ditemukan. Silakan login kembali.");
        router.replace("/admin/login");
        return;
      }

      /*
       * Verifikasi password lama dengan login ulang.
       * Ini memastikan orang yang sedang mengganti password
       * benar-benar mengetahui password sebelumnya.
       */
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (verifyError) {
        setError("Password saat ini tidak benar.");
        return;
      }

      /*
       * Jika password lama benar, ubah password
       * pada Supabase Authentication.
       */
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        console.error("ERROR MENGGANTI PASSWORD:", updateError);
        setError(updateError.message || "Gagal mengganti password.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setSuccess("success");
    } catch (error) {
      console.error("ERROR GANTI PASSWORD:", error);
      setError("Terjadi kesalahan saat mengganti password.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#001f3f]" />

          <p className="text-sm text-gray-500">Memuat akun...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* HEADER */}
        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#001f3f]"
          >
            <ArrowLeft size={16} />
            Kembali ke Dashboard
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#001f3f]">
              <KeyRound size={24} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                {userRole === "SUPER_ADMIN" ? "Akun Super Admin" : "Akun Admin"}
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[#001f3f] sm:text-3xl">
                Ganti Password
              </h1>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Username</p>

            <p className="mt-1 font-bold text-[#001f3f]">{username}@admin</p>

            <p className="mt-3 text-sm text-gray-500">Akun login</p>

            <p className="mt-1 text-sm font-medium text-gray-700">
              {userEmail}
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#001f3f]">
              Perbarui Password
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Masukkan password saat ini terlebih dahulu, kemudian buat password
              baru untuk akun Anda.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-5">
            {/* PASSWORD SAAT INI */}
            <div>
              <label
                htmlFor="currentPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password Saat Ini
              </label>

              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/10"
                placeholder="Masukkan password saat ini"
              />
            </div>

            {/* PASSWORD BARU */}
            <div>
              <label
                htmlFor="newPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password Baru
              </label>

              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/10"
                placeholder="Minimal 8 karakter"
              />

              <p className="mt-1.5 text-xs text-gray-400">
                Password baru minimal 8 karakter.
              </p>
            </div>

            {/* KONFIRMASI */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Konfirmasi Password Baru
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/10"
                placeholder="Ulangi password baru"
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-lg bg-red-50 px-4 py-3 text-sm leading-6 text-red-600">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="rounded-lg bg-green-50 px-4 py-3 text-sm leading-6 text-green-700">
                {success}
              </div>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm leading-6 text-blue-800">
                  <strong>Selamat OM, password baru berhasil dibuat! 🎉</strong>
                </p>

                <p className="mt-2 text-sm leading-6 text-blue-800">
                  Password sudah aman, sekarang waktunya kembali bertugas. 😄
                  <br />
                  <strong>
                    Jangan terlalu sering ganti password, OM — lebih baik
                    perbanyak masukkan berita, kegiatan, dan informasi ORARI
                    Lokal Majene! 📡
                  </strong>
                </p>

                <p className="mt-2 text-sm font-semibold text-blue-800">
                  Salam 73!
                </p>
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#001f3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#003366] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving && <Loader2 size={17} className="animate-spin" />}

              {saving ? "Menyimpan..." : "Ganti Password"}
            </button>
          </form>
        </div>

        {/* LOGOUT */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Keluar
          </button>
        </div>
      </div>
    </main>
  );
}

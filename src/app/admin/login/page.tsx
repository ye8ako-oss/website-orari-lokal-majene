"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const ADMIN_EMAIL_DOMAIN = "@admin.orarilokalmajene.local";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const usernameNormalized = username.trim().toLowerCase();

    /*
     * Admin mengetik:
     * YG8BAM@admin
     *
     * Sistem mengubahnya secara internal menjadi:
     * yg8bam@admin.orarilokalmajene.local
     *
     * sehingga akun Supabase yang sudah ada tetap dapat digunakan.
     */
    let email = usernameNormalized;

    if (usernameNormalized.endsWith("@admin")) {
      const callsign = usernameNormalized.slice(0, -6);
      email = `${callsign}${ADMIN_EMAIL_DOMAIN}`;
    }

    /*
     * Untuk sementara tetap menerima format email lama
     * agar tidak memutus akun yang sudah ada.
     */
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Username atau password tidak benar.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#001f3f] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#001f3f]/60">
            ORARI Lokal Majene
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#001f3f]">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Masuk untuk mengelola website.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* USERNAME */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              autoComplete="username"
              spellCheck={false}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20"
              placeholder="Contoh: YG8BAM@admin"
            />

            <p className="mt-2 text-xs text-gray-400">
              Gunakan format callsign@admin
            </p>
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20"
              placeholder="Password admin"
            />
          </div>

          {/* ERROR */}
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* LOGIN */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#001f3f] px-4 py-3 font-semibold text-white transition hover:bg-[#003b6f] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          Admin ORARI Lokal Majene
        </p>
      </div>
    </main>
  );
}

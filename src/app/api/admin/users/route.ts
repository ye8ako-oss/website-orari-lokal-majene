import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!serviceRoleKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
}

/*
 * ============================================================
 * CLIENT SERVER DENGAN SERVICE ROLE
 *
 * HANYA digunakan di server.
 * JANGAN pernah dipindahkan ke client/browser.
 * ============================================================
 */

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

/*
 * ============================================================
 * POST
 * Membuat admin baru.
 *
 * Hanya SUPER_ADMIN yang boleh menjalankan fungsi ini.
 * ============================================================
 */

export async function POST(request: NextRequest) {
  try {
    /*
     * ========================================================
     * 1. AMBIL ACCESS TOKEN DARI REQUEST
     * ========================================================
     */

    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error: "Sesi login tidak ditemukan.",
        },
        {
          status: 401,
        },
      );
    }

    const accessToken = authorization.replace("Bearer ", "").trim();

    if (!accessToken) {
      return NextResponse.json(
        {
          error: "Access token tidak ditemukan.",
        },
        {
          status: 401,
        },
      );
    }

    /*
     * ========================================================
     * 2. VERIFIKASI USER YANG MEMANGGIL API
     * ========================================================
     */

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(accessToken);

    if (userError || !user) {
      console.error("GAGAL MEMVERIFIKASI USER:", userError);

      return NextResponse.json(
        {
          error: "Sesi login tidak valid.",
        },
        {
          status: 401,
        },
      );
    }

    /*
     * ========================================================
     * 3. PERIKSA ROLE USER
     * ========================================================
     */

    const { data: adminPemanggil, error: adminError } = await supabaseAdmin
      .from("admin_users")
      .select("id, username, nama, role, aktif")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError) {
      console.error("GAGAL MEMERIKSA ADMIN:", adminError);

      return NextResponse.json(
        {
          error: "Gagal memeriksa hak akses admin.",
        },
        {
          status: 500,
        },
      );
    }

    if (!adminPemanggil) {
      return NextResponse.json(
        {
          error: "User tidak terdaftar sebagai admin.",
        },
        {
          status: 403,
        },
      );
    }

    if (!adminPemanggil.aktif) {
      return NextResponse.json(
        {
          error: "Akun admin Anda tidak aktif.",
        },
        {
          status: 403,
        },
      );
    }

    if (adminPemanggil.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        {
          error: "Hanya Super Admin yang dapat menambahkan admin.",
        },
        {
          status: 403,
        },
      );
    }

    /*
     * ========================================================
     * 4. AMBIL DATA ADMIN BARU
     * ========================================================
     */

    const body = await request.json();

    const username =
      typeof body.username === "string"
        ? body.username.trim().toUpperCase()
        : "";

    const nama = typeof body.nama === "string" ? body.nama.trim() : "";

    const password = typeof body.password === "string" ? body.password : "";

    /*
     * ========================================================
     * 5. VALIDASI
     * ========================================================
     */

    if (!username) {
      return NextResponse.json(
        {
          error: "Username wajib diisi.",
        },
        {
          status: 400,
        },
      );
    }

    if (!/^[A-Z0-9]+$/.test(username)) {
      return NextResponse.json(
        {
          error: "Username hanya boleh menggunakan huruf dan angka.",
        },
        {
          status: 400,
        },
      );
    }

    if (!nama) {
      return NextResponse.json(
        {
          error: "Nama admin wajib diisi.",
        },
        {
          status: 400,
        },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error: "Password minimal 8 karakter.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * ========================================================
     * 6. PERIKSA USERNAME
     * ========================================================
     */

    const { data: usernameExisting, error: usernameError } = await supabaseAdmin
      .from("admin_users")
      .select("id, username")
      .eq("username", username)
      .maybeSingle();

    if (usernameError) {
      console.error("GAGAL MEMERIKSA USERNAME:", usernameError);

      return NextResponse.json(
        {
          error: "Gagal memeriksa username.",
        },
        {
          status: 500,
        },
      );
    }

    if (usernameExisting) {
      return NextResponse.json(
        {
          error: `Username ${username} sudah digunakan.`,
        },
        {
          status: 409,
        },
      );
    }

    /*
     * ========================================================
     * 7. EMAIL INTERNAL
     *
     * User tetap login menggunakan USERNAME.
     *
     * Email ini hanya digunakan Supabase Auth di belakang layar.
     *
     * Tidak perlu merupakan email Gmail nyata.
     * ========================================================
     */

    const internalEmail = `${username.toLowerCase()}@admin.orarilokalmajene.local`;

    /*
     * ========================================================
     * 8. BUAT USER SUPABASE AUTH
     * ========================================================
     */

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: internalEmail,
        password,
        email_confirm: true,
      });

    if (authError || !authData.user) {
      console.error("GAGAL MEMBUAT USER AUTH:", authError);

      return NextResponse.json(
        {
          error: authError?.message || "Gagal membuat akun admin.",
        },
        {
          status: 500,
        },
      );
    }

    const newUserId = authData.user.id;

    /*
     * ========================================================
     * 9. MASUKKAN KE admin_users
     * ========================================================
     */

    const { data: adminBaru, error: insertError } = await supabaseAdmin
      .from("admin_users")
      .insert({
        user_id: newUserId,
        username,
        nama,
        role: "ADMIN",
        aktif: true,
      })
      .select("id, user_id, username, nama, role, aktif, created_at")
      .single();

    /*
     * ========================================================
     * 10. JIKA DATABASE GAGAL
     *
     * Hapus kembali user Auth agar tidak terjadi akun yatim.
     * ========================================================
     */

    if (insertError) {
      console.error("GAGAL MENYIMPAN admin_users:", insertError);

      await supabaseAdmin.auth.admin.deleteUser(newUserId);

      return NextResponse.json(
        {
          error: "Akun Auth gagal disinkronkan dengan data admin.",
        },
        {
          status: 500,
        },
      );
    }

    /*
     * ========================================================
     * 11. BERHASIL
     * ========================================================
     */

    return NextResponse.json(
      {
        success: true,
        message: `Admin ${username} berhasil dibuat.`,
        admin: adminBaru,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("ERROR API ADMIN USERS:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan pada server.",
      },
      {
        status: 500,
      },
    );
  }
}

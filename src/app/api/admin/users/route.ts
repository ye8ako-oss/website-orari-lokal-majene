import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Supabase environment variables belum lengkap.");
}

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function getSuperAdmin(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return {
      error: NextResponse.json(
        { error: "Authorization tidak ditemukan." },
        { status: 401 },
      ),
    };
  }

  const accessToken = authorization.replace("Bearer ", "").trim();

  if (!accessToken) {
    return {
      error: NextResponse.json(
        { error: "Access token tidak ditemukan." },
        { status: 401 },
      ),
    };
  }

  const {
    data: { user },
    error: userError,
  } = await supabaseAdmin.auth.getUser(accessToken);

  if (userError || !user) {
    return {
      error: NextResponse.json(
        { error: "Sesi login tidak valid." },
        { status: 401 },
      ),
    };
  }

  const { data: callerAdmin, error: callerError } = await supabaseAdmin
    .from("admin_users")
    .select("id, user_id, username, nama, role, aktif")
    .eq("user_id", user.id)
    .single();

  if (callerError || !callerAdmin) {
    return {
      error: NextResponse.json(
        { error: "Data admin tidak ditemukan." },
        { status: 403 },
      ),
    };
  }

  if (!callerAdmin.aktif) {
    return {
      error: NextResponse.json(
        { error: "Akun admin Anda sedang nonaktif." },
        { status: 403 },
      ),
    };
  }

  if (callerAdmin.role !== "SUPER_ADMIN") {
    return {
      error: NextResponse.json(
        { error: "Akses hanya untuk Super Admin." },
        { status: 403 },
      ),
    };
  }

  return {
    user,
    callerAdmin,
  };
}

export async function GET(request: NextRequest) {
  try {
    const auth = await getSuperAdmin(request);

    if ("error" in auth) {
      return auth.error;
    }

    const { data: admins, error } = await supabaseAdmin
      .from("admin_users")
      .select("id, user_id, username, nama, role, aktif, created_at")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("ERROR GET ADMIN:", error);

      return NextResponse.json(
        { error: "Gagal mengambil daftar admin." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      admins: admins ?? [],
    });
  } catch (error) {
    console.error("ERROR GET ADMIN:", error);

    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getSuperAdmin(request);

    if ("error" in auth) {
      return auth.error;
    }

    const body = await request.json();

    const username = String(body.username ?? "")
      .trim()
      .toUpperCase();
    const nama = String(body.nama ?? "").trim();
    const password = String(body.password ?? "");

    if (!username || !nama || !password) {
      return NextResponse.json(
        {
          error: "Username, nama, dan password wajib diisi.",
        },
        { status: 400 },
      );
    }

    if (!/^[A-Z0-9]+$/.test(username)) {
      return NextResponse.json(
        {
          error:
            "Username hanya boleh berisi huruf dan angka, tanpa spasi atau simbol.",
        },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error: "Password minimal 8 karakter.",
        },
        { status: 400 },
      );
    }

    const { data: existingAdmin, error: existingError } = await supabaseAdmin
      .from("admin_users")
      .select("id")
      .eq("username", username)
      .maybeSingle();

    if (existingError) {
      console.error("ERROR CEK USERNAME:", existingError);

      return NextResponse.json(
        {
          error: "Gagal memeriksa username.",
        },
        { status: 500 },
      );
    }

    if (existingAdmin) {
      return NextResponse.json(
        {
          error: `Username ${username} sudah digunakan.`,
        },
        { status: 400 },
      );
    }

    const email = `${username.toLowerCase()}@admin.orarilokalmajene.local`;

    const { data: createdAuthUser, error: createAuthError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (createAuthError || !createdAuthUser.user) {
      console.error("ERROR CREATE AUTH USER:", createAuthError);

      return NextResponse.json(
        {
          error: createAuthError?.message || "Gagal membuat akun login admin.",
        },
        { status: 500 },
      );
    }

    const authUserId = createdAuthUser.user.id;

    const { data: createdAdmin, error: createAdminError } = await supabaseAdmin
      .from("admin_users")
      .insert({
        user_id: authUserId,
        username,
        nama,
        role: "ADMIN",
        aktif: true,
      })
      .select("id, user_id, username, nama, role, aktif, created_at")
      .single();

    if (createAdminError || !createdAdmin) {
      console.error("ERROR INSERT ADMIN:", createAdminError);

      await supabaseAdmin.auth.admin.deleteUser(authUserId);

      return NextResponse.json(
        {
          error:
            "Gagal menyimpan data admin. Akun login yang dibuat juga telah dibatalkan.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: `Admin ${username} berhasil dibuat.`,
        admin: createdAdmin,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("ERROR POST ADMIN:", error);

    return NextResponse.json(
      {
        error: "Terjadi kesalahan pada server.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const auth = await getSuperAdmin(request);

    if ("error" in auth) {
      return auth.error;
    }

    const body = await request.json();

    const userId = String(body.user_id ?? "").trim();
    const action = body.action;

    if (!userId) {
      return NextResponse.json(
        {
          error: "user_id wajib diisi.",
        },
        { status: 400 },
      );
    }

    /*
     * ============================================================
     * AKTIF / NONAKTIF ADMIN
     * ============================================================
     */
    if (action === "status") {
      if (typeof body.aktif !== "boolean") {
        return NextResponse.json(
          {
            error: "Status aktif harus berupa true atau false.",
          },
          { status: 400 },
        );
      }

      const { data: targetAdmin, error: targetError } = await supabaseAdmin
        .from("admin_users")
        .select("id, user_id, username, nama, role, aktif, created_at")
        .eq("user_id", userId)
        .single();

      if (targetError || !targetAdmin) {
        return NextResponse.json(
          {
            error: "Admin yang akan diubah tidak ditemukan.",
          },
          { status: 404 },
        );
      }

      if (targetAdmin.role === "SUPER_ADMIN") {
        return NextResponse.json(
          {
            error: "Super Admin tidak dapat dinonaktifkan.",
          },
          { status: 403 },
        );
      }

      if (targetAdmin.role !== "ADMIN") {
        return NextResponse.json(
          {
            error: "Admin yang dipilih tidak valid.",
          },
          { status: 400 },
        );
      }

      const { data: updatedAdmin, error: updateError } = await supabaseAdmin
        .from("admin_users")
        .update({
          aktif: body.aktif,
        })
        .eq("user_id", userId)
        .select("id, user_id, username, nama, role, aktif, created_at")
        .single();

      if (updateError || !updatedAdmin) {
        console.error("ERROR UPDATE STATUS ADMIN:", updateError);

        return NextResponse.json(
          {
            error: "Gagal mengubah status admin.",
          },
          { status: 500 },
        );
      }

      return NextResponse.json({
        message: body.aktif
          ? `Admin ${targetAdmin.username} berhasil diaktifkan.`
          : `Admin ${targetAdmin.username} berhasil dinonaktifkan.`,
        admin: updatedAdmin,
      });
    }

    /*
     * ============================================================
     * RESET PASSWORD ADMIN
     * ============================================================
     *
     * Bagian ini dipertahankan untuk fitur Reset Password
     * yang sebelumnya sudah berhasil.
     */
    const password = String(body.password ?? "");

    if (!password) {
      return NextResponse.json(
        {
          error: "Password baru wajib diisi.",
        },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          error: "Password minimal 8 karakter.",
        },
        { status: 400 },
      );
    }

    const { data: targetAdmin, error: targetError } = await supabaseAdmin
      .from("admin_users")
      .select("id, user_id, username, nama, role, aktif")
      .eq("user_id", userId)
      .single();

    if (targetError || !targetAdmin) {
      return NextResponse.json(
        {
          error: "Admin yang akan direset tidak ditemukan.",
        },
        { status: 404 },
      );
    }

    if (targetAdmin.role === "SUPER_ADMIN") {
      return NextResponse.json(
        {
          error: "Password Super Admin tidak dapat direset dari sini.",
        },
        { status: 403 },
      );
    }

    if (targetAdmin.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Admin yang dipilih tidak valid.",
        },
        { status: 400 },
      );
    }

    const { error: updatePasswordError } =
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        password,
      });

    if (updatePasswordError) {
      console.error("ERROR UPDATE PASSWORD:", updatePasswordError);

      return NextResponse.json(
        {
          error: updatePasswordError.message || "Gagal mereset password admin.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: `Password admin ${targetAdmin.username} berhasil direset.`,
    });
  } catch (error) {
    console.error("ERROR PATCH ADMIN:", error);

    return NextResponse.json(
      {
        error: "Terjadi kesalahan pada server.",
      },
      { status: 500 },
    );
  }
}
export async function DELETE(request: NextRequest) {
  try {
    const auth = await getSuperAdmin(request);

    if ("error" in auth) {
      return auth.error;
    }

    const body = await request.json();
    const userId = String(body.user_id ?? "").trim();

    if (!userId) {
      return NextResponse.json(
        {
          error: "user_id wajib diisi.",
        },
        { status: 400 },
      );
    }

    /*
     * ============================================================
     * CARI ADMIN YANG AKAN DIHAPUS
     * ============================================================
     */
    const { data: targetAdmin, error: targetError } = await supabaseAdmin
      .from("admin_users")
      .select("id, user_id, username, nama, role, aktif, created_at")
      .eq("user_id", userId)
      .single();

    if (targetError || !targetAdmin) {
      return NextResponse.json(
        {
          error: "Admin yang akan dihapus tidak ditemukan.",
        },
        { status: 404 },
      );
    }

    /*
     * ============================================================
     * PERLINDUNGAN SUPER ADMIN
     * ============================================================
     */
    if (targetAdmin.role === "SUPER_ADMIN") {
      return NextResponse.json(
        {
          error: "Super Admin tidak dapat dihapus.",
        },
        { status: 403 },
      );
    }

    if (targetAdmin.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Admin yang dipilih tidak valid.",
        },
        { status: 400 },
      );
    }

    /*
     * ============================================================
     * LANGKAH 1
     * NONAKTIFKAN TERLEBIH DAHULU
     *
     * Jika proses berikutnya gagal, admin tetap tidak dapat login.
     * ============================================================
     */
    const { error: deactivateError } = await supabaseAdmin
      .from("admin_users")
      .update({
        aktif: false,
      })
      .eq("user_id", userId);

    if (deactivateError) {
      console.error(
        "ERROR MENONAKTIFKAN ADMIN SEBELUM DELETE:",
        deactivateError,
      );

      return NextResponse.json(
        {
          error: "Gagal mengamankan akun admin sebelum proses penghapusan.",
        },
        { status: 500 },
      );
    }

    /*
     * ============================================================
     * LANGKAH 2
     * HAPUS USER DARI SUPABASE AUTH
     * ============================================================
     */
    const { error: deleteAuthError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteAuthError) {
      console.error("ERROR DELETE AUTH USER:", deleteAuthError);

      return NextResponse.json(
        {
          error:
            "Akun login admin gagal dihapus. Data admin tetap disimpan dalam keadaan nonaktif.",
        },
        { status: 500 },
      );
    }

    /*
     * ============================================================
     * LANGKAH 3
     * HAPUS RECORD DARI public.admin_users
     * ============================================================
     */
    const { error: deleteDatabaseError } = await supabaseAdmin
      .from("admin_users")
      .delete()
      .eq("user_id", userId);

    if (deleteDatabaseError) {
      console.error("ERROR DELETE ADMIN DATABASE:", deleteDatabaseError);

      return NextResponse.json(
        {
          error:
            "Akun login sudah dihapus dari Supabase Auth, tetapi data admin di database gagal dihapus. Periksa tabel admin_users.",
        },
        { status: 500 },
      );
    }

    /*
     * ============================================================
     * BERHASIL
     * ============================================================
     */
    return NextResponse.json({
      message: `Admin ${targetAdmin.username} berhasil dihapus secara permanen.`,
    });
  } catch (error) {
    console.error("ERROR DELETE ADMIN:", error);

    return NextResponse.json(
      {
        error: "Terjadi kesalahan pada server.",
      },
      { status: 500 },
    );
  }
}

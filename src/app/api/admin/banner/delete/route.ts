import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    /*
     * =====================================================
     * 0. Ambil environment variable saat API dipanggil
     * =====================================================
     */
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("ENV SUPABASE TIDAK LENGKAP.");

      return NextResponse.json(
        {
          error: "Konfigurasi Supabase server belum lengkap.",
        },
        { status: 500 },
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    /*
     * =====================================================
     * 1. Ambil token login dari browser
     * =====================================================
     */
    const authorization = request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Tidak terautentikasi." },
        { status: 401 },
      );
    }

    const accessToken = authorization.replace("Bearer ", "");

    /*
     * =====================================================
     * 2. Pastikan token benar-benar milik user yang login
     * =====================================================
     */
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(accessToken);

    if (userError || !user) {
      return NextResponse.json(
        { error: "Sesi login tidak valid." },
        { status: 401 },
      );
    }

    /*
     * =====================================================
     * 3. Ambil data dari request
     * =====================================================
     */
    const body = await request.json();

    const id = Number(body.id);
    const gambar = body.gambar as string | null;

    if (!id || Number.isNaN(id)) {
      return NextResponse.json(
        { error: "ID banner tidak valid." },
        { status: 400 },
      );
    }

    /*
     * =====================================================
     * 4. Ambil storage path dari URL gambar
     * =====================================================
     */
    let storagePath: string | null = null;

    if (gambar) {
      const marker = "/storage/v1/object/public/banner/";

      const posisi = gambar.indexOf(marker);

      if (posisi === -1) {
        return NextResponse.json(
          {
            error: "URL gambar bukan berasal dari bucket banner.",
          },
          { status: 400 },
        );
      }

      storagePath = decodeURIComponent(
        gambar.substring(posisi + marker.length),
      );

      if (!storagePath) {
        return NextResponse.json(
          {
            error: "Storage path gambar tidak ditemukan.",
          },
          { status: 400 },
        );
      }
    }

    console.log("=================================");
    console.log("API HAPUS BANNER");
    console.log("USER:", user.email);
    console.log("ID:", id);
    console.log("STORAGE PATH:", storagePath);
    console.log("=================================");

    /*
     * =====================================================
     * 5. Hapus gambar dari Storage
     * =====================================================
     */
    if (storagePath) {
      const { error: storageError } = await supabaseAdmin.storage
        .from("banner")
        .remove([storagePath]);

      if (storageError) {
        console.error("ERROR HAPUS STORAGE:", storageError);

        return NextResponse.json(
          {
            error:
              "Gambar banner gagal dihapus dari Storage. Data banner tetap dipertahankan.",
          },
          { status: 500 },
        );
      }

      /*
       * ===================================================
       * 6. Verifikasi file benar-benar sudah hilang
       * ===================================================
       */
      const folder = storagePath.includes("/")
        ? storagePath.substring(0, storagePath.lastIndexOf("/"))
        : "";

      const fileName = storagePath.includes("/")
        ? storagePath.substring(storagePath.lastIndexOf("/") + 1)
        : storagePath;

      const { data: files, error: listError } = await supabaseAdmin.storage
        .from("banner")
        .list(folder);

      if (listError) {
        console.error("ERROR VERIFIKASI STORAGE:", listError);

        return NextResponse.json(
          {
            error:
              "Gambar sudah diproses, tetapi server tidak dapat memverifikasi hasil penghapusan.",
          },
          { status: 500 },
        );
      }

      const masihAda = files?.some((file) => file.name === fileName);

      if (masihAda) {
        console.error("FILE MASIH ADA DI STORAGE:", storagePath);

        return NextResponse.json(
          {
            error:
              "File gambar masih ada di Storage. Data banner belum dihapus.",
          },
          { status: 500 },
        );
      }

      console.log("FILE STORAGE BENAR-BENAR SUDAH DIHAPUS:", storagePath);
    }

    /*
     * =====================================================
     * 7. Setelah Storage berhasil, baru hapus database
     * =====================================================
     */
    const { error: databaseError } = await supabaseAdmin
      .from("banner")
      .delete()
      .eq("id", id);

    if (databaseError) {
      console.error("ERROR HAPUS DATABASE:", databaseError);

      return NextResponse.json(
        {
          error:
            "Gambar berhasil dihapus dari Storage, tetapi data banner gagal dihapus dari database.",
        },
        { status: 500 },
      );
    }

    console.log("DATA BANNER BERHASIL DIHAPUS.");
    console.log("PROSES API HAPUS SELESAI.");

    return NextResponse.json({
      success: true,
      message: "Banner berhasil dihapus.",
    });
  } catch (error) {
    console.error("ERROR API HAPUS BANNER:", error);

    return NextResponse.json(
      {
        error: "Terjadi kesalahan pada server.",
      },
      { status: 500 },
    );
  }
}

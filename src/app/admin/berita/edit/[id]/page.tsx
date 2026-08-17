"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Heading2,
  ImagePlus,
  Undo2,
  Redo2,
  Unlink,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Berita = {
  id: number;
  created_at: string;
  judul: string;
  slug: string;
  isi: string;
  gambar: string | null;
  publish: boolean;
};

export default function EditBeritaPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [judul, setJudul] = useState("");
  const [slug, setSlug] = useState("");
  const [isi, setIsi] = useState("");
  const [gambar, setGambar] = useState("");
  const [fileGambar, setFileGambar] = useState<File | null>(null);
  const [publish, setPublish] = useState(true);

  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingIsi, setUploadingIsi] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
    ],

    content: "",

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[420px] px-5 py-4 text-base leading-8 text-gray-700 outline-none prose prose-lg max-w-none",
      },
    },

    onUpdate: ({ editor }) => {
      setIsi(editor.getHTML());
    },
  });

  useEffect(() => {
    async function loadBerita() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .eq("id", id)
        .single<Berita>();

      if (error || !data) {
        console.error("ERROR MEMUAT BERITA:", error);
        setError("Berita tidak ditemukan.");
        setLoadingData(false);
        return;
      }

      setJudul(data.judul);
      setSlug(data.slug);
      setIsi(data.isi);
      setGambar(data.gambar ?? "");
      setPublish(data.publish);

      if (editor) {
        const isiLama = data.isi ?? "";

        /*
         * Berita lama mungkin masih berupa teks biasa.
         * Jika sudah berupa HTML dari editor baru, langsung digunakan.
         * Jika masih teks biasa, kita ubah menjadi paragraf.
         */
        const terlihatSepertiHtml = /<([a-z][\s\S]*?)>/i.test(isiLama);

        if (terlihatSepertiHtml) {
          editor.commands.setContent(isiLama);
        } else {
          const paragraphs = isiLama
            .split(/\r?\n+/)
            .map((paragraf) => paragraf.trim())
            .filter(Boolean);

          if (paragraphs.length > 0) {
            editor.commands.setContent({
              type: "doc",
              content: paragraphs.map((paragraf) => ({
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: paragraf,
                  },
                ],
              })),
            });
          } else {
            editor.commands.clearContent();
          }
        }
      }

      setLoadingData(false);
    }

    loadBerita();
  }, [id, router, editor]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setError("");
    setFileGambar(file);
  }

  function getNamaFileDariUrl(url: string) {
    try {
      const pathname = new URL(url).pathname;
      const bagian = pathname.split("/");

      return decodeURIComponent(bagian[bagian.length - 1]);
    } catch {
      return null;
    }
  }

  async function uploadFoto(): Promise<string | null> {
    if (!fileGambar) {
      return gambar || null;
    }

    const tipeYangDiizinkan = ["image/jpeg", "image/png", "image/webp"];

    if (!tipeYangDiizinkan.includes(fileGambar.type)) {
      setError("Format foto harus JPG, PNG, atau WebP.");
      return null;
    }

    const ukuranMaksimal = 5 * 1024 * 1024;

    if (fileGambar.size > ukuranMaksimal) {
      setError("Ukuran foto maksimal 5 MB.");
      return null;
    }

    setUploading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return null;
      }

      const ekstensi = fileGambar.name.split(".").pop()?.toLowerCase() || "jpg";

      const namaFile = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 12)}.${ekstensi}`;

      const { error: uploadError } = await supabase.storage
        .from("berita")
        .upload(namaFile, fileGambar, {
          cacheControl: "3600",
          upsert: false,
          contentType: fileGambar.type,
        });

      if (uploadError) {
        console.error("ERROR UPLOAD FOTO:", uploadError);

        setError("Foto gagal diunggah.");
        return null;
      }

      const { data } = supabase.storage.from("berita").getPublicUrl(namaFile);

      if (!data.publicUrl) {
        setError("URL foto tidak berhasil dibuat.");

        return null;
      }

      return data.publicUrl;
    } catch (err) {
      console.error("ERROR UPLOAD FOTO:", err);

      setError("Terjadi kesalahan saat mengunggah foto.");

      return null;
    } finally {
      setUploading(false);
    }
  }

  async function uploadFotoIsi(file: File) {
    const tipeYangDiizinkan = ["image/jpeg", "image/png", "image/webp"];

    if (!tipeYangDiizinkan.includes(file.type)) {
      setError("Format foto harus JPG, PNG, atau WebP.");
      return;
    }

    const ukuranMaksimal = 5 * 1024 * 1024;

    if (file.size > ukuranMaksimal) {
      setError("Ukuran foto maksimal 5 MB.");
      return;
    }

    if (!editor) {
      return;
    }

    setUploadingIsi(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      const ekstensi = file.name.split(".").pop()?.toLowerCase() || "jpg";

      const namaFile = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 12)}.${ekstensi}`;

      const { error: uploadError } = await supabase.storage
        .from("berita")
        .upload(namaFile, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("ERROR UPLOAD FOTO ISI:", uploadError);

        setError("Foto pendukung gagal diunggah.");

        return;
      }

      const { data } = supabase.storage.from("berita").getPublicUrl(namaFile);

      if (!data.publicUrl) {
        setError("URL foto pendukung tidak berhasil dibuat.");

        return;
      }

      editor
        .chain()
        .focus()
        .setImage({
          src: data.publicUrl,
          alt: file.name,
          title: file.name,
        })
        .run();

      editor.chain().focus().insertContent("<p></p>").run();
    } catch (err) {
      console.error("ERROR UPLOAD FOTO ISI:", err);

      setError("Terjadi kesalahan saat mengunggah foto pendukung.");
    } finally {
      setUploadingIsi(false);
    }
  }

  function pilihFotoIsi() {
    fileInputRef.current?.click();
  }

  function handleFotoIsiChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      uploadFotoIsi(file);
    }

    event.target.value = "";
  }

  function tambahLink() {
    if (!editor) {
      return;
    }

    const linkSaatIni = editor.getAttributes("link").href;

    const url = window.prompt(
      "Masukkan alamat link:",
      linkSaatIni || "https://",
    );

    if (url === null) {
      return;
    }

    if (!url.trim()) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url.trim(),
      })
      .run();
  }

  async function hapusFotoLama(urlFotoLama: string) {
    const namaFileLama = getNamaFileDariUrl(urlFotoLama);

    if (!namaFileLama) {
      console.warn(
        "Nama file foto lama tidak dapat dibaca dari URL:",
        urlFotoLama,
      );

      return;
    }

    const { error } = await supabase.storage
      .from("berita")
      .remove([namaFileLama]);

    if (error) {
      console.error("ERROR HAPUS FOTO LAMA:", error);
    } else {
      console.log("FOTO LAMA BERHASIL DIHAPUS:", namaFileLama);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/admin/login");
      return;
    }

    if (!judul.trim()) {
      setError("Judul berita wajib diisi.");
      setLoading(false);
      return;
    }

    if (!slug.trim()) {
      setError("Slug berita wajib diisi.");
      setLoading(false);
      return;
    }

    if (!editor) {
      setError("Editor berita belum siap. Silakan tunggu sebentar.");

      setLoading(false);
      return;
    }

    const isiHTML = editor.getHTML();

    if (!isiHTML || isiHTML === "<p></p>") {
      setError("Isi berita wajib diisi.");
      setLoading(false);
      return;
    }

    const fotoLama = gambar || null;

    let urlGambar = gambar;

    if (fileGambar) {
      const hasilUpload = await uploadFoto();

      if (!hasilUpload) {
        setLoading(false);
        return;
      }

      urlGambar = hasilUpload;
    }

    const { error: updateError } = await supabase
      .from("berita")
      .update({
        judul: judul.trim(),
        slug: slug.trim(),
        isi: isiHTML,
        gambar: urlGambar || null,
        publish,
      })
      .eq("id", id);

    if (updateError) {
      console.error("ERROR UPDATE BERITA:", updateError);

      setError("Berita gagal diperbarui.");

      setLoading(false);
      return;
    }

    if (fileGambar && fotoLama && fotoLama !== urlGambar) {
      await hapusFotoLama(fotoLama);
    }

    router.push("/admin");
    router.refresh();
  }

  if (loadingData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 size={28} className="mx-auto animate-spin text-[#001f3f]" />

          <p className="mt-3 text-sm text-gray-500">Memuat berita...</p>
        </div>
      </main>
    );
  }

  if (!editor) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 size={28} className="mx-auto animate-spin text-[#001f3f]" />

          <p className="mt-3 text-sm text-gray-500">
            Menyiapkan editor berita...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="text-sm font-medium text-[#001f3f] hover:underline"
          >
            ← Kembali ke Dashboard
          </button>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              ORARI Lokal Majene
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#001f3f]">
              Edit Berita
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Perbarui berita dengan editor profesional.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* JUDUL */}
            <div>
              <label
                htmlFor="judul"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Judul Berita
              </label>

              <input
                id="judul"
                type="text"
                value={judul}
                onChange={(event) => setJudul(event.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20"
              />
            </div>

            {/* SLUG */}
            <div>
              <label
                htmlFor="slug"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Slug
              </label>

              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#001f3f] focus:ring-2 focus:ring-[#001f3f]/20"
              />

              <p className="mt-2 text-xs text-gray-400">
                Slug digunakan sebagai alamat berita.
              </p>
            </div>

            {/* EDITOR */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Isi Berita
              </label>

              <div className="overflow-hidden rounded-xl border border-gray-300 bg-white focus-within:border-[#001f3f] focus-within:ring-2 focus-within:ring-[#001f3f]/20">
                {/* TOOLBAR */}
                <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
                  <button
                    type="button"
                    title="Tebal"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`rounded-md p-2 transition ${
                      editor.isActive("bold")
                        ? "bg-[#001f3f] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Bold size={18} />
                  </button>

                  <button
                    type="button"
                    title="Miring"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`rounded-md p-2 transition ${
                      editor.isActive("italic")
                        ? "bg-[#001f3f] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Italic size={18} />
                  </button>

                  <button
                    type="button"
                    title="Subjudul"
                    onClick={() =>
                      editor
                        .chain()
                        .focus()
                        .toggleHeading({
                          level: 2,
                        })
                        .run()
                    }
                    className={`rounded-md px-2 py-2 text-sm font-bold transition ${
                      editor.isActive("heading", {
                        level: 2,
                      })
                        ? "bg-[#001f3f] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    H2
                  </button>

                  <button
                    type="button"
                    title="Daftar"
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                    className={`rounded-md p-2 transition ${
                      editor.isActive("bulletList")
                        ? "bg-[#001f3f] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <List size={18} />
                  </button>

                  <button
                    type="button"
                    title="Daftar bernomor"
                    onClick={() =>
                      editor.chain().focus().toggleOrderedList().run()
                    }
                    className={`rounded-md p-2 transition ${
                      editor.isActive("orderedList")
                        ? "bg-[#001f3f] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <ListOrdered size={18} />
                  </button>

                  <button
                    type="button"
                    title="Tambah link"
                    onClick={tambahLink}
                    className={`rounded-md p-2 transition ${
                      editor.isActive("link")
                        ? "bg-[#001f3f] text-white"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <LinkIcon size={18} />
                  </button>

                  {editor.isActive("link") && (
                    <button
                      type="button"
                      title="Hapus link"
                      onClick={() => editor.chain().focus().unsetLink().run()}
                      className="rounded-md p-2 text-gray-700 hover:bg-gray-200"
                    >
                      <Unlink size={18} />
                    </button>
                  )}

                  <button
                    type="button"
                    title="Tambahkan foto ke isi berita"
                    onClick={pilihFotoIsi}
                    disabled={uploadingIsi}
                    className="rounded-md p-2 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {uploadingIsi ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <ImagePlus size={18} />
                    )}
                  </button>

                  <div className="mx-1 h-6 w-px bg-gray-300" />

                  <button
                    type="button"
                    title="Urungkan"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    className="rounded-md p-2 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Undo2 size={18} />
                  </button>

                  <button
                    type="button"
                    title="Ulangi"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    className="rounded-md p-2 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Redo2 size={18} />
                  </button>
                </div>

                {/* AREA EDITOR */}
                <EditorContent editor={editor} />
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFotoIsiChange}
                className="hidden"
              />

              <p className="mt-2 text-xs text-gray-400">
                Gunakan toolbar untuk teks tebal, miring, subjudul, daftar,
                link, dan foto pendukung. Foto akan ditempatkan langsung di
                dalam isi berita.
              </p>
            </div>

            {/* FOTO UTAMA */}
            <div>
              <label
                htmlFor="gambar"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Foto Utama Berita
              </label>

              {gambar && !fileGambar && (
                <div className="mb-4">
                  <p className="mb-2 text-sm text-gray-600">Foto saat ini:</p>

                  <img
                    src={gambar}
                    alt={judul}
                    className="max-h-80 w-full rounded-xl object-cover"
                  />
                </div>
              )}

              <input
                id="gambar"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                disabled={uploading || loading || uploadingIsi}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none file:mr-4 file:rounded-md file:border-0 file:bg-[#001f3f] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#003b6f] disabled:cursor-not-allowed disabled:opacity-60"
              />

              {fileGambar && (
                <p className="mt-2 text-sm text-gray-600">
                  Foto baru dipilih: <strong>{fileGambar.name}</strong>
                </p>
              )}

              <p className="mt-2 text-xs text-gray-400">
                Pilih foto baru hanya jika ingin mengganti foto utama. Format
                JPG, PNG, atau WebP. Maksimal 5 MB.
              </p>

              {uploading && (
                <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm font-medium text-blue-700">
                  Mengunggah foto utama...
                </div>
              )}
            </div>

            {/* STATUS */}
            <div className="rounded-lg border border-gray-200 p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={publish}
                  onChange={(event) => setPublish(event.target.checked)}
                  className="h-4 w-4"
                />

                <span className="text-sm font-semibold text-gray-700">
                  Terbitkan berita
                </span>
              </label>

              <p className="mt-2 text-xs text-gray-400">
                Jika tidak dicentang, berita menjadi Draft dan tidak tampil di
                website.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* TOMBOL */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => router.push("/admin")}
                disabled={loading || uploading || uploadingIsi}
                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Batal
              </button>

              <button
                type="submit"
                disabled={loading || uploading || uploadingIsi}
                className="rounded-lg bg-[#001f3f] px-6 py-3 font-semibold text-white hover:bg-[#003b6f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading
                  ? "Mengunggah Foto..."
                  : uploadingIsi
                    ? "Mengunggah Foto Isi..."
                    : loading
                      ? "Menyimpan..."
                      : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

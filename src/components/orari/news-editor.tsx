"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Unlink,
  ImagePlus,
  Undo2,
  Redo2,
  RemoveFormatting,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type NewsEditorProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export function NewsEditor({
  value,
  onChange,
  disabled = false,
}: NewsEditorProps) {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const imageSelectionRef = useRef<{ from: number; to: number } | null>(null);

  const [uploadingImage, setUploadingImage] = useState(false);

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

        HTMLAttributes: {
          class:
            "text-[#003366] underline decoration-[#B30000] underline-offset-2",
        },
      }),

      Image.configure({
        inline: false,
        allowBase64: false,

        HTMLAttributes: {
          class: "news-content-image",
        },
      }),
    ],

    content: value || "<p></p>",

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class: "news-editor-content min-h-[420px] px-5 py-4 outline-none",
      },

      /*
       * Paste foto langsung ke editor.
       */
      handlePaste: (_view, event) => {
        const items = event.clipboardData?.items;

        if (!items) {
          return false;
        }

        for (const item of Array.from(items)) {
          if (item.kind === "file" && item.type.startsWith("image/")) {
            const file = item.getAsFile();

            if (file) {
              void uploadImage(file);
              return true;
            }
          }
        }

        return false;
      },

      /*
       * Drag & drop foto langsung ke editor.
       */
      handleDrop: (_view, event) => {
        const files = event.dataTransfer?.files;

        if (!files || files.length === 0) {
          return false;
        }

        const imageFile = Array.from(files).find((file) =>
          file.type.startsWith("image/"),
        );

        if (!imageFile) {
          return false;
        }

        event.preventDefault();

        void uploadImage(imageFile);

        return true;
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  /*
   * ============================================================
   * SINKRONISASI DATA SAAT EDIT BERITA
   * ============================================================
   */
  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentHTML = editor.getHTML();

    if (value !== currentHTML && value !== "") {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }

    if (value === "" && currentHTML !== "<p></p>") {
      editor.commands.clearContent();
    }
  }, [editor, value]);

  /*
   * ============================================================
   * UPLOAD FOTO
   * ============================================================
   */
  async function uploadImage(file: File) {
    if (!editor || disabled) {
      return;
    }

    setError("");

    /*
     * Validasi format.
     */
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Format foto harus JPG, PNG, atau WebP.");

      return;
    }

    /*
     * Validasi ukuran.
     */
    if (file.size > MAX_IMAGE_SIZE) {
      setError("Ukuran foto maksimal 5 MB.");

      return;
    }

    setUploadingImage(true);

    try {
      /*
       * Pastikan admin masih login.
       */
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Sesi login berakhir. Silakan login kembali.");

        return;
      }

      /*
       * Buat nama file unik.
       */
      const ekstensi = file.name.split(".").pop()?.toLowerCase() || "jpg";

      const namaFile = `isi-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}.${ekstensi}`;

      /*
       * Upload ke Supabase Storage.
       */
      const { error: uploadError } = await supabase.storage
        .from("berita")
        .upload(namaFile, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        console.error("ERROR UPLOAD FOTO ISI:", uploadError);

        setError("Foto gagal diunggah. Periksa policy Storage Supabase.");

        return;
      }

      /*
       * Ambil URL publik.
       */
      const { data: publicUrlData } = supabase.storage
        .from("berita")
        .getPublicUrl(namaFile);

      const publicUrl = publicUrlData.publicUrl;

      if (!publicUrl) {
        setError("URL foto tidak berhasil dibuat.");

        return;
      }

      /*
       * Masukkan foto ke posisi
       * kursor editor.
       */
      editor
        .chain()
        .focus()
        .setImage({
          src: publicUrl,
          alt: file.name,
          title: file.name,
        })
        .run();

      /*
       * Buat paragraf baru setelah foto
       * agar admin bisa langsung melanjutkan
       * mengetik.
       */
      editor
        .chain()
        .focus()
        .insertContent({
          type: "paragraph",
        })
        .run();
    } catch (err) {
      console.error("ERROR UPLOAD FOTO ISI:", err);

      setError("Terjadi kesalahan saat mengunggah foto.");
    } finally {
      setUploadingImage(false);
    }
  }

  /*
   * ============================================================
   * INPUT FILE
   * ============================================================
   */
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      void uploadImage(file);
    }

    /*
     * Reset input agar file yang sama
     * dapat dipilih kembali.
     */
    event.target.value = "";
  }

  /*
   * ============================================================
   * BUKA PEMILIH FOTO
   * ============================================================
   */
  function openImagePicker() {
    if (disabled || uploadingImage) {
      return;
    }

    imageInputRef.current?.click();
  }

  /*
   * ============================================================
   * LINK
   * ============================================================
   */
  function setLink() {
    if (!editor || disabled) {
      return;
    }

    const currentHref = editor.getAttributes("link").href || "";

    const url = window.prompt(
      "Masukkan alamat link:",
      currentHref || "https://",
    );

    if (url === null) {
      return;
    }

    const trimmedURL = url.trim();

    /*
     * Jika kosong, hapus link.
     */
    if (!trimmedURL) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    /*
     * Tambahkan link.
     */
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: trimmedURL,
      })
      .run();
  }

  /*
   * ============================================================
   * HAPUS LINK
   * ============================================================
   */
  function removeLink() {
    if (!editor || disabled) {
      return;
    }

    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  }

  /*
   * ============================================================
   * HAPUS FORMATTING
   * ============================================================
   */
  function clearFormatting() {
    if (!editor || disabled) {
      return;
    }

    editor.chain().focus().clearNodes().unsetAllMarks().run();
  }

  /*
   * ============================================================
   * EDITOR BELUM SIAP
   * ============================================================
   */
  if (!editor) {
    return (
      <div className="rounded-xl border border-gray-300 bg-white">
        <div className="flex min-h-[460px] items-center justify-center">
          <div className="text-center">
            <Loader2
              size={26}
              className="mx-auto animate-spin text-[#003366]"
            />

            <p className="mt-3 text-sm text-gray-500">
              Menyiapkan editor berita...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /*
   * ============================================================
   * TAMPILAN EDITOR
   * ============================================================
   */
  return (
    <div>
      <div
        className={`overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm transition ${
          disabled
            ? "opacity-60"
            : "focus-within:border-[#003366] focus-within:ring-2 focus-within:ring-[#003366]/20"
        }`}
      >
        {/* ======================================================
            TOOLBAR
            ====================================================== */}
        <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
          {/* BOLD */}
          <button
            type="button"
            title="Tebal"
            aria-label="Tebal"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`rounded-md p-2 transition ${
              editor.isActive("bold")
                ? "bg-[#003366] text-white"
                : "text-gray-700 hover:bg-gray-200"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <Bold size={18} />
          </button>

          {/* ITALIC */}
          <button
            type="button"
            title="Miring"
            aria-label="Miring"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`rounded-md p-2 transition ${
              editor.isActive("italic")
                ? "bg-[#003366] text-white"
                : "text-gray-700 hover:bg-gray-200"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <Italic size={18} />
          </button>

          {/* H2 */}
          <button
            type="button"
            title="Subjudul H2"
            aria-label="Subjudul H2"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
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
                ? "bg-[#003366] text-white"
                : "text-gray-700 hover:bg-gray-200"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            H2
          </button>

          {/* H3 */}
          <button
            type="button"
            title="Subjudul H3"
            aria-label="Subjudul H3"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level: 3,
                })
                .run()
            }
            className={`rounded-md px-2 py-2 text-sm font-bold transition ${
              editor.isActive("heading", {
                level: 3,
              })
                ? "bg-[#003366] text-white"
                : "text-gray-700 hover:bg-gray-200"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            H3
          </button>

          {/* BULLET LIST */}
          <button
            type="button"
            title="Daftar"
            aria-label="Daftar"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`rounded-md p-2 transition ${
              editor.isActive("bulletList")
                ? "bg-[#003366] text-white"
                : "text-gray-700 hover:bg-gray-200"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <List size={18} />
          </button>

          {/* ORDERED LIST */}
          <button
            type="button"
            title="Daftar bernomor"
            aria-label="Daftar bernomor"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`rounded-md p-2 transition ${
              editor.isActive("orderedList")
                ? "bg-[#003366] text-white"
                : "text-gray-700 hover:bg-gray-200"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <ListOrdered size={18} />
          </button>

          {/* BLOCKQUOTE */}
          <button
            type="button"
            title="Kutipan"
            aria-label="Kutipan"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`rounded-md p-2 transition ${
              editor.isActive("blockquote")
                ? "bg-[#003366] text-white"
                : "text-gray-700 hover:bg-gray-200"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <Quote size={18} />
          </button>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          {/* LINK */}
          <button
            type="button"
            title="Tambah/Edit Link"
            aria-label="Tambah atau edit link"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={setLink}
            className={`rounded-md p-2 transition ${
              editor.isActive("link")
                ? "bg-[#003366] text-white"
                : "text-gray-700 hover:bg-gray-200"
            } disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <LinkIcon size={18} />
          </button>

          {/* UNLINK */}
          <button
            type="button"
            title="Hapus Link"
            aria-label="Hapus Link"
            disabled={disabled || !editor.isActive("link")}
            onMouseDown={(event) => event.preventDefault()}
            onClick={removeLink}
            className="rounded-md p-2 text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Unlink size={18} />
          </button>

          {/* IMAGE */}
          <button
            type="button"
            title="Tambah Foto ke Isi Berita"
            aria-label="Tambah Foto ke Isi Berita"
            disabled={disabled || uploadingImage}
            onMouseDown={(event) => event.preventDefault()}
            onClick={openImagePicker}
            className="rounded-md p-2 text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {uploadingImage ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <ImagePlus size={18} />
            )}
          </button>

          <div className="mx-1 h-6 w-px bg-gray-300" />

          {/* CLEAR FORMATTING */}
          <button
            type="button"
            title="Hapus Formatting"
            aria-label="Hapus Formatting"
            disabled={disabled}
            onMouseDown={(event) => event.preventDefault()}
            onClick={clearFormatting}
            className="rounded-md p-2 text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RemoveFormatting size={18} />
          </button>

          {/* UNDO */}
          <button
            type="button"
            title="Urungkan"
            aria-label="Urungkan"
            disabled={disabled || !editor.can().undo()}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.chain().focus().undo().run()}
            className="rounded-md p-2 text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Undo2 size={18} />
          </button>

          {/* REDO */}
          <button
            type="button"
            title="Ulangi"
            aria-label="Ulangi"
            disabled={disabled || !editor.can().redo()}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => editor.chain().focus().redo().run()}
            className="rounded-md p-2 text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Redo2 size={18} />
          </button>
        </div>

        {/* ======================================================
            EDITOR CONTENT
            ====================================================== */}
        <EditorContent editor={editor} />
      </div>

      {/* ========================================================
          INPUT FOTO
          ======================================================== */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageChange}
        disabled={disabled || uploadingImage}
        className="hidden"
      />

      {/* ========================================================
          STATUS UPLOAD
          ======================================================== */}
      {uploadingImage && (
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700">
          <Loader2 size={15} className="animate-spin" />
          Mengunggah foto ke server...
        </div>
      )}

      {/* ========================================================
          ERROR
          ======================================================== */}
      {error && (
        <div className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ========================================================
          PETUNJUK UNTUK ADMIN
          ======================================================== */}
      <p className="mt-2 text-xs leading-5 text-gray-400">
        Gunakan toolbar untuk membuat teks tebal, miring, subjudul, daftar,
        kutipan, link, dan menambahkan foto pendukung. Foto juga dapat ditempel
        langsung dari clipboard atau di-drag ke editor.
      </p>

      {/* ========================================================
          STYLE EDITOR
          ======================================================== */}
      <style jsx global>{`
        .news-editor-content {
          font-size: 1rem;
          line-height: 1.8;
          color: #374151;
        }

        .news-editor-content p {
          margin: 0 0 1rem;
        }

        .news-editor-content p:last-child {
          margin-bottom: 0;
        }

        .news-editor-content h2 {
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          color: #003366;
          font-size: 1.5rem;
          line-height: 1.3;
          font-weight: 700;
        }

        .news-editor-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.65rem;
          color: #003366;
          font-size: 1.25rem;
          line-height: 1.35;
          font-weight: 700;
        }

        .news-editor-content ul {
          margin: 0 0 1rem;
          padding-left: 1.5rem;
          list-style-type: disc;
        }

        .news-editor-content ol {
          margin: 0 0 1rem;
          padding-left: 1.5rem;
          list-style-type: decimal;
        }

        .news-editor-content li {
          margin: 0.25rem 0;
        }

        .news-editor-content blockquote {
          margin: 1.25rem 0;
          border-left: 4px solid #b30000;
          padding: 0.75rem 1rem;
          background: #f8fafc;
          color: #475569;
          font-style: italic;
        }

        .news-editor-content a {
          color: #003366;
          text-decoration: underline;
          text-decoration-color: #b30000;
          text-underline-offset: 2px;
        }

        /*
         * ======================================================
         * FOTO ISI BERITA
         *
         * Desktop:
         * maksimal 70% dari area editor.
         *
         * HP/tablet:
         * maksimal mengikuti lebar layar.
         *
         * Yang penting:
         * foto kecil TIDAK dibesarkan secara paksa.
         * ======================================================
         */
        .news-editor-content img.news-content-image {
          display: block;
          width: auto;
          max-width: 70%;
          height: auto;
          margin: 1.5rem auto;
          border-radius: 0.75rem;
          object-fit: contain;
        }

        .news-editor-content img.ProseMirror-selectednode {
          outline: 3px solid rgba(0, 51, 102, 0.35);
          outline-offset: 2px;
        }

        .news-editor-content strong {
          font-weight: 700;
        }

        .news-editor-content em {
          font-style: italic;
        }

        .news-editor-content p.is-editor-empty:first-child::before {
          color: #9ca3af;
          content: "Tulis isi berita di sini...";
          float: left;
          height: 0;
          pointer-events: none;
        }

        /*
         * ======================================================
         * RESPONSIVE
         * ======================================================
         */
        @media (max-width: 768px) {
          .news-editor-content img.news-content-image {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default NewsEditor;

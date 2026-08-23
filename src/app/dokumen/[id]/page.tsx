"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowDownToLine,
  ExternalLink,
  FileText,
  Loader2,
  Maximize2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type Dokumen = {
  id: number;
  nama: string;
  judul: string;
  file_url: string;
  publish: boolean;
};

export default function ReviewDokumenPage() {
  const params = useParams();
  const id = Number(params.id);

  const [dokumen, setDokumen] = useState<Dokumen | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDokumen() {
      if (!id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("dokumen")
        .select("id, nama, judul, file_url, publish")
        .eq("id", id)
        .eq("publish", true)
        .single();

      if (error) {
        console.error("ERROR MEMUAT DETAIL DOKUMEN:", error);
        setDokumen(null);
      } else {
        setDokumen(data);
      }

      setLoading(false);
    }

    loadDokumen();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f9fd] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
            <Loader2 size={25} className="animate-spin text-[#003b70]" />
          </div>

          <p className="mt-4 text-sm text-slate-500">Membuka dokumen...</p>
        </div>
      </main>
    );
  }

  if (!dokumen) {
    return (
      <main className="min-h-screen bg-[#f5f9fd] px-5 py-20">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
          <FileText size={40} className="mx-auto text-slate-300" />

          <h1 className="mt-5 text-xl font-bold text-[#003b70]">
            Dokumen tidak ditemukan
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Dokumen mungkin belum dipublikasikan atau sudah tidak tersedia.
          </p>

          <Link
            href="/dokumen"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#003b70] px-5 py-3 text-xs font-bold text-white"
          >
            <ArrowLeft size={15} />
            Kembali ke Dokumen
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eef4f9]">
      {/* =====================================================
          TOP BAR
         ===================================================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <Link
                href="/dokumen"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#003b70] hover:text-[#b30000]"
              >
                <ArrowLeft size={14} />
                Kembali ke Dokumen
              </Link>

              <h1 className="mt-3 truncate font-heading text-xl font-bold text-[#102d4c] sm:text-2xl">
                {dokumen.judul}
              </h1>

              <p className="mt-1 text-xs text-slate-500">{dokumen.nama}</p>
            </div>

            <div className="flex shrink-0 gap-2">
              <a
                href={dokumen.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-[#003b70] transition-colors hover:bg-slate-50"
              >
                <ExternalLink size={14} />
                Buka PDF
              </a>

              <a
                href={dokumen.file_url}
                download
                className="inline-flex items-center gap-2 rounded-xl bg-[#003b70] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#002c54]"
              >
                <ArrowDownToLine size={14} />
                Unduh
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          METADATA
         ===================================================== */}

      <div className="mx-auto max-w-[1500px] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-500">
            <FileText size={13} className="text-[#b30000]" />
            Dokumen Resmi
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-500">
            Format PDF
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-500">
            ORARI Lokal Majene
          </span>
        </div>
      </div>

      {/* =====================================================
          PDF VIEWER
         ===================================================== */}

      <div className="mx-auto max-w-[1500px] px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,61,95,0.08)]">
          {/* Viewer toolbar */}
          <div className="flex flex-col gap-3 border-b border-slate-200 bg-[#102d4c] px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                <FileText size={16} />
              </div>

              <span className="text-xs font-semibold">Pratinjau Dokumen</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-white/10 px-3 py-1.5 text-[10px] font-medium text-white/80">
                PDF Viewer
              </span>

              <a
                href={dokumen.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-white px-3 text-[10px] font-bold text-[#102d4c]"
              >
                <Maximize2 size={13} />
                Fullscreen
              </a>
            </div>
          </div>

          {/* PDF */}
          <div className="h-[70vh] min-h-[600px] bg-slate-200">
            <iframe
              src={`${dokumen.file_url}#toolbar=1&navpanes=0&scrollbar=1`}
              title={dokumen.judul}
              className="h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

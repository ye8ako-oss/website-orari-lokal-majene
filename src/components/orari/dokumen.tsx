"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CalendarDays,
  Eye,
  FileText,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ScrollReveal } from "./scroll-reveal";

type Dokumen = {
  id: number;
  nama: string;
  judul: string;
  file_url: string;
  publish: boolean;
};

/*
|--------------------------------------------------------------------------
| PENGATURAN BACKGROUND HALAMAN DOKUMEN
|--------------------------------------------------------------------------
| Jika suatu saat ingin mengganti gambar background,
| cukup ubah SATU baris di bawah ini.
|
| Contoh:
| const DOKUMEN_BACKGROUND = "/images/background-baru.jpg";
|
| File gambar harus berada di:
| public/images/
|--------------------------------------------------------------------------
*/

const DOKUMEN_BACKGROUND = "/images/ruang-station.png";

const accents = [
  {
    iconBg: "bg-[#eaf2ff]",
    iconColor: "text-[#0757b5]",
    accent: "bg-[#0757b5]",
  },
  {
    iconBg: "bg-[#eaf8f3]",
    iconColor: "text-[#16845b]",
    accent: "bg-[#16845b]",
  },
  {
    iconBg: "bg-[#fff2ed]",
    iconColor: "text-[#c84b20]",
    accent: "bg-[#c84b20]",
  },
];

export function Dokumen() {
  const [dokumen, setDokumen] = useState<Dokumen[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDokumen() {
      const { data, error } = await supabase
        .from("dokumen")
        .select("id, nama, judul, file_url, publish")
        .eq("publish", true)
        .order("id", { ascending: false });

      if (error) {
        console.error("ERROR MEMUAT DOKUMEN PUBLIC:", error);
        setDokumen([]);
      } else {
        setDokumen(data ?? []);
      }

      setLoading(false);
    }

    loadDokumen();
  }, []);

  return (
    <section
      id="dokumen"
      className="relative min-h-screen overflow-hidden bg-[#eef4f9] bg-cover bg-center bg-no-repeat pt-8 pb-20 sm:pt-10 sm:pb-24 lg:pb-28"
      style={{
        backgroundImage: `url('${DOKUMEN_BACKGROUND}')`,
      }}
    >
      {/* =====================================================
          BACKGROUND OVERLAY
         ===================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-white/73" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#eef4f9]/40" />

      {/* =====================================================
          CONTENT
         ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =====================================================
            BREADCRUMB
           ===================================================== */}

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="transition-colors hover:text-[#003b70]">
            Beranda
          </Link>

          <span>/</span>

          <span className="font-semibold text-[#003b70]">Dokumen</span>
        </div>

        {/* =====================================================
            MAIN SECTION HEADER
           ===================================================== */}

        <div className="relative mt-10 max-w-3xl sm:mt-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-[#b30000]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b30000]">
              Arsip Organisasi
            </span>
          </div>

          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-[#102d4c] sm:text-4xl lg:text-[2.7rem]">
            Dokumen Resmi
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Dokumen dan informasi resmi ORARI Lokal Majene yang tersedia untuk
            dibaca, ditinjau, dan diunduh.
          </p>

          {!loading && dokumen.length > 0 && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#d5e4f0] bg-white/90 px-3.5 py-2 text-xs font-semibold text-[#003b70] shadow-sm backdrop-blur-sm">
              <FileText size={14} />
              {dokumen.length} dokumen tersedia
            </div>
          )}
        </div>

        {/* =====================================================
            LOADING
           ===================================================== */}

        {loading ? (
          <div className="flex min-h-[330px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 shadow-sm ring-1 ring-slate-200">
                <Loader2 size={23} className="animate-spin text-[#003b70]" />
              </div>

              <p className="mt-4 text-sm text-slate-500">Memuat dokumen...</p>
            </div>
          </div>
        ) : dokumen.length === 0 ? (
          /* ===================================================
             EMPTY STATE
             =================================================== */

          <div className="mt-10 rounded-[1.75rem] border border-dashed border-slate-300 bg-white/95 px-6 py-16 text-center shadow-[0_8px_30px_rgba(15,61,95,0.06)] backdrop-blur-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef5fc] text-[#003b70]">
              <FileText size={29} strokeWidth={1.5} />
            </div>

            <h2 className="mt-5 font-heading text-lg font-bold text-[#003b70]">
              Belum ada dokumen
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Dokumen yang telah dipublikasikan oleh administrator akan muncul
              di halaman ini.
            </p>
          </div>
        ) : (
          /* ===================================================
             DOCUMENT GRID
             =================================================== */

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {dokumen.map((item, index) => {
              const accent = accents[index % accents.length];

              return (
                <ScrollReveal key={item.id} variant="up" delay={index * 70}>
                  <article
                    className={`group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-[1.5rem] border border-white/55 bg-white/55 p-6 shadow-[0_8px_28px_rgba(15,61,95,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/65 hover:shadow-[0_14px_36px_rgba(15,61,95,0.12)]`}
                  >
                    {/* Top accent */}
                    <div
                      className={`absolute inset-x-0 top-0 h-1 ${accent.accent}`}
                    />

                    {/* Decorative index */}
                    <span className="pointer-events-none absolute -right-0 -top-1 font-heading text-[105px] font-bold leading-none text-[#003b70]/[0.074]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Card header */}
                    <div className="relative flex items-start justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accent.iconBg} ${accent.iconColor}`}
                      >
                        <FileText
                          size={28}
                          strokeWidth={1.5}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5"
                        />
                      </div>

                      <span
                        className={`rounded-full ${accent.iconBg} px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] ${accent.iconColor}`}
                      >
                        PDF
                      </span>
                    </div>

                    {/* Document information */}
                    <div className="relative mt-7">
                      <p
                        className={`text-[9px] font-bold uppercase tracking-[0.22em] ${accent.iconColor}`}
                      >
                        Dokumen {String(index + 1).padStart(2, "0")}
                      </p>

                      <h2 className="mt-2 font-heading text-xl font-bold leading-7 text-[#102d4c]">
                        {item.judul}
                      </h2>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                        {item.nama}
                      </p>
                    </div>

                    {/* Metadata */}
                    <div className="relative mt-6 flex items-center gap-4 border-t border-slate-300/50 pt-4">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                        <FileText size={13} />
                        Dokumen PDF
                      </span>

                      <span className="h-1 w-1 rounded-full bg-slate-300" />

                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                        <Eye size={13} />
                        Online
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="relative mt-auto flex gap-2 pt-6">
                      <Link
                        href={`/dokumen/${item.id}`}
                        className={`group/button flex flex-1 items-center justify-center gap-2 rounded-xl ${accent.accent} px-4 py-3 text-xs font-bold text-white transition-all duration-300 hover:brightness-95`}
                      >
                        <Eye size={15} />

                        <span>Review Dokumen</span>

                        <ArrowUpRight
                          size={14}
                          className="opacity-70 transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                        />
                      </Link>

                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        aria-label={`Unduh ${item.judul}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-[#003b70] transition-all duration-300 hover:border-[#003b70]/20 hover:bg-[#003b70] hover:text-white"
                      >
                        <ArrowDownToLine size={16} />
                      </a>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* =====================================================
            ACCESS INFORMATION
           ===================================================== */}

        {!loading && dokumen.length > 0 && (
          <div className="relative mt-12 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 shadow-[0_10px_35px_rgba(15,61,95,0.08)] backdrop-blur-sm">
            <div className="flex flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:px-8 sm:py-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf5ff] text-[#0757b5]">
                <ShieldCheck size={26} strokeWidth={1.5} />
              </div>

              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b30000]">
                  Akses Dokumen
                </p>

                <h2 className="mt-1 font-heading text-lg font-bold text-[#102d4c]">
                  Informasi publik organisasi
                </h2>

                <p className="mt-1.5 max-w-3xl text-sm leading-6 text-slate-500">
                  Dokumen tersedia untuk ditinjau secara online. Pengunjung
                  dapat membaca dokumen langsung melalui website atau mengunduh
                  file untuk dibaca secara offline.
                </p>
              </div>

              <div className="hidden items-center gap-2 text-[#003b70] sm:flex">
                <CalendarDays size={16} className="text-slate-400" />

                <span className="text-xs font-semibold">
                  ORARI Lokal Majene
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dokumen;

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CalendarDays,
  Eye,
  FileText,
  FolderOpen,
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

const accents = [
  {
    iconBg: "bg-[#eaf2ff]",
    iconColor: "text-[#0757b5]",
    accent: "bg-[#0757b5]",
    soft: "bg-[#f5f9ff]",
  },
  {
    iconBg: "bg-[#eaf8f3]",
    iconColor: "text-[#16845b]",
    accent: "bg-[#16845b]",
    soft: "bg-[#f5fbf8]",
  },
  {
    iconBg: "bg-[#fff2ed]",
    iconColor: "text-[#c84b20]",
    accent: "bg-[#c84b20]",
    soft: "bg-[#fff9f6]",
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
      className="relative overflow-hidden bg-[#f5f9fd] pt-8 pb-20 sm:pt-10 sm:pb-24 lg:pb-28"
    >
      {/* =====================================================
          BACKGROUND DECORATION
         ===================================================== */}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[430px] bg-gradient-to-b from-[#eef6ff] via-[#f4f9fd] to-transparent" />

      <div className="pointer-events-none absolute right-[-140px] top-20 h-[420px] w-[420px] rounded-full border-[70px] border-[#0757b5]/[0.025]" />

      <div className="pointer-events-none absolute left-[-160px] top-[500px] h-[360px] w-[360px] rounded-full border border-[#0757b5]/[0.045]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* =====================================================
            BREADCRUMB
           ===================================================== */}

        <div className="flex items-center gap-2 pt-3 text-xs font-medium text-slate-400">
          <Link href="/" className="transition-colors hover:text-[#003b70]">
            Beranda
          </Link>

          <span>/</span>

          <span className="font-semibold text-[#003b70]">Dokumen</span>
        </div>

        {/* =====================================================
    HERO — DIGITAL ARCHIVE
   ===================================================== */}

        <div className="relative mt-7 overflow-hidden rounded-[1.75rem] border border-[#dce7f1] bg-white shadow-[0_10px_40px_rgba(15,61,95,0.055)]">
          {/* Soft background wash */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f7fbff] via-white to-[#eef6fc]" />

          {/* Large transparent archive shape */}
          <div className="pointer-events-none absolute -right-20 -top-28 h-[360px] w-[360px] rounded-full border-[70px] border-[#0757b5]/[0.025]" />

          <div className="pointer-events-none absolute -right-8 top-12 h-[250px] w-[250px] rounded-full border border-[#0757b5]/[0.06]" />

          {/* Decorative digital lines */}
          <div className="pointer-events-none absolute right-[7%] top-[24%] hidden h-px w-40 bg-gradient-to-r from-transparent via-[#0757b5]/10 to-transparent lg:block" />

          <div className="pointer-events-none absolute right-[10%] top-[58%] hidden h-px w-28 bg-gradient-to-r from-transparent via-[#0757b5]/10 to-transparent lg:block" />

          <div className="pointer-events-none absolute right-[24%] top-[17%] hidden h-2 w-2 rounded-full bg-[#b30000]/15 lg:block" />

          <div className="relative grid min-h-[285px] items-center lg:grid-cols-[1.15fr_0.85fr]">
            {/* =================================================
        LEFT — CONTENT
       ================================================= */}

            <div className="relative z-10 px-7 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-12">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#b30000]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#b30000]">
                  Pusat Dokumen
                </span>
              </div>

              <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-[#102d4c] sm:text-5xl">
                Dokumen
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
                Pusat dokumen dan informasi yang dapat diakses untuk dibaca,
                ditinjau, dan dipelajari.
              </p>

              {!loading && dokumen.length > 0 && (
                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#dbe8f5] bg-[#f6faff] px-3.5 py-2 text-xs font-semibold text-[#003b70]">
                  <FolderOpen size={14} />
                  {dokumen.length} dokumen tersedia
                </div>
              )}
            </div>

            {/* =================================================
        RIGHT — ABSTRACT DOCUMENT VISUAL
       ================================================= */}

            <div className="pointer-events-none relative hidden h-full min-h-[285px] overflow-hidden lg:block">
              {/* Floating document sheet */}
              <div className="absolute left-[30%] top-1/2 h-[190px] w-[145px] -translate-y-1/2 rotate-[-6deg] rounded-2xl border border-[#0757b5]/10 bg-white/70 shadow-[0_18px_45px_rgba(15,61,95,0.06)] backdrop-blur-[2px]" />

              {/* Back sheet */}
              <div className="absolute left-[37%] top-1/2 h-[190px] w-[145px] -translate-y-1/2 rotate-[6deg] rounded-2xl border border-[#0757b5]/[0.07] bg-[#edf5fc]/60" />

              {/* Main document */}
              <div className="absolute left-[34%] top-1/2 h-[190px] w-[145px] -translate-y-1/2 rounded-2xl border border-[#0757b5]/15 bg-white/85 p-5 shadow-[0_20px_50px_rgba(15,61,95,0.08)]">
                {/* PDF mark */}
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#edf5ff] text-[#0757b5]">
                    <FileText size={19} strokeWidth={1.6} />
                  </div>

                  <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#b30000]/70">
                    PDF
                  </span>
                </div>

                {/* document lines */}
                <div className="mt-7 space-y-2.5">
                  <div className="h-1.5 w-[82%] rounded-full bg-[#102d4c]/10" />
                  <div className="h-1.5 w-full rounded-full bg-[#102d4c]/[0.055]" />
                  <div className="h-1.5 w-[70%] rounded-full bg-[#102d4c]/[0.055]" />
                </div>

                {/* document blocks */}
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <div className="h-7 rounded-lg bg-[#0757b5]/[0.045]" />
                  <div className="h-7 rounded-lg bg-[#b30000]/[0.045]" />
                </div>
              </div>

              {/* Digital connection line */}
              <div className="absolute bottom-[22%] right-[13%] flex items-center gap-2">
                <span className="h-px w-20 bg-[#0757b5]/10" />
                <span className="h-2 w-2 rounded-full border border-[#0757b5]/20 bg-white" />
              </div>

              {/* Small archive nodes */}
              <div className="absolute right-[18%] top-[23%] h-3 w-3 rounded-full border border-[#0757b5]/15 bg-white" />

              <div className="absolute right-[12%] top-[37%] h-2 w-2 rounded-full bg-[#0757b5]/10" />

              <div className="absolute bottom-[25%] right-[25%] h-2.5 w-2.5 rounded-full border border-[#b30000]/15 bg-white" />

              {/* Very subtle watermark */}
              <div className="absolute bottom-[-28px] right-[-5px] select-none font-heading text-[170px] font-bold leading-none text-[#0757b5]/[0.018]">
                PDF
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            SECTION TITLE
           ===================================================== */}

        <div className="mt-14 flex flex-col gap-2 sm:mt-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b30000]">
              Arsip Organisasi
            </p>

            <h2 className="mt-1.5 font-heading text-2xl font-bold tracking-tight text-[#102d4c] sm:text-3xl">
              Dokumen Resmi
            </h2>
          </div>

          <p className="text-xs leading-5 text-slate-400 sm:max-w-xs sm:text-right">
            Pilih dokumen untuk membaca isi secara online atau mengunduhnya.
          </p>
        </div>

        {/* =====================================================
            LOADING
           ===================================================== */}

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <Loader2 size={23} className="animate-spin text-[#003b70]" />
              </div>

              <p className="mt-4 text-sm text-slate-500">Memuat dokumen...</p>
            </div>
          </div>
        ) : dokumen.length === 0 ? (
          /* ===================================================
             EMPTY STATE
             =================================================== */

          <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef5fc] text-[#003b70]">
              <FileText size={29} strokeWidth={1.5} />
            </div>

            <h3 className="mt-5 font-semibold text-[#003b70]">
              Belum ada dokumen
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Dokumen yang telah dipublikasikan oleh administrator akan muncul
              di halaman ini.
            </p>
          </div>
        ) : (
          /* ===================================================
             DOCUMENT CARDS
             =================================================== */

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {dokumen.map((item, index) => {
              const accent = accents[index % accents.length];

              return (
                <ScrollReveal key={item.id} variant="up" delay={index * 70}>
                  <article
                    className={`group relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-[1.6rem] border border-slate-200/80 ${accent.soft} p-6 shadow-[0_8px_30px_rgba(15,61,95,0.045)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,61,95,0.10)]`}
                  >
                    {/* top accent */}
                    <div
                      className={`absolute left-0 right-0 top-0 h-1 ${accent.accent}`}
                    />

                    {/* decorative number */}
                    <span className="pointer-events-none absolute -right-2 -top-7 font-heading text-[110px] font-bold leading-none text-[#003b70]/[0.035]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* card top */}
                    <div className="relative flex items-start justify-between">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${accent.iconBg} ${accent.iconColor}`}
                      >
                        <FileText
                          size={28}
                          strokeWidth={1.6}
                          className="transition-transform duration-300 group-hover:-translate-y-0.5"
                        />
                      </div>

                      <span
                        className={`rounded-full ${accent.iconBg} px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider ${accent.iconColor}`}
                      >
                        PDF
                      </span>
                    </div>

                    {/* label */}
                    <div className="relative mt-7">
                      <p
                        className={`text-[9px] font-bold uppercase tracking-[0.22em] ${accent.iconColor}`}
                      >
                        Dokumen {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="mt-2 font-heading text-xl font-bold leading-7 text-[#102d4c]">
                        {item.judul}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                        {item.nama}
                      </p>
                    </div>

                    {/* info */}
                    <div className="relative mt-6 flex items-center gap-4 border-t border-slate-200/70 pt-4">
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

                    {/* buttons */}
                    <div className="relative mt-auto flex gap-2 pt-6">
                      <Link
                        href={`/dokumen/${item.id}`}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl ${accent.accent} px-4 py-3 text-xs font-bold text-white transition-all duration-300 hover:brightness-95`}
                      >
                        <Eye size={15} />
                        Review Dokumen
                      </Link>

                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        aria-label={`Unduh ${item.judul}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#003b70] transition-all duration-300 hover:border-[#003b70]/20 hover:bg-[#003b70] hover:text-white"
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
          <div className="relative mt-12 overflow-hidden rounded-[1.75rem] border border-[#dce8f3] bg-white shadow-[0_8px_30px_rgba(15,61,95,0.04)]">
            <div className="flex flex-col gap-6 px-6 py-7 sm:flex-row sm:items-center sm:px-8 sm:py-8">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf5ff] text-[#0757b5]">
                <ShieldCheck size={27} strokeWidth={1.5} />
              </div>

              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b30000]">
                  Akses Dokumen
                </p>

                <h3 className="mt-1 font-heading text-lg font-bold text-[#102d4c]">
                  Informasi publik organisasi
                </h3>

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

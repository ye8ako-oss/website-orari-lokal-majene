"use client";

import { useEffect, useState } from "react";
import { FileText, Eye, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { getIcon } from "./icon-map";
import { SectionHeading } from "./section-heading";
import { ScrollReveal } from "./scroll-reveal";

type Dokumen = {
  id: number;
  nama: string;
  judul: string;
  file_url: string;
  publish: boolean;
};

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
        console.log("DOKUMEN PUBLIC:", data);
        setDokumen(data ?? []);
      }

      setLoading(false);
    }

    loadDokumen();
  }, []);

  return (
    <section id="dokumen" className="py-20 sm:py-24 bg-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pusat Dokumen"
          title="Dokumen Resmi Organisasi"
          description="Akses berbagai dokumen resmi ORARI Lokal Majene yang dapat diunduh oleh anggota, mitra kerja, dan masyarakat."
        />

        {loading ? (
          <div className="mt-14 flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2
                size={28}
                className="mx-auto animate-spin text-[#003366]"
              />
              <p className="mt-3 text-sm text-muted-foreground">
                Memuat dokumen...
              </p>
            </div>
          </div>
        ) : dokumen.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-gray-300 px-6 py-12 text-center">
            <FileText size={40} className="mx-auto text-gray-300" />

            <p className="mt-4 font-semibold text-[#003366]">
              Belum ada dokumen yang tersedia.
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Dokumen yang dipublikasikan akan tampil di halaman ini.
            </p>
          </div>
        ) : (
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dokumen.map((item, idx) => {
              const Icon = getIcon("FileText");

              return (
                <ScrollReveal key={item.id} variant="up" delay={idx * 60}>
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-border bg-white p-5 hover:border-[#003366]/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#003366]/5 text-[#003366] group-hover:bg-[#003366] group-hover:text-white transition-colors duration-300">
                        <Icon size={24} />
                      </span>

                      <span className="inline-flex items-center gap-1 rounded-md bg-[#B30000]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#B30000]">
                        <FileText size={11} />
                        PDF
                      </span>
                    </div>

                    <h3 className="font-heading font-semibold text-[#003366] text-base">
                      {item.judul}
                    </h3>

                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed flex-1">
                      {item.nama}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#003366] group-hover:text-[#B30000] transition-colors">
                      <Eye size={13} />
                      Lihat Dokumen
                    </span>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Dokumen;

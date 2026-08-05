/* ============================================================
   KOMPONEN SectionHeading
   ------------------------------------------------------------
   Judul section yang seragam di seluruh halaman: label kecil
   di atas, judul utama, dan deskripsi singkat. Memakai garis
   aksen merah khas ORARI.
   ============================================================ */
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean; // mode teks terang (untuk background gelap)
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <ScrollReveal
      variant="fade"
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {/* Label kecil di atas judul */}
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 mb-3",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-6 bg-[#B30000]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B30000]">
            {eyebrow}
          </span>
          <span className="h-px w-6 bg-[#B30000]" />
        </div>
      )}
      {/* Judul utama */}
      <h2
        className={cn(
          "font-heading font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight",
          light ? "text-white" : "text-[#003366]"
        )}
      >
        {title}
      </h2>
      {/* Deskripsi */}
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            light ? "text-white/80" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}

export default SectionHeading;

"use client";

/* ============================================================
   KOMPONEN ScrollReveal
   ------------------------------------------------------------
   Membungkus elemen agar muncul dengan animasi (fade up /
   fade in / zoom) ketika masuk viewport. Memakai
   IntersectionObserver agar ringan dan performant.

   Props:
   - variant: "up" | "left" | "right" | "zoom" | "fade"
   - delay : jeda animasi (ms) untuk efek bertahap
   - as    : tag HTML pembungkus (default div)
   ============================================================ */
import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "left" | "right" | "zoom" | "fade";

type ScrollRevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  as?: ElementType;
};

/* Peta variant -> kelas tambahan */
const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: "",
  left: "reveal-left",
  right: "reveal-right",
  zoom: "reveal-zoom",
  fade: "reveal-fade",
};

export function ScrollReveal({
  children,
  variant = "up",
  delay = 0,
  className,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Berlangganan perubahan visibilitas elemen via IntersectionObserver.
       setState dipanggil di dalam callback (subscription), bukan langsung
       di body effect, agar tidak memicu render beruntun.
       Catatan: preferensi "reduced motion" ditangani via CSS. */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", VARIANT_CLASS[variant], visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

export default ScrollReveal;

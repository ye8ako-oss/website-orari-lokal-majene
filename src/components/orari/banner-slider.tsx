"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Banner = {
  id: number;
  judul: string;
  gambar: string;
};

type BannerSliderProps = {
  banners: Banner[];
};

export function BannerSlider({ banners }: BannerSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((current) => {
        return (current + 1) % banners.length;
      });
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [banners.length]);

  if (banners.length === 0) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-400">
        Belum ada banner aktif.
      </div>
    );
  }

  const banner = banners[activeIndex];

  return (
    <div className="relative overflow-hidden rounded-xl bg-white">
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={banner.gambar}
          alt={banner.judul}
          fill
          sizes="(max-width: 1024px) 100vw, 30vw"
          className="object-contain"
          priority={activeIndex === 0}
        />
      </div>

      {banners.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/30 px-2 py-1.5">
          {banners.map((item, index) => (
            <span
              key={item.id}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-5 bg-white" : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BannerSlider;

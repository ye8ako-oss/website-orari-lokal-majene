"use client";

/* ============================================================
   HOOK useCounter — Animasi angka naik (counter animation)
   ------------------------------------------------------------
   Menggunakan requestAnimationFrame agar halus. Counter mulai
   berjalan ketika elemen masuk viewport (dipicu oleh parameter
   `start`). Cocok untuk section Statistik.
   ============================================================ */
import { useState, useEffect, useRef } from "react";

export function useCounter(target: number, start: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;
    startedRef.current = true;

    let frame: number;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // Easing easeOutExpo agar gerakan melambat di akhir
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return count;
}

"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";
import type { LenisOptions } from "lenis";

// Effectively native/instant — used until we confirm the user hasn't
// requested reduced motion, and as the safe SSR/first-paint default.
const REDUCED: LenisOptions = { lerp: 1, duration: 0, smoothWheel: false, syncTouch: false };
const SMOOTH: LenisOptions = { lerp: 0.1, duration: 1.1, smoothWheel: true };

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useState<LenisOptions>(REDUCED);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOptions(SMOOTH);
    }
  }, []);

  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}

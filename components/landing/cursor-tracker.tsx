"use client";

import { useEffect, useRef } from "react";

/**
 * A soft, blurred shadow that trails the pointer — visible only inside
 * designated content zones ([data-cursor-zone]), not over empty page space.
 * Barely intensifies over interactive elements. Desktop fine-pointer only.
 */
export function CursorTracker() {
  const shadowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const shadow = shadowRef.current;
    if (!shadow) return;

    let mouseX = -200, mouseY = -200;
    let x = -200, y = -200;
    let raf: number;
    let inZone = false;
    let locked = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onLeaveWindow = () => {
      inZone = false;
      shadow.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    const tick = () => {
      x += (mouseX - x) * 0.12;
      y += (mouseY - y) * 0.12;
      shadow.style.transform = `translate(${x}px, ${y}px)`;

      const el = document.elementFromPoint(mouseX, mouseY);
      const zone = el?.closest("[data-cursor-zone]");
      const nowInZone = !!zone;
      if (nowInZone !== inZone) {
        inZone = nowInZone;
        shadow.style.opacity = inZone ? "1" : "0";
      }
      if (inZone) {
        const nowLocked = !!el?.closest("a, button");
        if (nowLocked !== locked) {
          locked = nowLocked;
          shadow.classList.toggle("cursor-shadow--locked", locked);
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={shadowRef}
      aria-hidden="true"
      className="cursor-shadow fixed left-0 top-0 z-[200] w-24 h-24 -ml-12 -mt-12 rounded-full pointer-events-none opacity-0 transition-opacity duration-500 ease-out"
    />
  );
}

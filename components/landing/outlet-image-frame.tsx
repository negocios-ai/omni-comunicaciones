"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { OutletImage } from "./outlet-products-data";

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8" aria-hidden="true">
      <rect x="2.5" y="4" width="19" height="12.5" rx="1" />
      <path d="M8 21h8M12 16.5V21" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Renders a real photo when the file exists and loads successfully, and a
 * neutral branded placeholder otherwise (missing file, not uploaded yet).
 * Uses a plain <img> + onError instead of next/image so a 404 during the
 * outlet's photo rollout never surfaces as a broken-image icon.
 */
export function OutletImageFrame({
  image,
  className,
  priority,
}: {
  image?: OutletImage;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const showPlaceholder = !image || failed;

  useEffect(() => {
    // A 404 on a server-rendered <img> can resolve before React hydrates
    // and attaches the onError listener, so the native error event fires
    // and is missed. Catch that already-failed state explicitly on mount.
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth === 0) {
      setFailed(true);
    }
  }, [image?.src]);

  return (
    <div className={cn("relative aspect-square w-full bg-gradient-to-b from-foreground to-[#dde3ea] overflow-hidden", className)}>
      {showPlaceholder ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#0c111a]/35">
          <MonitorIcon />
          <span className="font-mono text-[9px] tracking-widest uppercase">Foto próximamente</span>
        </div>
      ) : (
        <picture>
          <source srcSet={image.src} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={image.src.replace(/\.webp$/, ".jpg")}
            alt={image.alt}
            onError={() => setFailed(true)}
            loading={priority ? "eager" : "lazy"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </picture>
      )}
    </div>
  );
}

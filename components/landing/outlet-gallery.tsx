"use client";

import { useState } from "react";
import { OutletImageFrame } from "./outlet-image-frame";
import type { OutletImage } from "./outlet-products-data";

export function OutletGallery({ images }: { images: OutletImage[] }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <OutletImageFrame image={images[active]} priority />
      {images.length > 1 && (
        <div
          className="mt-3 grid gap-2"
          style={{ gridTemplateColumns: `repeat(${Math.min(images.length, 6)}, minmax(0, 1fr))` }}
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1} de ${images.length}`}
              aria-current={i === active}
              className={`relative aspect-square border transition-colors ${
                i === active ? "border-primary" : "border-border hover:border-border-bright"
              }`}
            >
              <OutletImageFrame image={img} className="aspect-square" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import Image from "next/image";

function ImagePlaceholderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="1" />
      <circle cx="8" cy="10" r="1.75" />
      <path d="M21.5 15.5l-5.5-5-4 4-2.5-2-5 5" />
    </svg>
  );
}

/**
 * New catalog items ship without real photos until the client sends them.
 * `images.length === 0` renders a neutral placeholder instead of feeding an
 * undefined src into next/image; otherwise renders the photo exactly as
 * before (identity refactor, no visual change for existing products).
 */
export function ProductImageFrame({
  images,
  imgIdx = 0,
  alt,
  sizes,
  className,
  priority,
}: {
  images: string[];
  imgIdx?: number;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  if (images.length === 0) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#0c111a]/35">
        <ImagePlaceholderIcon />
        <span className="font-mono text-[9px] tracking-widest uppercase">Foto próximamente</span>
      </div>
    );
  }

  return <Image src={images[imgIdx]} alt={alt} fill sizes={sizes} className={className} priority={priority} />;
}

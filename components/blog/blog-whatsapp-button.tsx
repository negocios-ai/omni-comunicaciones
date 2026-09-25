"use client";

import { trackWhatsappClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "593996590777";

export function BlogWhatsappButton({
  message,
  source,
  label = "ASESORÍA POR WHATSAPP",
}: {
  message: string;
  source: string;
  label?: string;
}) {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      onClick={() => trackWhatsappClick(source)}
      className="inline-flex items-center justify-center gap-2 min-h-11 bg-primary text-background px-6 font-mono text-[0.6875rem] tracking-widest font-semibold hover:bg-primary-hover transition-colors"
    >
      {label}
      <span>→</span>
    </a>
  );
}

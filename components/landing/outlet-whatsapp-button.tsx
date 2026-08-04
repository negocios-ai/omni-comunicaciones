"use client";

import { trackWhatsappClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "593996590777";

export function outletWaLink(productTitle: string) {
  const text = encodeURIComponent(`Hola, quiero consultar disponibilidad del ${productTitle}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function OutletWhatsappButton({
  productTitle,
  source,
  className,
}: {
  productTitle: string;
  source: string;
  className?: string;
}) {
  return (
    <a
      href={outletWaLink(productTitle)}
      target="_blank"
      rel="noopener"
      onClick={() => trackWhatsappClick(source, productTitle)}
      className={
        className ??
        "inline-flex items-center justify-center gap-2 min-h-11 bg-primary text-background px-5 font-mono text-[0.625rem] tracking-widest font-semibold hover:bg-primary-hover transition-colors whitespace-nowrap"
      }
    >
      CONSULTAR DISPONIBILIDAD
      <span>→</span>
    </a>
  );
}

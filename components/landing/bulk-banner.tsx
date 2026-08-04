"use client";

import { trackWhatsappClick } from "@/lib/analytics";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TieredPriceIcon, ConfigIncludedIcon } from "./bulk-icons";
import { ReceiptIcon } from "./process-icons";

const WHATSAPP_NUMBER = "593996590777";

const BENEFITS = [
  { icon: TieredPriceIcon, title: "Precio escalonado", desc: "Mientras más equipos, mejor precio por unidad." },
  { icon: ConfigIncludedIcon, title: "Programación incluida", desc: "Configuración y puesta en marcha sin costo adicional." },
  { icon: ReceiptIcon, title: "Facturación empresarial", desc: "Factura con IVA y opción de crédito para empresas." },
];

export function BulkBanner() {
  return (
    <section className="relative border-t border-border overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "repeating-linear-gradient(115deg, currentColor 0, currentColor 1px, transparent 1px, transparent 42px)",
          color: "#2196f3",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 80% at 85% 50%, rgba(33,150,243,0.08) 0%, transparent 70%)" }}
      />

      <ScrollReveal className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-14 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
          <div>
            <span className="sys-tag mb-4 block">PROYECTOS / VOLUMEN</span>
            <h2 className="font-display text-3xl lg:text-5xl leading-[0.95] tracking-tight text-foreground">
              DESCUENTOS EXCLUSIVOS
              <br />
              POR VOLUMEN
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-lg leading-relaxed">
              Proyectos corporativos, seguridad privada, minería, construcción y flotas. Precios especiales según
              cantidad.
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-8">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex flex-col gap-3">
                  <div className="text-primary">
                    <b.icon />
                  </div>
                  <div>
                    <div className="font-display text-lg text-foreground leading-tight">{b.title}</div>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola, quiero cotizar un proyecto por volumen (varios equipos).")}`}
            target="_blank"
            rel="noopener"
            onClick={() => trackWhatsappClick("bulk_banner")}
            className="group inline-flex items-center justify-center gap-4 bg-primary text-background font-mono text-sm tracking-widest px-8 py-5 hover:bg-primary-hover transition-colors font-semibold whitespace-nowrap w-fit"
          >
            COTIZAR PROYECTO
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

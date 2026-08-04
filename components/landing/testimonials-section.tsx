import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function TestimonialsSection() {
  return (
    <section id="testimonios" data-cursor-zone className="relative border-t border-border scroll-mt-[88px]">
      <ScrollReveal className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <span className="sys-tag mb-6 block">TESTIMONIO VERIFICADO</span>

        <div className="border border-border bg-card relative overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_300px]">
            <div className="p-8 lg:p-14">
              <svg viewBox="0 0 32 24" className="w-9 h-9 text-primary/40 mb-6" fill="currentColor" aria-hidden="true">
                <path d="M0 24V13.5C0 6 4.5 1 12 0l1.5 3C8 4.5 6 7.5 6 11h6v13H0zm18 0V13.5C18 6 22.5 1 30 0l1.5 3C26 4.5 24 7.5 24 11h6v13H18z" />
              </svg>
              <blockquote className="font-display text-2xl lg:text-4xl leading-[1.2] text-foreground tracking-tight">
                El servicio que ofrece OMNI COMUNICACIONES es de primera calidad.
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-green inline-block" />
                <div>
                  <div className="font-mono text-xs tracking-widest text-foreground">GERENCIA GENERAL</div>
                  <div className="font-mono text-[0.625rem] text-muted-foreground tracking-widest mt-0.5">
                    COMSEG CÍA. LTDA. — SEGURIDAD Y GUARDIANÍA
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t lg:border-t-0 lg:border-l border-border flex items-center justify-center p-10 bg-foreground/[0.03]">
              <Image
                src="/testimonials/comseg-logo.png"
                alt="COMSEG CÍA. LTDA. — Seguridad y Guardianía"
                width={328}
                height={92}
                className="w-full max-w-[210px] h-auto"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

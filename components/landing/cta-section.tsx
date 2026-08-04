"use client";

import { useEffect, useRef, useState } from "react";
import { trackWhatsappClick } from "@/lib/analytics";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ConvergeText } from "@/components/ui/converge-text";
import { ContactFormModal } from "./contact-form-modal";

function DotWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number;
    let t = 0;
    const SPACING = 28;
    const DOT_R = 1.5;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / SPACING) + 1;
      const rows = Math.ceil(canvas.height / SPACING) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const bx = col * SPACING;
          const by = row * SPACING;
          const wave = Math.sin(col * 0.35 + row * 0.35 - t * 2.2);
          const dy = wave * 5;
          const alpha = 0.06 + Math.abs(wave) * 0.22;

          ctx.beginPath();
          ctx.arc(bx, by + dy, DOT_R, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(33,150,243,${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      t += 0.016;
      if (running) raf = requestAnimationFrame(draw);
    };

    let running = false;
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

export function CtaSection() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section id="contacto" className="relative border-t border-border scroll-mt-[88px]">
      <ScrollReveal className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div data-cursor-zone className="border border-border relative overflow-hidden my-12 lg:my-16">
          <DotWaveCanvas />

          <div className="absolute top-0 left-0 w-16 h-16 border-r border-b border-primary/30" />
          <div className="absolute top-0 right-0 w-16 h-16 border-l border-b border-primary/30" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-r border-t border-primary/30" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-l border-t border-primary/30" />

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(33,150,243,0.04) 0%, transparent 70%)" }}
          />

          <div className="relative z-10 px-8 lg:px-20 py-16 lg:py-24 text-center">
            <div className="flex items-center justify-center gap-3 mb-10">
              <span className="status-pulse w-2 h-2 rounded-full bg-green inline-block" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-green">CANALES DISPONIBLES · LISTOS PARA COTIZAR</span>
            </div>

            <h2 className="font-display text-[clamp(2.5rem,9vw,7rem)] leading-[0.88] tracking-tight uppercase mb-4">
              <ConvergeText text="TU OPERACIÓN" className="text-foreground" />
              <ConvergeText text="MERECE" className="text-primary" startDelay={0.08} />
              <ConvergeText text="SEÑAL CLARA." className="text-foreground" startDelay={0.16} />
            </h2>

            <p className="font-mono text-sm text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
              Cuéntanos cuántos equipos necesitas y para qué tipo de operación — te armamos
              una cotización a la medida en menos de 24 horas.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/593996590777"
                target="_blank"
                rel="noopener"
                onClick={() => trackWhatsappClick("cta_banner")}
                className="group inline-flex items-center gap-4 bg-primary text-background font-mono text-sm tracking-widest px-8 py-5 hover:bg-primary-hover transition-colors font-semibold"
              >
                ESCRIBIR AL +593 99 659 0777
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                className="group inline-flex items-center gap-4 border border-border-bright text-muted-foreground font-mono text-sm tracking-widest px-8 py-5 hover:border-primary/40 hover:text-primary transition-colors"
              >
                ENVIAR CORREO
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-8 mt-10 flex-wrap">
              {[
                { v: "20", l: "años de trayectoria" },
                { v: "13+", l: "clientes corporativos" },
                { v: "2 AÑOS", l: "garantía en profesionales" },
                { v: "OFICIAL", l: "Motorola, Kenwood e ICOM" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-display text-2xl text-primary">{s.v}</div>
                  <div className="font-mono text-[0.625rem] text-muted-foreground tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  );
}

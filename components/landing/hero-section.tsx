"use client";

import { useEffect, useState } from "react";
import { SignalNetworkCanvas } from "./signal-network-canvas";
import { trackWhatsappClick, trackCatalogView } from "@/lib/analytics";
import { ConvergeText } from "@/components/ui/converge-text";

const VERBS = ["CONECTAN", "RESISTEN", "ALCANZAN", "RESPONDEN", "TRANSMITEN"];

export function HeroSection() {
  const [verbIdx, setVerbIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  useEffect(() => {
    const id = setInterval(() => setVerbIdx((v) => (v + 1) % VERBS.length), 640);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" data-cursor-zone className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg pt-[88px]">
      {/* Signal network canvas — full-bleed, reacts to the cursor across the whole hero */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <SignalNetworkCanvas className="w-full h-full" />
      </div>
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(5,7,13,0.55) 0%, rgba(5,7,13,0.85) 65%, rgba(5,7,13,0.96) 100%)" }}
      />

      <div className="relative z-20 max-w-[1100px] mx-auto px-6 lg:px-12 py-20 lg:py-28 w-full text-center flex flex-col items-center">
        <div className={`transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <p className="font-mono text-[11px] tracking-[0.2em] text-primary mb-4">
            — OMNI COMUNICACIONES · RADIOCOMUNICACIÓN PROFESIONAL
          </p>

          <h1 className="sr-only">
            Radios que conectan, resisten, alcanzan, responden y transmiten sin límites.
          </h1>

          <div aria-hidden="true">
            <ConvergeText
              text="RADIOS QUE"
              trigger="mount"
              startDelay={0.15}
              className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.88] tracking-tight text-foreground uppercase"
            />

            <div className="relative overflow-hidden h-[clamp(3rem,10vw,8rem)] leading-[0.88] flex justify-center">
              <div
                key={verbIdx}
                className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.88] tracking-tight text-primary uppercase absolute inset-0 flex justify-center"
                style={{ animation: "fade-up 0.1s ease forwards" }}
              >
                {VERBS[verbIdx]}
              </div>
            </div>

            <ConvergeText
              text="SIN LÍMITES."
              trigger="mount"
              startDelay={0.45}
              className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.88] tracking-tight uppercase text-foreground"
            />
          </div>
        </div>

        <div className={`mt-14 flex flex-col items-center transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
            Distribuidores oficiales de radios Motorola, Kenwood e Icom, además de equipos POC RugGear
            con cobertura celular 4G/LTE. Equipamos operaciones que no pueden permitirse un
            silencio en la línea.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8 w-fit">
            <a
              href="#semiprofesionales"
              onClick={() => trackCatalogView("hero_cta")}
              className="group inline-flex items-center gap-8 bg-primary text-background font-mono text-sm tracking-widest px-6 py-4 hover:bg-primary-hover transition-colors font-semibold whitespace-nowrap"
            >
              VER CATÁLOGO
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://wa.me/593996590777"
              target="_blank"
              rel="noopener"
              onClick={() => trackWhatsappClick("hero_phone_link")}
              className="group inline-flex items-center gap-8 border border-border text-foreground font-mono text-sm tracking-widest px-6 py-4 hover:border-primary/40 hover:text-primary transition-colors whitespace-nowrap"
            >
              +593 99 659 0777
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="flex items-center gap-2.5 mt-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green inline-block" />
            <span className="font-mono text-[0.625rem] text-muted-foreground tracking-wide">
              20 AÑOS EQUIPANDO EMPRESAS LÍDERES EN ECUADOR
            </span>
          </div>
        </div>
      </div>

      {/* Bottom ticker */}
      <div className={`absolute bottom-0 left-0 right-0 border-t border-border py-5 transition-all duration-700 delay-700 ${visible ? "opacity-100" : "opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="marquee-fast whitespace-nowrap flex gap-16">
            {[...Array(2)].map((_, rep) => (
              <span key={rep} className="inline-flex items-center gap-16">
                {[
                  "MOTOROLA · DIGITAL DMR",
                  "KENWOOD · DIGITAL / ANÁLOGO",
                  "RUGGEAR · COBERTURA POC 4G/LTE",
                  "SOPORTE TÉCNICO LOCAL",
                  "GARANTÍA HASTA 2 AÑOS",
                  "PROGRAMACIÓN GRATIS",
                  "20 AÑOS DE TRAYECTORIA",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-3 font-mono text-[0.625rem] tracking-[0.2em] text-muted-foreground">
                    <span className="w-1 h-1 bg-primary inline-block shrink-0" />
                    {item}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ui/scroll-reveal";
import { ConvergeText } from "@/components/ui/converge-text";

function AnimCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const dur = 1400;
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setN(Math.floor(ease * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="font-display text-[clamp(2rem,5vw,4rem)] leading-none tracking-tight text-foreground tabular-nums">
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </div>
  );
}

const METRICS = [
  { end: 20, suffix: "", label: "AÑOS DE TRAYECTORIA", sub: "como aliado tecnológico en Ecuador" },
  { end: 30, suffix: "+", label: "CLIENTES CORPORATIVOS", sub: "activos a nivel nacional" },
  { end: 4, suffix: "", label: "MARCAS OFICIALES", sub: "Motorola, Kenwood, ICOM, RugGear" },
  { end: 0, suffix: "", label: "GARANTÍA ESTÁNDAR", sub: "en profesionales y POC · extendida disponible", display: "2 AÑOS" },
];

const CLIENTS = [
  "PRONACA", "TIA", "DENMAR", "CORPORACIÓN EL ROSADO", "LIDERMAN", "CAJAMARCA",
  "EXPALSA", "GRUPO GPS", "TESSAROSES", "STAR ROSES", "HOTEL MARRIOTT", "HOTEL MAMA CUCHARA", "COMSEG",
];

export function MetricsSection() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("es-EC", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="metricas" className="relative border-t border-border scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <ScrollReveal className="border-b border-border py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <span className="sys-tag mb-3 block">TRAYECTORIA</span>
            <h2 className="font-display text-6xl lg:text-8xl leading-[0.88] tracking-tight">
              <ConvergeText text="CONFIANZA" className="text-foreground" />
              <ConvergeText
                text="QUE SE CONSTRUYE"
                startDelay={0.08}
                style={{ WebkitTextStroke: "1px #758599", color: "transparent" }}
              />
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-[0.625rem] text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-green inline-block animate-pulse" />
            <span className="text-green">HOY</span>
            <span className="tabular-nums">{time}</span>
          </div>
        </ScrollReveal>

        <ScrollStagger className="grid grid-cols-2 lg:grid-cols-4 border-b border-border">
          {METRICS.map((m) => (
            <ScrollStaggerItem
              key={m.label}
              className="border-r border-border last:border-r-0 border-b lg:border-b-0 p-6 lg:p-8 overflow-hidden"
            >
              {m.display ? (
                <div className="font-display text-[clamp(2rem,5vw,4rem)] leading-none tracking-tight text-foreground tabular-nums">
                  {m.display}
                </div>
              ) : (
                <AnimCounter end={m.end} suffix={m.suffix} />
              )}
              <div className="mt-3 font-mono text-[0.625rem] text-primary tracking-[0.18em]">{m.label}</div>
              <div className="mt-1 font-mono text-[0.625rem] text-muted-foreground">{m.sub}</div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>

        {/* Real client trust strip */}
        <div className="py-8">
          <span className="font-mono text-[0.625rem] text-muted-foreground tracking-widest uppercase block mb-5">
            Empresas que confían en nosotros
          </span>
          <ScrollStagger className="flex flex-wrap gap-x-10 gap-y-4">
            {CLIENTS.map((c) => (
              <ScrollStaggerItem key={c} className="font-display text-lg lg:text-xl text-muted-foreground tracking-wide">
                {c}
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </div>
    </section>
  );
}

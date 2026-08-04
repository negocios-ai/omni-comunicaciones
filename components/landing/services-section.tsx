"use client";

import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ui/scroll-reveal";
import { ConvergeText } from "@/components/ui/converge-text";

const SERVICES = [
  {
    id: "01",
    tag: "MANTENIMIENTO",
    title: "PREVENTIVO Y\nCORRECTIVO",
    desc: "Respaldo técnico continuo para que tu flota de radios nunca esté fuera de servicio cuando más la necesitas.",
  },
  {
    id: "02",
    tag: "REGULATORIO",
    title: "GESTIÓN DE\nFRECUENCIAS",
    desc: "Ingeniería y trámites para la autorización de frecuencias ante el organismo regulador — sin dolores de cabeza para tu equipo.",
  },
  {
    id: "03",
    tag: "INFRAESTRUCTURA",
    title: "TORRES Y\nREPETIDORAS",
    desc: "Instalación de torres, casetas, pararrayos y sistemas de puesta a tierra para ampliar tu cobertura real en campo.",
  },
  {
    id: "04",
    tag: "IMPORTACIÓN DIRECTA",
    title: "SIN\nINTERMEDIARIOS",
    desc: "Importadores directos de Motorola, Kenwood, ICOM y RugGear — mejores tiempos de entrega y precio.",
  },
];

function ServiceRow({ s }: { s: (typeof SERVICES)[0] }) {
  return (
    <div className="group border-b border-border row-hover">
      <div className="grid grid-cols-[56px_1fr] lg:grid-cols-[56px_260px_1fr] gap-0">
        <div className="border-r border-border p-5 flex items-start pt-6">
          <span className="font-mono text-[0.625rem] text-muted-foreground tracking-widest">{s.id}</span>
        </div>
        <div className="border-r border-border p-6 flex flex-col gap-3">
          <span className="sys-tag text-[0.625rem]">{s.tag}</span>
          <h3 className="font-display text-2xl lg:text-3xl leading-[0.95] text-foreground group-hover:text-primary transition-colors duration-300 whitespace-pre-line">
            {s.title}
          </h3>
        </div>
        <div className="col-span-2 lg:col-span-1 p-6 flex items-center">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">{s.desc}</p>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="servicios" className="relative border-t border-border scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <ScrollReveal className="grid grid-cols-[56px_1fr] lg:grid-cols-[56px_260px_1fr] border-b border-border">
          <div className="border-r border-border p-5" />
          <div className="col-span-2 lg:col-span-2 p-6">
            <span className="sys-tag mb-4 block">MÁS QUE UNA VENTA</span>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.88] tracking-tight">
              <ConvergeText text="SERVICIOS TÉCNICOS" className="text-foreground" />
              <ConvergeText
                text="ESPECIALIZADOS"
                startDelay={0.08}
                style={{ WebkitTextStroke: "1px #758599", color: "transparent" }}
              />
            </h2>
          </div>
        </ScrollReveal>

        <ScrollStagger>
          {SERVICES.map((s) => (
            <ScrollStaggerItem key={s.id}>
              <ServiceRow s={s} />
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}

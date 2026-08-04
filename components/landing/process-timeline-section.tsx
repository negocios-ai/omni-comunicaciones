import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ui/scroll-reveal";
import { ConvergeText } from "@/components/ui/converge-text";
import { PROCESS_STEPS, type ProcessStep } from "./process-timeline-data";

const COLOR_CLASSES: Record<ProcessStep["colorGroup"], { text: string; border: string; bgSoft: string; bg: string }> = {
  primary: { text: "text-primary", border: "border-primary/40", bgSoft: "bg-primary/10", bg: "bg-primary" },
  amber: { text: "text-amber", border: "border-amber/40", bgSoft: "bg-amber/10", bg: "bg-amber" },
  green: { text: "text-green", border: "border-green/40", bgSoft: "bg-green/10", bg: "bg-green" },
};

const TOTAL = PROCESS_STEPS.length;
const LIST_LABEL = `Proceso de compra en ${TOTAL} pasos`;

export function ProcessTimelineSection() {
  return (
    <section id="como-comprar" data-cursor-zone className="relative border-t border-border scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <ScrollReveal className="py-10">
          <span className="sys-tag mb-4 block">PROCESO · DE LA CONSULTA A TU RADIO</span>
          <h2 className="font-display text-5xl lg:text-7xl leading-[0.88] tracking-tight">
            <ConvergeText text="CÓMO" className="text-foreground" />
            <ConvergeText text="COMPRAR" startDelay={0.08} style={{ WebkitTextStroke: "1px #758599", color: "transparent" }} />
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            Del primer mensaje al soporte post-venta, sin fricciones ni sorpresas.
          </p>
        </ScrollReveal>

        {/* Desktop: compact horizontal timeline — small icons + connector
            hairlines, minimal copy per step so 9 steps read as one clean
            strip instead of a wall of text. Connector is a pair of flex-1
            hairlines flanking each icon, colored by the outgoing step's
            group so it transitions exactly at each group boundary. */}
        <ScrollStagger
          role="list"
          aria-label={LIST_LABEL}
          className="hidden lg:flex lg:items-start pb-14"
        >
          {PROCESS_STEPS.map((step, i) => {
            const c = COLOR_CLASSES[step.colorGroup];
            const prev = i > 0 ? COLOR_CLASSES[PROCESS_STEPS[i - 1].colorGroup] : null;
            const Icon = step.icon;
            return (
              <ScrollStaggerItem
                key={step.id}
                role="listitem"
                aria-label={`Paso ${i + 1} de ${TOTAL}: ${step.title}`}
                className="flex-1 flex flex-col items-center text-center px-1.5"
              >
                <div className="flex items-center w-full">
                  <div aria-hidden="true" className={`flex-1 h-px ${i === 0 ? "opacity-0" : prev!.bg}`} />
                  <div
                    className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5 ${c.border} ${c.bgSoft} ${c.text}`}
                  >
                    <Icon />
                  </div>
                  <div aria-hidden="true" className={`flex-1 h-px ${i === TOTAL - 1 ? "opacity-0" : c.bg}`} />
                </div>
                <span aria-hidden="true" className="mt-2 font-mono text-[9px] tracking-widest text-muted-foreground/70">
                  {`0${i + 1}`}
                </span>
                <h3 className={`mt-0.5 font-display text-sm leading-tight ${c.text}`}>{step.title}</h3>
                <p className="mt-1 text-[11px] text-muted-foreground leading-snug line-clamp-2">{step.description}</p>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>

        {/* Mobile: vertical stack. Icon is w-11 (44px), so its horizontal
            center sits at 22px — the connector line and content padding
            both key off that value. */}
        <ScrollStagger role="list" aria-label={LIST_LABEL} className="flex flex-col lg:hidden pb-12">
          {PROCESS_STEPS.map((step, i) => {
            const c = COLOR_CLASSES[step.colorGroup];
            const isLast = i === TOTAL - 1;
            const Icon = step.icon;
            return (
              <ScrollStaggerItem
                key={step.id}
                role="listitem"
                aria-label={`Paso ${i + 1} de ${TOTAL}: ${step.title}`}
                className={`relative pl-[60px] ${isLast ? "" : "pb-6"}`}
              >
                {!isLast && <div aria-hidden="true" className={`absolute left-[22px] top-11 bottom-0 w-px ${c.bg}`} />}
                <div
                  className={`absolute left-0 top-0 w-11 h-11 rounded-full border flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5 ${c.border} ${c.bgSoft} ${c.text}`}
                >
                  <Icon />
                </div>
                <span aria-hidden="true" className="font-mono text-[9px] tracking-widest text-muted-foreground/70">
                  {`PASO 0${i + 1}`}
                </span>
                <h3 className={`mt-0.5 font-display text-lg ${c.text}`}>{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>
      </div>
    </section>
  );
}

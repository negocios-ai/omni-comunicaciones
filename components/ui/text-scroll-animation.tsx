"use client";

import { motion } from "framer-motion";
import { Signal, ShieldCheck, Wrench, Truck, PackageCheck, type LucideIcon } from "lucide-react";
import { ConvergeText } from "@/components/ui/converge-text";

/**
 * Capability strip. The character-convergence effect used here (ConvergeText)
 * is the same one used across every section heading on the site — this block
 * no longer scroll-jacks its own dedicated 130vh slab; it behaves like every
 * other section and just adds the icon row underneath.
 */

const CAPABILITIES: { icon: LucideIcon; label: string }[] = [
  { icon: Signal, label: "COBERTURA 4G/LTE" },
  { icon: ShieldCheck, label: "GARANTÍA OFICIAL" },
  { icon: Wrench, label: "SOPORTE TÉCNICO" },
  { icon: Truck, label: "ENTREGA NACIONAL" },
  { icon: PackageCheck, label: "IMPORTACIÓN DIRECTA" },
];

const iconVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export function BrandRevealScroll() {
  return (
    <section
      data-cursor-zone
      className="relative min-h-screen flex flex-col items-center justify-center gap-16 overflow-hidden border-t border-border bg-background grid-bg py-24"
    >
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(33,150,243,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        <ConvergeText
          text="LISTOS PARA CUALQUIER OPERACIÓN"
          className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-[1.05] text-foreground"
          emphasizeWords={1}
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-wrap items-center justify-center gap-10 md:gap-14 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}
      >
        {CAPABILITIES.map((c) => (
          <motion.div key={c.label} variants={iconVariants} className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 border border-border flex items-center justify-center bg-card">
              <c.icon className="w-6 h-6 text-primary" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <span className="font-mono text-[0.625rem] tracking-widest text-muted-foreground text-center max-w-[9ch]">
              {c.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

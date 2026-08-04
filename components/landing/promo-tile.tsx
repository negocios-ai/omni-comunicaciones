import { trackWhatsappClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "593996590777";

function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export type PromoVariant = "advisory" | "support" | "programming" | "bulk";

function TileShell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative bg-card border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors duration-300 h-full flex flex-col p-6">
      <span className="font-mono text-[0.625rem] tracking-widest text-primary">{eyebrow}</span>
      <h3 className="mt-3 font-display text-2xl leading-[0.95] text-foreground tracking-tight">{title}</h3>
      {children}
    </div>
  );
}

function BulkTile() {
  const rows = [
    { qty: "5-9 unidades", off: "-8%" },
    { qty: "10-24 unidades", off: "-15%" },
    { qty: "25+ unidades", off: "PRECIO ESPECIAL" },
  ];
  return (
    <TileShell eyebrow="MAYOREO" title="COMPRA AL POR MAYOR">
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        Descuentos progresivos desde 5 unidades. Cotización personalizada para empresas y flotas.
      </p>
      <ul className="mt-5 border-t border-border pt-4 space-y-2">
        {rows.map((r) => (
          <li key={r.qty} className="flex justify-between gap-4 font-mono text-[11px]">
            <span className="text-muted-foreground">{r.qty}</span>
            <span className="text-primary text-right">{r.off}</span>
          </li>
        ))}
      </ul>
      <a
        href={waLink("Hola, quiero una cotización mayorista (5+ unidades)")}
        target="_blank"
        rel="noopener"
        onClick={() => trackWhatsappClick("promo_tile_bulk")}
        className="mt-auto pt-4 inline-flex items-center gap-2 min-h-11 font-mono text-[0.625rem] tracking-widest text-primary hover:underline"
      >
        SOLICITAR COTIZACIÓN MAYORISTA
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    </TileShell>
  );
}

function ProgrammingTile() {
  return (
    <TileShell eyebrow="INCLUIDO EN TODOS LOS EQUIPOS" title="PROGRAMACIÓN GRATIS">
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        Todos nuestros equipos incluyen programación de frecuencias sin costo adicional, configurados y listos para
        operar desde que los recibes.
      </p>
      <a
        href="#servicios"
        className="mt-auto pt-4 inline-flex items-center gap-2 min-h-11 font-mono text-[0.625rem] tracking-widest text-primary hover:underline"
      >
        VER DETALLES
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    </TileShell>
  );
}

function SupportTile() {
  const badges = ["GARANTÍA OFICIAL", "SOPORTE TÉCNICO", "ENVÍO NACIONAL"];
  return (
    <TileShell eyebrow="RESPALDO LOCAL" title="20 AÑOS DE TRAYECTORIA">
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        Soporte técnico local, repuestos disponibles y garantía respaldada en Ecuador.
      </p>
      <div className="mt-auto pt-4 flex flex-wrap gap-2">
        {badges.map((b) => (
          <span key={b} className="font-mono text-[0.625rem] tracking-widest text-silver border border-border px-2 py-1">
            {b}
          </span>
        ))}
      </div>
    </TileShell>
  );
}

function AdvisoryTile() {
  return (
    <TileShell eyebrow="¿DUDAS?" title="¿NO SABES QUÉ EQUIPO NECESITAS?">
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        Cuéntanos tu operación y te recomendamos el modelo correcto, sin compromiso.
      </p>
      <a
        href={waLink("Hola, no estoy seguro qué equipo necesito. ¿Me pueden asesorar?")}
        target="_blank"
        rel="noopener"
        onClick={() => trackWhatsappClick("promo_tile_advisory")}
        className="mt-auto pt-4 inline-flex items-center gap-2 min-h-11 bg-primary text-background px-4 font-mono text-[0.625rem] tracking-widest font-semibold hover:bg-primary-hover transition-colors w-fit"
      >
        HABLAR CON UN ASESOR
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    </TileShell>
  );
}

const VARIANTS: Record<PromoVariant, React.ComponentType> = {
  advisory: AdvisoryTile,
  support: SupportTile,
  programming: ProgrammingTile,
  bulk: BulkTile,
};

export function PromoTile({ variant }: { variant: PromoVariant }) {
  const Variant = VARIANTS[variant];
  return <Variant />;
}

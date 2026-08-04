"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { trackWhatsappClick } from "@/lib/analytics";

const LINKS = {
  CATÁLOGO: [
    { name: "Domésticas", href: "#domesticas" },
    { name: "Semiprofesionales", href: "#semiprofesionales" },
    { name: "Profesionales", href: "#profesionales" },
    { name: "Equipos POC", href: "#poc" },
    { name: "Liquidación", href: "#otros-productos" },
  ],
  EMPRESA: [
    { name: "Inicio", href: "#top" },
    { name: "Servicios técnicos", href: "#servicios" },
    { name: "Cómo comprar", href: "#como-comprar" },
    { name: "Métricas", href: "#metricas" },
    { name: "Contacto", href: "#contacto" },
  ],
  MARCAS: [
    { name: "Motorola", href: "#profesionales" },
    { name: "Kenwood", href: "#profesionales" },
    { name: "RugGear", href: "#poc", badge: "POC" },
    { name: "ICOM", href: "#domesticas" },
  ],
  CONTACTO: [
    { name: "+593 99 659 0777", href: "https://wa.me/593996590777" },
    { name: "negocios@omnitronec.com", href: "mailto:negocios@omnitronec.com" },
    { name: "Ecuador", href: "#" },
  ],
  LEGAL: [
    { name: "Política de privacidad", href: "/privacidad" },
    { name: "Términos y condiciones", href: "/terminos" },
  ],
};

export function FooterSection() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("es-EC", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="border-b border-border py-12 grid lg:grid-cols-[1fr_2fr] gap-10">
          <div>
            <a href="#top" className="inline-flex items-center gap-3 mb-5 group">
              <Image src="/logo-omni.png" alt="OMNI COMUNICACIONES" width={788} height={215} className="h-12 w-auto" />
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs font-mono">
              20 años de trayectoria como aliado tecnológico en radiocomunicación profesional,
              identificación y códigos de barras, y sistemas de seguridad para empresas en Ecuador.
            </p>
            <p className="mt-3 font-mono text-[11px] text-muted-foreground">
              Envío a nivel nacional vía Servientrega o cooperativa.
            </p>
            <div className="flex gap-5 mt-6">
              <a
                href="https://wa.me/593996590777"
                target="_blank"
                rel="noopener"
                onClick={() => trackWhatsappClick("footer_social")}
                className="font-mono text-[0.625rem] tracking-widest text-muted-foreground hover:text-primary transition-colors inline-flex items-center py-2"
              >
                WHATSAPP ↗
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {Object.entries(LINKS).map(([section, links]) => (
              <div key={section}>
                <h3 className="font-mono text-[0.625rem] tracking-[0.2em] text-primary mb-5">{section}</h3>
                <ul className="-my-1.5">
                  {links.map((l) => (
                    <li key={l.name}>
                      <a
                        href={l.href}
                        onClick={l.href.includes("wa.me") ? () => trackWhatsappClick("footer_contact_list") : undefined}
                        className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2 py-2"
                      >
                        {l.name}
                        {"badge" in l && l.badge && (
                          <span className="text-[0.625rem] border border-primary/30 text-primary px-1.5 py-0.5 tracking-wider">
                            {l.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[0.625rem] text-muted-foreground">
            © 2026 OMNI COMUNICACIONES. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[0.625rem] text-muted-foreground tabular-nums">{time} ECT</span>
            <div className="flex items-center gap-2">
              <span className="status-pulse w-1.5 h-1.5 rounded-full bg-green inline-block" />
              <span className="font-mono text-[0.625rem] text-green tracking-widest">CANALES_OPERATIVOS</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

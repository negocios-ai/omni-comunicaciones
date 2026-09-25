"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { trackWhatsappClick } from "@/lib/analytics";

const EQUIPOS_LINKS = [
  { name: "Domésticas", href: "/#domesticas" },
  { name: "Semiprofesionales", href: "/#semiprofesionales" },
  { name: "Profesionales", href: "/#profesionales" },
  { name: "Equipos POC", href: "/#poc" },
];

const navLinks = [
  { name: "SERVICIOS", href: "/#servicios" },
  { name: "MÉTRICAS", href: "/#metricas" },
  { name: "CÓMO COMPRAR", href: "/#como-comprar" },
  { name: "LIQUIDACIÓN", href: "/#otros-productos" },
  { name: "BLOG", href: "/blog" },
  { name: "CONTACTO", href: "/#contacto" },
];

// Flat version for the mobile menu, which has room to just list everything.
const mobileLinks = [...EQUIPOS_LINKS.map((l) => ({ name: l.name.toUpperCase(), href: l.href })), ...navLinks];

function EquiposDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1 font-mono text-[10px] xl:text-[11px] tracking-[0.1em] xl:tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap"
      >
        EQUIPOS
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`absolute left-0 top-full mt-3 w-56 bg-background border border-border shadow-xl transition-all duration-200 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        {EQUIPOS_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setOpen(false)}
            className="block px-4 py-3 font-mono text-[11px] tracking-widest text-muted-foreground hover:text-primary hover:bg-card transition-colors border-b border-border last:border-b-0"
          >
            {link.name.toUpperCase()}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("es-EC", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
      >
        {/* Top status bar */}
        <div className="border-b border-border px-6 lg:px-12 h-8 flex items-center justify-between">
          <span className="font-mono text-[0.625rem] text-muted-foreground tracking-widest uppercase">
            SYS:OMNI-COMMS &nbsp;/&nbsp; 20 AÑOS DE TRAYECTORIA
          </span>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="https://wa.me/593996590777"
              target="_blank"
              rel="noopener"
              onClick={() => trackWhatsappClick("nav_top_bar_phone")}
              className="font-mono text-[0.625rem] text-muted-foreground hover:text-primary tracking-widest transition-colors"
            >
              +593 99 659 0777
            </a>
            <span className="font-mono text-[0.625rem] text-muted-foreground">
              <span className="text-green">●</span>&nbsp;CANALES_OPERATIVOS
            </span>
            <span className="font-mono text-[0.625rem] text-muted-foreground tabular-nums">{time} ECT</span>
          </div>
        </div>

        {/* Main nav */}
        <div className="px-6 lg:px-12 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/#top" className="flex items-center gap-3 group shrink-0">
            <Image src="/logo-omni.png" alt="OMNI COMUNICACIONES" width={788} height={215} priority className="h-8 sm:h-10 w-auto" />
            <span className="hidden 2xl:block font-mono text-[0.625rem] text-muted-foreground border-l border-border pl-3 ml-1 tracking-widest whitespace-nowrap">
              RADIOCOMUNICACIÓN PROFESIONAL
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 min-w-0">
            <EquiposDropdown />
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-[10px] xl:text-[11px] tracking-[0.1em] xl:tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden xl:flex items-center shrink-0">
            <a
              href="https://wa.me/593996590777"
              target="_blank"
              rel="noopener"
              onClick={() => trackWhatsappClick("nav_cta_button")}
              className="font-mono text-[11px] tracking-widest bg-primary text-background px-5 h-9 flex items-center hover:bg-primary-hover transition-colors font-semibold whitespace-nowrap"
            >
              COTIZAR →
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="xl:hidden text-foreground w-11 h-11 -mr-2.5 flex items-center justify-center shrink-0"
            aria-label="Alternar menú"
            aria-expanded={open}
            aria-controls="menu-movil"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu. inert while closed: it is only faded out, so without it
          keyboard and screen-reader users would still land on its links. */}
      <div
        id="menu-movil"
        inert={!open}
        className={`fixed inset-0 z-40 bg-background flex flex-col transition-opacity duration-300 xl:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "88px" }}
      >
        <div className="border-t border-border flex flex-col overflow-y-auto">
          {mobileLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`border-b border-border px-8 py-6 font-display text-3xl sm:text-4xl tracking-wider text-foreground hover:text-primary transition-all duration-300 flex items-center justify-between ${
                open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
            >
              {link.name}
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </a>
          ))}
        </div>
        <div className="mt-auto p-8 border-t border-border">
          <a
            href="https://wa.me/593996590777"
            target="_blank"
            rel="noopener"
            onClick={() => { setOpen(false); trackWhatsappClick("mobile_menu"); }}
            className="w-full block text-center font-mono text-sm tracking-widest bg-primary text-background py-5 font-semibold"
          >
            COTIZAR POR WHATSAPP →
          </a>
        </div>
      </div>
    </>
  );
}

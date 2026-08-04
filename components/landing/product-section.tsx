"use client";

import { useCallback, useEffect, useRef, useState, type Ref } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ProductItem } from "./catalog-data";
import { trackQuoteClick } from "@/lib/analytics";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ui/scroll-reveal";
import { ConvergeText } from "@/components/ui/converge-text";
import { ProductImageFrame } from "./product-image-frame";
import { PromoTile, type PromoVariant } from "./promo-tile";

const WHATSAPP_NUMBER = "593996590777";

function waLink(productName: string) {
  const text = encodeURIComponent(`Hola, quiero cotizar el ${productName}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Shared timing for the best-seller FLIP: the grid card's photo (FIRST) flies
 * as a cloned, position:absolute (document-space, portaled to <body>) element
 * to the spotlight banner's photo slot (LAST), then the banner content lands.
 * ProductCard and ProductSection both read these so the grid-photo
 * dim/restore stays in lockstep with the flight.
 *
 * Document-space (not viewport-fixed) matters: the flight is long enough
 * that the user is almost always still scrolling mid-flight. A fixed-position
 * clone would keep animating toward the banner's *old* viewport coordinates
 * while the banner itself keeps moving with the scroll — landing off-target.
 * Anchoring in document coordinates lets native scrolling carry the clone
 * along for free, so it always lands exactly on the real banner.
 */
const FLIGHT_DURATION = 1.05; // seconds — deliberate but not sluggish
const EASE_FLIP = [0.16, 1, 0.3, 1] as const; // the site's signature soft-decelerate curve
const POP_EASE = [0.34, 1.56, 0.64, 1] as const; // slight overshoot — a "pop" without literal bounce keyframes

interface LightboxState {
  name: string;
  images: string[];
  index: number;
  trigger: HTMLElement | null;
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

function ProductCard({
  item,
  onOpen,
  pulseCue,
  photoRef,
}: {
  item: ProductItem;
  onOpen: (imgIdx: number, trigger: HTMLElement) => void;
  pulseCue?: boolean;
  photoRef?: Ref<HTMLDivElement>;
}) {
  const [imgIdx, setImgIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const hasMultiple = item.images.length > 1;

  useEffect(() => {
    const el = imgWrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const step = (dir: 1 | -1) => {
    if (item.images.length === 0) return;
    setImgIdx((i) => (i + dir + item.images.length) % item.images.length);
  };

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !hasMultiple) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      step(dx < 0 ? 1 : -1);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onMouseMove={onMouseMove}
      className="group relative bg-card border-t-2 border-t-transparent hover:border-t-primary transition-colors duration-300 h-full flex flex-col"
    >
      {/* Pre-cue glow: fires once, right as the best-seller spotlight below is
          about to enter view. Animates opacity only (compositor-only, no
          repaint) over a static box-shadow instead of animating the
          box-shadow itself, which would force a repaint every frame. */}
      {pulseCue && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px z-20"
          style={{ boxShadow: "0 0 28px 4px rgba(33,150,243,0.5)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 0.65, 0] }}
          transition={{ duration: 1.3, times: [0, 0.25, 0.5, 0.75, 1], ease: "easeInOut" }}
        />
      )}
      {/* Spotlight that tracks the cursor */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(33,150,243,0.10), transparent 65%)",
        }}
      />
      {/* Image plate — pure white, matching the actual studio background
          baked into every product photo (measured directly from pixels:
          most source photos sit at ~230/255 white, one crop is literally
          255,255,255 — white is the only single color close to both).
          mix-blend-multiply was measured NOT reliably erasing the photo's
          background against a darker plate (the "blended" pixels came out
          LIGHTER than the plate itself, which is impossible for multiply —
          proof the blend wasn't taking effect in practice). Rather than
          depend on blend compositing behaving correctly, the plate just
          matches the photos' real background color directly instead. */}
      <div
        ref={imgWrapRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative aspect-[4/3] w-full shrink-0 bg-white shadow-[inset_0_0_0_1px_rgba(12,17,26,0.08)] overflow-hidden"
      >
        {/* Separate opacity layer (not the Image itself) so the lift-off dim never
            fights the CSS `signal-reveal` keyframes already animating the photo. */}
        <motion.div
          ref={photoRef}
          className="absolute inset-0 z-0"
          animate={pulseCue ? { opacity: [1, 1, 0.12, 0.12, 1] } : undefined}
          transition={pulseCue ? { duration: FLIGHT_DURATION, times: [0, 0.06, 0.2, 0.85, 1], ease: "easeInOut" } : undefined}
        >
          {item.images.length > 0 ? (
            <button
              ref={openBtnRef}
              type="button"
              onClick={() => openBtnRef.current && onOpen(imgIdx, openBtnRef.current)}
              aria-label={`Ampliar foto de ${item.name}`}
              className="absolute inset-0 w-full h-full cursor-zoom-in"
            >
              <ProductImageFrame
                images={item.images}
                imgIdx={imgIdx}
                alt={item.name}
                sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                className={`object-contain p-7 transition-transform duration-500 group-hover:scale-105 ${revealed ? "signal-reveal" : "opacity-0"}`}
              />
            </button>
          ) : (
            <ProductImageFrame images={item.images} alt={item.name} sizes="" />
          )}
        </motion.div>

        <span className="pointer-events-none absolute top-3 left-3 font-mono text-[0.625rem] tracking-widest text-muted-foreground">
          {item.id}
        </span>
        <span className="pointer-events-none absolute top-3 right-3 font-mono text-[0.625rem] tracking-widest text-card bg-foreground/90 border border-card/15 px-2 py-1">
          {item.tag}
        </span>
        {item.featured && (
          <motion.span
            initial={{ opacity: 0, scale: 0, rotate: -18 }}
            animate={
              revealed
                ? { opacity: 1, scale: [0, 1.22, 0.94, 1], rotate: 0 }
                : { opacity: 0, scale: 0, rotate: -18 }
            }
            transition={{ duration: 0.65, delay: 0.35, times: [0, 0.55, 0.8, 1], ease: "easeOut" }}
            className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 font-mono text-[0.625rem] tracking-widest text-[#0c4a7a] border border-[#0c4a7a]/30 bg-foreground/90 px-2 py-1 shadow-[0_0_0_0_rgba(33,150,243,0.5)]"
            style={{ transformOrigin: "left bottom" }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-primary inline-block"
              animate={revealed ? { scale: [1, 1.5, 1], opacity: [1, 0.6, 1] } : undefined}
              transition={{ duration: 1.4, delay: 1.1, repeat: Infinity, ease: "easeInOut" }}
            />
            MÁS VENDIDO
          </motion.span>
        )}

        {hasMultiple && (
          <>
            {/* Always tappable on touch (44px, visible); desktop: hidden until hover */}
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Foto anterior"
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-foreground/80 bg-card/40 [@media(hover:hover)]:bg-transparent [@media(hover:hover)]:text-card/0 [@media(hover:hover)]:group-hover:text-card [@media(hover:hover)]:group-hover:bg-foreground/90 transition-colors"
            >
              <ChevronIcon dir="left" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Foto siguiente"
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-foreground/80 bg-card/40 [@media(hover:hover)]:bg-transparent [@media(hover:hover)]:text-card/0 [@media(hover:hover)]:group-hover:text-card [@media(hover:hover)]:group-hover:bg-foreground/90 transition-colors"
            >
              <ChevronIcon dir="right" />
            </button>
            <div className="pointer-events-none absolute bottom-3 right-3 z-10 flex gap-1.5">
              {item.images.map((_, i) => (
                <span key={i} className={`block w-1.5 h-1.5 ${i === imgIdx ? "bg-primary" : "bg-card/40"}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 border-t border-border flex flex-col flex-1">
        <h3 className="font-display text-2xl leading-[0.95] text-foreground tracking-tight">
          {item.name}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{item.idealFor}</p>

        <ul className="mt-5 border-t border-border pt-4 space-y-2">
          {item.specs.map((s) => (
            <li key={s.label} className="flex justify-between gap-4 font-mono text-[11px]">
              <span className="text-muted-foreground">{s.label}</span>
              <span className="text-silver text-right">{s.value}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div>
            <div className="font-display text-xl text-foreground">{item.price}</div>
            <div className="font-mono text-[0.625rem] text-muted-foreground mt-0.5">{item.priceNote}</div>
          </div>
          <a
            href={waLink(item.name)}
            target="_blank"
            rel="noopener"
            onClick={() => trackQuoteClick("product_card", item.name)}
            className="inline-flex items-center gap-2 min-h-11 border border-border group-hover:border-primary/50 px-4 font-mono text-[0.625rem] tracking-widest text-silver group-hover:text-primary transition-colors"
          >
            COTIZAR
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function Lightbox({
  state,
  onClose,
  onStep,
  onJump,
}: {
  state: LightboxState;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  onJump: (index: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (state.images.length > 1 && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      onStep(dx < 0 ? 1 : -1);
    }
  };

  useEffect(() => {
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowLeft") onStep(-1);
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      state.trigger?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Fotos de ${state.name}`}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center px-4"
      onClick={onClose}
    >
      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center border border-border text-silver hover:text-primary hover:border-primary/50 transition-colors"
      >
        ✕
      </button>

      <div className="absolute top-5 left-5 font-mono text-[0.625rem] tracking-widest text-muted-foreground">
        {state.name} — {state.index + 1}/{state.images.length}
      </div>

      <div
        className="relative w-full max-w-3xl aspect-[4/3] bg-white shadow-[inset_0_0_0_1px_rgba(12,17,26,0.08)]"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={state.images[state.index]}
          alt={state.name}
          fill
          sizes="(max-width: 767px) 100vw, 768px"
          className="object-contain p-10"
        />
      </div>

      {state.images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onStep(-1); }}
            aria-label="Foto anterior"
            className="absolute left-4 lg:left-10 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-border text-silver hover:text-primary hover:border-primary/50 transition-colors bg-card/60"
          >
            <ChevronIcon dir="left" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onStep(1); }}
            aria-label="Foto siguiente"
            className="absolute right-4 lg:right-10 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-border text-silver hover:text-primary hover:border-primary/50 transition-colors bg-card/60"
          >
            <ChevronIcon dir="right" />
          </button>
          <div className="mt-2 flex" onClick={(e) => e.stopPropagation()}>
            {state.images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir a foto ${i + 1}`}
                aria-current={i === state.index}
                onClick={() => onJump(i)}
                className="w-11 h-11 flex items-center justify-center"
              >
                <span className={`block w-1.5 h-1.5 ${i === state.index ? "bg-primary" : "bg-muted-foreground"}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Always 3 columns wide on desktop — incomplete last rows are filled with
// PromoTile instead of shrinking the column count, so the grid never leaves
// an empty gap and always shows off a marketing tile instead.
const GRID_COLS = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
const FILLER_ORDER: PromoVariant[] = ["advisory", "support", "programming", "bulk"];

export function ProductSection({
  id,
  catalogNumber,
  titleTop,
  titleBottom,
  tagline,
  items,
}: {
  id: string;
  catalogNumber: string;
  titleTop: string;
  titleBottom: string;
  tagline: string;
  items: ProductItem[];
}) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const reduceMotion = useReducedMotion();

  // FLIP refs: FIRST = the featured card's photo in the grid, LAST = the
  // spotlight banner's photo slot below. bannerRef triggers the sequence.
  const bannerRef = useRef<HTMLDivElement>(null);
  const gridPhotoRef = useRef<HTMLDivElement>(null);
  const bannerPhotoRef = useRef<HTMLDivElement>(null);
  const inView = useInView(bannerRef, { once: true, amount: 0.3 });

  type FlightRect = { top: number; left: number; width: number; height: number; dx: number; dy: number; sx: number; sy: number };
  const [flight, setFlight] = useState<FlightRect | null>(null);
  const [flightPlaying, setFlightPlaying] = useState(false);
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setLanded(true);
      return;
    }

    if (!featuredItem || featuredItem.images.length === 0) {
      setLanded(true);
      return;
    }

    const firstEl = gridPhotoRef.current;
    const lastEl = bannerPhotoRef.current;
    if (!firstEl || !lastEl) {
      setLanded(true);
      return;
    }

    // Convert to document coordinates (viewport rect + current scroll offset)
    // so the clone can be positioned with `position: absolute` and travel
    // naturally with the page instead of drifting if the user keeps
    // scrolling during the flight.
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const first = firstEl.getBoundingClientRect();
    const last = lastEl.getBoundingClientRect();
    setFlight({
      top: last.top + scrollY,
      left: last.left + scrollX,
      width: last.width,
      height: last.height,
      dx: first.left - last.left,
      dy: first.top - last.top,
      sx: first.width / last.width,
      sy: first.height / last.height,
    });
    setFlightPlaying(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion]);

  const openLightbox = useCallback((item: ProductItem, index: number, trigger: HTMLElement) => {
    setLightbox({ name: item.name, images: item.images, index, trigger });
  }, []);

  const stepLightbox = useCallback((dir: 1 | -1) => {
    setLightbox((s) => s ? { ...s, index: (s.index + dir + s.images.length) % s.images.length } : s);
  }, []);

  const jumpLightbox = useCallback((index: number) => {
    setLightbox((s) => (s ? { ...s, index } : s));
  }, []);

  const fillerCount = items.length % 3 === 0 ? 0 : 3 - (items.length % 3);
  const fillerVariants = FILLER_ORDER.slice(0, fillerCount);
  const featuredItem = items.find((i) => i.featured);
  const cheapest = items.reduce((min, i) => (Number(i.price.replace(/\D/g, "")) < Number(min.price.replace(/\D/g, "")) ? i : min), items[0]);
  const isFeaturedCheapest = featuredItem && cheapest.id === featuredItem.id;
  const vidaUtil = featuredItem?.specs.find((s) => s.label === "Vida útil")?.value;

  return (
    <section id={id} data-cursor-zone className="relative border-t border-border scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <ScrollReveal className="py-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <span className="sys-tag mb-4 block">CATÁLOGO · {catalogNumber}</span>
            <h2 className="font-display text-5xl lg:text-7xl leading-[0.88] tracking-tight">
              <ConvergeText text={titleTop} className="text-foreground" />
              <ConvergeText
                text={titleBottom}
                startDelay={0.08}
                style={{ WebkitTextStroke: "1px #758599", color: "transparent" }}
              />
            </h2>
          </div>
          <p className="font-mono text-[0.625rem] text-muted-foreground tracking-widest max-w-[240px] text-right hidden lg:block">
            {tagline}
          </p>
        </ScrollReveal>

        <ScrollStagger className={`grid ${GRID_COLS} gap-px bg-border border border-border`}>
          {items.map((item) => (
            <ScrollStaggerItem key={item.id}>
              <ProductCard
                item={item}
                onOpen={(imgIdx, trigger) => openLightbox(item, imgIdx, trigger)}
                pulseCue={!reduceMotion && !!item.featured && item.images.length > 0 && inView}
                photoRef={item.featured ? gridPhotoRef : undefined}
              />
            </ScrollStaggerItem>
          ))}
          {fillerVariants.map((variant) => (
            <ScrollStaggerItem key={variant}>
              <PromoTile variant={variant} />
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>

        {/* Flying clone — the literal FLIP element. Positioned in document
            space (not viewport-fixed) and portaled to <body> so it travels
            correctly with the page even if the user keeps scrolling through
            the flight, then hands off to the real banner image. */}
        {flightPlaying && flight && featuredItem && featuredItem.images.length > 0 && typeof document !== "undefined" &&
          createPortal(
            <motion.div
              aria-hidden="true"
              data-flip-clone={`${id}-${featuredItem.id}`}
              className="absolute z-[100] overflow-hidden bg-white pointer-events-none"
              style={{ top: flight.top, left: flight.left, width: flight.width, height: flight.height, transformOrigin: "top left" }}
              initial={{ x: flight.dx, y: flight.dy, scaleX: flight.sx, scaleY: flight.sy, opacity: 1 }}
              animate={{
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                opacity: [1, 1, 0],
              }}
              transition={{
                x: { duration: FLIGHT_DURATION, ease: EASE_FLIP },
                y: { duration: FLIGHT_DURATION, ease: EASE_FLIP },
                scaleX: { duration: FLIGHT_DURATION, ease: EASE_FLIP },
                scaleY: { duration: FLIGHT_DURATION, ease: EASE_FLIP },
                opacity: { duration: FLIGHT_DURATION, times: [0, 0.88, 1], ease: "easeOut" },
              }}
              onAnimationComplete={() => {
                setFlightPlaying(false);
                setLanded(true);
              }}
            >
              {/* No mix-blend-mode here (unlike the static grid/banner photos):
                  blending is recalculated against whatever scrolls beneath a
                  moving, scaling layer on every frame, which is measurably
                  more expensive than a plain composited image. The plate
                  background this sits on is already near-white, so the
                  difference is invisible during the brief flight. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredItem.images[0]}
                alt=""
                className="w-full h-full object-contain p-4"
              />
            </motion.div>,
            document.body
          )}

        {featuredItem && (
          <div ref={bannerRef} className="my-8">
            <motion.div
              className="border border-primary/40 bg-card relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
            >
              <div className="grid md:grid-cols-[240px_1fr_auto] gap-6 items-center p-6 lg:p-8">
                <div ref={bannerPhotoRef} className="relative aspect-[4/3] w-full bg-white shadow-[inset_0_0_0_1px_rgba(12,17,26,0.08)]">
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: landed ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
                  >
                    <ProductImageFrame
                      images={featuredItem.images}
                      alt={featuredItem.name}
                      sizes="240px"
                      className="object-contain p-4"
                    />
                  </motion.div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={landed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                      transition={{ duration: reduceMotion ? 0 : 0.45, ease: POP_EASE, delay: reduceMotion ? 0 : 0.05 }}
                      className="font-mono text-[0.625rem] tracking-widest text-[#0c4a7a] border border-[#0c4a7a]/30 bg-foreground/90 px-2 py-1"
                    >
                      ★ EL MÁS VENDIDO
                    </motion.span>
                    {isFeaturedCheapest && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={landed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                        transition={{ duration: reduceMotion ? 0 : 0.45, ease: POP_EASE, delay: reduceMotion ? 0 : 0.16 }}
                        className="font-mono text-[0.625rem] tracking-widest text-green border border-green/40 px-2 py-1"
                      >
                        TAMBIÉN EL MÁS ECONÓMICO
                      </motion.span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl text-foreground leading-tight">{featuredItem.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md leading-relaxed">{featuredItem.idealFor}</p>
                  {vidaUtil && (
                    <p className="mt-3 font-mono text-[11px] text-silver">
                      <span className="text-muted-foreground">VIDA ÚTIL ESTIMADA · </span>
                      {vidaUtil}
                    </p>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={landed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE_FLIP, delay: reduceMotion ? 0 : 0.3 }}
                  className="text-left md:text-right shrink-0"
                >
                  <div className="font-display text-3xl text-foreground">{featuredItem.price}</div>
                  <div className="font-mono text-[0.625rem] text-muted-foreground mb-4">{featuredItem.priceNote}</div>
                  <a
                    href={waLink(featuredItem.name)}
                    target="_blank"
                    rel="noopener"
                    onClick={() => trackQuoteClick("best_seller_spotlight", featuredItem.name)}
                    className="inline-flex items-center gap-2 min-h-11 bg-primary text-background px-5 font-mono text-[0.625rem] tracking-widest font-semibold hover:bg-primary-hover transition-colors whitespace-nowrap"
                  >
                    COTIZAR ESTE →
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}

        <div className="py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 sm:justify-between border-b border-border">
          <span className="font-mono text-[0.625rem] text-muted-foreground">¿NECESITAS OTRO MODELO O CANTIDAD MAYOR? PREGÚNTANOS →</span>
          <a
            href={waLink("un equipo de radiocomunicación")}
            target="_blank"
            rel="noopener"
            onClick={() => trackQuoteClick(`section_footer_${id}`)}
            className="inline-flex items-center min-h-11 font-mono text-xs text-primary hover:underline tracking-wider whitespace-nowrap"
          >
            COTIZAR POR WHATSAPP
          </a>
        </div>
      </div>

      {lightbox && (
        <Lightbox state={lightbox} onClose={() => setLightbox(null)} onStep={stepLightbox} onJump={jumpLightbox} />
      )}
    </section>
  );
}

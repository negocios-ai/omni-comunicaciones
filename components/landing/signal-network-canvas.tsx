"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulseOffset: number;
  type: "unit" | "link" | "repeater";
}

const BLUE  = "33,150,243";
const GREEN = "34,197,94";
const WHITE = "238,241,245";

/**
 * Visualizes a radio network: repeaters (towers) relay signal between
 * mobile units. Hubs = repeaters, relays = links, nodes = radio units.
 */
export function SignalNetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId: number;
    let W = 0, H = 0;
    let nodes: Node[] = [];
    // Tracked on window (not the canvas) so the network still reacts to the
    // cursor even while it's hovering the text/buttons stacked on top of it.
    const mouse = { x: -9999, y: -9999 };
    const INTERACT_R = 170;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * window.devicePixelRatio;
      canvas.height = H * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      init();
    };

    const init = () => {
      const COUNT = Math.max(40, Math.floor((W * H) / 4500));
      nodes = Array.from({ length: COUNT }, () => {
        const roll = Math.random();
        const type: Node["type"] = roll < 0.08 ? "repeater" : roll < 0.28 ? "link" : "unit";
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * (type === "repeater" ? 0.15 : 0.4),
          vy: (Math.random() - 0.5) * (type === "repeater" ? 0.15 : 0.4),
          radius: type === "repeater" ? 6 : type === "link" ? 4 : 2.5,
          baseAlpha: type === "repeater" ? 0.95 : type === "link" ? 0.8 : 0.55 + Math.random() * 0.35,
          pulseOffset: Math.random() * Math.PI * 2,
          type,
        };
      });
    };

    let t = 0;
    let rx: Float64Array = new Float64Array(0);
    let ry: Float64Array = new Float64Array(0);
    let proximity: Float64Array = new Float64Array(0);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.014;

      if (rx.length !== nodes.length) {
        rx = new Float64Array(nodes.length);
        ry = new Float64Array(nodes.length);
        proximity = new Float64Array(nodes.length);
      }

      /* ── cursor repulsion: nodes lean away from the pointer, doesn't touch real physics ── */
      const active =
        mouse.x > -INTERACT_R && mouse.x < W + INTERACT_R &&
        mouse.y > -INTERACT_R && mouse.y < H + INTERACT_R;

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        let ox = 0, oy = 0, prox = 0;
        if (active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          if (dist < INTERACT_R) {
            prox = 1 - dist / INTERACT_R;
            const force = prox * 26;
            ox = (dx / dist) * force;
            oy = (dy / dist) * force;
          }
        }
        rx[i] = p.x + ox;
        ry[i] = p.y + oy;
        proximity[i] = prox;
      }

      /* ── SIGNAL LINKS ── */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const MAX = a.type === "repeater" || b.type === "repeater" ? 220 : 140;

          if (dist < MAX) {
            const t01 = 1 - dist / MAX;
            const isHot = a.type !== "unit" || b.type !== "unit";
            const near = Math.max(proximity[i], proximity[j]);
            const alpha = (isHot ? t01 * 0.55 : t01 * 0.18) + near * 0.35;
            const color = isHot || near > 0 ? BLUE : "80,80,80";
            const width = (isHot ? 1.0 : 0.5) + near * 0.8;

            ctx.beginPath();
            ctx.moveTo(rx[i], ry[i]);
            ctx.lineTo(rx[j], ry[j]);
            ctx.strokeStyle = `rgba(${color},${alpha})`;
            ctx.lineWidth = width;
            ctx.stroke();

            if (isHot && dist < MAX * 0.8) {
              const phase = (t * 0.6 + i * 0.37 + j * 0.19) % 1;
              const px = rx[i] + (rx[j] - rx[i]) * phase;
              const py = ry[i] + (ry[j] - ry[i]) * phase;
              ctx.beginPath();
              ctx.arc(px, py, 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${BLUE},0.9)`;
              ctx.fill();
            }
          }
        }
      }

      /* ── CURSOR LINKS: pointer joins the network as a live node ── */
      if (active) {
        for (let i = 0; i < nodes.length; i++) {
          if (proximity[i] <= 0) continue;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(rx[i], ry[i]);
          ctx.strokeStyle = `rgba(${BLUE},${proximity[i] * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 46);
        grd.addColorStop(0, `rgba(${BLUE},0.35)`);
        grd.addColorStop(1, `rgba(${BLUE},0)`);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 46, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${WHITE},0.9)`;
        ctx.fill();
      }

      /* ── NODES ── */
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        p.x += p.vx; if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        p.y += p.vy; if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;

        const pulse = 0.72 + 0.28 * Math.sin(t * 1.6 + p.pulseOffset);
        const near = proximity[i];
        const r = p.radius * pulse * (1 + near * 0.8);
        const alpha = Math.min(1, p.baseAlpha * pulse + near * 0.3);
        const px = rx[i], py = ry[i];

        if (p.type === "repeater") {
          const grd = ctx.createRadialGradient(px, py, r, px, py, r + 18);
          grd.addColorStop(0, `rgba(${BLUE},0.35)`);
          grd.addColorStop(1, `rgba(${BLUE},0)`);
          ctx.beginPath();
          ctx.arc(px, py, r + 18, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(px, py, r + 7, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${BLUE},${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${WHITE},${alpha})`;
          ctx.fill();
        } else if (p.type === "link") {
          ctx.beginPath();
          ctx.arc(px, py, r + 5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${BLUE},${alpha * 0.45})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${BLUE},${alpha})`;
          ctx.fill();
        } else {
          const isGreen = Math.sin(p.pulseOffset * 3.7) > 0.65;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = isGreen ? `rgba(${GREEN},${alpha})` : `rgba(${BLUE},${alpha})`;
          ctx.fill();
        }
      }

      if (running) animId = requestAnimationFrame(draw);
    };

    resize();

    // The draw loop is O(n^2) (pairwise link distances) and must not keep
    // burning main-thread budget once the hero scrolls out of view — it was
    // running forever, competing with animations elsewhere on the page for
    // frame time. Pause/resume with an IntersectionObserver instead.
    let running = false;
    const start = () => {
      if (running) return;
      running = true;
      animId = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animId);
    };

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}

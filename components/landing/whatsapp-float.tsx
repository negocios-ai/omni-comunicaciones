"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { trackWhatsappClick } from "@/lib/analytics";

const GREETING_SEEN_KEY = "omni_whatsapp_greeting_seen";
const EASE = [0.16, 1, 0.3, 1] as const;

export function WhatsappFloat() {
  const [showBubble, setShowBubble] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem(GREETING_SEEN_KEY)) return;
    const id = setTimeout(() => setShowBubble(true), 4500);
    return () => clearTimeout(id);
  }, []);

  const dismissBubble = () => {
    setShowBubble(false);
    sessionStorage.setItem(GREETING_SEEN_KEY, "1");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
            className="relative max-w-[230px] bg-card border border-border px-4 py-3 shadow-lg shadow-black/30 font-mono text-[11px] text-foreground leading-relaxed"
          >
            <button
              type="button"
              onClick={dismissBubble}
              aria-label="Cerrar mensaje"
              className="absolute -top-2.5 -right-2.5 w-6 h-6 flex items-center justify-center bg-foreground text-background text-[11px]"
            >
              ✕
            </button>
            ¿Tienes dudas sobre algún equipo? Escríbenos, te respondemos de inmediato.
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href="https://wa.me/593996590777"
        target="_blank"
        rel="noopener"
        onClick={() => { dismissBubble(); trackWhatsappClick("floating_button"); }}
        aria-label="Escribir por WhatsApp al +593 99 659 0777"
        className="group relative w-14 h-14 flex items-center justify-center bg-[#1f9e57] hover:bg-[#25b366] active:scale-95 shadow-lg shadow-black/40 transition-all duration-200 hover:scale-105"
      >
        {!reduceMotion && (
          <span aria-hidden="true" className="whatsapp-ring absolute inset-0 bg-[#1f9e57]/70 pointer-events-none" />
        )}
        <svg viewBox="0 0 24 24" className="relative w-6 h-6 fill-white" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.13L2 22l5.13-1.55c1.45.79 3.1 1.24 4.86 1.24h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.05h-.01c-1.6 0-3.17-.43-4.53-1.24l-.32-.19-3.37 1.02.99-3.34-.21-.34a8.13 8.13 0 01-1.24-4.34c0-4.5 3.66-8.16 8.15-8.16 2.17 0 4.21.85 5.75 2.4a8.08 8.08 0 012.39 5.76c0 4.5-3.66 8.16-8.16 8.16zm4.47-6.12c-.24-.12-1.45-.71-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.34-.76-1.83-.2-.48-.4-.42-.55-.42-.14 0-.3-.02-.46-.02s-.42.06-.64.3c-.22.24-.85.83-.85 2.03s.87 2.36 1 2.52c.12.16 1.7 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
        </svg>
      </a>
    </div>
  );
}

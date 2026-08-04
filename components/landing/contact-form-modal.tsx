"use client";

import { useEffect, useRef, useState } from "react";
import { trackContactFormSubmit } from "@/lib/analytics";

const NEED_OPTIONS = [
  { value: "cotizacion", label: "Cotización de equipos" },
  { value: "corporativo", label: "Proyecto corporativo / empresa grande" },
  { value: "soporte", label: "Soporte técnico" },
  { value: "otro", label: "Otra consulta" },
];

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-1.5 w-full min-h-11 bg-background border border-border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 transition-colors";

export function ContactFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [need, setNeed] = useState("cotizacion");

  useEffect(() => {
    if (!open) return;
    closeBtnRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
    };
  }, [open, onClose]);

  // Reset to a clean form each time the modal is reopened.
  useEffect(() => {
    if (open) {
      setStatus("idle");
      setErrorMsg("");
      setNeed("cotizacion");
    }
  }, [open]);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      phone: String(data.get("phone") || ""),
      need: String(data.get("need") || "otro"),
      message: String(data.get("message") || ""),
      website: String(data.get("website") || ""), // honeypot
    };

    if (!data.get("consent")) {
      setErrorMsg("Debes aceptar el uso de tus datos para poder enviar el mensaje.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        setErrorMsg(result.error || "No se pudo enviar el mensaje.");
        setStatus("error");
        trackContactFormSubmit(payload.need, false);
        return;
      }
      setStatus("success");
      trackContactFormSubmit(payload.need, true);
    } catch {
      setErrorMsg("No se pudo enviar el mensaje. Revisa tu conexión e intenta de nuevo.");
      setStatus("error");
      trackContactFormSubmit(payload.need, false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-form-title"
        className="relative w-full max-w-lg bg-card border border-border my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center border border-border text-silver hover:text-primary hover:border-primary/50 transition-colors"
        >
          ✕
        </button>

        <div className="p-6 lg:p-8">
          {status === "success" ? (
            <div className="py-8 text-center">
              <span className="sys-tag mb-4 inline-block">MENSAJE ENVIADO</span>
              <h2 className="font-display text-3xl text-foreground mb-3">¡Listo!</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                Recibimos tu mensaje y te responderemos a la brevedad a tu correo. Si es urgente, también puedes
                escribirnos por WhatsApp.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 min-h-11 bg-primary text-background px-6 font-mono text-[0.625rem] tracking-widest font-semibold hover:bg-primary-hover transition-colors"
              >
                CERRAR
              </button>
            </div>
          ) : (
            <>
              <span className="sys-tag mb-4 block">ESCRÍBENOS</span>
              <h2 id="contact-form-title" className="font-display text-3xl text-foreground mb-2">
                Enviar correo
              </h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Cuéntanos qué necesitas y te respondemos directo a tu correo.
              </p>

              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                {/* Honeypot — hidden from real visitors, bots that autofill every field trip it */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">No llenar este campo</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="font-mono text-[0.625rem] tracking-widest text-muted-foreground">
                      NOMBRE *
                    </label>
                    <input id="name" name="name" type="text" required maxLength={200} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="company" className="font-mono text-[0.625rem] tracking-widest text-muted-foreground">
                      EMPRESA (OPCIONAL)
                    </label>
                    <input id="company" name="company" type="text" maxLength={200} className={inputClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="font-mono text-[0.625rem] tracking-widest text-muted-foreground">
                      CORREO *
                    </label>
                    <input id="email" name="email" type="email" required className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="font-mono text-[0.625rem] tracking-widest text-muted-foreground">
                      TELÉFONO (OPCIONAL)
                    </label>
                    <input id="phone" name="phone" type="tel" maxLength={50} className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="need" className="font-mono text-[0.625rem] tracking-widest text-muted-foreground">
                    QUÉ NECESITAS
                  </label>
                  <select
                    id="need"
                    name="need"
                    value={need}
                    onChange={(e) => setNeed(e.target.value)}
                    className={`${inputClass} appearance-none`}
                  >
                    {NEED_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {need === "corporativo" && (
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Te enviaremos también nuestra carta de presentación con lo que ofrecemos para proyectos
                      corporativos.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="font-mono text-[0.625rem] tracking-widest text-muted-foreground">
                    MENSAJE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={4000}
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <div className="flex items-start gap-2.5">
                  <input
                    id="consent"
                    name="consent"
                    type="checkbox"
                    required
                    className="mt-0.5 w-4 h-4 shrink-0 accent-primary"
                  />
                  <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed">
                    Acepto que mis datos se usen para responder esta consulta, según la{" "}
                    <a
                      href="/privacidad"
                      target="_blank"
                      rel="noopener"
                      className="text-primary underline underline-offset-2 hover:text-primary-hover"
                    >
                      Política de Privacidad
                    </a>
                    . *
                  </label>
                </div>

                {status === "error" && (
                  <p role="alert" className="text-xs text-red border border-red/30 bg-red/5 px-3 py-2">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 min-h-11 bg-primary text-background px-6 font-mono text-sm tracking-widest font-semibold hover:bg-primary-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "ENVIANDO..." : "ENVIAR MENSAJE"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

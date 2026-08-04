import { NextResponse } from "next/server";
import { Resend } from "resend";
import { COMPANY_LETTER_HTML } from "@/lib/company-letter";

const NEED_LABELS: Record<string, string> = {
  cotizacion: "Cotización de equipos",
  corporativo: "Proyecto corporativo / empresa grande",
  soporte: "Soporte técnico",
  otro: "Otra consulta",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Strips newlines so user input can never inject extra headers/lines into
// fields that end up in an email subject line.
function singleLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const need = typeof body.need === "string" ? body.need : "otro";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const honeypot = typeof body.website === "string" ? body.website.trim() : "";

  // Honeypot: real visitors never fill this hidden field. Bots that
  // autofill every input do — silently pretend success instead of
  // engaging with them further.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Nombre, correo y mensaje son obligatorios." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Ingresa un correo válido." }, { status: 400 });
  }
  if (message.length > 4000 || name.length > 200 || company.length > 200 || phone.length > 50) {
    return NextResponse.json({ error: "Uno de los campos es demasiado largo." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === "re_your_api_key_here") {
    console.error("RESEND_API_KEY no configurada (o sigue con el valor de ejemplo de .env.local)");
    return NextResponse.json(
      { error: "El envío por formulario no está disponible en este momento. Escríbenos por WhatsApp." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const needLabel = NEED_LABELS[need] ?? NEED_LABELS.otro;
  const fromAddress = process.env.RESEND_FROM_EMAIL || "OMNI COMUNICACIONES <onboarding@resend.dev>";
  const toAddress = process.env.RESEND_TO_EMAIL || "negocios@omnitronec.com";
  const isCorporate = need === "corporativo";

  try {
    // Internal notification is the critical path — if the business never
    // finds out about the lead, the form has failed regardless of what the
    // visitor sees, so a Resend-level error here must fail the request too
    // (the SDK resolves with { error } instead of throwing on API errors).
    const internal = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: singleLine(`Nuevo contacto web: ${needLabel} — ${name}`),
      html: `
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Empresa:</strong> ${escapeHtml(company || "—")}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(phone || "—")}</p>
        <p><strong>Qué necesita:</strong> ${escapeHtml(needLabel)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    if (internal.error) {
      console.error("contact api error (internal notification)", internal.error);
      return NextResponse.json(
        { error: "No se pudo enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp." },
        { status: 500 }
      );
    }

    // Auto-reply to the visitor is best-effort: the business already has the
    // lead at this point, so a failure here (e.g. Resend sandbox mode only
    // allowing the account's own address) shouldn't turn into an error for
    // the visitor — just log it for us to notice.
    const autoReply = await resend.emails.send({
      from: fromAddress,
      to: email,
      subject: isCorporate
        ? "Gracias por contactarnos — OMNI COMUNICACIONES"
        : "Recibimos tu mensaje — OMNI COMUNICACIONES",
      html: isCorporate
        ? COMPANY_LETTER_HTML
        : `<p>Hola ${escapeHtml(name)},</p><p>Recibimos tu mensaje y te responderemos a la brevedad. Si es urgente, también puedes escribirnos por WhatsApp al +593 99 659 0777.</p><p>Equipo OMNI COMUNICACIONES</p>`,
    });
    if (autoReply.error) {
      console.error("contact api warning (auto-reply not sent)", autoReply.error);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact api error", err);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp." },
      { status: 500 }
    );
  }
}

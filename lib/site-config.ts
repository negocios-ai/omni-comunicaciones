// Fuente única para la URL pública del sitio. Al desplegar, define
// NEXT_PUBLIC_SITE_URL en las variables de entorno (Vercel u otro hosting)
// con el dominio real (ej. "https://omnicomunicaciones.com" o el subdominio
// gratuito que te asignen, ej. "https://omnitron.vercel.app"). Sin esa
// variable, el sitio sigue funcionando pero el SEO (sitemap, robots, Open
// Graph, JSON-LD) apuntará al dominio de ejemplo de abajo.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://omnicomunicaciones.com";

// Base de la vista previa al compartir (WhatsApp, Facebook). Next.js reemplaza
// el bloque openGraph completo en cada página que define el suyo, así que cada
// página debe incluir esta base; si no, pierde la imagen o hereda el título
// y la URL de la portada.
export const OG_DEFAULTS = {
  siteName: "OMNI COMUNICACIONES",
  locale: "es_EC",
  images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "OMNI COMUNICACIONES" }],
};

// Fuente única para la URL pública del sitio. Al desplegar, define
// NEXT_PUBLIC_SITE_URL en las variables de entorno (Vercel u otro hosting)
// con el dominio real (ej. "https://omnicomunicaciones.com" o el subdominio
// gratuito que te asignen, ej. "https://omnitron.vercel.app"). Sin esa
// variable, el sitio sigue funcionando pero el SEO (sitemap, robots, Open
// Graph, JSON-LD) apuntará al dominio de ejemplo de abajo.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://omnicomunicaciones.com";

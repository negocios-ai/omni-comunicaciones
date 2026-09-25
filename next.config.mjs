/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cabeceras de seguridad HTTP aplicadas a todas las rutas.
  // Endurecen el sitio contra clickjacking, MIME-sniffing, XSS y filtrado
  // de referrers. Ajustadas para no romper Vercel Analytics / Speed Insights
  // ni Google Fonts. Si añades nuevos orígenes (CDN de imágenes, embeds),
  // amplía las directivas correspondientes.
  async headers() {
    const csp = [
      "default-src 'self'",
      // 'unsafe-inline' es necesario porque Next.js inyecta scripts de
      // bootstrap en producción. Se puede endurecer con nonces más adelante.
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // data: para SVG inline y blob: para PDFs/recursos generados en cliente.
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      // anti-clickjacking y anti-embedding.
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
          // HSTS ya viene de Vercel, pero lo declaramos también para que el
          // contrato quede visible en el código y no dependa sólo del hosting.
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
  // Mantenemos los chequeos de tipos activos: cualquier error TS rompe el
  // build, en vez de pasar silencioso. Si en algún momento hay que relajar
  // esto, documentar el motivo en el PR.
  typescript: {
    ignoreBuildErrors: false,
  },
  // Quita la cabecera "X-Powered-By: Next.js" (no aporta nada al visitante
  // y solo le dice a un atacante qué framework buscar en su lista de fallas
  // conocidas).
  poweredByHeader: false,
}

export default nextConfig

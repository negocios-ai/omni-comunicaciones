import React from "react"
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CursorTracker } from '@/components/landing/cursor-tracker'
import { SmoothScroll } from '@/components/landing/smooth-scroll'
import { ScrollProgressBar } from '@/components/ui/scroll-reveal'
import { SITE_URL } from '@/lib/site-config'
import './globals.css'

const TITLE = 'OMNI COMUNICACIONES — Radios Motorola, Kenwood y equipos POC';
const DESCRIPTION = 'Distribuidor especializado en radios Motorola y Kenwood, y equipos POC. Semiprofesionales, profesionales y cobertura celular sin límites.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['radios Motorola', 'radios Kenwood', 'equipos POC', 'radiocomunicación profesional', 'Ecuador'],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: 'OMNI COMUNICACIONES',
    locale: 'es_EC',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'OMNI COMUNICACIONES' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#05070d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,700;1,800&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <ScrollProgressBar />
        <CursorTracker />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

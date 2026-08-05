import React from "react"
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { CursorTracker } from '@/components/landing/cursor-tracker'
import { SmoothScroll } from '@/components/landing/smooth-scroll'
import { ScrollProgressBar } from '@/components/ui/scroll-reveal'
import { SITE_URL } from '@/lib/site-config'
import './globals.css'

const TITLE = 'Radios Motorola y Kenwood en Ecuador | OMNI COMUNICACIONES';
const DESCRIPTION = 'Distribuidor oficial de radios Motorola, Kenwood e ICOM en Ecuador. 20 años de trayectoria, programación gratis y soporte técnico local. Cotiza por WhatsApp.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'radios Motorola Ecuador',
    'radios Kenwood Ecuador',
    'radios ICOM Ecuador',
    'equipos POC RugGear',
    'radiocomunicación profesional',
    'walkie talkie Ecuador',
    'distribuidor Motorola Ecuador',
  ],
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
  verification: {
    google: 'cdCB3n-94zA71o9mNQlghEL93h4touxeTwEPtfSQ0fk',
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

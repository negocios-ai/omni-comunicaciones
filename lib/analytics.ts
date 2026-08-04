"use client";

import { track } from "@vercel/analytics";

/**
 * Conversion events tracked across the site. Keep this list as the single
 * source of truth for what counts as a "goal" — mirrors the events reviewed
 * in the analytics dashboard once the site is live.
 */
export function trackWhatsappClick(source: string, productName?: string) {
  track("whatsapp_click", { source, ...(productName ? { product: productName } : {}) });
}

export function trackQuoteClick(source: string, productName?: string) {
  track("quote_click", { source, ...(productName ? { product: productName } : {}) });
}

export function trackCatalogView(catalog: string) {
  track("catalog_cta_click", { catalog });
}

export function trackContactFormSubmit(need: string, success: boolean) {
  track("contact_form_submit", { need, success });
}

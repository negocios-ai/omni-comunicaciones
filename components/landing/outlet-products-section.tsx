"use client";

import Link from "next/link";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ui/scroll-reveal";
import { ConvergeText } from "@/components/ui/converge-text";
import { OUTLET_PRODUCTS } from "./outlet-products-data";
import { OutletImageFrame } from "./outlet-image-frame";
import { OutletWhatsappButton } from "./outlet-whatsapp-button";

export function OutletProductsSection() {
  return (
    <section id="otros-productos" data-cursor-zone className="relative border-t border-border scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <ScrollReveal className="py-10">
          <span className="sys-tag sys-tag-amber mb-4 block">LIQUIDACIÓN · ÚLTIMAS UNIDADES</span>
          <h2 className="font-display text-5xl lg:text-7xl leading-[0.88] tracking-tight">
            <ConvergeText text="OTROS" className="text-foreground" />
            <ConvergeText
              text="PRODUCTOS"
              startDelay={0.08}
              style={{ WebkitTextStroke: "1px #758599", color: "transparent" }}
            />
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
            Últimas unidades de otras líneas en nuestro stock — cuando se acaban, se acaban.
          </p>
        </ScrollReveal>

        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
          {OUTLET_PRODUCTS.map((product) => (
            <ScrollStaggerItem key={product.slug}>
              <div className="group relative bg-card flex flex-col h-full">
                <div className="relative">
                  <OutletImageFrame image={product.images[0]} priority />
                  <span className="pointer-events-none absolute top-3 left-3 inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-widest text-background bg-amber px-2 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-background inline-block" />
                    ÚLTIMA UNIDAD
                  </span>
                </div>

                <div className="relative z-10 p-6 border-t border-border flex flex-col flex-1">
                  <h3 className="font-display text-2xl leading-[0.95] text-foreground tracking-tight">
                    {product.shortTitle}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{product.hook}</p>
                  <p className="mt-3 font-mono text-[0.625rem] text-amber tracking-widest">
                    STOCK: {product.stock} {product.stock === 1 ? "UNIDAD DISPONIBLE" : "UNIDADES DISPONIBLES"}
                  </p>

                  <div className="mt-5 pt-4 border-t border-border">
                    <div className="font-display text-2xl text-foreground">{product.priceNoTaxDisplay}</div>
                    <div className="font-mono text-[0.625rem] text-muted-foreground mt-0.5">
                      {product.priceWithTaxDisplay} con IVA (15%)
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:mt-auto sm:pt-5">
                    <OutletWhatsappButton
                      productTitle={product.shortTitle}
                      source="outlet_card"
                      className="inline-flex items-center justify-center gap-2 min-h-11 bg-primary text-background px-5 font-mono text-[0.625rem] tracking-widest font-semibold hover:bg-primary-hover transition-colors whitespace-nowrap"
                    />
                    <Link
                      href={`/productos/${product.slug}`}
                      className="inline-flex items-center justify-center gap-2 min-h-11 border border-border hover:border-primary/50 px-5 font-mono text-[0.625rem] tracking-widest text-silver hover:text-primary transition-colors whitespace-nowrap"
                    >
                      VER FICHA COMPLETA
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}

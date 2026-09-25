import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { WhatsappFloat } from "@/components/landing/whatsapp-float";
import { OUTLET_PRODUCTS, getOutletProduct } from "@/components/landing/outlet-products-data";
import { OutletGallery } from "@/components/landing/outlet-gallery";
import { OutletWhatsappButton } from "@/components/landing/outlet-whatsapp-button";
import { OG_DEFAULTS, SITE_URL } from "@/lib/site-config";

export function generateStaticParams() {
  return OUTLET_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getOutletProduct(slug);
  if (!product) return {};

  const url = `${SITE_URL}/productos/${product.slug}`;
  const cover = product.images[0];

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      ...OG_DEFAULTS,
      title: product.metaTitle,
      description: product.metaDescription,
      url,
      images: cover ? [{ url: `${SITE_URL}${cover.src}` }] : OG_DEFAULTS.images,
    },
    twitter: {
      card: "summary_large_image",
      title: product.metaTitle,
      description: product.metaDescription,
    },
  };
}

export default async function ProductoOutletPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getOutletProduct(slug);
  if (!product) notFound();

  const url = `${SITE_URL}/productos/${product.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.metaDescription,
    sku: product.handle,
    brand: { "@type": "Brand", name: product.vendor },
    image: product.images.map((img) => `${SITE_URL}${img.src}`),
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.priceNoTax,
      availability: "https://schema.org/InStock",
      url,
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <article className="max-w-[1100px] mx-auto px-6 lg:px-12 pt-32 pb-24">
        <Link
          href="/#otros-productos"
          className="inline-flex items-center gap-2 font-mono text-[0.625rem] tracking-widest text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          ← VOLVER A OTROS PRODUCTOS
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div>
            <OutletGallery images={product.images} />
          </div>

          <div>
            <span className="sys-tag sys-tag-amber mb-4 block">ÚLTIMA UNIDAD · STOCK {product.stock}</span>
            <h1 className="font-display text-3xl lg:text-4xl leading-[0.98] text-foreground tracking-tight">
              {product.title}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{product.hook}</p>

            <ul className="mt-6 space-y-2.5">
              {product.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-sm text-foreground leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="font-display text-4xl text-foreground">{product.priceNoTaxDisplay}</div>
              <div className="font-mono text-xs text-muted-foreground mt-1">
                {product.priceWithTaxDisplay} con IVA (15%) · Stock: {product.stock} unidad disponible
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <OutletWhatsappButton
                  productTitle={product.shortTitle}
                  source="outlet_ficha"
                  className="inline-flex items-center justify-center gap-2 min-h-12 bg-primary text-background px-6 font-mono text-xs tracking-widest font-semibold hover:bg-primary-hover transition-colors whitespace-nowrap"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-20 grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">
          <div>
            <h2 className="font-display text-2xl text-foreground tracking-tight mb-1">{product.descriptionLead}</h2>
            <div className="mt-5 space-y-6">
              {product.descriptionBlocks.map((block, i) => (
                <div key={i}>
                  {block.heading && (
                    <h3 className="font-display text-lg text-foreground tracking-tight mb-2">{block.heading}</h3>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed">{block.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 border border-border bg-card p-4">
              <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">{product.disclaimer}</p>
            </div>
          </div>

          <div>
            <h2 className="font-mono text-[0.625rem] tracking-[0.2em] text-primary mb-4">ESPECIFICACIONES</h2>
            <ul className="border-t border-border">
              {product.specs.map((spec) => (
                <li key={spec.label} className="flex justify-between gap-4 py-3 border-b border-border font-mono text-[11px]">
                  <span className="text-muted-foreground shrink-0">{spec.label}</span>
                  <span className="text-silver text-right">{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      <FooterSection />
      <WhatsappFloat />
    </main>
  );
}

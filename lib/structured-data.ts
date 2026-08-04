import { DOMESTICAS, SEMIPROFESIONALES, PROFESIONALES, POC, type ProductItem } from "@/components/landing/catalog-data";
import { SITE_URL } from "@/lib/site-config";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OMNI COMUNICACIONES",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-omni.png`,
    description:
      "Distribuidor especializado en radios Motorola y Kenwood, y equipos POC RugGear, con 20 años de trayectoria en Ecuador.",
    foundingLocation: "Ecuador",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+593-99-659-0777",
      contactType: "sales",
      areaServed: "EC",
      availableLanguage: "Spanish",
    },
    sameAs: [`https://wa.me/593996590777`],
  };
}

function priceFromString(price: string): number | null {
  const match = price.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

function productSchema(item: ProductItem, category: string) {
  const price = priceFromString(item.price);
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    category,
    description: item.idealFor,
    image: item.images.map((src) => `${SITE_URL}${src}`),
    brand: {
      "@type": "Brand",
      name: item.name.split(" ")[0],
    },
  };
  if (price !== null) {
    base.offers = {
      "@type": "Offer",
      priceCurrency: "USD",
      price,
      availability: "https://schema.org/InStock",
      url: SITE_URL,
    };
  }
  return base;
}

export function allProductSchemas() {
  return [
    ...DOMESTICAS.map((p) => productSchema(p, "Radios domésticas")),
    ...SEMIPROFESIONALES.map((p) => productSchema(p, "Radios semiprofesionales")),
    ...PROFESIONALES.map((p) => productSchema(p, "Radios profesionales")),
    ...POC.map((p) => productSchema(p, "Equipos POC")),
  ];
}

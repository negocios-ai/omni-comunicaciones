import { DOMESTICAS, SEMIPROFESIONALES, PROFESIONALES, POC, type ProductItem } from "@/components/landing/catalog-data";
import { SITE_URL } from "@/lib/site-config";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OMNI COMUNICACIONES",
    legalName: "OMNITRONEC CIA. LTDA.",
    taxID: "1793226293001",
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
    // omnitronec.com es el sitio principal de la misma empresa.
    sameAs: ["https://omnitronec.com", `https://wa.me/593996590777`],
  };
}

// Schema LocalBusiness: para SEO local en Ecuador (Quito/Guayaquil) Google
// prioriza LocalBusiness sobre Organization. Le decimos dónde estamos,
// horario, área de servicio y método de contacto real.
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#localbusiness`,
    name: "OMNI COMUNICACIONES",
    legalName: "OMNITRONEC CIA. LTDA.",
    taxID: "1793226293001",
    image: `${SITE_URL}/logo-omni.png`,
    url: SITE_URL,
    telephone: "+593-99-659-0777",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Beethoven E2-34 y Pasaje Debussy, Las Acacias (diagonal al Súper Akí)",
      addressLocality: "Quito",
      addressRegion: "Pichincha",
      postalCode: "170133",
      addressCountry: "EC",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Calle Beethoven, Las Acacias (OpenStreetMap).
      latitude: -0.151956,
      longitude: -78.481332,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Ecuador" },
      { "@type": "City", name: "Quito" },
      { "@type": "City", name: "Guayaquil" },
      { "@type": "City", name: "Cuenca" },
    ],
    sameAs: ["https://omnitronec.com", `https://wa.me/593996590777`],
  };
}

// Schema WebSite: identifica el sitio y su idioma ante Google.
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    name: "OMNI COMUNICACIONES",
    url: SITE_URL,
    inLanguage: "es-EC",
    publisher: { "@id": `${SITE_URL}#localbusiness` },
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

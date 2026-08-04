import type { MetadataRoute } from "next";
import { OUTLET_PRODUCTS } from "@/components/landing/outlet-products-data";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const sections = [
    "",
    "#domesticas",
    "#semiprofesionales",
    "#profesionales",
    "#poc",
    "#servicios",
    "#metricas",
    "#como-comprar",
    "#contacto",
    "#otros-productos",
  ];

  return [
    ...sections.map((path) => ({
      url: `${SITE_URL}/${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.6,
    })),
    ...OUTLET_PRODUCTS.map((p) => ({
      url: `${SITE_URL}/productos/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    {
      url: `${SITE_URL}/privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terminos`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    },
  ];
}

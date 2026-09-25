import type { MetadataRoute } from "next";
import { OUTLET_PRODUCTS } from "@/components/landing/outlet-products-data";
import { SITE_URL } from "@/lib/site-config";
import { getAllPosts } from "@/lib/blog";

// Sitemap sólo con URLs reales (sin fragments tipo "#seccion"). Los fragments
// no son páginas y Google los desvaloriza. Los artículos del blog se agregan
// solos al crear un .mdx en content/blog.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const blogCategories = [...new Set(posts.map((p) => p.category))];

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: posts[0] ? new Date(posts[0].updated ?? posts[0].date) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogCategories.map((c) => ({
      url: `${SITE_URL}/blog/categoria/${c}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.4,
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

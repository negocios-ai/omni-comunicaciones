import fs from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { ReactElement } from "react";

// Los artículos viven en content/blog/<slug>.mdx. El nombre del archivo es la
// URL: content/blog/radios-poc-ecuador.mdx → /blog/radios-poc-ecuador.
const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export const BLOG_CATEGORIES = {
  poc: { label: "Radios POC", section: "/#poc" },
  guias: { label: "Guías de compra", section: "/#profesionales" },
  tecnologia: { label: "Tecnología", section: "/#profesionales" },
  normativa: { label: "Normativa", section: "/#contacto" },
  sectores: { label: "Por sector", section: "/#profesionales" },
} as const;

export type BlogCategory = keyof typeof BLOG_CATEGORIES;

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
  updated?: string;
  category: BlogCategory;
  keywords: string[];
  cover?: string; // ruta en /public, ej. /images/blog/radios-poc-ecuador.jpg
  coverAlt?: string;
  // Mensaje prearmado para el botón de WhatsApp al final del artículo.
  whatsappMessage?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingMinutes: number;
}

async function readSource(slug: string): Promise<string | null> {
  try {
    return await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  } catch {
    return null;
  }
}

function readingMinutes(source: string): number {
  const words = source.replace(/---[\s\S]*?---/, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(BLOG_DIR);
    return files.filter((f) => f.endsWith(".mdx")).map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getPost(
  slug: string,
  components: Record<string, React.ComponentType<any>> = {},
): Promise<{ meta: PostMeta; content: ReactElement } | null> {
  const source = await readSource(slug);
  if (!source) return null;

  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    components,
    options: { parseFrontmatter: true, mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  return { meta: { ...frontmatter, slug, readingMinutes: readingMinutes(source) }, content };
}

// Copia liviana de la portada (public/images/blog/social/, 1200×630, <200 KB)
// para la vista previa al compartir el enlace: WhatsApp no muestra la foto si
// pesa mucho. Si un artículo nuevo todavía no la tiene, se usa la portada.
export async function getShareImage(cover: string): Promise<{ url: string; width?: number; height?: number }> {
  const light = cover.replace("/images/blog/", "/images/blog/social/");
  try {
    await fs.access(path.join(process.cwd(), "public", light));
    return { url: light, width: 1200, height: 630 };
  } catch {
    return { url: cover };
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));
  return posts
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => p.meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

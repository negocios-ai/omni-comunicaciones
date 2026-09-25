import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { WhatsappFloat } from "@/components/landing/whatsapp-float";
import { BlogIndex } from "@/components/blog/blog-index";
import { BLOG_CATEGORIES, getAllPosts, type BlogCategory } from "@/lib/blog";
import { OG_DEFAULTS, SITE_URL } from "@/lib/site-config";

export const dynamicParams = false;

function isCategory(value: string): value is BlogCategory {
  return value in BLOG_CATEGORIES;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return [...new Set(posts.map((p) => p.category))].map((categoria) => ({ categoria }));
}

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  const { categoria } = await params;
  if (!isCategory(categoria)) return {};
  const label = BLOG_CATEGORIES[categoria].label;
  const url = `${SITE_URL}/blog/categoria/${categoria}`;
  const title = `${label} · Blog | OMNI COMUNICACIONES`;
  const description = `Artículos sobre ${label.toLowerCase()} para empresas en Ecuador: guías prácticas y recomendaciones de OMNI COMUNICACIONES.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { ...OG_DEFAULTS, title, description, url, type: "website" },
  };
}

export default async function BlogCategoryPage({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  if (!isCategory(categoria)) notFound();

  const all = await getAllPosts();
  const posts = all.filter((p) => p.category === categoria);
  if (posts.length === 0) notFound();
  const categories = [...new Set(all.map((p) => p.category))] as BlogCategory[];

  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <BlogIndex
        posts={posts}
        categories={categories}
        active={categoria}
        heading={BLOG_CATEGORIES[categoria].label.toUpperCase()}
        intro="Artículos del blog de OMNI COMUNICACIONES sobre este tema."
      />
      <FooterSection />
      <WhatsappFloat />
    </main>
  );
}

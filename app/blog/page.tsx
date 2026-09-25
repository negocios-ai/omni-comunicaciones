import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { WhatsappFloat } from "@/components/landing/whatsapp-float";
import { BlogIndex } from "@/components/blog/blog-index";
import { getAllPosts, type BlogCategory } from "@/lib/blog";
import { OG_DEFAULTS, SITE_URL } from "@/lib/site-config";

const TITLE = "Blog de radiocomunicación en Ecuador | OMNI COMUNICACIONES";
const DESCRIPTION =
  "Guías prácticas sobre radios Motorola, Kenwood, ICOM y equipos POC: cómo elegir, alcance real, licencias ARCOTEL y recomendaciones por sector en Ecuador.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: { ...OG_DEFAULTS, title: TITLE, description: DESCRIPTION, url: `${SITE_URL}/blog`, type: "website" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map((p) => p.category))] as BlogCategory[];

  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <BlogIndex
        posts={posts}
        categories={categories}
        heading="BLOG"
        intro="Lo que necesitas saber para elegir, usar y legalizar radios de comunicación en tu empresa. Explicado sin jerga, con ejemplos de Ecuador."
      />
      <FooterSection />
      <WhatsappFloat />
    </main>
  );
}

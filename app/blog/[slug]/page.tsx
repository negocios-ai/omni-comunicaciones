import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { WhatsappFloat } from "@/components/landing/whatsapp-float";
import { BlogWhatsappButton } from "@/components/blog/blog-whatsapp-button";
import { mdxComponents } from "@/components/blog/mdx-components";
import { BLOG_CATEGORIES, formatPostDate, getAllPosts, getPost, getPostSlugs, getShareImage } from "@/lib/blog";
import { OG_DEFAULTS, SITE_URL } from "@/lib/site-config";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const { meta } = post;
  const url = `${SITE_URL}/blog/${slug}`;
  const share = meta.cover ? await getShareImage(meta.cover) : null;
  const shareImages = share ? [{ ...share, url: `${SITE_URL}${share.url}`, alt: meta.coverAlt }] : undefined;

  return {
    title: `${meta.title} | OMNI COMUNICACIONES`,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: url },
    openGraph: {
      ...OG_DEFAULTS,
      type: "article",
      title: meta.title,
      description: meta.description,
      url,
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
      images: shareImages ?? OG_DEFAULTS.images,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: shareImages ?? OG_DEFAULTS.images },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug, mdxComponents);
  if (!post) notFound();
  const { meta, content } = post;

  const category = BLOG_CATEGORIES[meta.category];
  const related = (await getAllPosts()).filter((p) => p.slug !== slug).slice(0, 2);
  const url = `${SITE_URL}/blog/${slug}`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: meta.title,
      description: meta.description,
      datePublished: meta.date,
      dateModified: meta.updated ?? meta.date,
      inLanguage: "es-EC",
      mainEntityOfPage: url,
      image: meta.cover ? `${SITE_URL}${meta.cover}` : `${SITE_URL}/og-image.png`,
      keywords: meta.keywords.join(", "),
      author: { "@type": "Organization", name: "OMNI COMUNICACIONES", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "OMNI COMUNICACIONES",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-omni.png` },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: meta.title, item: url },
      ],
    },
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />

      <article className="max-w-[760px] mx-auto px-6 pt-32 pb-16">
        <nav aria-label="Ruta" className="font-mono text-[0.625rem] tracking-widest text-muted-foreground mb-8">
          <Link href="/blog" className="hover:text-primary transition-colors">BLOG</Link>
          <span className="mx-2">/</span>
          <Link href={`/blog/categoria/${meta.category}`} className="hover:text-primary transition-colors uppercase">
            {category.label}
          </Link>
        </nav>

        <h1 className="font-display text-4xl lg:text-6xl leading-[0.95] tracking-tight text-foreground">{meta.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{meta.description}</p>
        <p className="mt-6 font-mono text-[0.625rem] tracking-widest text-muted-foreground">
          {formatPostDate(meta.date).toUpperCase()} · {meta.readingMinutes} MIN DE LECTURA
        </p>

        {meta.cover && (
          <div className="relative mt-10 aspect-[1200/630] border border-border overflow-hidden">
            <Image src={meta.cover} alt={meta.coverAlt ?? meta.title} fill priority sizes="(min-width: 760px) 760px, 100vw" className="object-cover" />
          </div>
        )}

        <div className="mt-6">{content}</div>

        <aside className="mt-16 border border-border bg-card p-6 lg:p-8">
          <span className="sys-tag mb-4 block">¿NECESITAS AYUDA PARA ELEGIR?</span>
          <p className="font-display text-2xl lg:text-3xl leading-[1.05] tracking-tight text-foreground">
            Te asesoramos sin costo y te decimos qué equipo conviene para tu operación.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <BlogWhatsappButton
              source={`blog_${slug}`}
              message={meta.whatsappMessage ?? `Hola, leí el artículo "${meta.title}" y quiero asesoría.`}
            />
            <Link
              href={category.section}
              className="inline-flex items-center justify-center min-h-11 px-6 border border-border font-mono text-[0.6875rem] tracking-widest text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              VER EQUIPOS →
            </Link>
          </div>
        </aside>
      </article>

      {related.length > 0 && (
        <section className="max-w-[760px] mx-auto px-6 pb-24">
          <span className="sys-tag mb-5 block">SIGUE LEYENDO</span>
          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group bg-background p-5 hover:bg-card transition-colors">
                <span className="font-mono text-[0.625rem] tracking-widest text-primary uppercase">
                  {BLOG_CATEGORIES[p.category].label}
                </span>
                <p className="mt-2 font-display text-xl leading-[1.05] text-foreground group-hover:text-primary transition-colors">
                  {p.title}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <FooterSection />
      <WhatsappFloat />
    </main>
  );
}

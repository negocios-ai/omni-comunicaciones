import Image from "next/image";
import Link from "next/link";
import { BLOG_CATEGORIES, formatPostDate, type BlogCategory, type PostMeta } from "@/lib/blog";

export function BlogIndex({
  posts,
  categories,
  active,
  heading,
  intro,
}: {
  posts: PostMeta[];
  categories: BlogCategory[]; // sólo las que tienen artículos
  active?: BlogCategory;
  heading: string;
  intro: string;
}) {
  const chip =
    "inline-flex items-center min-h-9 px-4 border font-mono text-[0.625rem] tracking-widest uppercase transition-colors";

  return (
    <section className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-32 pb-24">
      <span className="sys-tag mb-4 block">BLOG · RADIOCOMUNICACIÓN</span>
      <h1 className="font-display text-5xl lg:text-7xl leading-[0.9] tracking-tight text-foreground">{heading}</h1>
      <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">{intro}</p>

      <nav aria-label="Categorías del blog" className="mt-10 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`${chip} ${!active ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-primary"}`}
        >
          Todos
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/blog/categoria/${c}`}
            className={`${chip} ${active === c ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-primary"}`}
          >
            {BLOG_CATEGORIES[c].label}
          </Link>
        ))}
      </nav>

      {posts.length === 0 ? (
        <p className="mt-16 font-mono text-xs tracking-widest text-muted-foreground">PRÓXIMAMENTE NUEVOS ARTÍCULOS.</p>
      ) : (
        <div className="mt-10 grid md:grid-cols-2 gap-px bg-border border border-border">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-background p-6 lg:p-8 flex flex-col hover:bg-card transition-colors"
            >
              {post.cover && (
                <div className="relative -mx-6 -mt-6 lg:-mx-8 lg:-mt-8 mb-6 aspect-[1200/630] overflow-hidden border-b border-border">
                  <Image
                    src={post.cover}
                    alt={post.coverAlt ?? post.title}
                    fill
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <span className="font-mono text-[0.625rem] tracking-widest text-primary uppercase">
                {BLOG_CATEGORIES[post.category].label}
              </span>
              <h2 className="mt-3 font-display text-2xl lg:text-3xl leading-[1.02] tracking-tight text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{post.description}</p>
              <span className="mt-auto pt-6 font-mono text-[0.625rem] tracking-widest text-muted-foreground">
                {formatPostDate(post.date).toUpperCase()} · {post.readingMinutes} MIN DE LECTURA
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

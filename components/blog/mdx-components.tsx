import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

// Estilos de los artículos MDX. El proyecto no usa @tailwindcss/typography,
// así que cada etiqueta se mapea aquí con la misma estética del sitio.

function Anchor({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const className = "text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary";
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener" className={className} {...rest}>
      {children}
    </a>
  );
}

function slugify(children: ReactNode): string | undefined {
  if (typeof children !== "string") return undefined;
  return children
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Recuadro destacado: <Callout title="Ojo">texto</Callout> */
function Callout({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-8 border border-border border-l-2 border-l-primary bg-card px-5 py-4">
      {title && <p className="font-mono text-[0.625rem] tracking-widest text-primary mb-2 uppercase">{title}</p>}
      <div className="text-sm text-foreground leading-relaxed [&>p]:my-0 [&>p+p]:mt-3">{children}</div>
    </aside>
  );
}

export const mdxComponents = {
  h2: ({ children }: ComponentPropsWithoutRef<"h2">) => (
    <h2 id={slugify(children)} className="font-display text-3xl lg:text-4xl leading-[1] tracking-tight text-foreground mt-14 mb-5 scroll-mt-28">
      {children}
    </h2>
  ),
  h3: ({ children }: ComponentPropsWithoutRef<"h3">) => (
    <h3 id={slugify(children)} className="font-display text-xl lg:text-2xl tracking-tight text-foreground mt-10 mb-3 scroll-mt-28">
      {children}
    </h3>
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="text-base text-muted-foreground leading-[1.75] my-5" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="text-foreground font-semibold" {...props} />,
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="my-5 space-y-2.5 [&>li]:relative [&>li]:pl-5 [&>li]:before:content-[''] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-[0.7em] [&>li]:before:w-1.5 [&>li]:before:h-1.5 [&>li]:before:bg-primary"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-5 space-y-2.5 pl-5 list-decimal marker:text-primary marker:font-mono" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="text-base text-muted-foreground leading-[1.7] [&>p]:my-0" {...props} />
  ),
  a: Anchor,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-8 border-l-2 border-primary pl-5 italic text-foreground" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="font-mono text-[0.85em] text-foreground bg-card border border-border px-1.5 py-0.5" {...props} />
  ),
  hr: () =><hr className="my-12 border-border" />,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-8 overflow-x-auto border border-border">
      <table className="w-full min-w-[560px] text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="text-left font-mono text-[0.625rem] tracking-widest uppercase text-primary bg-card px-4 py-3 border-b border-border" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="px-4 py-3 border-b border-border text-muted-foreground align-top leading-relaxed" {...props} />
  ),
  Callout,
};

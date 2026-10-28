import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "@/components/ui/icons";
import { site } from "@/content/site";
import { formatDate, getLinkCard, type FaqItem, type Heading } from "@/lib/content";

export function Breadcrumbs({ crumbs }: { crumbs: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol>
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="line-clamp-1">{crumb.name}</span>
              ) : (
                <>
                  <Link href={crumb.path}>{crumb.name}</Link>
                  <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Byline({
  date,
  updated,
  readingMinutes,
  nameOnly,
}: {
  date: string;
  updated: string;
  readingMinutes?: number;
  /** Generated posts: the author's name and dates only, no photo or title. */
  nameOnly?: string;
}) {
  const { author } = site;
  if (nameOnly) {
    return (
      <div className="text-sm leading-snug">
        <p className="font-semibold text-void">By {nameOnly}</p>
        <p className="text-slate">
          <time dateTime={date}>Published {formatDate(date)}</time>
          {updated !== date && (
            <>
              {" · "}
              <time dateTime={updated}>Updated {formatDate(updated)}</time>
            </>
          )}
          {readingMinutes ? ` · ${readingMinutes} min read` : null}
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3.5">
      <Image
        src={author.image}
        alt={`${author.name}, ${author.title}`}
        width={96}
        height={120}
        className="h-12 w-12 shrink-0 rounded-full object-cover object-top ring-2 ring-white shadow-[0_6px_16px_-6px_rgba(10,14,39,0.4)]"
      />
      <div className="text-sm leading-snug">
        <p className="font-semibold text-void">
          {author.name} <span className="font-normal text-slate">· {author.title}</span>
        </p>
        <p className="text-slate">
          <time dateTime={date}>Published {formatDate(date)}</time>
          {updated !== date && (
            <>
              {" · "}
              <time dateTime={updated}>Updated {formatDate(updated)}</time>
            </>
          )}
          {readingMinutes ? ` · ${readingMinutes} min read` : null}
        </p>
      </div>
    </div>
  );
}

/** "sidebar": sticky desktop list. "inline": collapsible box above the article on mobile. */
export function TableOfContents({ headings, variant }: { headings: Heading[]; variant: "sidebar" | "inline" }) {
  const list = (
    <ol className="space-y-2 text-sm">
      {headings.map((h) => (
        <li key={h.id} className={h.depth === 3 ? "pl-4" : ""}>
          <a href={`#${h.id}`} className="text-slate hover:text-signal transition-colors">
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );
  if (variant === "inline") {
    return (
      <details className="light-depth-card mb-10 rounded-2xl p-5 lg:hidden">
        <summary className="cursor-pointer font-display font-bold text-void">On this page</summary>
        <nav aria-label="Table of contents" className="mt-4">{list}</nav>
      </details>
    );
  }
  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate/70">On this page</p>
      {list}
    </nav>
  );
}

export function FaqBlock({ faq, heading = "Frequently asked questions" }: { faq: FaqItem[]; heading?: string }) {
  if (faq.length === 0) return null;
  return (
    <section aria-labelledby="faq-heading" className="mt-16">
      <h2 id="faq-heading" className="scroll-mt-24 font-display text-3xl sm:text-[2rem] font-bold tracking-tight text-void">
        {heading}
      </h2>
      <div className="mt-6 space-y-3">
        {faq.map((item) => (
          <div key={item.question} className="light-depth-card rounded-2xl p-6">
            <h3 className="font-display text-lg font-bold tracking-tight text-void">{item.question}</h3>
            <p className="mt-2 leading-relaxed text-slate">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AuthorBox() {
  const { author } = site;
  return (
    <aside className="light-depth-card mt-12 flex flex-col gap-5 rounded-3xl p-6 sm:flex-row sm:items-center sm:p-7">
      <Image
        src={author.image}
        alt={`${author.name}, ${author.title}`}
        width={160}
        height={200}
        className="h-20 w-20 shrink-0 rounded-2xl object-cover object-top"
      />
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate/70">About the author</p>
        <p className="mt-1 font-display text-lg font-bold tracking-tight text-void">{author.name}</p>
        <p className="mt-1 text-[15px] leading-relaxed text-slate">{author.bio}</p>
      </div>
    </aside>
  );
}

/** Cards linking to related posts and landing pages (by slug). */
export function RelatedPosts({ slugs, heading = "Keep reading" }: { slugs: string[]; heading?: string }) {
  const cards = slugs.map(getLinkCard).filter((card) => card !== null);
  if (cards.length === 0) return null;
  return (
    <section aria-labelledby="related-heading" className="mt-16">
      <h2 id="related-heading" className="font-display text-2xl font-bold tracking-tight text-void">{heading}</h2>
      <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <li key={card.href}>
            <Link href={card.href} className="light-depth-card light-depth-card-hover group flex h-full flex-col rounded-3xl p-6">
              <span className="text-xs font-bold uppercase tracking-widest text-signal">{card.kind}</span>
              <span className="mt-2 font-display text-lg font-bold leading-snug tracking-tight text-void">{card.title}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-slate">{card.description}</span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal">
                Read more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import CTA from "@/components/content/CTA";
import {
  AuthorBox,
  Breadcrumbs,
  Byline,
  FaqBlock,
  RelatedPosts,
  TableOfContents,
} from "@/components/content/PageParts";
import { getAllPosts, getPost } from "@/lib/content";
import { absoluteUrl, authorJsonLd, breadcrumbJsonLd, faqPageJsonLd, orgRef } from "@/lib/seo";

// Posts over this length get a table of contents.
const TOC_MIN_WORDS = 1200;

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  const title = post.seoTitle ?? post.title;
  return {
    title: post.seoTitle ? { absolute: post.seoTitle } : post.title,
    description: post.description,
    alternates: { canonical: path },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title,
      description: post.description,
      url: path,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [post.author],
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [{ url: "/images/og.jpg", alt: post.title }],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Body } = await import(`@/content/blog/${slug}.mdx`);
  const path = `/blog/${post.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ];
  const showToc = post.wordCount > TOC_MIN_WORDS && post.headings.length > 2;
  const related = post.related ?? [];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated,
    author: authorJsonLd(),
    publisher: orgRef,
    mainEntityOfPage: absoluteUrl(path),
    image: absoluteUrl("/images/og.jpg"),
    wordCount: post.wordCount,
    keywords: post.primaryKeyword,
  };

  return (
    <>
      <JsonLd
        data={[articleJsonLd, breadcrumbJsonLd(crumbs), ...(post.faq.length ? [faqPageJsonLd(post.faq)] : [])]}
      />
      <Header />
      <main className="flex-1">
        <article>
          <header className="relative overflow-hidden px-4 pt-10 pb-12 sm:pt-14">
            <div className="bg-grid-theme absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
            <div className="relative mx-auto max-w-3xl">
              <Breadcrumbs crumbs={crumbs} />
              <h1 className="mt-6 font-display text-4xl sm:text-5xl font-bold leading-[1.08] tracking-tight text-void">
                {post.title}
              </h1>
              <p className="mt-5 text-lg sm:text-xl leading-relaxed text-slate">{post.description}</p>
              <div className="mt-8">
                <Byline date={post.date} updated={post.updated} readingMinutes={post.readingMinutes} />
              </div>
            </div>
          </header>

          <div className="px-4 pb-20">
            <div
              className={
                showToc
                  ? "mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_240px]"
                  : "mx-auto max-w-3xl"
              }
            >
              <div className={showToc ? "mx-auto w-full max-w-3xl lg:order-1" : ""}>
                {showToc && <TableOfContents headings={post.headings} variant="inline" />}
                <Body />
                <FaqBlock faq={post.faq} />
                <CTA />
                <AuthorBox />
                <RelatedPosts slugs={related} />
              </div>
              {showToc && (
                <aside className="hidden lg:block lg:order-2">
                  <TableOfContents headings={post.headings} variant="sidebar" />
                </aside>
              )}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

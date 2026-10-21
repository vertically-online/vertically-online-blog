import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import CTA from "@/components/content/CTA";
import { Breadcrumbs } from "@/components/content/PageParts";
import { Eyebrow } from "@/components/ui/section-heading";
import { formatDate, getAllLandingPages, getAllPosts } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

const description =
  "Practical guides for roofing companies: getting more leads, answering them faster, quoting, and choosing the right software and services.";

export const metadata: Metadata = {
  title: "Roofing Business Guides",
  description,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/feed.xml" },
  },
  openGraph: {
    title: "Roofing Business Guides | Vertically",
    description,
    url: "/blog",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Vertically roofing business guides" }],
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const pages = getAllLandingPages();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 pt-10 pb-6 sm:pt-14">
          <div className="bg-grid-theme absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl">
            <Breadcrumbs crumbs={crumbs} />
            <div className="mt-8 max-w-3xl">
              <Eyebrow>Blog</Eyebrow>
              <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.06] tracking-tight text-void">
                Guides for roofing companies.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-slate">{description}</p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12" aria-label="Articles">
          <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="light-depth-card light-depth-card-hover group flex h-full flex-col rounded-3xl p-7"
                >
                  <time dateTime={post.updated} className="text-xs font-bold uppercase tracking-widest text-signal">
                    Updated {formatDate(post.updated)}
                  </time>
                  <h2 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-void">{post.title}</h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate">{post.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-signal">
                    Read the guide · {post.readingMinutes} min
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {pages.length > 0 && (
          <section className="px-4 pb-4" aria-labelledby="product-heading">
            <div className="mx-auto max-w-7xl">
              <h2 id="product-heading" className="font-display text-2xl font-bold tracking-tight text-void">
                What Vertically does
              </h2>
              <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {pages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/${page.slug}`}
                      className="premium-depth-card group flex h-full items-center gap-4 rounded-3xl p-6 text-white"
                    >
                      <span className="flex-1">
                        <span className="block font-display text-lg font-bold tracking-tight">{page.title}</span>
                        <span className="mt-1 block text-sm leading-relaxed text-[#C9D3DB]">{page.description}</span>
                      </span>
                      <ArrowRight className="h-5 w-5 shrink-0 text-sky-300 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <div className="mx-auto max-w-7xl px-4 pb-20">
          <CTA />
        </div>
      </main>
      <Footer />
    </>
  );
}

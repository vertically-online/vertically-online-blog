import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import Closing from "@/components/home/Closing";
import { Breadcrumbs } from "@/components/content/PageParts";
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
        <section className="page-hero wrap">
          <Breadcrumbs crumbs={crumbs} />
          <span className="eyebrow">Learn with Vertically</span>
          <h1>Guides for roofing companies.</h1>
          <p className="lede">{description}</p>
        </section>

        <section className="sheet" aria-label="Articles">
          <ul className="wrap grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="tile group">
                  <time dateTime={post.updated} className="eyebrow">
                    Updated {formatDate(post.updated)}
                  </time>
                  <h2 className="tile-h">{post.title}</h2>
                  <p className="tile-p">{post.description}</p>
                  <span className="tile-more">
                    Read the guide · {post.readingMinutes} min
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {pages.length > 0 && (
          <section className="sheet white" aria-labelledby="product-heading">
            <div className="wrap">
              <span className="eyebrow">Products</span>
              <h2 id="product-heading" className="big" style={{ marginTop: 14 }}>
                What Vertically does
              </h2>
              <ul className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2">
                {pages.map((page) => (
                  <li key={page.slug}>
                    <Link href={`/${page.slug}`} className="blue-tile grain group">
                      <span className="flex-1">
                        <span className="block font-display text-2xl font-[640] leading-tight tracking-tight">{page.title}</span>
                        <span className="mt-2 block text-[15px] leading-relaxed text-white/85">{page.description}</span>
                      </span>
                      <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        <Closing />
      </main>
      <Footer />
    </>
  );
}

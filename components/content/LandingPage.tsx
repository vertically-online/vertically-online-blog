import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Phone, Zap } from "@/components/ui/icons";
import { site } from "@/content/site";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import BookCallButton from "@/components/BookCallButton";
import JsonLd from "@/components/JsonLd";
import CTA from "@/components/content/CTA";
import MdxBody from "@/components/content/mdx-registry";
import { Breadcrumbs, Byline, FaqBlock, RelatedPosts } from "@/components/content/PageParts";
import { Eyebrow } from "@/components/ui/section-heading";
import { getLandingPage } from "@/lib/content";
import { absoluteUrl, breadcrumbJsonLd, faqPageJsonLd, orgRef } from "@/lib/seo";

export function landingMetadata(slug: string): Metadata {
  const page = getLandingPage(slug);
  if (!page) return {};
  const path = `/${page.slug}`;
  return {
    title: { absolute: page.seoTitle },
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: page.seoTitle,
      description: page.description,
      url: path,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.description,
      images: [{ url: "/images/og.jpg", alt: page.title }],
    },
  };
}

/**
 * Product landing page: keyword H1 with the CTA above the fold, an example
 * visual, the MDX body, FAQ (with schema), a closing CTA, and related links.
 */
export function LandingPage({ slug, eyebrow, visual }: { slug: string; eyebrow: string; visual: ReactNode }) {
  const page = getLandingPage(slug);
  if (!page) notFound();

  const path = `/${page.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: page.title, path },
  ];
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": page.schemaType,
    name: page.title,
    description: page.description,
    url: absoluteUrl(path),
    provider: orgRef,
    ...(page.schemaType === "Service"
      ? { serviceType: page.serviceType, areaServed: "US", audience: { "@type": "BusinessAudience", audienceType: "Roofing companies" } }
      : { applicationCategory: "BusinessApplication", operatingSystem: "Web", publisher: orgRef }),
  };

  return (
    <>
      <JsonLd data={[productJsonLd, breadcrumbJsonLd(crumbs), ...(page.faq.length ? [faqPageJsonLd(page.faq)] : [])]} />
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden px-4 pt-10 pb-16 sm:pt-14 lg:pb-20">
          <div className="bg-grid-theme absolute inset-0 opacity-50 pointer-events-none" aria-hidden="true" />
          <div className="relative mx-auto max-w-7xl">
            <Breadcrumbs crumbs={crumbs} />
            <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
              <div>
                <Eyebrow>{eyebrow}</Eyebrow>
                <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.05] tracking-tight text-void">
                  {page.title}
                </h1>
                <p className="mt-6 max-w-xl text-lg sm:text-xl leading-relaxed text-slate">{page.intro}</p>
                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-4">
                  <BookCallButton className="btn-modern-brand group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[1.1rem] px-6 py-3.5 text-base font-bold tracking-tight">
                    <Zap className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                    {site.hero.primaryCta}
                  </BookCallButton>
                  <a
                    href={site.contact.phoneHref}
                    className="btn-modern-dark group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[1.1rem] px-6 py-3.5 text-base font-bold tracking-tight"
                  >
                    <Phone className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                    Call {site.contact.phone}
                  </a>
                </div>
                <p className="mt-4 text-sm text-slate">{site.finalCta.reassurance}</p>
              </div>
              <div>{visual}</div>
            </div>
          </div>
        </section>

        <div className="px-4 pb-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 border-b border-void/10 pb-8">
              <Byline date={page.date} updated={page.updated} />
            </div>
            <MdxBody id={`landing/${page.slug}`} />
            <FaqBlock faq={page.faq} />
            <CTA />
            <RelatedPosts slugs={page.related ?? []} heading="Learn more" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/** Navy "example" card used as the hero visual on landing pages. */
export function ExampleCard({
  label,
  title,
  alt,
  children,
}: {
  label: string;
  title: string;
  /** Accessible description of the whole visual (the page's image alt). */
  alt: string;
  children: ReactNode;
}) {
  return (
    <figure className="premium-depth-card relative overflow-hidden rounded-[32px] p-6 sm:p-8 text-white" aria-label={alt}>
      <div className="flex items-center justify-between gap-4">
        <figcaption className="font-display text-lg font-bold tracking-tight">{title}</figcaption>
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#9fdaff] ring-1 ring-white/10">
          {label}
        </span>
      </div>
      <div className="mt-6 space-y-3">{children}</div>
    </figure>
  );
}

export function ExampleStep({
  icon,
  title,
  detail,
  tone = "sky",
}: {
  icon: ReactNode;
  title: string;
  detail: string;
  tone?: "sky" | "emerald" | "amber";
}) {
  const tint = {
    sky: "from-sky-400/25 border-sky-300/25 text-sky-300",
    emerald: "from-emerald-400/25 border-emerald-300/25 text-emerald-300",
    amber: "from-amber-400/25 border-amber-300/25 text-amber-300",
  }[tone];
  return (
    <div className="widget-depth flex items-center gap-4 rounded-2xl p-4">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br to-transparent ${tint}`}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-[13px] text-white/60">{detail}</p>
      </div>
    </div>
  );
}

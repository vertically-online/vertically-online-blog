"use client";

import { home } from "@/content/home";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd, organizationJsonLd } from "@/lib/seo";

// Built here, in client components that take no props, rather than in the
// server layout/page: the JSON-LD is still server-rendered into the HTML, but
// Next doesn't embed a second copy of it in the page's RSC payload.

export function OrganizationStructuredData() {
  return <JsonLd data={organizationJsonLd()} />;
}

/** Homepage FAQPage: exactly the visible Commonly Asked Questions text. */
export function HomeFaqStructuredData() {
  return (
    <JsonLd
      data={faqPageJsonLd([
        ...home.faq.videos.map((v) => ({ question: v.question, answer: v.answer })),
        ...home.faq.more,
      ])}
    />
  );
}

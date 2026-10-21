"use client";

import { site } from "@/content/site";
import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd, organizationJsonLd } from "@/lib/seo";

// Built here, in client components that take no props, rather than in the
// server layout/page: the JSON-LD is still server-rendered into the HTML, but
// Next doesn't embed a second copy of it in the page's RSC payload.

export function OrganizationStructuredData() {
  return <JsonLd data={organizationJsonLd()} />;
}

/** Homepage FAQPage: the objection Q&As plus the FAQ, both visible on the page. */
export function HomeFaqStructuredData() {
  return (
    <JsonLd
      data={faqPageJsonLd([
        ...site.objections.items.map((item) => ({ question: item.label, answer: item.answer })),
        ...site.faq.items,
      ])}
    />
  );
}

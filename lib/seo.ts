import { site } from "@/content/site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vertically.online";

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString();

const ORG_ID = `${siteUrl}/#organization`;

/** The business, referenced by @id from every Article/Service on the site. */
export function organizationJsonLd() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.brand.name,
    legalName: site.legal.entity,
    description: site.seo.description,
    url: siteUrl,
    logo: absoluteUrl("/images/brand/icon-512.png"),
    email: site.contact.email,
    telephone: site.contact.phoneHref.replace("tel:", ""),
    areaServed: "US",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.contact.addressLocality,
      addressRegion: site.contact.addressRegion,
      addressCountry: "US",
    },
    founder: { "@type": "Person", name: site.author.name, jobTitle: site.author.title },
    ...(sameAs.length > 0 && { sameAs }),
  };
}

export const orgRef = { "@id": ORG_ID };

export function authorJsonLd() {
  return {
    "@type": "Person",
    name: site.author.name,
    jobTitle: site.author.title,
    image: absoluteUrl(site.author.image),
    worksFor: orgRef,
  };
}

export function faqPageJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

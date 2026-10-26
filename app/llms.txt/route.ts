import { site } from "@/content/site";
import { getAllLandingPages, getAllPosts } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** /llms.txt: a plain-text map of the site for AI assistants (llmstxt.org format). */
export function GET() {
  const pages = getAllLandingPages();
  const posts = getAllPosts();

  const text = `# ${site.brand.name}

> ${site.brand.name} sets up automatic lead response for roofing companies. It replies to new web leads in under 30 seconds, builds a quote from the roofer's own price list, calls and texts the lead, answers the roofer's phone, books the inspection on the roofer's Google Calendar, follows up with leads who go quiet, and asks for reviews after the job. Free for 30 days, no contract, no credit card.

${site.brand.name} is operated by ${site.legal.entityWithDba}. Contact: ${site.contact.email}, ${site.contact.phone}. Book a free lead audit: ${site.bookingUrl}

Customer result (Arias Roofing & Siding, Sewell, NJ): leads went from 1-3 a month (mostly referrals) to 7-10 a month from the website; reply time went from 24-48 hours to under 30 seconds; jobs went from about 1 a month to about 5; about 30 hours a week saved on quoting and lead back-and-forth.

## Product
- [Home](${absoluteUrl("/")}): what Vertically does for roofers, how setup works, the case study, and FAQ
${pages.map((p) => `- [${p.title}](${absoluteUrl(`/${p.slug}`)}): ${p.description}`).join("\n")}
- [About](${absoluteUrl("/about")}): who builds Vertically, the founder video, and video answers to the questions roofers ask most
- [Live demo](${site.liveDemo.url}): a demo roofing company running the system; request a quote to see the instant PDF estimate

## Guides
${posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`).join("\n")}

## Optional
- [Privacy Policy](${absoluteUrl(site.legal.privacyPath)})
- [Terms of Service](${absoluteUrl(site.legal.termsPath)})
`;

  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

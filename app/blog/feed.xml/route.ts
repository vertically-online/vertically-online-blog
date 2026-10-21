import { site } from "@/content/site";
import { getAllPosts } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

export function GET() {
  const posts = getAllPosts();
  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escape(post.description)}</description>
      <pubDate>${rfc822(post.date)}</pubDate>
      <author>${site.contact.email} (${escape(post.author)})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.brand.name)} Blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>Guides for roofing companies on leads, response time, and quoting.</description>
    <language>en-us</language>
    <atom:link href="${absoluteUrl("/blog/feed.xml")}" rel="self" type="application/rss+xml" />
    ${posts[0] ? `<lastBuildDate>${rfc822(posts[0].updated)}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllLandingPages, getAllPosts } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

const day = (iso: string) => new Date(`${iso}T12:00:00Z`);

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const pages = getAllLandingPages();
  const legalUpdated = new Date(`${site.legal.effectiveDate} 12:00 UTC`);
  const latestPost = posts.map((p) => p.updated).sort().at(-1);

  return [
    { url: siteUrl, lastModified: day(site.seo.homeUpdated), changeFrequency: "weekly", priority: 1 },
    ...pages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: day(page.updated),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...(latestPost
      ? [{ url: `${siteUrl}/blog`, lastModified: day(latestPost), changeFrequency: "weekly" as const, priority: 0.7 }]
      : []),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: day(post.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${siteUrl}/about`, lastModified: day(site.seo.homeUpdated), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/privacy`, lastModified: legalUpdated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: legalUpdated, changeFrequency: "yearly", priority: 0.3 },
  ];
}

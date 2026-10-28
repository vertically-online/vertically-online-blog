import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

/**
 * Reads blog posts (content/blog/*.mdx) and landing pages
 * (content/landing/*.mdx). Frontmatter is parsed here with gray-matter; the
 * MDX body itself is compiled by @next/mdx when a route imports the file
 * (remark-frontmatter keeps the YAML block out of the rendered output).
 * scripts/check-content.mjs validates the same files at build time.
 */

export type FaqItem = { question: string; answer: string };

type BaseFrontmatter = {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated: string;
  author: string;
  primaryKeyword: string;
  faq: FaqItem[];
};

export type PostFrontmatter = BaseFrontmatter & {
  /** Optional shorter <title> when the H1 is long. */
  seoTitle?: string;
  /** Slugs of hand-picked related posts/pages. */
  related?: string[];
  /** Set on posts written by the n8n blog pipeline: name-only byline, no author box. */
  generated?: boolean;
  /** Exact publish time (ISO), set by the pipeline so same-day posts sort newest first. */
  publishedAt?: string;
  /** Hero image from public/images/blog-stock (manifest.json), also used as og:image. */
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Shown under the image only when the image license asks for attribution. */
  imageCredit?: string;
  imageCreditUrl?: string;
};

export type LandingFrontmatter = BaseFrontmatter & {
  seoTitle: string;
  /** Hero intro under the H1. */
  intro: string;
  schemaType: "Service" | "SoftwareApplication";
  serviceType: string;
  related?: string[];
};

export type Heading = { depth: 2 | 3; text: string; id: string };

export type Doc<T> = T & { wordCount: number; readingMinutes: number; headings: Heading[] };

const ROOT = path.join(process.cwd(), "content");

function stripMarkdown(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

function load<T extends BaseFrontmatter>(dir: "blog" | "landing"): Doc<T>[] {
  const folder = path.join(ROOT, dir);
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(folder, file), "utf8");
      const { data, content } = matter(raw);

      // Same slug algorithm as rehype-slug, so TOC links match heading ids.
      const slugger = new GithubSlugger();
      const headings: Heading[] = [];
      for (const line of content.split("\n")) {
        const match = /^(##|###)\s+(.+?)\s*$/.exec(line);
        if (!match) continue;
        const text = stripMarkdown(match[2]);
        headings.push({ depth: match[1].length as 2 | 3, text, id: slugger.slug(text) });
      }

      const words = content
        .replace(/<[^>]+>/g, " ")
        .split(/\s+/)
        .filter(Boolean).length;

      // YAML turns unquoted dates into Date objects; keep them as YYYY-MM-DD.
      for (const key of ["date", "updated"]) {
        if (data[key] instanceof Date) data[key] = data[key].toISOString().slice(0, 10);
      }

      return {
        ...(data as T),
        faq: (data.faq ?? []) as FaqItem[],
        wordCount: words,
        readingMinutes: Math.max(1, Math.round(words / 230)),
        headings,
      };
    });
}

// Newest first. Pipeline posts carry an exact publishedAt time; hand-written posts
// only have a date, so they count as published at noon UTC that day.
const publishedTime = (post: PostFrontmatter) => Date.parse(post.publishedAt ?? `${post.date}T12:00:00Z`) || 0;

export function getAllPosts() {
  return load<PostFrontmatter>("blog").sort((a, b) => publishedTime(b) - publishedTime(a));
}

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getLandingPage(slug: string) {
  return load<LandingFrontmatter>("landing").find((page) => page.slug === slug);
}

export function getAllLandingPages() {
  return load<LandingFrontmatter>("landing");
}

/** Title + path + description for any internal page, for related-links cards. */
export function getLinkCard(slug: string) {
  const post = getPost(slug);
  if (post) return { href: `/blog/${post.slug}`, title: post.title, description: post.description, kind: "Guide" as const };
  const page = getLandingPage(slug);
  if (page) return { href: `/${page.slug}`, title: page.title, description: page.description, kind: "Product" as const };
  return null;
}

/** "October 21, 2026" for display. Dates in frontmatter are YYYY-MM-DD. */
export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

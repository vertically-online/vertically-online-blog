// Build-time content checks for content/blog and content/landing (runs as
// `prebuild`, so it also gates Vercel deploys). Fails the build on:
//   - "[[" left in content (e.g. [[NEEDS SOURCE: ...]] placeholders)
//   - missing or over-long (>160 chars) descriptions, missing required fields
//   - images without alt text
//   - duplicate slugs, or a slug that doesn't match its file name
// Warns (doesn't fail) on <title> over 60 characters.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "content");
const REQUIRED = ["title", "description", "slug", "date", "updated", "author", "primaryKeyword"];
const LANDING_REQUIRED = ["seoTitle", "intro", "schemaType", "serviceType"];
const errors = [];
const warnings = [];
const slugs = new Map();

for (const dir of ["blog", "landing"]) {
  const folder = path.join(ROOT, dir);
  if (!fs.existsSync(folder)) continue;
  for (const file of fs.readdirSync(folder).filter((f) => f.endsWith(".mdx"))) {
    const rel = `content/${dir}/${file}`;
    const raw = fs.readFileSync(path.join(folder, file), "utf8");
    const { data, content } = matter(raw);

    raw.split("\n").forEach((line, i) => {
      if (line.includes("[[")) errors.push(`${rel}:${i + 1} unresolved placeholder: ${line.trim().slice(0, 90)}`);
    });

    for (const key of [...REQUIRED, ...(dir === "landing" ? LANDING_REQUIRED : [])]) {
      if (data[key] === undefined || data[key] === "") errors.push(`${rel}: missing frontmatter "${key}"`);
    }
    if (typeof data.description === "string" && data.description.length > 160) {
      errors.push(`${rel}: description is ${data.description.length} characters (max 160)`);
    }
    if (typeof data.description === "string" && data.description.length < 140) {
      warnings.push(`${rel}: description is ${data.description.length} characters (aim for 140-158)`);
    }
    // seoTitle is used as-is; a blog post without one gets " | Vertically" from the title template.
    const title = data.seoTitle ?? `${data.title} | Vertically`;
    if (typeof title === "string" && title.length > 60) {
      warnings.push(`${rel}: <title> is ${title.length} characters (aim for 60 or fewer): ${title}`);
    }
    if (!Array.isArray(data.faq) || data.faq.some((q) => !q?.question || !q?.answer)) {
      errors.push(`${rel}: "faq" must be a list of { question, answer }`);
    }

    const expected = file.replace(/\.mdx$/, "");
    if (data.slug !== expected) errors.push(`${rel}: slug "${data.slug}" doesn't match file name "${expected}"`);
    if (slugs.has(data.slug)) errors.push(`${rel}: duplicate slug "${data.slug}" (also ${slugs.get(data.slug)})`);
    slugs.set(data.slug, rel);

    for (const match of content.matchAll(/!\[([^\]]*)\]\(/g)) {
      if (!match[1].trim()) errors.push(`${rel}: markdown image without alt text`);
    }
    for (const match of content.matchAll(/<(img|Image)\b[^>]*>/g)) {
      if (!/\balt\s*=\s*["{][^"}]/.test(match[0])) errors.push(`${rel}: <${match[1]}> without alt text`);
    }
  }
}

// Copy files outside the MDX folders must not ship placeholders either.
for (const rel of ["content/home.ts", "content/site.ts"]) {
  const file = path.join(process.cwd(), rel);
  if (!fs.existsSync(file)) continue;
  fs.readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    // In code, "[[" is also nested-array syntax; match the placeholder form only.
    if (/\[\[[A-Z][A-Z ]{2,}/.test(line)) errors.push(`${rel}:${i + 1} unresolved placeholder: ${line.trim().slice(0, 90)}`);
  });
}

// Owner sign-offs (content/approvals.ts) block production deploys only, so
// previews can still be built for review.
const approvalsFile = path.join(process.cwd(), "content/approvals.ts");
if (fs.existsSync(approvalsFile)) {
  const pending = [...fs.readFileSync(approvalsFile, "utf8").matchAll(/id: "([^"]+)",\s*what: (?:"|')(.+?)(?:"|'),\s*approved: false/gs)];
  const isProduction = process.env.VERCEL_ENV === "production";
  for (const [, id, what] of pending) {
    const message = `awaiting owner approval [${id}]: ${what}`;
    if (isProduction) errors.push(message);
    else warnings.push(message);
  }
}

for (const warning of warnings) console.warn(`content check warning: ${warning}`);
if (errors.length) {
  console.error(`\ncontent check failed (${errors.length}):\n  - ${errors.join("\n  - ")}\n`);
  process.exit(1);
}
console.log(`content check passed (${slugs.size} pages)`);

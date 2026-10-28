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

    if (data.generated) checkGenerated(rel, data, content);

    for (const match of content.matchAll(/!\[([^\]]*)\]\(/g)) {
      if (!match[1].trim()) errors.push(`${rel}: markdown image without alt text`);
    }
    for (const match of content.matchAll(/<(img|Image)\b[^>]*>/g)) {
      if (!/\balt\s*=\s*["{][^"}]/.test(match[0])) errors.push(`${rel}: <${match[1]}> without alt text`);
    }
  }
}

// Posts from the n8n blog pipeline get stricter checks than hand-written ones,
// because nobody reviews them before they go live.
function checkGenerated(rel, data, content) {
  const AUTHORS = ["Toby Karamoutchev", "Bogdan Stere"];
  if (!AUTHORS.includes(data.author)) errors.push(`${rel}: generated post author must be one of ${AUTHORS.join(", ")}`);
  if (typeof data.title === "string" && data.title.length > 60) errors.push(`${rel}: title is ${data.title.length} characters (max 60)`);
  if (typeof data.description === "string" && data.description.length < 140) errors.push(`${rel}: description under 140 characters`);
  if (!data.image || !data.imageAlt) errors.push(`${rel}: generated post needs image and imageAlt`);
  else if (!fs.existsSync(path.join(process.cwd(), "public", data.image))) errors.push(`${rel}: image ${data.image} not found in public/`);
  if (!Array.isArray(data.faq) || data.faq.length < 4 || data.faq.length > 6) errors.push(`${rel}: generated post needs 4-6 FAQ items`);
  const text = `${data.title}\n${data.description}\n${content}\n${(data.faq ?? []).map((q) => `${q.question} ${q.answer}`).join("\n")}`;
  const banned = [
    [/\b(we|our team|I) (tested|visited|interviewed|surveyed|found that)\b/i, "first-person experience claim"],
    [/\bin (our|my) experience\b/i, "first-person experience claim"],
    [/vertically(?:(?!\bnot\b|\bnever\b|n't\b|\bno\b)[^.\n]){0,100}\b(answers?|picks? up|handles?) (your |the |inbound |incoming )?(phone|calls|business line)/i, "says Vertically answers calls"],
    [/missed[- ]call text/i, "missed-call text claim"],
    [/\b(5x|4\.2x|2,000\+)/i, "banned stat"],
    [/(answers?|replies to|responds to) every lead in (under )?30 seconds/i, "generic 30-second claim"],
    [/\$\d[\d,]*\s*(\/|per )\s*(mo|month)[^.]{0,60}vertically|vertically[^.]{0,60}\$\d/i, "Vertically pricing"],
  ];
  for (const [re, why] of banned) if (re.test(text)) errors.push(`${rel}: ${why}: "${text.match(re)[0]}"`);
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

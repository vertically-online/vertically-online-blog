// Builds public/icons.svg: one <symbol> per icon listed in
// components/ui/icons.tsx, drawn from lucide-react itself so the artwork
// matches exactly. Runs in prebuild; also `npm run icons`.
import fs from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as lucide from "lucide-react";

const registry = fs.readFileSync(path.join(process.cwd(), "components/ui/icons.tsx"), "utf8");
const names = [...registry.matchAll(/= icon\("([A-Za-z0-9]+)"\)/g)].map((m) => m[1]);

const symbols = names.map((name) => {
  const Icon = lucide[name];
  if (!Icon) throw new Error(`lucide-react has no icon named ${name}`);
  const markup = renderToStaticMarkup(createElement(Icon));
  const inner = markup.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  return `<symbol id="${name}" viewBox="0 0 24 24">${inner}</symbol>`;
});

const out = `<svg xmlns="http://www.w3.org/2000/svg">${symbols.join("")}</svg>\n`;
fs.writeFileSync(path.join(process.cwd(), "public/icons.svg"), out);
console.log(`icons: wrote ${names.length} symbols to public/icons.svg (${(out.length / 1024).toFixed(1)} KB)`);

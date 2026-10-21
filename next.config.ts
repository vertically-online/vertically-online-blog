import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.vertically.online" }],
        destination: "https://vertically.online/:path*",
        permanent: true, // 308
      },
    ];
  },
};

// Blog posts and landing-page bodies are .mdx files under content/, imported
// by their routes. Plugins are named as strings so Turbopack can load them:
// gfm for tables, frontmatter so the YAML block isn't rendered (gray-matter
// reads it instead, see lib/content.ts), slug for table-of-contents anchors.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", "remark-frontmatter"],
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);

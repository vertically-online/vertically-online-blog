import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import CTA from "@/components/content/CTA";
import { AriasStory, DemoCallout, LinkCard, Recommendation } from "@/components/content/Inline";

/**
 * How Markdown renders in blog posts and landing-page bodies: the site's
 * type scale and colors (there's no typography plugin), plus the components
 * MDX files may use inline.
 */
const components: MDXComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-14 mb-4 scroll-mt-24 font-display text-3xl sm:text-[2rem] font-bold leading-tight tracking-tight text-void" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-10 mb-3 scroll-mt-24 font-display text-xl sm:text-[1.375rem] font-bold tracking-tight text-void" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => <p className="mb-5 text-[17px] sm:text-lg leading-[1.75] text-slate" {...props} />,
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const className =
      "font-medium text-signal underline decoration-signal/30 underline-offset-[3px] transition-colors hover:decoration-signal";
    if (href.startsWith("/")) return <Link href={href} className={className} {...props} />;
    return <a href={href} className={className} target="_blank" rel="noopener" {...props} />;
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-6 list-disc space-y-2 pl-6 text-[17px] sm:text-lg leading-[1.7] text-slate marker:text-[#008FD0]" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6 text-[17px] sm:text-lg leading-[1.7] text-slate marker:font-semibold marker:text-[#008FD0]" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...props} />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-void" {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-8 border-l-4 border-[#008FD0] pl-5 text-lg italic text-void" {...props} />
  ),
  hr: () => <hr className="my-12 border-void/10" />,
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="light-depth-card my-8 overflow-x-auto rounded-2xl">
      <table className="w-full min-w-[640px] border-collapse text-left text-[15px]" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => <thead className="bg-void text-white" {...props} />,
  th: (props: ComponentPropsWithoutRef<"th">) => <th className="px-4 py-3 font-display font-semibold tracking-tight" {...props} />,
  td: (props: ComponentPropsWithoutRef<"td">) => <td className="border-t border-void/10 px-4 py-3 align-top text-slate" {...props} />,
  img: ({ alt = "", ...props }: ComponentPropsWithoutRef<"img">) => (
    // MDX images are rare and unsized; scripts/check-content.mjs enforces alt text.
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} loading="lazy" decoding="async" className="my-8 rounded-2xl" {...props} />
  ),
  CTA,
  Recommendation,
  AriasStory,
  DemoCallout,
  LinkCard,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

import type { ReactNode } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { site } from "@/content/site";

// Layout only: the policy text itself lives in app/privacy and app/terms.
export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="page-hero wrap">
          <span className="eyebrow">Legal</span>
          <h1>{title}</h1>
          <p className="lede">Last updated: {site.legal.effectiveDate}</p>
        </section>
        <div className="sheet">
          <article className="wrap">
            <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-6 sm:p-10 text-[var(--slate)] leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-[var(--ink)] [&_h2]:mt-10 [&_h2]:mb-3 [&_h2:first-child]:mt-0 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_a]:text-[var(--blue-deep)] [&_a]:underline [&_strong]:text-[var(--ink)] [&_code]:text-sm [&_code]:break-all">
              {children}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

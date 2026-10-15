import type { ReactNode } from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { site } from "@/content/site";

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-16 text-slate leading-relaxed [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-void [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2 [&_a]:text-signal [&_a]:underline [&_strong]:text-void [&_code]:text-sm [&_code]:break-all">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-void">
            {title}
          </h1>
          <p className="mt-2 mb-10 text-sm">Last updated: {site.legal.effectiveDate}</p>
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}

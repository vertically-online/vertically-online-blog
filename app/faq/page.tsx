import type { Metadata } from "next";
import "../home.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import Closing from "@/components/home/Closing";
import { FaqGrid } from "@/components/home/CommonQuestions";
import { Breadcrumbs } from "@/components/content/PageParts";
import { home } from "@/content/home";
import { breadcrumbJsonLd } from "@/lib/seo";

const description =
  "Straight answers to the questions roofing owners ask about Vertically: cost, setup time, quotes, email and calendar, and the free 30 days.";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Vertically",
    description,
    url: "/faq",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Vertically FAQ" }],
  },
};

/**
 * Every question in one place. The homepage shows the first seven on phones
 * and links here. FAQPage structured data stays on the homepage only, so
 * there is one canonical FAQ markup source.
 */
export default function FaqPage() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs)]} />
      <Header />
      <main className="flex-1">
        <section className="page-hero wrap">
          <Breadcrumbs crumbs={crumbs} />
          <h1>{home.faq.heading}</h1>
          <p className="lede">{home.faq.sub}</p>
        </section>
        <section className="sheet faq-blue grain" id="faq">
          <div className="wrap">
            <FaqGrid all />
          </div>
        </section>
        <Closing />
      </main>
      <Footer />
    </>
  );
}

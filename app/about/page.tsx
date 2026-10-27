import type { Metadata } from "next";
import "../home.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/JsonLd";
import BookCallButton from "@/components/BookCallButton";
import Closing from "@/components/home/Closing";
import InlineVideo from "@/components/home/InlineVideo";
import ObjectionPlayer from "@/components/home/ObjectionPlayer";
import { Breadcrumbs } from "@/components/content/PageParts";
import { site } from "@/content/site";
import { home } from "@/content/home";
import { absoluteUrl, authorJsonLd, breadcrumbJsonLd, orgRef } from "@/lib/seo";

const description =
  "Meet the team behind Vertically: automatic lead response for roofing companies. Watch the founder video and his answers to the questions roofers ask most.";

export const metadata: Metadata = {
  title: "About Vertically",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Vertically",
    description,
    url: "/about",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "About Vertically" }],
  },
};

export default function AboutPage() {
  const { founderVideo, items, eyebrow, heading } = home.beliefs;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Vertically",
    description,
    url: absoluteUrl("/about"),
    about: orgRef,
    mainEntity: authorJsonLd(),
  };

  return (
    <>
      <JsonLd data={[aboutJsonLd, breadcrumbJsonLd(crumbs)]} />
      <Header />
      <main className="flex-1">
        <section className="page-hero wrap">
          <Breadcrumbs crumbs={crumbs} />
          <span className="eyebrow">About Vertically</span>
          <h1>Built so roofers never miss a lead.</h1>
          <p className="lede">
            Vertically sets up automatic lead response for roofing companies: every lead answered in under 30 seconds,
            quoted from your own price list, and booked onto your Google Calendar. {site.contact.foundedLine}.
          </p>
        </section>

        <section className="sheet" id="founder">
          <div className="wrap">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="big" style={{ marginTop: 14, maxWidth: 1100 }}>{heading}</h2>
          </div>
          <div className="wrap beliefs">
            <InlineVideo
              className="founder"
              src={founderVideo.video}
              poster={founderVideo.poster}
              label={`${founderVideo.label}: ${site.author.name}, ${site.author.title} (${founderVideo.duration})`}
              chip={founderVideo.label}
            />
            <div>
              <span className="eyebrow">{founderVideo.label}</span>
              <h3 className="founder-name">{site.author.name}</h3>
              <p className="faq-sub">{site.author.bio}</p>
              <div style={{ marginTop: 34 }}>
                {items.map(([title, body]) => (
                  <div key={title} className="bl">
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                ))}
              </div>
              <BookCallButton className="btn btn-navy">{site.hero.primaryCta}</BookCallButton>
            </div>
          </div>
        </section>

        <section className="sheet white" id="videos">
          <div className="wrap">
            <h2 className="big">Your questions, answered on video</h2>
            <p className="faq-sub">{home.faq.sub}</p>
            <ObjectionPlayer />
          </div>
        </section>
        <Closing />
      </main>
      <Footer />
    </>
  );
}

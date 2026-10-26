"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { home } from "@/content/home";
import BookCallButton from "@/components/BookCallButton";
import { ArrowRight, Plus, PlayTriangle } from "@/components/home/svg";

/**
 * Commonly Asked Questions (#faq): the six founder questions as a 3x2 grid
 * of short answers, linking to the videos on /about, then the text-only
 * questions. The FAQPage JSON-LD (components/StructuredData) uses this text.
 */
export default function CommonQuestions() {
  const { eyebrow, heading, sub, videos, videosLink, videosHref, moreHeading, more, cta } = home.faq;

  return (
    <section className="sheet" id="faq">
      <div className="wrap">
        <div className="sec-head" data-sr>
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="big" style={{ marginTop: 14 }}>{heading}</h2>
            <p className="faq-sub">{sub}</p>
          </div>
          <Link className="btn btn-navy" href={videosHref}>
            <PlayTriangle />
            {videosLink}
          </Link>
        </div>

        <div className="qgrid">
          {videos.map((v) => (
            <article key={v.id} className="qcard" data-sr>
              <h3>{v.question}</h3>
              <p>{v.answer}</p>
              <Link href={`/about#q-${v.id}`} className="qwatch">
                Watch the answer ({v.duration})
                <ArrowRight />
              </Link>
            </article>
          ))}
        </div>

        <div className="more-q">
          <h3 className="mh" data-sr>{moreHeading}</h3>
          <div className="qlist">
            {more.map((q) => (
              <details key={q.question}>
                <summary>
                  <h3>{q.question}</h3>
                  <i aria-hidden="true"><Plus /></i>
                </summary>
                <p>{q.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="qcta" data-sr>
          <p>
            {cta} Call <a href={site.contact.phoneHref}>{site.contact.phone}</a> or start free for 30 days.
          </p>
          <BookCallButton className="btn btn-navy">{site.hero.primaryCta}</BookCallButton>
        </div>
      </div>
    </section>
  );
}

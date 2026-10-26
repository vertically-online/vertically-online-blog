"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { home } from "@/content/home";
import BookCallButton from "@/components/BookCallButton";
import { ArrowRight, Plus } from "@/components/home/svg";

/** One question as a dropdown card: the question shows, the answer reveals. */
function QuestionCard({ question, answer, watchHref, duration }: { question: string; answer: string; watchHref?: string; duration?: string }) {
  return (
    <details className="qd">
      <summary>
        <h3>{question}</h3>
        <i aria-hidden="true"><Plus /></i>
      </summary>
      <div className="qd-body">
        <p>{answer}</p>
        {watchHref && (
          <Link href={watchHref} className="qwatch">
            Watch the answer{duration ? ` (${duration})` : ""}
            <ArrowRight />
          </Link>
        )}
      </div>
    </details>
  );
}

/**
 * Commonly Asked Questions (#faq): the six founder questions (3x2) and the
 * eight text questions (4x2) as dropdown cards. Answers stay in the HTML
 * while collapsed, so the FAQPage JSON-LD matches page text. The founder
 * questions link to their videos on /about.
 */
export default function CommonQuestions() {
  const { eyebrow, heading, sub, videos, moreHeading, more, cta } = home.faq;

  return (
    <section className="sheet faq-blue grain" id="faq">
      <div className="wrap">
        <div data-sr>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="big" style={{ marginTop: 14 }}>{heading}</h2>
          <p className="faq-sub">{sub}</p>
        </div>

        <div className="qgrid">
          {videos.map((v) => (
            <QuestionCard key={v.id} question={v.question} answer={v.answer} watchHref={`/about#q-${v.id}`} duration={v.duration} />
          ))}
        </div>

        <h3 className="mh" data-sr>{moreHeading}</h3>
        <div className="qgrid four">
          {more.map((q) => (
            <QuestionCard key={q.question} question={q.question} answer={q.answer} />
          ))}
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

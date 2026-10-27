"use client";

import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { home } from "@/content/home";
import BookCallButton from "@/components/BookCallButton";
import { ArrowRight, Plus } from "@/components/home/svg";

const CLOSE_MS = 480;

/** Eases a card's answer closed, then actually closes the <details>. */
function closeCard(el: HTMLDetailsElement) {
  if (!el.open || el.classList.contains("closing")) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.open = false;
    return;
  }
  el.classList.add("closing");
  window.setTimeout(() => {
    el.open = false;
    el.classList.remove("closing");
  }, CLOSE_MS);
}

/** One question as a dropdown card: the question shows, the answer floats open over the cards below. */
function QuestionCard({ question, answer, watchHref, duration }: { question: string; answer: string; watchHref?: string; duration?: string }) {
  const ref = useRef<HTMLDetailsElement>(null);

  // Opening and closing are handled here (not by the browser) so closing can
  // animate too. Only one answer floats at a time: opening a card eases any
  // other open card closed.
  const onSummaryClick = (e: MouseEvent) => {
    e.preventDefault();
    const el = ref.current;
    if (!el) return;
    if (el.open) {
      closeCard(el);
      return;
    }
    document.querySelectorAll<HTMLDetailsElement>("details.qd[open]").forEach(closeCard);
    el.open = true;
  };

  return (
    <details className="qd" ref={ref}>
      <summary onClick={onSummaryClick}>
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
 * Commonly Asked Questions (#faq): all fourteen questions in one 2x7 grid of
 * dropdown cards (the first seven on phones), the six founder questions first. Answers stay in the HTML
 * while collapsed, so the FAQPage JSON-LD matches page text. The founder
 * questions link to their videos on /about.
 */
/** All fourteen questions as dropdown cards, the founder questions first. */
export function FaqGrid({ all = false }: { all?: boolean }) {
  const { videos, more } = home.faq;
  return (
    <div className={all ? "qgrid all" : "qgrid"}>
      {videos.map((v) => (
        <QuestionCard key={v.id} question={v.question} answer={v.answer} watchHref={`/about#q-${v.id}`} duration={v.duration} />
      ))}
      {more.map((q) => (
        <QuestionCard key={q.question} question={q.question} answer={q.answer} />
      ))}
    </div>
  );
}

export default function CommonQuestions() {
  const { heading, sub, cta } = home.faq;

  return (
    <section className="sheet faq-blue grain" id="faq">
      <div className="wrap">
        <div data-sr>
          <h2 className="big">{heading}</h2>
          <p className="faq-sub">{sub}</p>
        </div>

        {/* Phones show the first seven, then a link to the full FAQ page. */}
        <FaqGrid />
        <Link href="/faq" className="btn btn-white faq-more">
          See all questions <ArrowRight />
        </Link>

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

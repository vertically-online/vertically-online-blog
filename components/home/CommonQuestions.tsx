"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { home } from "@/content/home";
import BookCallButton from "@/components/BookCallButton";
import { Plus } from "@/components/home/svg";
import InlineVideo from "@/components/home/InlineVideo";

/**
 * Commonly Asked Questions (#faq): question list on the left, one video
 * player on the right that switches with the selected question and plays
 * in place. On mobile the player opens under the selected question. Every
 * answer and transcript stays in the HTML (inactive ones hidden), so the
 * FAQPage JSON-LD matches page text.
 */
export default function CommonQuestions() {
  const { eyebrow, heading, sub, videos, moreHeading, more, cta } = home.faq;
  const [active, setActive] = useState(0);
  const current = videos[active];

  return (
    <section className="sheet" id="faq">
      <div className="wrap">
        <div data-sr>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="big" style={{ marginTop: 14 }}>{heading}</h2>
          <p className="faq-sub">{sub}</p>
        </div>

        <div className="oq">
          {videos.map((v, i) => (
            <h3 key={v.id} className="oq-q" style={{ order: i * 2 }}>
              <button
                type="button"
                aria-expanded={active === i}
                aria-controls="oq-panel"
                className={active === i ? "on" : undefined}
                onClick={() => setActive(i)}
              >
                <span className="n">{i + 1}</span>
                <span className="t">{v.question}</span>
                <span className="d">{v.duration}</span>
              </button>
            </h3>
          ))}

          <div id="oq-panel" className="oq-panel" style={{ order: active * 2 + 1 }}>
            <InlineVideo
              key={current.id}
              className="oq-video"
              src={current.video}
              poster={current.poster}
              label={`${current.question} (${current.duration})`}
              chip="Watch the answer"
            />
            <div className="oq-text">
              {videos.map((v, i) => (
                <div key={v.id} hidden={active !== i}>
                  <p className="oq-h">{v.question}</p>
                  <p className="ans">{v.answer}</p>
                  <details>
                    <summary>Read the full answer</summary>
                    <p>{v.transcript}</p>
                  </details>
                </div>
              ))}
            </div>
          </div>
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

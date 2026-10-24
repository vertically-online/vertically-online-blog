"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { home } from "@/content/home";
import BookCallButton from "@/components/BookCallButton";
import { PlayTriangle, Plus } from "@/components/home/svg";
import VideoDialog, { type DialogVideo } from "@/components/home/VideoDialog";

/**
 * Commonly Asked Questions (#faq): the founder's objection videos with
 * visible text answers and transcripts, then the text-only questions. The
 * FAQPage JSON-LD (components/StructuredData) uses exactly this text.
 */
export default function CommonQuestions() {
  const { eyebrow, heading, sub, videos, moreHeading, more, cta } = home.faq;
  const [open, setOpen] = useState<DialogVideo | null>(null);

  return (
    <section className="sheet" id="faq">
      <div className="wrap">
        <div data-sr>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="big" style={{ marginTop: 14 }}>{heading}</h2>
          <p className="faq-sub">{sub}</p>
        </div>

        <div className="qgrid">
          {videos.map((v) => (
            <article key={v.id} className="qcard" data-sr>
              <button
                type="button"
                className="poster"
                aria-label={`Watch the answer: ${v.question} (${v.duration})`}
                onClick={() => setOpen({ title: v.question, video: v.video, poster: v.poster, captions: v.captions })}
              >
                <Image src={v.poster} alt="" width={540} height={960} sizes="(max-width: 640px) 92vw, (max-width: 980px) 45vw, 380px" />
                <span className="dur">{v.duration}</span>
                <span className="play"><i><PlayTriangle /></i>Watch the answer</span>
              </button>
              <h3>{v.question}</h3>
              <p className="ans">{v.answer}</p>
              <details>
                <summary>Read the full answer</summary>
                <p>{v.transcript}</p>
              </details>
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
      <VideoDialog video={open} onClose={() => setOpen(null)} />
    </section>
  );
}

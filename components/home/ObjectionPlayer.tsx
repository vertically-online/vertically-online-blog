"use client";

import { useState, useSyncExternalStore } from "react";
import { home } from "@/content/home";
import InlineVideo from "@/components/home/InlineVideo";

/**
 * The founder's objection videos: question list on the left, one player on
 * the right that switches with the selected question and plays in place (on
 * mobile it opens under the selected question). Every answer and transcript
 * stays in the HTML; inactive ones are hidden.
 */
export default function ObjectionPlayer() {
  const { videos } = home.faq;
  // Deep links like /about#q-no-time open on that question.
  const hash = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("hashchange", onChange);
      return () => window.removeEventListener("hashchange", onChange);
    },
    () => window.location.hash,
    () => ""
  );
  const fromHash = videos.findIndex((v) => hash === `#q-${v.id}`);
  const [picked, setPicked] = useState<number | null>(null);
  const active = picked ?? (fromHash >= 0 ? fromHash : 0);
  const setActive = (i: number) => setPicked(i);
  const current = videos[active];

  return (
    <div className="oq">
      {videos.map((v, i) => (
        <h3 key={v.id} id={`q-${v.id}`} className="oq-q" style={{ order: i * 2 }}>
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
  );
}

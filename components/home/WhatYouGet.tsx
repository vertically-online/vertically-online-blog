"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { home } from "@/content/home";
import { CheckCircle, GmailMark, Stars } from "@/components/home/svg";

const AUTO_ADVANCE_MS = 6000;

function Panel({ index }: { index: number }) {
  const { sampleEstimate, sampleTotal } = home;
  switch (index) {
    case 0:
      return (
        <div className="ui">
          <div className="hd">
            <Image className="av" src="/images/home/sarah.jpg" alt="" width={96} height={96} />
            Sarah M.<span>Web form</span>
          </div>
          <div className="b in">Hi, I need a quote for a roof replacement in Cherry Hill.</div>
          <div className="typing" aria-hidden="true"><i /><i /><i /></div>
          <div className="b out">Hi Sarah, thanks for reaching out to Your Roofing Co. Your estimate is on its way.</div>
          <span className="tag">Replied in 18 sec</span>
        </div>
      );
    case 1:
      return (
        <div className="ui">
          <div className="hd">
            <i className="pdfi"><Image src="/images/home/acrobat.png" alt="" width={96} height={93} /></i>
            Roof replacement estimate<span>Example</span>
          </div>
          {sampleEstimate.map(([item, price]) => (
            <div key={item} className="q"><span>{item}</span><b>{price}</b></div>
          ))}
          <div className="qt"><span>Total</span><b>{sampleTotal}</b></div>
        </div>
      );
    case 2:
      return (
        <div className="ui gcal">
          <div className="hd">
            <Image className="gi" src="/images/home/gcal.svg" alt="" width={256} height={275} />
            <b className="gt">Calendar</b>
            <span className="gbtn">Today</span>
            <span className="gm">Oct 19 – 23</span>
          </div>
          <div className="gw">
            <span />
            {[["MON", 19], ["TUE", 20], ["WED", 21], ["THU", 22], ["FRI", 23]].map(([d, n]) => (
              <span key={d} className={d === "THU" ? "tdy" : undefined}>{d}<b>{n}</b></span>
            ))}
            <span className="tm">8 AM</span><i /><i className="ev g">Estimate review<small>8:30am</small></i><i /><i /><i className="ev">Crew meeting<small>8:00am</small></i>
            <span className="tm">10 AM</span><i /><i /><i className="ev g">Follow-up call<small>10:00am</small></i><i className="ev hit">Roof inspection<small>10:00 – 11am</small></i><i />
            <span className="tm">1 PM</span><i className="ev">Job site visit<small>1:00pm</small></i><i /><i /><i /><i className="ev g">Estimate review<small>1:30pm</small></i>
          </div>
        </div>
      );
    default:
      return (
        <div className="ui">
          <div className="hd">
            <i className="fav"><Image src="/images/home/favicon-transparent.png" alt="" width={96} height={96} /></i>
            Lead activity<span>Example</span>
          </div>
          <div className="tl">
            <div className="tli">
              <span className="ic gm"><GmailMark /></span>
              <div><b>No reply in 2 days</b><span>Friendly text follow-up sent to Mike R.</span></div>
            </div>
            <div className="tli">
              <span className="ic ok"><CheckCircle /></span>
              <div><b>Job completed</b><span>Review request sent to Linda K.</span></div>
            </div>
            <div className="tli">
              <span className="ic g"><Image src="/images/home/gicon.svg" alt="" width={20} height={20} /></span>
              <div><b>New Google review</b><Stars label="5 stars" /></div>
            </div>
          </div>
        </div>
      );
  }
}

export default function WhatYouGet() {
  const { heading, tabs } = home.whatYouGet;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-advance every 6s (the underline animates over the same time) until
  // the visitor picks a tab; off for reduced motion.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % tabs.length), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, tabs.length]);

  const select = (i: number, focus = false) => {
    setPaused(true);
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = tabs.length - 1;
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <section className="sheet">
      <div className="wrap">
        <div data-sr>
          <h2 className="big" style={{ maxWidth: 820 }}>{heading}</h2>
        </div>
        <div className="tabs" role="tablist" aria-label="What you get" onKeyDown={onKeyDown}>
          {tabs.map((t, i) => (
            <button
              key={t.tab}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`wyg-tab-${i}`}
              aria-controls={`wyg-panel-${i}`}
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              className={paused && active === i ? "tab paused" : "tab"}
              onClick={() => select(i)}
            >
              {t.tab}
            </button>
          ))}
        </div>
        <div className="tabcard">
          {tabs.map((t, i) => (
            <div
              key={t.tab}
              className={active === i ? "panel on" : "panel"}
              role="tabpanel"
              id={`wyg-panel-${i}`}
              aria-labelledby={`wyg-tab-${i}`}
              hidden={active !== i}
            >
              <div>
                <span className="eyebrow">{t.eyebrow}</span>
                <h3>{t.title}</h3>
                <p className="d">{t.body}</p>
              </div>
              {/* Mounted only while active so its animations replay. */}
              {active === i && <Panel index={i} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

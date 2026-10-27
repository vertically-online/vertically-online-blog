"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { home } from "@/content/home";
import { GmailMark, Stars } from "@/components/home/svg";
import { FollowMark, MessagesMark, PhoneMark, ReportMark } from "@/components/home/marks";

const img = (src: string, w: number, h: number) => <Image src={src} alt="" width={w} height={h} />;
const ACROBAT = () => img("/images/home/acrobat.png", 96, 93);
const GCAL = () => img("/images/home/gcal.svg", 256, 275);
const GICON = () => img("/images/home/gicon.svg", 20, 20);

const ICONS: Record<string, React.ReactNode[]> = {
  reply: [<GmailMark key="g" />, <MessagesMark key="m" />],
  book: [<PhoneMark key="p" />, <GCAL key="c" />],
  quote: [<ACROBAT key="a" />],
  follow: [<FollowMark key="f" />],
  review: [
    <span key="r" className="wy-rev">
      <GICON />
      <Stars className="st" />
    </span>,
  ],
  report: [<GmailMark key="g" />, <ReportMark key="r" />],
};

/** Mini visuals inside the top three boxes. */
function Visual({ id }: { id: string }) {
  const { sampleEstimate, sampleTotal } = home;
  if (id === "reply")
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
  if (id === "book")
    return (
      <div className="ui gcal">
        <div className="hd">
          <Image className="gi" src="/images/home/gcal.svg" alt="" width={256} height={275} />
          <b className="gt">Calendar</b>
          <span className="gm">Oct 21 – 23</span>
        </div>
        <div className="gw d3">
          <span />
          {[["WED", 21], ["THU", 22], ["FRI", 23]].map(([d, n]) => (
            <span key={d} className={d === "THU" ? "tdy" : undefined}>{d}<b>{n}</b></span>
          ))}
          <span className="tm">8 AM</span><i className="ev g">Estimate review<small>8:30am</small></i><i /><i className="ev">Crew meeting<small>8:00am</small></i>
          <span className="tm">10 AM</span><i className="ev g">Follow-up call<small>10:00am</small></i><i className="ev hit">Roof inspection<small>10 – 11am</small></i><i />
          <span className="tm">1 PM</span><i /><i /><i className="ev g">Estimate review<small>1:30pm</small></i>
        </div>
      </div>
    );
  return (
    <div className="ui">
      <div className="hd">
        <i className="pdfi"><ACROBAT /></i>
        Roof replacement estimate<span>Example</span>
      </div>
      {sampleEstimate.map(([item, price]) => (
        <div key={item} className="q"><span>{item}</span><b>{price}</b></div>
      ))}
      <div className="qt"><span>Total</span><b>{sampleTotal}</b></div>
    </div>
  );
}

/**
 * What you get: six boxes. The top three carry live mini visuals (the text
 * thread, the booked inspection, the PDF estimate) that play when the
 * section scrolls into view; the bottom three are compact.
 */
export default function WhatYouGet() {
  const { eyebrow, heading, items } = home.whatYouGet;
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="sheet">
      <div className="wrap">
        <div data-sr>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="big" style={{ marginTop: 14, maxWidth: 820 }}>{heading}</h2>
        </div>
        <div ref={ref} className={on ? "wy on" : "wy"}>
          {items.map((item) => (
            <article key={item.id} className={item.visual ? "wy-card big" : "wy-card"}>
              {item.visual && (
                <div className="wy-vis" aria-hidden="true">
                  <Visual id={item.id} />
                </div>
              )}
              <div className="wy-tx">
                <span className="wy-ics" aria-hidden="true">{ICONS[item.id]}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

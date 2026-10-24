"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { home } from "@/content/home";
import BookCallButton from "@/components/BookCallButton";
import { ArrowRight, CalendarIcon, Check, SmallCheck, Stars, StatusBarIcons } from "@/components/home/svg";

const SWAP_MS = 3200;

/** Hero headline's last line cycles through the rotating phrases. */
function RotatingWord() {
  const words = home.hero.rotating;
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"" | "out" | "pre">("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t1 = 0;
    let t2 = 0;
    const id = window.setInterval(() => {
      setPhase("out");
      t1 = window.setTimeout(() => {
        setI((n) => (n + 1) % words.length);
        setPhase("pre");
        t2 = window.setTimeout(() => setPhase(""), 30);
      }, 420);
    }, SWAP_MS);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [words.length]);

  return (
    <span className="rot" aria-live="off">
      <span className={phase}>{words[i]}</span>
    </span>
  );
}

/** Index of the active scroll step (0-4) through the pinned track. */
function useScrollStep(track: React.RefObject<HTMLDivElement | null>, pin: React.RefObject<HTMLDivElement | null>, count: number) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const update = () => {
      const t = track.current;
      const p = pin.current;
      if (!t || !p) return;
      const r = t.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(p).top) || 68;
      const dist = r.height - p.offsetHeight;
      const progress = Math.max(0, Math.min(1, (top - r.top) / dist));
      setStep(Math.min(count - 1, Math.floor(progress * count)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [track, pin, count]);
  return step;
}

const on = (active: boolean, base: string) => (active ? `${base} on` : base);

export default function Stage() {
  const { hero, steps, sampleEstimate, sampleTotal, sampleLabel, rating } = home;
  const trackRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const step = useScrollStep(trackRef, pinRef, steps.length);
  const ring = steps[step].ring;

  return (
    <section className="stage" id="how-it-works">
      <div className="hero wrap">
        <a className="rating" href={rating.href} target="_blank" rel="noopener">
          <Stars className="stars" />
          <span>{rating.label}</span>
        </a>
        <h1>
          {hero.lead}{" "}
          <RotatingWord />
        </h1>
        <p className="sub">{hero.sub}</p>
        <div className="pill">
          <span className="note">{hero.note}</span>
          <BookCallButton className="btn btn-navy">
            {site.hero.primaryCta}
            <ArrowRight />
          </BookCallButton>
        </div>
        <p className="tel-line">
          Or call <a href={site.contact.phoneHref}>{site.contact.phone}</a>. {hero.telLine}
        </p>
      </div>

      <div className="track" ref={trackRef}>
        <div className="pin" ref={pinRef}>
          <div className="pin-in">
            <div className="blue grain">
              <div className="caps">
                {steps.map((s, i) => (
                  <div key={s.title} className={on(step === i, "cap")} aria-hidden={step !== i}>
                    <p className="cap-h">{s.title}</p>
                    <p>{s.body}</p>
                    {i === steps.length - 1 && (
                      <BookCallButton className="btn btn-white">{site.hero.primaryCta}</BookCallButton>
                    )}
                  </div>
                ))}
              </div>

              <div className="phone" role="img" aria-label="Example of the Vertically lead desk on a phone: a new roofing lead answered in 18 seconds, quoted, and booked for an inspection">
                <div className="screen" aria-hidden="true">
                  <div className="isl" />
                  <div className="sb">
                    <span>9:41</span>
                    <span className="sbi"><StatusBarIcons /></span>
                  </div>
                  <div className="app">
                    <div className="app-h">
                      <div>
                        <small>EXAMPLE LEAD</small>
                        <p className="app-title">Your lead desk</p>
                      </div>
                      <div className="pring">
                        <svg viewBox="0 0 40 40">
                          <circle className="bg" cx="20" cy="20" r="16" />
                          <circle className="fg" cx="20" cy="20" r="16" style={{ strokeDashoffset: 100.5 * (1 - ring / 100) }} />
                        </svg>
                        <b>{ring}%</b>
                      </div>
                    </div>
                    <div className="views">
                      <div className={on(step === 0, "view")}>
                        <div className="card">
                          <div className="row">
                            <Image className="av" src="/images/home/sarah.jpg" alt="" width={96} height={96} style={{ width: "10cqw", height: "10cqw" }} />
                            <div>
                              <div className="t1">New lead: Sarah M.</div>
                              <div className="t2">Roof replacement, Cherry Hill, NJ</div>
                            </div>
                            <span className="pulse" style={{ marginLeft: "auto" }} />
                          </div>
                          <div className="t2" style={{ marginTop: "3cqw" }}>Web form · just now</div>
                        </div>
                        <div className="card"><div className="skel" style={{ width: "70%" }} /><div className="skel" style={{ width: "46%", marginTop: "2.4cqw" }} /></div>
                        <div className="card" style={{ opacity: 0.6 }}><div className="skel" style={{ width: "58%" }} /><div className="skel" style={{ width: "38%", marginTop: "2.4cqw" }} /></div>
                      </div>
                      <div className={on(step === 1, "view")}>
                        <div className="chat">
                          <div className="row" style={{ alignItems: "flex-end", gap: "2cqw" }}>
                            <Image className="av" src="/images/home/sarah.jpg" alt="" width={96} height={96} style={{ width: "8cqw", height: "8cqw" }} />
                            <div className="bub in" style={{ maxWidth: "none" }}>Hi, I need a quote for a roof replacement.</div>
                          </div>
                          <div className="bub out">Hi Sarah, this is Your Roofing Co. Got your request. Your estimate is on its way.</div>
                          <div className="meta">Replied in 18 sec</div>
                        </div>
                      </div>
                      <div className={on(step === 2, "view")}>
                        <div className="card doc">
                          <p className="doc-h">Roof replacement estimate</p>
                          <div className="t2">Prepared for Sarah M.</div>
                          {sampleEstimate.map(([item, price], k) => (
                            <div key={item} className="line" style={k === 0 ? { marginTop: "3cqw" } : undefined}>
                              <span>{item}</span>
                              <b>{price}</b>
                            </div>
                          ))}
                          <div className="total"><span>Total</span><b>{sampleTotal}</b></div>
                        </div>
                        <div className="card row">
                          <div className="ico pdf"><Image src="/images/home/acrobat.png" alt="" width={96} height={93} /></div>
                          <div className="t1">Estimate.pdf</div>
                          <span className="badge ok">Sent</span>
                        </div>
                      </div>
                      <div className={on(step === 3, "view")}>
                        <div className="gcp">
                          <div className="gh"><Image src="/images/home/gcal.svg" alt="" width={256} height={275} /><b>Calendar</b><em>Oct 2026</em></div>
                          <div className="gd">
                            {[["MON", 19], ["TUE", 20], ["WED", 21], ["THU", 22], ["FRI", 23]].map(([d, n]) => (
                              <span key={d} className={d === "THU" ? "hit" : undefined}>{d}<b>{n}</b></span>
                            ))}
                          </div>
                          <div className="gg">
                            <span className="t">9 AM</span><i /><i /><i /><i /><i />
                            <span className="t">10 AM</span><i /><i /><i /><i className="ev">Roof inspection<small>10:00 – 11:00am</small></i><i />
                            <span className="t">11 AM</span><i /><i /><i /><i /><i />
                          </div>
                        </div>
                        <div className="card"><div className="t1">Sarah M.</div><div className="t2">Booked by phone. Added to Google Calendar.</div></div>
                      </div>
                      <div className={on(step === 4, "view")}>
                        <div className="card" style={{ padding: "1cqw 4cqw" }}>
                          {[
                            ["New lead: Sarah M.", "Roof replacement"],
                            ["Replied in 18 sec", "Text and email"],
                            ["Quote sent", `${sampleTotal} PDF estimate`],
                            ["Inspection booked", "Thursday, 10:00 AM"],
                          ].map(([a, b]) => (
                            <div key={a} className="chk">
                              <span className="c"><SmallCheck /></span>
                              <div><div className="t1">{a}</div><div className="t2">{b}</div></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ex">{sampleLabel}</div>
                  <div className="home-bar" />
                </div>
                <div className={on(step >= 1, "fchip fc1")} aria-hidden="true">
                  <i><Check /></i>
                  <div>Lead answered<small>in 18 seconds</small></div>
                </div>
                <div className={on(step >= 3, "fchip fc2")} aria-hidden="true">
                  <i><CalendarIcon /></i>
                  <div>Job booked<small>Thursday, 10:00 AM</small></div>
                </div>
              </div>

              <div className="side" aria-hidden="true">
                {steps.map((s, i) => (
                  <div key={s.stat} className={on(step === i, "stat")}>
                    <b>{s.stat}</b>
                    <span>{s.statNote}</span>
                  </div>
                ))}
              </div>
              <div className="dots" aria-hidden="true">
                {steps.map((s, i) => <i key={s.title} className={step === i ? "on" : undefined} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

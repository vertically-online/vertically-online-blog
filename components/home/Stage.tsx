"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { home } from "@/content/home";
import BookCallButton from "@/components/BookCallButton";
import { SmallCheck, Stars, StatusBarIcons } from "@/components/home/svg";

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

// One run of the story: 5 steps over RUN_MS, then a short hold at 100%
// before it loops. Everything is driven by one clock so it flows.
export const RUN_MS = 17500; // about 3.5s per step
const HOLD_MS = 2200;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Where a step's caption/stat sits at local progress p (0..1 within its
 * step): rises from below the whole time it's on screen, fades in over the
 * first third, and drifts up and out over the last eighth.
 */
function riseStyle(p: number, last: boolean, travel = 1) {
  const inOpacity = clamp(p / 0.32);
  const out = last ? 0 : clamp((p - 0.86) / 0.14);
  const y = (56 * (1 - easeOut(clamp(p))) - 22 * out) * travel;
  return { opacity: String(inOpacity * (1 - out)), transform: `translateY(${y.toFixed(1)}px)` };
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Scrolls the phone feed: during the first part of each step it glides from
 * the previous section to the current one, then holds while it's read.
 * After a full loop, step 0 glides back up from the last section.
 */
function scrollFeed(root: HTMLElement, current: number, local: number, wrapped: boolean) {
  const track = root.querySelector<HTMLElement>("[data-feed]");
  if (!track) return;
  const secs = track.querySelectorAll<HTMLElement>("[data-sec]");
  const top = (i: number) => (secs[i] ? secs[i].offsetTop - secs[0].offsetTop : 0);
  const from = current === 0 ? (wrapped ? top(secs.length - 1) : 0) : top(current - 1);
  const to = top(current);
  const y = from + (to - from) * easeInOut(clamp(local / 0.34));
  track.style.transform = `translate3d(0, ${(-y).toFixed(1)}px, 0)`;
}

/** Writes every per-frame value for `elapsed` ms into the stage. Returns the step. */
function paintFrame(root: HTMLElement | null, elapsed: number, count: number, wrapped = false) {
  const t = clamp(elapsed / RUN_MS);
  const pos = Math.min(count - 0.0001, t * count);
  const current = Math.floor(pos);
  if (!root) return current;

  root.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
    const i = Number(el.dataset.rise);
    const travel = Number(el.dataset.travel ?? 1);
    if (i === current) Object.assign(el.style, riseStyle(pos - current, i === count - 1, travel));
    else Object.assign(el.style, { opacity: "0", transform: `translateY(${56 * travel}px)` });
  });
  root.querySelectorAll<HTMLElement>("[data-bar]").forEach((el) => {
    el.style.transform = `scaleX(${clamp(pos - Number(el.dataset.bar)).toFixed(3)})`;
  });
  scrollFeed(root, current, pos - current, wrapped);
  return current;
}

/**
 * Plays the phone story like a video: a requestAnimationFrame clock that
 * runs on its own while the stage is on screen. Per-frame values (caption
 * motion, feed scroll) are written straight to the DOM; React
 * state changes only when the step changes. Reduced motion shows the
 * finished state without animating.
 */
function useStoryClock(stage: React.RefObject<HTMLDivElement | null>, count: number) {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [still, setStill] = useState(false);
  const elapsed = useRef(0);
  // Whether the story has looped at least once (step 0 then scrolls back up).
  const wrapped = useRef(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let first = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (first && reduce) {
          elapsed.current = RUN_MS;
          setStill(true);
          setStep(paintFrame(el, RUN_MS, count));
        }
        first = false;
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stage, count]);

  const playing = visible && !still;
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      if (elapsed.current >= RUN_MS + HOLD_MS) {
        elapsed.current = 0;
        wrapped.current = true;
      }
      const current = paintFrame(stage.current, elapsed.current, count, wrapped.current);
      setStep((prev) => (prev === current ? prev : current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, stage, count]);

  return step;
}

export default function Stage() {
  const { hero, steps, sampleEstimate, sampleTotal, sampleLabel, rating } = home;
  const stageRef = useRef<HTMLDivElement>(null);
  const step = useStoryClock(stageRef, steps.length);

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
        <div className="pill">
          <span className="note">{hero.note}</span>
          <BookCallButton className="btn btn-navy">{site.hero.primaryCta}</BookCallButton>
        </div>
      </div>

      <div className="track">
        <div className="pin" ref={stageRef}>
          <div className="pin-in">
            <div className="blue grain">
              <div className="caps">
                {steps.map((s, i) => (
                  <div key={s.title} className="cap" data-rise={i} aria-hidden={step !== i} style={{ opacity: i === 0 ? undefined : 0 }}>
                    <p className="cap-h">{s.title}</p>
                    <p>{s.body}</p>
                    {i === steps.length - 1 && (
                      <BookCallButton className="btn btn-white">{site.hero.primaryCta}</BookCallButton>
                    )}
                  </div>
                ))}
              </div>

              {/* The phone sits in its own centered frame (below); this keeps its column. */}
              <div className="phone-shadow" aria-hidden="true" />

              <div className="side" aria-hidden="true">
                {steps.map((s, i) => (
                  <div key={s.stat} className="stat" data-rise={i} style={{ opacity: i === 0 ? undefined : 0 }}>
                    <b>{s.stat}</b>
                    <span>{s.statNote}</span>
                  </div>
                ))}
              </div>
              <p className="stage-note">{sampleLabel}</p>
            </div>
            {/* The phone overhangs the top of the card and is cut off at its bottom edge */}
            <div className="phone-wrap">
              <div className="phone" role="img" aria-label="Example of the Vertically lead desk on a phone: a new roofing lead answered in 18 seconds, quoted, and booked for an inspection">
                <div className="screen" aria-hidden="true">
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
                    </div>
                    <div className="feed">
                      <div className="feed-track" data-feed>
                        <div className="fsec" data-sec={0}>
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
                          <div className="pstat">
                            <b>{steps[0].stat}</b>
                            <span>{steps[0].statNote}</span>
                          </div>
                        </div>
                        <div className="fsec" data-sec={1}>
                          <div className="chat">
                            <div className="row" style={{ alignItems: "flex-end", gap: "2cqw" }}>
                              <Image className="av" src="/images/home/sarah.jpg" alt="" width={96} height={96} style={{ width: "8cqw", height: "8cqw" }} />
                              <div className="bub in" style={{ maxWidth: "none" }}>Hi, I need a quote for a roof replacement.</div>
                            </div>
                            <div className="bub out">Hi Sarah, this is Your Roofing Co. Got your request. Your estimate is on its way.</div>
                            <div className="meta">Replied in 18 sec</div>
                          </div>
                          <div className="pstat">
                            <b>{steps[1].stat}</b>
                            <span>{steps[1].statNote}</span>
                          </div>
                        </div>
                        <div className="fsec" data-sec={2}>
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
                          <div className="pstat">
                            <b>{steps[2].stat}</b>
                            <span>{steps[2].statNote}</span>
                          </div>
                        </div>
                        <div className="fsec" data-sec={3}>
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
                          <div className="pstat">
                            <b>{steps[3].stat}</b>
                            <span>{steps[3].statNote}</span>
                          </div>
                        </div>
                        <div className="fsec" data-sec={4}>
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
                          <div className="pstat">
                            <b>{steps[4].stat}</b>
                            <span>{steps[4].statNote}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Phone hardware drawn over the live screen (its screen area is transparent). */}
                <Image className="phone-frame" src="/images/home/phone-front-silver.png" alt="" width={795} height={1600} sizes="(max-width: 980px) 300px, 420px" priority />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

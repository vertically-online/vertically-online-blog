"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { home } from "@/content/home";
import BookCallButton from "@/components/BookCallButton";
import { ArrowRight, PauseBars, PlayTriangle, SmallCheck, Stars, StatusBarIcons } from "@/components/home/svg";

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
export const RUN_MS = 13000; // about 2.6s per step
const HOLD_MS = 1500;
const RING_LEN = 100.5;

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

/** Writes every per-frame value for `elapsed` ms into the stage. Returns the step. */
function paintFrame(root: HTMLElement | null, elapsed: number, count: number) {
  const t = clamp(elapsed / RUN_MS);
  const pos = Math.min(count - 0.0001, t * count);
  const current = Math.floor(pos);
  if (!root) return current;

  const label = root.querySelector<HTMLElement>("[data-pct]");
  if (label) label.textContent = `${Math.round(t * 100)}%`;
  const ring = root.querySelector<SVGCircleElement>("[data-ring]");
  if (ring) ring.style.strokeDashoffset = String(RING_LEN * (1 - t));

  root.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
    const i = Number(el.dataset.rise);
    const travel = Number(el.dataset.travel ?? 1);
    if (i === current) Object.assign(el.style, riseStyle(pos - current, i === count - 1, travel));
    else Object.assign(el.style, { opacity: "0", transform: `translateY(${56 * travel}px)` });
  });
  root.querySelectorAll<HTMLElement>("[data-bar]").forEach((el) => {
    el.style.transform = `scaleX(${clamp(pos - Number(el.dataset.bar)).toFixed(3)})`;
  });
  return current;
}

/**
 * Plays the phone story like a video: a requestAnimationFrame clock that
 * runs only while the stage is on screen and not paused. Per-frame values
 * (counter, ring, caption motion, progress bars) are written straight to
 * the DOM; React state changes only when the step changes. Reduced motion
 * starts paused on the finished state.
 */
function useStoryClock(stage: React.RefObject<HTMLDivElement | null>, count: number) {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  // Hovering the stage holds it (mouse users reading at their own pace).
  const [hovered, setHovered] = useState(false);
  const elapsed = useRef(0);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let first = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (first && reduce) {
          // Reduced motion: show the finished state, paused.
          elapsed.current = RUN_MS;
          setPaused(true);
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

  const playing = visible && !paused && !hovered;
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      if (elapsed.current >= RUN_MS + HOLD_MS) elapsed.current = 0;
      const current = paintFrame(stage.current, elapsed.current, count);
      setStep((prev) => (prev === current ? prev : current));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, stage, count]);

  /** Jump to a step (shown fully risen). */
  const seek = (i: number) => {
    elapsed.current = ((i + 0.62) / count) * RUN_MS;
    setStep(paintFrame(stage.current, elapsed.current, count));
  };

  return { step, seek, paused, setPaused, playing, setHovered };
}

const on = (active: boolean, base: string) => (active ? `${base} on` : base);

export default function Stage() {
  const { hero, steps, sampleEstimate, sampleTotal, sampleLabel, rating } = home;
  const stageRef = useRef<HTMLDivElement>(null);
  const { step, seek, paused, setPaused, playing, setHovered } = useStoryClock(stageRef, steps.length);

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

      <div className="track">
        <div
          className="pin"
          ref={stageRef}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
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
                          <circle className="fg" cx="20" cy="20" r="16" data-ring />
                        </svg>
                        <b data-pct>0%</b>
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
                  {/* Each step's key number, on the lower part of the screen */}
                  <div className="pstats">
                    {steps.map((s, i) => (
                      <div key={s.stat} className="pstat" data-rise={i} data-travel="0.45" style={{ opacity: i === 0 ? undefined : 0 }}>
                        <b>{s.stat}</b>
                        <span>{s.statNote}</span>
                      </div>
                    ))}
                  </div>
                  <div className="ex">{sampleLabel}</div>
                  <div className="home-bar" />
                </div>
              </div>

              <div className={playing ? "player" : "player paused"}>
                <button
                  type="button"
                  className="pp"
                  onClick={() => setPaused((v) => !v)}
                  aria-label={paused ? "Play the walkthrough" : "Pause the walkthrough"}
                >
                  {paused ? <PlayTriangle /> : <PauseBars />}
                </button>
                <div className="dots">
                  {steps.map((s, i) => (
                    <button
                      key={s.title}
                      type="button"
                      className={i === step ? "on" : i < step ? "done" : undefined}
                      aria-label={`Step ${i + 1}: ${s.title}`}
                      aria-current={i === step ? "step" : undefined}
                      onClick={() => seek(i)}
                    >
                      <i><b data-bar={i} /></i>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

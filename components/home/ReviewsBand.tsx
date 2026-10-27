"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { GOOGLE_REVIEWS_URL, home } from "@/content/home";
import { Stars } from "@/components/home/svg";

type Review = [name: string, text: string, avatar: string];

function ReviewCard({ review, hidden, dup }: { review: Review; hidden?: boolean; dup?: boolean }) {
  const [name, text, avatar] = review;
  return (
    <a
      className={dup ? "rv dup" : "rv"}
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener"
      aria-label={hidden ? undefined : `Google review by ${name}`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <Stars />
      <q>&ldquo;{text}&rdquo;</q>
      <div className="who">
        <Image className="av" src={`/images/reviews/${avatar}.png`} alt="" width={72} height={72} />
        <span>{name}</span>
      </div>
    </a>
  );
}

const SPEED = { desktop: 26, mobile: 16 }; // px per second

/**
 * One endless row of review cards. Instead of sliding one very wide strip
 * (which iOS Safari can stop drawing, leaving the row blank), the row moves
 * a few pixels at a time and each card that leaves the screen is moved to the
 * other end of its own line. The list is doubled so wide desktop screens stay
 * full; phones hide the copies (.dup). Copies are hidden from assistive tech
 * and skipped by keyboard focus. Pauses on hover/focus and off screen; still
 * for reduced motion.
 */
function Row({ items, reverse }: { items: Review[]; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = ref.current;
    if (!row || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mobile = window.matchMedia("(max-width: 980px)");
    let offset = 0;
    let last = 0;
    let raf = 0;
    let visible = false;
    let paused = false;
    const span = (el: Element | null) => {
      if (!el) return 0;
      const w = (el as HTMLElement).offsetWidth;
      return w ? w + parseFloat(getComputedStyle(row).columnGap || "0") : 0;
    };
    const frame = (t: number) => {
      const dt = last ? Math.min(t - last, 64) / 1000 : 0;
      last = t;
      if (!paused) {
        const v = (mobile.matches ? SPEED.mobile : SPEED.desktop) * (reverse ? 0.85 : 1);
        offset += (reverse ? 1 : -1) * v * dt;
        // Recycle: a card that has fully left one side rejoins the other end.
        for (let guard = 0; guard < 40; guard++) {
          if (!reverse && -offset >= span(row.firstElementChild) && span(row.firstElementChild) > 0) {
            offset += span(row.firstElementChild);
            row.appendChild(row.firstElementChild!);
          } else if (!reverse && span(row.firstElementChild) === 0 && row.firstElementChild) {
            row.appendChild(row.firstElementChild);
          } else if (reverse && offset >= 0) {
            const lastEl = row.lastElementChild!;
            row.insertBefore(lastEl, row.firstElementChild);
            offset -= span(lastEl);
          } else break;
        }
        row.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    };
    const start = () => {
      if (!raf && visible) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      start();
    });
    io.observe(row);
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    const band = row.parentElement!;
    band.addEventListener("pointerenter", pause);
    band.addEventListener("pointerleave", resume);
    band.addEventListener("focusin", pause);
    band.addEventListener("focusout", resume);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      band.removeEventListener("pointerenter", pause);
      band.removeEventListener("pointerleave", resume);
      band.removeEventListener("focusin", pause);
      band.removeEventListener("focusout", resume);
    };
  }, [reverse]);

  return (
    <div className={reverse ? "mrow rev" : "mrow"} ref={ref}>
      {items.map((r) => <ReviewCard key={r[0]} review={r} />)}
      {items.map((r) => <ReviewCard key={`${r[0]}-copy`} review={r} hidden dup />)}
    </div>
  );
}

export default function ReviewsBand() {
  const { heading, items, badges } = home.reviews;
  // Top and bottom rows each get their own half of the reviews, so no review
  // ever shows in both. Each row loops: a card leaving the screen rejoins the
  // end of its own line.
  const half = Math.ceil(items.length / 2);
  const rowOne = items.slice(0, half);
  const rowTwo = items.slice(half);
  return (
    <section className="band grain" id="reviews">
      <div className="wrap">
        <h2 data-sr>{heading}</h2>
        <div className="badges">
          <a className="badge2" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener">
            <span className="g"><Image src="/images/home/gicon.svg" alt="" width={12} height={12} /></span>
            {badges.rating}
          </a>
          <a className="badge2" href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener">{badges.readAll}</a>
          <span className="badge2">{badges.free}</span>
        </div>
      </div>
      <div className="mq" aria-label="Customer reviews from Google">
        <Row items={rowOne} />
        <Row items={rowTwo} reverse />
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { GOOGLE_REVIEWS_URL, home } from "@/content/home";
import { Stars } from "@/components/home/svg";

type Review = [name: string, text: string, avatar: string];

function ReviewCard({ review, hidden }: { review: Review; hidden?: boolean }) {
  const [name, text, avatar] = review;
  return (
    <a
      className="rv"
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

/**
 * One marquee row; the list is doubled for a seamless loop. Duplicates (and
 * the whole decorative second row) are hidden from assistive tech and
 * skipped by keyboard focus.
 */
function Row({ items, reverse, decorative }: { items: Review[]; reverse?: boolean; decorative?: boolean }) {
  return (
    <div className={reverse ? "mrow rev" : "mrow"} aria-hidden={decorative || undefined}>
      {items.map((r) => <ReviewCard key={r[0]} review={r} hidden={decorative} />)}
      {items.map((r) => <ReviewCard key={`${r[0]}-copy`} review={r} hidden />)}
    </div>
  );
}

export default function ReviewsBand() {
  const { heading, items, badges } = home.reviews;
  const rowTwo = [...items.slice(6), ...items.slice(0, 6)];
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
        <Row items={items} />
        <Row items={rowTwo} reverse decorative />
      </div>
    </section>
  );
}

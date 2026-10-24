"use client";

import { useRef } from "react";
import Image from "next/image";
import { GOOGLE_REVIEWS_URL, home } from "@/content/home";
import { ArrowLeftLong, ArrowRightLong, ArrowUpRight, Stars } from "@/components/home/svg";

export default function Stories() {
  const { heading, gustavo, reviews } = home.stories;
  const carRef = useRef<HTMLDivElement>(null);

  const step = (dir: 1 | -1) => {
    const car = carRef.current;
    const slide = car?.querySelector<HTMLElement>(".ts");
    if (!car || !slide) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    car.scrollBy({ left: dir * (slide.getBoundingClientRect().width + 16), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="sheet" id="stories" style={{ paddingBottom: "clamp(64px,8vw,100px)" }}>
      <div className="wrap">
        <div className="sec-head" data-sr>
          <h2 className="big">{heading}</h2>
          <div className="arrows">
            <button type="button" aria-label="Previous story" onClick={() => step(-1)}><ArrowLeftLong /></button>
            <button type="button" aria-label="Next story" onClick={() => step(1)}><ArrowRightLong /></button>
          </div>
        </div>
      </div>
      <div className="car" ref={carRef} role="region" aria-label="Customer stories" tabIndex={0}>
        <article className="ts">
          <div className="l">
            <div>
              <blockquote>&ldquo;{gustavo.quote}&rdquo;</blockquote>
              <p className="by">{gustavo.by}</p>
            </div>
            <div className="stats">
              {gustavo.stats.map(([value, label]) => (
                <div key={label}><b>{value}</b><span>{label}</span></div>
              ))}
            </div>
          </div>
          <div className="r">
            <Image src="/images/home/gustavo.jpg" alt="Gustavo Arias, owner of Arias Roofing & Siding" width={720} height={1080} sizes="(max-width: 980px) 90vw, 520px" style={{ objectPosition: "50% 20%" }} />
            <div className="logo-chip">
              <Image src="/images/home/arias.png" alt="" width={60} height={60} />
              Arias Roofing &amp; Siding
            </div>
          </div>
        </article>
        {reviews.map((r) => (
          <article key={r.by} className="ts">
            <div className="l">
              <div>
                <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
                <p className="by">
                  <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener">
                    {r.by}, Google review <ArrowUpRight />
                  </a>
                </p>
              </div>
              <div className="stats">
                <div>
                  <Stars label="5 out of 5 stars" />
                  <span><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener" style={{ textDecoration: "underline" }}>Read on Google</a></span>
                </div>
              </div>
            </div>
            <div className="r">
              <Image src={r.image} alt={r.alt} width={720} height={1280} sizes="(max-width: 980px) 90vw, 520px" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

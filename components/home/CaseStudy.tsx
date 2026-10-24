"use client";

import Image from "next/image";
import { home } from "@/content/home";

export default function CaseStudy() {
  const { eyebrow, heading, byline, cards, source } = home.caseStudy;
  return (
    <section className="sheet white" id="proof">
      <div className="wrap">
        <div className="sec-head" data-sr>
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="big" style={{ marginTop: 14 }}>{heading}</h2>
          </div>
        </div>
      </div>
      <div className="hrow">
        {cards.map((card) => (
          <div key={card.stat} className="pc">
            <Image src={card.image} alt={card.alt} width={720} height={1080} sizes="300px" style={{ objectPosition: card.position }} />
            <span className="chip">Arias Roofing &amp; Siding</span>
            <div className="cp">
              <b>{card.stat}</b>
              <span>{card.label}</span>
              <small>{byline}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="wrap">
        <p className="src">{source}</p>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { home } from "@/content/home";
import { ArrowRight } from "@/components/home/svg";

export default function Guides() {
  const { heading, cards, blog } = home.guides;
  return (
    <section className="sheet white" style={{ paddingBottom: "clamp(72px,9vw,110px)" }}>
      <div className="wrap">
        <h2 className="big" style={{ maxWidth: 640 }} data-sr>{heading}</h2>
        <div className="guides">
          {cards.map((card) => (
            <Link key={card.href} className={card.big ? "gc big-card" : "gc"} href={card.href}>
              <Image src={card.image} alt="" width={720} height={1080} sizes={card.big ? "(max-width: 980px) 92vw, 460px" : "(max-width: 980px) 46vw, 370px"} />
              <span>{card.title}</span>
            </Link>
          ))}
          <Link className="gc mint" href={blog.href}>
            <div>
              <span>{blog.title}</span>
              <small>{blog.note}</small>
            </div>
            <i aria-hidden="true"><ArrowRight /></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

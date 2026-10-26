"use client";

import Image from "next/image";
import Link from "next/link";
import { home } from "@/content/home";
import { PlayTriangle } from "@/components/home/svg";

export default function Beliefs() {
  const { eyebrow, heading, items, founderVideo, aboutHref } = home.beliefs;

  return (
    <section className="sheet white" id="beliefs">
      <div className="wrap" data-sr>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="big" style={{ marginTop: 14, maxWidth: 1100 }}>{heading}</h2>
      </div>
      <div className="wrap beliefs">
        {/* Links to the About page, where the founder video plays. */}
        <Link className="founder-link" href={aboutHref} aria-label={`${founderVideo.label}: watch the founder video on the About page`}>
          <Image src={founderVideo.poster} alt="Toby Karamoutchev, co-founder of Vertically" width={720} height={1280} sizes="(max-width: 980px) 92vw, 400px" />
          <span className="play"><i><PlayTriangle /></i>{founderVideo.label}</span>
        </Link>
        <div>
          {items.map(([title, body]) => (
            <div key={title} className="bl" data-sr>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

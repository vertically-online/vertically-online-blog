"use client";

import { home } from "@/content/home";
import InlineVideo from "@/components/home/InlineVideo";

export default function Beliefs() {
  const { eyebrow, heading, items, founderVideo } = home.beliefs;

  return (
    <section className="sheet white" id="beliefs">
      <div className="wrap" data-sr>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="big" style={{ marginTop: 14, maxWidth: 1100 }}>{heading}</h2>
      </div>
      <div className="wrap beliefs">
        <InlineVideo
          className="founder"
          src={founderVideo.video}
          poster={founderVideo.poster}
          captions={founderVideo.captions}
          label={`${founderVideo.label}: Toby Karamoutchev, co-founder of Vertically (${founderVideo.duration})`}
          chip={founderVideo.label}
        />
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

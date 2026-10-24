"use client";

import { useState } from "react";
import Image from "next/image";
import { home } from "@/content/home";
import { PlayTriangle } from "@/components/home/svg";
import VideoDialog, { type DialogVideo } from "@/components/home/VideoDialog";

export default function Beliefs() {
  const { eyebrow, heading, items, founderVideo } = home.beliefs;
  const [open, setOpen] = useState<DialogVideo | null>(null);

  return (
    <section className="sheet white" id="beliefs">
      <div className="wrap" data-sr>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="big" style={{ marginTop: 14, maxWidth: 1100 }}>{heading}</h2>
      </div>
      <div className="wrap beliefs">
        <button
          type="button"
          className="founder"
          aria-label={`${founderVideo.label} (video, ${founderVideo.duration})`}
          onClick={() => setOpen({ title: founderVideo.label, video: founderVideo.video, poster: founderVideo.poster, captions: founderVideo.captions })}
        >
          <Image src={founderVideo.poster} alt="Toby Karamoutchev, co-founder of Vertically, speaking to camera" width={640} height={1138} sizes="400px" />
          <span className="play"><i><PlayTriangle /></i>{founderVideo.label}</span>
        </button>
        <div>
          {items.map(([title, body]) => (
            <div key={title} className="bl" data-sr>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
      <VideoDialog video={open} onClose={() => setOpen(null)} />
    </section>
  );
}

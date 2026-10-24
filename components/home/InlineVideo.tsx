"use client";

import { useRef, useState } from "react";
import { PlayTriangle } from "@/components/home/svg";

/**
 * Click-to-play video that plays in place (no modal, no new tab). Only the
 * poster loads until the visitor presses play; it never autoplays. Remount
 * with a new `key` to switch videos.
 */
export default function InlineVideo({
  src,
  poster,
  label,
  chip,
  className = "",
}: {
  src: string;
  poster: string;
  /** Accessible name for the play button, e.g. the question. */
  label: string;
  /** Text on the play chip. */
  chip: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    setStarted(true);
    ref.current?.play().catch(() => {});
  };

  return (
    <div className={`ivid ${className}`}>
      <video
        ref={ref}
        poster={poster}
        controls={started}
        playsInline
        preload="none"
        aria-label={label}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!started && (
        <button type="button" className="ivid-play" onClick={play} aria-label={`Play video: ${label}`}>
          <span className="play"><i><PlayTriangle /></i>{chip}</span>
        </button>
      )}
    </div>
  );
}

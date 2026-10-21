"use client";

import { useRef, useState } from "react";

export default function ClickToPlayVideo({
  src,
  poster,
  captions,
  className = "",
}: {
  src: string;
  poster: string;
  captions?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    setPlaying(true);
  };

  return (
    <div
      className={`video-frame shadow-card ${className}`}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        controls={playing}
        playsInline
        preload="none"
        onPause={() => setPlaying(false)}
      >
        <source src={src} type="video/mp4" />
        {captions && <track kind="captions" src={captions} srcLang="en" label="English" />}
      </video>

      {!playing && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-void/20 transition-colors hover:bg-void/30"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-signal translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

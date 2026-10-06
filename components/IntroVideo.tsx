"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Self-hosted, muted-autoplay intro video. WebM/MP4 sources with a poster
 * fallback, a tap-to-play overlay for browsers that block autoplay, and a
 * mute toggle that restarts playback with sound on (muted browsers won't
 * let JS unmute an already-playing video reliably otherwise).
 */
export default function IntroVideo({
  mp4Src = "/intro.mp4",
  webmSrc = "/intro.webm",
  poster = "/intro-poster.jpg",
  aspectClassName = "aspect-[9/16]",
  className = "",
}: {
  mp4Src?: string;
  webmSrc?: string;
  poster?: string;
  aspectClassName?: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [needsTapToPlay, setNeedsTapToPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setNeedsTapToPlay(true));
    }
  }, []);

  const handleTapToPlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setNeedsTapToPlay(false);
    video.play().catch(() => {});
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (muted) {
      video.muted = false;
      video.currentTime = 0;
      setMuted(false);
      video.play().catch(() => {});
    } else {
      video.muted = true;
      setMuted(true);
    }
  };

  return (
    <div className={`relative mx-auto w-full max-w-[960px] overflow-hidden rounded-2xl shadow-card ${className}`}>
      <div className={`relative ${aspectClassName} w-full bg-void`}>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="auto"
          poster={poster}
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>

        {needsTapToPlay && (
          <button
            type="button"
            onClick={handleTapToPlay}
            aria-label="Play video"
            className="absolute inset-0 flex items-center justify-center bg-void/40"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-signal translate-x-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={handleToggleMute}
          className="absolute bottom-3 right-3 rounded-lg bg-void/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur hover:bg-void/85 transition-colors"
        >
          {muted ? "🔊 Tap to unmute" : "🔇 Mute"}
        </button>
      </div>
    </div>
  );
}

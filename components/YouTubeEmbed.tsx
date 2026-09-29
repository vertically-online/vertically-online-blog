"use client";

import { useState } from "react";
import Image from "next/image";

export default function YouTubeEmbed({
  youtubeId,
  poster,
  posterAlt,
  aspectClassName = "aspect-video",
}: {
  youtubeId: string;
  poster: string;
  posterAlt: string;
  aspectClassName?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (!youtubeId) {
    return (
      <div className={`relative ${aspectClassName} w-full overflow-hidden rounded-2xl glass`}>
        <Image
          src={poster}
          alt={posterAlt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 560px, 100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-void/40">
          <span className="glass rounded-full px-5 py-2 text-sm font-medium text-void">
            Video coming soon
          </span>
        </div>
      </div>
    );
  }

  if (playing) {
    return (
      <div className={`${aspectClassName} w-full overflow-hidden rounded-2xl`}>
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title="Founder video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={`group relative ${aspectClassName} w-full overflow-hidden rounded-2xl glass holo-sheen`}
      aria-label="Play founder video"
    >
      <Image
        src={poster}
        alt={posterAlt}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 560px, 100vw"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-void/30 transition-colors group-hover:bg-void/40">
        <span className="flex h-16 w-16 items-center justify-center rounded-full glass shadow-lg transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-signal translate-x-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
    </button>
  );
}

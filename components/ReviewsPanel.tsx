"use client";

import { useEffect, useState } from "react";
import type { ReviewsResponse } from "@/app/api/reviews/route";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-4 w-4 ${filled ? "fill-aurora-2" : "fill-slate/20"}`}
      aria-hidden="true"
    >
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.2 6.1-.6z" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < Math.round(rating)} />
      ))}
    </div>
  );
}

function ReviewText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 160;
  const shown = expanded || !isLong ? text : `${text.slice(0, 160)}…`;

  return (
    <p className="text-sm text-slate leading-relaxed">
      {shown}{" "}
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="font-medium text-signal underline underline-offset-2 hover:text-tide"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </p>
  );
}

export default function ReviewsPanel() {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((json: ReviewsResponse) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error || (data && data.source === "none")) {
    return null;
  }

  if (!data) {
    return (
      <div
        className="glass holo-sheen rounded-2xl p-6 sm:p-8 animate-pulse"
        aria-hidden="true"
      >
        <div className="h-5 w-40 rounded bg-slate/10 mb-4" />
        <div className="h-4 w-full rounded bg-slate/10 mb-2" />
        <div className="h-4 w-3/4 rounded bg-slate/10" />
      </div>
    );
  }

  const topReviews = data.reviews.slice(0, 3);

  return (
    <div className="glass holo-sheen rounded-2xl p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate/70 mb-1">
            Reviews from Google
          </p>
          {data.rating !== null && (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-display font-semibold text-void">
                {data.rating.toFixed(1)}
              </span>
              <Stars rating={data.rating} />
              {data.reviewCount !== null && (
                <span className="text-sm text-slate/70">
                  ({data.reviewCount})
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {topReviews.length > 0 && (
        <ul className="mt-6 space-y-5">
          {topReviews.map((review, i) => (
            <li key={i} className="border-t border-void/10 pt-5 first:border-t-0 first:pt-0">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-medium text-void text-sm">
                  {review.author}
                </span>
                <Stars rating={review.rating} />
              </div>
              <ReviewText text={review.text} />
            </li>
          ))}
        </ul>
      )}

      {data.googleMapsUri && (
        <a
          href={data.googleMapsUri}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-medium text-signal hover:text-tide underline underline-offset-2"
        >
          See all reviews on Google
        </a>
      )}
    </div>
  );
}

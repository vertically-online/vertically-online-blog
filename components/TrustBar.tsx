import { site } from "@/content/site";

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-3.5 w-3.5 ${filled ? "fill-aurora-2" : "fill-slate/20"}`}
      aria-hidden="true"
    >
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.2 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.2 6.1-.6z" />
    </svg>
  );
}

export default function TrustBar() {
  const { rating, reviewCount, googleMapsUri } = site.trustBar;

  const content = (
    <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2">
      <span
        className="flex gap-0.5"
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < Math.round(rating)} />
        ))}
      </span>
      <span className="text-sm font-semibold text-void">
        {rating.toFixed(1)}
      </span>
      <span className="text-sm text-slate/70">
        · {reviewCount} Google reviews
      </span>
    </span>
  );

  if (!googleMapsUri) return content;

  return (
    <a href={googleMapsUri} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

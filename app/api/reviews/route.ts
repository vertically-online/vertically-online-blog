import { NextResponse } from "next/server";
import { site } from "@/content/site";

export const revalidate = 43200; // 12 hours

type GooglePlaceReview = {
  rating?: number;
  text?: { text?: string };
  authorAttribution?: { displayName?: string };
  relativePublishTimeDescription?: string;
};

type GooglePlaceDetails = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: GooglePlaceReview[];
};

export type ReviewsResponse = {
  rating: number | null;
  reviewCount: number | null;
  googleMapsUri: string | null;
  reviews: {
    author: string;
    rating: number;
    text: string;
    relativeTime?: string;
  }[];
  source: "google" | "fallback" | "none";
};

function fallbackResponse(): ReviewsResponse {
  const reviews = site.fallbackReviews;
  return {
    rating: null,
    reviewCount: null,
    googleMapsUri: null,
    reviews,
    source: reviews.length > 0 ? "fallback" : "none",
  };
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(fallbackResponse());
  }

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "rating,userRatingCount,reviews,googleMapsUri",
        },
        next: { revalidate: 43200 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(fallbackResponse());
    }

    const data: GooglePlaceDetails = await res.json();

    const reviews = (data.reviews ?? []).map((r) => ({
      author: r.authorAttribution?.displayName ?? "Google user",
      rating: r.rating ?? 0,
      text: r.text?.text ?? "",
      relativeTime: r.relativePublishTimeDescription,
    }));

    if (reviews.length === 0 && data.rating === undefined) {
      return NextResponse.json(fallbackResponse());
    }

    return NextResponse.json({
      rating: data.rating ?? null,
      reviewCount: data.userRatingCount ?? null,
      googleMapsUri: data.googleMapsUri ?? null,
      reviews,
      source: "google",
    } satisfies ReviewsResponse);
  } catch {
    return NextResponse.json(fallbackResponse());
  }
}

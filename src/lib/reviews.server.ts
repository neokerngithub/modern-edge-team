import { GOOGLE_PLACE_ID } from "./company";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

export type GoogleReview = {
  id: string;
  author: string;
  authorUri: string | null;
  photoUri: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  publishedAt: string;
  reviewUrl: string;
};

export type GoogleReviewsPayload = {
  rating: number | null;
  reviewCount: number | null;
  mapsUri: string | null;
  reviews: GoogleReview[];
  /** Set when the live listing could not be read; the UI then shows no reviews. */
  error: string | null;
};

type PlacesReview = {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  googleMapsUri?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

type PlacesPlace = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

const EMPTY: GoogleReviewsPayload = {
  rating: null,
  reviewCount: null,
  mapsUri: null,
  reviews: [],
  error: "Google reviews are temporarily unavailable.",
};

/**
 * Reads the live Google Business Profile rating and reviews through the
 * Lovable connector gateway. Credentials stay server-side; only the shaped
 * payload below is returned to the browser. Never returns fabricated reviews.
 */
export async function fetchGoogleReviews(): Promise<GoogleReviewsPayload> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];

  if (!lovableKey || !mapsKey) {
    return { ...EMPTY, error: "Google reviews are not configured yet." };
  }

  try {
    const response = await fetch(`${GATEWAY_URL}/places/v1/places/${GOOGLE_PLACE_ID}`, {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": mapsKey,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`[google-reviews] gateway request failed [${response.status}]: ${body}`);
      return EMPTY;
    }

    const place = (await response.json()) as PlacesPlace;

    const reviews: GoogleReview[] = (place.reviews ?? [])
      .map((review, index) => {
        const text = review.text?.text ?? review.originalText?.text ?? "";
        return {
          id: review.name ?? `review-${index}`,
          author: review.authorAttribution?.displayName ?? "Google user",
          authorUri: review.authorAttribution?.uri ?? null,
          photoUri: review.authorAttribution?.photoUri ?? null,
          rating: review.rating ?? 0,
          text: text.trim(),
          relativeTime: review.relativePublishTimeDescription ?? "",
          publishedAt: review.publishTime ?? "",
          reviewUrl: review.googleMapsUri ?? place.googleMapsUri ?? "",
        };
      })
      .filter((review) => review.text.length > 0);

    return {
      rating: place.rating ?? null,
      reviewCount: place.userRatingCount ?? null,
      mapsUri: place.googleMapsUri ?? null,
      reviews,
      error: null,
    };
  } catch (error) {
    console.error("[google-reviews] unexpected failure", error);
    return EMPTY;
  }
}

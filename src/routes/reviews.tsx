import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import {
  ReviewCard,
  ReviewsSummary,
  ViewAllReviewsButton,
} from "@/components/google-reviews";
import { getGoogleReviews } from "@/lib/reviews.functions";
import { MAPS_PLACE_URL } from "@/lib/company";

const TITLE = "Google Reviews — Modern Edge Architects and Engineers";
const DESCRIPTION =
  "Real client reviews of Modern Edge Architects and Engineers, published live from our Google Business Profile.";

const reviewsQueryOptions = queryOptions({
  queryKey: ["google-reviews"],
  queryFn: () => getGoogleReviews(),
  staleTime: 1000 * 60 * 30,
});

export const Route = createFileRoute("/reviews")({
  loader: ({ context }) => context.queryClient.ensureQueryData(reviewsQueryOptions),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: ReviewsError,
  component: ReviewsPage,
});

function ReviewsError() {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-32 md:px-10">
      <p className="eyebrow">Reviews</p>
      <h1 className="mt-6 text-3xl font-extrabold tracking-[-0.02em] md:text-5xl">
        Reviews are unavailable right now.
      </h1>
      <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
        You can read every review directly on our Google listing.
      </p>
      <ViewAllReviewsButton className="mt-10" />
    </section>
  );
}

function ReviewsPage() {
  const { data } = useSuspenseQuery(reviewsQueryOptions);

  return (
    <>
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pt-28 pb-20 md:grid-cols-12 md:px-10 md:pt-40 md:pb-28">
          <div className="md:col-span-7">
            <p className="eyebrow">Reviews</p>
            <h1 className="mt-8 max-w-2xl text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] md:text-6xl">
              Client feedback, published as received.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Every review below is pulled live from our Google Business Profile. Nothing is edited,
              curated or written by us.
            </p>
            <ViewAllReviewsButton className="mt-10" />
          </div>
          <div className="md:col-span-5 md:pt-16">
            <ReviewsSummary data={data} />
          </div>
        </div>
      </section>

      <section className="border-b border-hairline">
        <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
          {data.reviews.length > 0 ? (
            <div className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
              {data.reviews.map((review) => (
                <div key={review.id} className="bg-background">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-hairline p-10">
              <p className="eyebrow">No reviews loaded</p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
                {data.error ??
                  "Reviews could not be loaded from Google right now."}{" "}
                You can read our reviews directly on{" "}
                <a
                  href={MAPS_PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  our Google listing
                </a>
                .
              </p>
            </div>
          )}
          <p className="mt-10 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground">
            Google shows a selected set of reviews through its API — the full list is always on
            Google.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="grid-canvas pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <h2 className="max-w-3xl text-3xl leading-[1.08] font-extrabold tracking-[-0.02em] md:text-5xl">
            Your next project starts with a conversation.
          </h2>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary"
            >
              Contact us
            </Link>
            <Link
              to="/property-valuation"
              hash="request"
              className="inline-flex items-center border border-border px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
            >
              Request Valuation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

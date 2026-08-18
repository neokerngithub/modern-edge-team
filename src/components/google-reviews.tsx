import { GOOGLE_REVIEWS_URL } from "@/lib/company";
import type { GoogleReviewsPayload } from "@/lib/reviews.server";

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          aria-hidden
          className={`text-sm leading-none ${i < filled ? "text-primary" : "text-border"}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export function ReviewsSummary({ data }: { data: GoogleReviewsPayload }) {
  if (data.rating === null) return null;
  return (
    <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
      <div>
        <p className="eyebrow">Google Rating</p>
        <p className="mt-3 flex items-baseline gap-3 text-5xl font-extrabold tracking-[-0.03em] md:text-6xl">
          {data.rating.toFixed(1)}
          <span className="text-base font-bold tracking-[0.1em] text-muted-foreground">/ 5</span>
        </p>
        <div className="mt-4">
          <Stars rating={data.rating} />
        </div>
      </div>
      {data.reviewCount !== null ? (
        <div className="border-l border-hairline pl-10">
          <p className="eyebrow">Reviews</p>
          <p className="mt-3 text-5xl font-extrabold tracking-[-0.03em] md:text-6xl">
            {data.reviewCount}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export function ReviewCard({ review }: { review: GoogleReviewsPayload["reviews"][number] }) {
  return (
    <article className="flex h-full flex-col border border-hairline p-8">
      <Stars rating={review.rating} />
      <blockquote className="mt-6 grow text-base leading-relaxed text-foreground/90">
        “{review.text}”
      </blockquote>
      <footer className="mt-8 border-t border-hairline pt-5">
        <p className="text-sm font-bold tracking-[-0.01em]">{review.author}</p>
        <p className="mt-1 text-[0.7rem] tracking-[0.12em] uppercase text-muted-foreground">
          {review.relativeTime || formatDate(review.publishedAt)}
        </p>
        {review.reviewUrl ? (
          <a
            href={review.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-[0.7rem] font-bold tracking-[0.18em] uppercase text-primary transition-opacity hover:opacity-70"
          >
            View on Google →
          </a>
        ) : null}
      </footer>
    </article>
  );
}

export function ViewAllReviewsButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={GOOGLE_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center border border-primary bg-primary px-8 py-4 text-[0.72rem] font-bold tracking-[0.18em] uppercase text-primary-foreground transition-colors hover:bg-transparent hover:text-primary ${className}`}
    >
      View all Google reviews
    </a>
  );
}

/** Homepage section: summary on the left, three most recent reviews on the right. */
export function GoogleReviewsSection({ data }: { data: GoogleReviewsPayload }) {
  const reviews = data.reviews.slice(0, 3);

  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Verified on Google</p>
            <h2 className="mt-6 text-3xl leading-[1.1] font-extrabold tracking-[-0.02em] md:text-4xl">
              What our clients say.
            </h2>
            <div className="mt-10">
              <ReviewsSummary data={data} />
            </div>
            {data.error ? (
              <p className="mt-8 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Live reviews from our Google Business Profile could not be loaded right now. Read
                them directly on Google.
              </p>
            ) : null}
            <ViewAllReviewsButton className="mt-10" />
          </div>

          <div className="md:col-span-8">
            {reviews.length > 0 ? (
              <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-background">
                    <ReviewCard review={review} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

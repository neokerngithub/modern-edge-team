import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/section-placeholder";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Modern Edge Architects and Engineers" },
      { name: "description", content: "Verified client reviews will be added here once collected and approved for publication." },
      { property: "og:title", content: "Reviews — Modern Edge Architects and Engineers" },
      { property: "og:description", content: "Verified client reviews will be added here once collected and approved for publication." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <SectionPlaceholder
      eyebrow="Reviews"
      title="Client feedback, published as received."
      intro="Verified client reviews will be added here once collected and approved for publication."
    />
  );
}

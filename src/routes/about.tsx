import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/section-placeholder";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Modern Edge Architects and Engineers" },
      { name: "description", content: "Modern Edge Architects and Engineers Pvt. Ltd. is a multidisciplinary design, valuation and construction practice." },
      { property: "og:title", content: "About — Modern Edge Architects and Engineers" },
      { property: "og:description", content: "Modern Edge Architects and Engineers Pvt. Ltd. is a multidisciplinary design, valuation and construction practice." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SectionPlaceholder
      eyebrow="About"
      title="A studio built around precision."
      intro="Modern Edge Architects and Engineers Pvt. Ltd. is a multidisciplinary design, valuation and construction practice."
    />
  );
}

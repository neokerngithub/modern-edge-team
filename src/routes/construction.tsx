import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/section-placeholder";

export const Route = createFileRoute("/construction")({
  head: () => ({
    meta: [
      { title: "Construction — Modern Edge Architects and Engineers" },
      { name: "description", content: "Residential and commercial construction delivered with engineered detailing and site supervision." },
      { property: "og:title", content: "Construction — Modern Edge Architects and Engineers" },
      { property: "og:description", content: "Residential and commercial construction delivered with engineered detailing and site supervision." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConstructionPage,
});

function ConstructionPage() {
  return (
    <SectionPlaceholder
      eyebrow="Construction"
      title="Build quality, controlled on site."
      intro="Residential and commercial construction delivered with engineered detailing and site supervision."
    />
  );
}

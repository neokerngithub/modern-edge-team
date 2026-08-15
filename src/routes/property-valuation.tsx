import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/section-placeholder";

export const Route = createFileRoute("/property-valuation")({
  head: () => ({
    meta: [
      { title: "Property Valuation — Modern Edge Architects and Engineers" },
      { name: "description", content: "Bank, tax, collateral and transaction valuation of land, buildings and structures." },
      { property: "og:title", content: "Property Valuation — Modern Edge Architects and Engineers" },
      { property: "og:description", content: "Bank, tax, collateral and transaction valuation of land, buildings and structures." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PropertyValuationPage,
});

function PropertyValuationPage() {
  return (
    <SectionPlaceholder
      eyebrow="Property Valuation"
      title="Property valuation grounded in evidence."
      intro="Bank, tax, collateral and transaction valuation of land, buildings and structures."
    />
  );
}

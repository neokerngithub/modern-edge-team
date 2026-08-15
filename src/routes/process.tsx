import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/section-placeholder";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — Modern Edge Architects and Engineers" },
      { name: "description", content: "From first consultation through design, approvals, valuation reporting and construction handover." },
      { property: "og:title", content: "Process — Modern Edge Architects and Engineers" },
      { property: "og:description", content: "From first consultation through design, approvals, valuation reporting and construction handover." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <SectionPlaceholder
      eyebrow="Process"
      title="A clear, documented process."
      intro="From first consultation through design, approvals, valuation reporting and construction handover."
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/section-placeholder";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Modern Edge Architects and Engineers" },
      { name: "description", content: "Architecture, civil engineering, interiors, landscape, municipal drawings, real estate, DPR and CAD training." },
      { property: "og:title", content: "Services — Modern Edge Architects and Engineers" },
      { property: "og:description", content: "Architecture, civil engineering, interiors, landscape, municipal drawings, real estate, DPR and CAD training." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SectionPlaceholder
      eyebrow="Services"
      title="Multidisciplinary architecture and engineering services."
      intro="Architecture, civil engineering, interiors, landscape, municipal drawings, real estate, DPR and CAD training."
    />
  );
}

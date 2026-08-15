import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/section-placeholder";

export const Route = createFileRoute("/founders")({
  head: () => ({
    meta: [
      { title: "Founders — Modern Edge Architects and Engineers" },
      { name: "description", content: "Founder profiles are being prepared and will be published in the next phase." },
      { property: "og:title", content: "Founders — Modern Edge Architects and Engineers" },
      { property: "og:description", content: "Founder profiles are being prepared and will be published in the next phase." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FoundersPage,
});

function FoundersPage() {
  return (
    <SectionPlaceholder
      eyebrow="Founders"
      title="Led by practising architects and engineers."
      intro="Founder profiles are being prepared and will be published in the next phase."
    />
  );
}

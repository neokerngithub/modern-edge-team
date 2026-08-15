import { createFileRoute } from "@tanstack/react-router";
import { SectionPlaceholder } from "@/components/section-placeholder";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Modern Edge Architects and Engineers" },
      { name: "description", content: "Tell us about your property or project and we will respond with the right next step." },
      { property: "og:title", content: "Contact — Modern Edge Architects and Engineers" },
      { property: "og:description", content: "Tell us about your property or project and we will respond with the right next step." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SectionPlaceholder
      eyebrow="Contact"
      title="Start a conversation."
      intro="Tell us about your property or project and we will respond with the right next step."
    />
  );
}

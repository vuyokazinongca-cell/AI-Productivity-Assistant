import { createFileRoute } from "@tanstack/react-router";

import { AiToolPanel } from "@/components/AiToolPanel";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | SimplyStyleByLerato" },
      {
        name: "description",
        content:
          "Summarize beauty and wellness topics, articles and trends with insights and recommendations.",
      },
      { property: "og:title", content: "AI Research Assistant | SimplyStyleByLerato" },
      {
        property: "og:description",
        content: "Research beauty trends, products and pricing with AI summaries and insights.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AppShell>
      <AiToolPanel
        tool="research"
        title="AI Research Assistant"
        description="Summarize a topic or paste an article to get insights and recommendations for the business."
        placeholder="Paste an article or ask about a topic, e.g. trends in gel vs acrylic nails for 2026."
        examples={[
          "Trends in acrylic vs gel nails",
          "How to price a mobile laundry service",
          "Best-selling skincare ingredients right now",
        ]}
      />
    </AppShell>
  );
}

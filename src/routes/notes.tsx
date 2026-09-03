import { createFileRoute } from "@tanstack/react-router";

import { AiToolPanel } from "@/components/AiToolPanel";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | SimplyStyleByLerato" },
      {
        name: "description",
        content:
          "Turn long salon team notes into clear summaries with decisions, action items and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer | SimplyStyleByLerato" },
      {
        property: "og:description",
        content: "Summarize meetings and extract action items, decisions and deadlines.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <AppShell>
      <AiToolPanel
        tool="notes"
        title="Meeting Notes Summarizer"
        description="Paste raw notes from team check-ins, supplier calls or client consultations and get a structured summary."
        placeholder="Paste your meeting notes here…"
        examples={[
          "Summarize this week's team check-in",
          "Extract action items from a supplier call",
        ]}
      />
    </AppShell>
  );
}

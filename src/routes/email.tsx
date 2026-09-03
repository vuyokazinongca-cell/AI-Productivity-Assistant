import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

import { AiToolPanel } from "@/components/AiToolPanel";
import { AppShell } from "@/components/AppShell";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | SimplyStyleByLerato" },
      {
        name: "description",
        content:
          "Write formal, friendly or persuasive client emails for your beauty and wellness business in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator | SimplyStyleByLerato" },
      {
        property: "og:description",
        content: "Generate polished salon and laundry client emails with AI.",
      },
    ],
  }),
  component: EmailPage,
});

const TONES = ["formal", "friendly", "persuasive"] as const;

function EmailPage() {
  const [tone, setTone] = useState<(typeof TONES)[number]>("friendly");
  const toneRef = useRef(tone);
  toneRef.current = tone;

  return (
    <AppShell>
      <AiToolPanel
        tool="email"
        title="Smart Email Generator"
        description="Draft client-ready emails for bookings, promotions, reminders and follow-ups."
        placeholder="e.g. Email a client confirming her acrylic nail appointment on Saturday at 10am and mention our new skincare bundle."
        examples={[
          "Confirm a Saturday 10am acrylic nails booking",
          "Apologise for a delayed laundry delivery",
          "Promote our new hydrating skincare range",
        ]}
        toneRef={() => toneRef.current}
        controls={
          <div className="space-y-2">
            <Label>Tone</Label>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-sm capitalize transition-colors",
                    tone === t
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary/60 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        }
      />
    </AppShell>
  );
}

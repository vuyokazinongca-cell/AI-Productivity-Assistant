import { createFileRoute } from "@tanstack/react-router";

import { AiToolPanel } from "@/components/AiToolPanel";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | SimplyStyleByLerato" },
      {
        name: "description",
        content:
          "Build prioritised daily and weekly schedules for treatments, laundry runs and admin work.",
      },
      { property: "og:title", content: "AI Task Planner | SimplyStyleByLerato" },
      {
        property: "og:description",
        content: "Plan your salon day and week with prioritised AI schedules.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <AppShell>
      <AiToolPanel
        tool="planner"
        title="AI Task Planner & Scheduler"
        description="Turn your to-do list into a realistic, prioritised schedule across treatments, deliveries and admin."
        placeholder="e.g. Tomorrow: 3 pedicures, 2 massages, restock skincare, collect laundry from 4 clients, post on Instagram."
        examples={[
          "Plan tomorrow around 5 bookings and 4 laundry pickups",
          "Build a weekly schedule for a two-person team",
        ]}
      />
    </AppShell>
  );
}

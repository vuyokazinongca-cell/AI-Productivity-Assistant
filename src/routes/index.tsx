import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck,
  CalendarHeart,
  Mail,
  MessageCircle,
  NotebookPen,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";

import salonHero from "@/assets/salon-hero.jpg";
import { AiDisclaimer } from "@/components/AiDisclaimer";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SimplyStyleByLerato | AI Business Assistant" },
      {
        name: "description",
        content:
          "An AI business assistant for massages, nails, laundry pickup and skincare — emails, meeting summaries, schedules, research and chat in one dashboard.",
      },
      { property: "og:title", content: "SimplyStyleByLerato | AI Business Assistant" },
      {
        property: "og:description",
        content:
          "Run your beauty and wellness business with AI-powered emails, plans, summaries and chat.",
      },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/email",
    label: "Smart Email Generator",
    description: "Client emails in formal, friendly or persuasive tones.",
    icon: Mail,
  },
  {
    to: "/notes",
    label: "Meeting Notes Summarizer",
    description: "Summaries with decisions, action items and deadlines.",
    icon: NotebookPen,
  },
  {
    to: "/planner",
    label: "AI Task Planner",
    description: "Prioritised daily and weekly schedules.",
    icon: CalendarCheck,
  },
  {
    to: "/research",
    label: "AI Research Assistant",
    description: "Topic summaries, insights and recommendations.",
    icon: Search,
  },
  {
    to: "/chat",
    label: "AI Chatbot",
    description: "Ask anything about running the business.",
    icon: MessageCircle,
  },
] as const;

const STATS = [
  { label: "Tasks planned this week", value: "24", meta: "6 due today" },
  { label: "Bookings confirmed", value: "18", meta: "Nails & massages" },
  { label: "Laundry collections", value: "9", meta: "3 out for delivery" },
  { label: "AI drafts generated", value: "42", meta: "Emails & summaries" },
];

const SERVICES = [
  { label: "Massages & skincare", icon: Sparkles },
  { label: "Manicures & pedicures", icon: CalendarHeart },
  { label: "Acrylic nails", icon: Sparkles },
  { label: "Laundry pickup & delivery", icon: Truck },
  { label: "Skincare products", icon: ShoppingBag },
];

function Dashboard() {
  return (
    <AppShell>
      <div className="space-y-10">
        <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
          <div className="grid lg:grid-cols-[1.15fr_1fr]">
            <div className="bg-gradient-blush space-y-5 p-6 sm:p-10">
              <p className="text-xs tracking-[0.25em] text-gold uppercase">
                Welcome back, Lerato
              </p>
              <h1 className="text-3xl leading-tight font-semibold sm:text-4xl">
                Your beauty business, beautifully organised.
              </h1>
              <p className="max-w-xl text-sm text-muted-foreground">
                SimplyStyleByLerato brings your treatments, laundry service and skincare range
                together with an AI assistant that writes, plans and researches for you.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link to="/email">Draft a client email</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/planner">Plan my day</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {SERVICES.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    <Icon className="size-3.5 text-primary" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <img
              src={salonHero}
              alt="Salon table with white towels, gold manicure tools and a blush skincare bottle"
              width={1600}
              height={912}
              className="h-56 w-full object-cover lg:h-full"
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Today at a glance</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {STATS.map((stat) => (
              <Card key={stat.label} className="border-border/70 shadow-soft">
                <CardContent className="space-y-1 p-5">
                  <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                  <p className="text-sm font-medium">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.meta}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">AI tools</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {TOOLS.map(({ to, label, description, icon: Icon }) => (
              <Link key={to} to={to} className="group">
                <Card className="h-full border-border/70 shadow-soft transition-all group-hover:-translate-y-0.5 group-hover:shadow-lift">
                  <CardHeader className="space-y-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-gold text-gold-foreground">
                      <Icon className="size-5" />
                    </span>
                    <CardTitle className="text-lg">{label}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Recent activity</h2>
          <Card className="border-border/70 shadow-soft">
            <CardContent className="divide-y divide-border p-0">
              {[
                "Confirmation email drafted for Saturday acrylic set",
                "Weekly schedule generated for treatments and laundry runs",
                "Team check-in notes summarised with 4 action items",
                "Research summary saved: skincare bundle pricing",
              ].map((item) => (
                <p key={item} className="px-5 py-4 text-sm text-muted-foreground">
                  {item}
                </p>
              ))}
            </CardContent>
          </Card>
        </section>

        <AiDisclaimer />
      </div>
    </AppShell>
  );
}

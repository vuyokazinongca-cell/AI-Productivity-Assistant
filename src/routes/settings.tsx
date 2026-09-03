import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { AiDisclaimer } from "@/components/AiDisclaimer";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | SimplyStyleByLerato" },
      {
        name: "description",
        content:
          "Manage your business profile, services and assistant preferences for SimplyStyleByLerato.",
      },
      { property: "og:title", content: "Settings | SimplyStyleByLerato" },
      {
        property: "og:description",
        content: "Business profile and AI assistant preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [businessName, setBusinessName] = useState("SimplyStyleByLerato");
  const [email, setEmail] = useState("hello@simplystylebylerato.co.za");
  const [services, setServices] = useState(
    "Massages, manicures, pedicures, acrylic nails, laundry pickup & delivery, skincare products",
  );
  const [reminders, setReminders] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs tracking-[0.25em] text-gold uppercase">Workspace</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Settings</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            These details shape the tone and context of every AI response.
          </p>
        </header>

        <Card className="border-border/70 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Business profile</CardTitle>
            <CardDescription>Used across emails, plans and research summaries.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business name</Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Contact email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="services">Services offered</Label>
              <Textarea
                id="services"
                rows={3}
                value={services}
                onChange={(e) => setServices(e.target.value)}
              />
            </div>
            <Button onClick={() => toast.success("Preferences saved")}>Save changes</Button>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl">Assistant preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-secondary/50 px-4 py-3">
              <div>
                <p className="text-sm font-medium">Booking reminders</p>
                <p className="text-xs text-muted-foreground">
                  Suggest reminder messages for upcoming appointments.
                </p>
              </div>
              <Switch checked={reminders} onCheckedChange={setReminders} />
            </div>
            <div className="flex items-center justify-between gap-4 rounded-xl bg-secondary/50 px-4 py-3">
              <div>
                <p className="text-sm font-medium">Responsible AI notice</p>
                <p className="text-xs text-muted-foreground">
                  Show the review reminder alongside AI outputs.
                </p>
              </div>
              <Switch checked={showDisclaimer} onCheckedChange={setShowDisclaimer} />
            </div>
          </CardContent>
        </Card>

        <AiDisclaimer />
      </div>
    </AppShell>
  );
}

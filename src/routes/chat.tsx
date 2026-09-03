import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Send, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AiDisclaimer } from "@/components/AiDisclaimer";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateAi } from "@/lib/ai.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chatbot | SimplyStyleByLerato" },
      {
        name: "description",
        content:
          "Chat with your workplace assistant about clients, services, pricing and daily operations.",
      },
      { property: "og:title", content: "AI Chatbot | SimplyStyleByLerato" },
      {
        property: "og:description",
        content: "An interactive AI assistant for your beauty and wellness business.",
      },
    ],
  }),
  component: ChatPage,
});

type Message = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "How do I handle a client who cancels last minute?",
  "Suggest an upsell for a pedicure booking",
  "Write a WhatsApp reminder for laundry collection",
];

function ChatPage() {
  const run = useServerFn(generateAi);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    const prompt = text.trim();
    if (!prompt || loading) return;
    const history = messages;
    setMessages([...history, { role: "user", content: prompt }]);
    setInput("");
    setLoading(true);
    try {
      const result = await run({ data: { tool: "chat", prompt, history } });
      setMessages((prev) => [...prev, { role: "assistant", content: result.text }]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs tracking-[0.25em] text-gold uppercase">AI Tool</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">AI Chatbot</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Your interactive workplace assistant for bookings, clients and day-to-day questions.
          </p>
        </header>

        <Card className="border-border/70 shadow-soft">
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="max-h-[26rem] min-h-56 space-y-3 overflow-y-auto pr-1">
              {messages.length === 0 ? (
                <div className="space-y-3 rounded-xl bg-secondary/50 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="size-4 text-gold" /> Hi Lerato! What can I help you with
                    today?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {STARTERS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={i}
                    className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap",
                        m.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground",
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" /> Thinking…
                </div>
              )}
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send(input);
                  }
                }}
                rows={3}
                placeholder="Ask anything about running SimplyStyleByLerato…"
                className="resize-y bg-background"
              />
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => void send(input)} disabled={loading} className="gap-2">
                  <Send className="size-4" /> Send
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    setMessages([]);
                    setInput("");
                  }}
                >
                  <Trash2 className="size-4" /> Clear chat
                </Button>
              </div>
            </div>
            <AiDisclaimer />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

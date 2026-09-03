import { useServerFn } from "@tanstack/react-start";
import { Copy, Eraser, Loader2, Sparkles } from "lucide-react";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

import { AiDisclaimer } from "@/components/AiDisclaimer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { generateAi } from "@/lib/ai.functions";

type Tool = "email" | "notes" | "planner" | "research";

export function AiToolPanel({
  tool,
  title,
  description,
  placeholder,
  examples,
  controls,
  toneRef,
}: {
  tool: Tool;
  title: string;
  description: string;
  placeholder: string;
  examples?: string[];
  controls?: ReactNode;
  toneRef?: () => "formal" | "friendly" | "persuasive" | undefined;
}) {
  const run = useServerFn(generateAi);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("Please add a few details first.");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const result = await run({
        data: { tool, prompt: input.trim(), tone: toneRef?.() },
      });
      setOutput(result.text);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs tracking-[0.25em] text-gold uppercase">AI Tool</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      </header>

      <Card className="border-border/70 shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl">Your request</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {controls}
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={7}
            className="resize-y bg-background"
          />
          {examples?.length ? (
            <div className="flex flex-wrap gap-2">
              {examples.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => setInput(example)}
                  className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {example}
                </button>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleGenerate} disabled={loading} className="gap-2">
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {loading ? "Generating…" : "Generate"}
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setInput("");
                setOutput("");
              }}
            >
              <Eraser className="size-4" /> Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-card shadow-soft">
        <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
          <CardTitle className="text-xl">AI response</CardTitle>
          <Button variant="outline" size="sm" className="gap-2" onClick={handleCopy}>
            <Copy className="size-3.5" /> Copy
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="min-h-40 rounded-xl bg-secondary/50 p-4 text-sm whitespace-pre-wrap">
            {output || (
              <span className="text-muted-foreground">
                Your generated result will appear here.
              </span>
            )}
          </div>
          <AiDisclaimer />
        </CardContent>
      </Card>
    </div>
  );
}

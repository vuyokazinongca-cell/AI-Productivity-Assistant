import { Info } from "lucide-react";

export function AiDisclaimer({ className }: { className?: string }) {
  return (
    <p
      className={
        "flex items-start gap-2 rounded-xl border border-border bg-secondary/60 px-4 py-3 text-xs text-muted-foreground " +
        (className ?? "")
      }
    >
      <Info className="mt-0.5 size-4 shrink-0 text-gold" />
      AI-generated content may contain inaccuracies. Please review all outputs before making
      business decisions.
    </p>
  );
}

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

const AiInput = z.object({
  tool: z.enum(["email", "notes", "planner", "research", "chat"]),
  prompt: z.string().min(1),
  tone: z.enum(["formal", "friendly", "persuasive"]).optional(),
  history: z.array(MessageSchema).optional(),
});

const BUSINESS_CONTEXT = `You are the in-house AI business assistant for SimplyStyleByLerato, a beauty and wellness business.
Services: massages, manicures, pedicures, acrylic nails, laundry pickup and delivery, and skincare products.
Voice: warm, elegant, professional. Use clear markdown-free plain text with simple headings, dashes for lists, and short paragraphs.`;

const SYSTEM_PROMPTS: Record<string, string> = {
  email: `${BUSINESS_CONTEXT}
Task: write a complete, ready-to-send professional email. Always include a subject line, greeting, body, and a warm sign-off from the SimplyStyleByLerato team.`,
  notes: `${BUSINESS_CONTEXT}
Task: summarize meeting notes. Always return these sections: Summary, Key Decisions, Action Items (with owner if mentioned), Deadlines, and Follow-up Questions.`,
  planner: `${BUSINESS_CONTEXT}
Task: build practical schedules. Return a prioritised plan with time blocks for the day and, when relevant, a weekly overview. Group salon appointments, laundry runs, product restocking and admin sensibly, and flag the top 3 priorities.`,
  research: `${BUSINESS_CONTEXT}
Task: research assistant. Summarize the topic or article, then give Key Insights, Opportunities for the business, and Recommended Next Steps. Note clearly when something should be verified.`,
  chat: `${BUSINESS_CONTEXT}
Task: act as a helpful workplace assistant. Answer questions about running the business, client communication, pricing ideas, scheduling and services. Keep replies concise and actionable.`,
};

export const generateAi = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AiInput.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured (missing LOVABLE_API_KEY).");

    let system = SYSTEM_PROMPTS[data.tool];
    if (data.tool === "email" && data.tone) {
      system += `\nUse a ${data.tone} tone throughout.`;
    }

    const messages = [
      { role: "system", content: system },
      ...(data.history ?? []),
      { role: "user", content: data.prompt },
    ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model: "google/gemini-3.7-flash", messages }),
    });

    if (!res.ok) {
      const body = await res.text();
      let message = body;
      try {
        message = JSON.parse(body)?.error?.message ?? body;
      } catch {
        /* keep raw body */
      }
      if (res.status === 429) {
        throw new Error("The assistant is busy right now. Please try again in a moment.");
      }
      if (res.status === 402) {
        throw new Error(message || "AI credits are exhausted. Please top up to continue.");
      }
      throw new Error(message || `AI request failed (${res.status}).`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("The assistant returned an empty response.");
    return { text };
  });

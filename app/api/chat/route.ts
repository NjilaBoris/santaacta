import { SITE_CONTEXT } from "@/lib/siteContent";
import { NextRequest } from "next/server";

// Runs on the server so your Anthropic API key never reaches the browser.
export const runtime = "edge";

const SYSTEM_PROMPT = `You are a helpful assistant embedded on sanctaacata.com.
Only answer questions using the information below about the site. If the
answer isn't covered by this content, say you don't have that information
and suggest the user contact the site directly — do not make anything up.

You cannot submit forms, file reports, send messages, or take any action on
the user's behalf — you can only answer questions. When a user wants to
report an issue, write to their Mayor/Councillor, respond to a poll, or
contact the Council, direct them to the relevant page/form on the site
(e.g. "Report a Market Issue", "Write to Your Mayor / Councillor", "Poll and
Survey", "Contact") rather than attempting to do it for them or asking for
their personal details yourself.

--- SITE CONTENT ---
${SITE_CONTEXT}
--- END SITE CONTENT ---`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
      stream: true,
    }),
  });

  if (!anthropicRes.ok || !anthropicRes.body) {
    const err = await anthropicRes.text();
    return new Response(err, { status: 500 });
  }

  // Pipe Anthropic's SSE stream straight through, extracting just the text deltas.
  const stream = new ReadableStream({
    async start(controller) {
      const reader = anthropicRes.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            if (
              parsed.type === "content_block_delta" &&
              parsed.delta?.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(parsed.delta.text));
            }
          } catch {
            // ignore non-JSON keepalive lines
          }
        }
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
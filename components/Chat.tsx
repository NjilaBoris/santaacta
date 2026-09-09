"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUp,
  MessageSquare,
  Plus,
  PenLine,
  X,
} from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };
type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
};

const STORAGE_KEY = "acta-chat-history";

const SUGGESTIONS = [
  "How do I get a birth certificate?",
  "Building permit requirements",
  "Report a market issue",
  "Contact my Councillor",
  "Marriage registration",
];

function makeTitle(text: string) {
  const trimmed = text.trim();
  return trimmed.length > 42 ? trimmed.slice(0, 42) + "…" : trimmed;
}

export default function ChatWidget() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const started = messages.length > 0;

  // Load saved conversations on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setConversations(JSON.parse(raw));
    } catch {
      // ignore corrupt/local storage errors
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Persist the active conversation into the saved list whenever it changes.
  function persist(id: string, nextMessages: Message[]) {
    setConversations((prev) => {
      const existing = prev.find((c) => c.id === id);
      const title = existing?.title ?? makeTitle(nextMessages[0]?.content ?? "New chat");
      const updated: Conversation = {
        id,
        title,
        messages: nextMessages,
        updatedAt: Date.now(),
      };
      const rest = prev.filter((c) => c.id !== id);
      const next = [updated, ...rest].sort((a, b) => b.updatedAt - a.updatedAt);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // storage full or unavailable — conversation still works in-memory
      }
      return next;
    });
  }

  async function sendMessage(text?: string) {
    const value = (text ?? input).trim();
    if (!value || loading) return;

    const id = activeId ?? crypto.randomUUID();
    if (!activeId) setActiveId(id);

    const nextMessages: Message[] = [...messages, { role: "user", content: value }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    persist(id, nextMessages);

    const withPlaceholder = [...nextMessages, { role: "assistant" as const, content: "" }];
    setMessages(withPlaceholder);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let finalMessages = withPlaceholder;

      while (true) {
        const { done, value: chunkValue } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(chunkValue);
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          finalMessages = updated;
          return updated;
        });
      }
      persist(id, finalMessages);
    } catch {
      const failed: Message[] = [
        ...nextMessages,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ];
      setMessages(failed);
      persist(id, failed);
    } finally {
      setLoading(false);
    }
  }

  function startNewChat() {
    setMessages([]);
    setActiveId(null);
    setInput("");
    setHistoryOpen(false);
    inputRef.current?.focus();
  }

  function openConversation(id: string) {
    const convo = conversations.find((c) => c.id === id);
    if (!convo) return;
    setMessages(convo.messages);
    setActiveId(convo.id);
    setHistoryOpen(false);
  }

  return (
    <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#120707] text-[#f4ece9]">
      {/* decorative backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(194,57,79,0.16),transparent_60%)]" />
        <svg
          className="absolute left-4 top-14 h-8 w-8 text-[#c2394f]/40 sm:left-8"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <svg
          className="absolute left-0 top-24 hidden h-24 w-[70%] text-[#c2394f]/25 sm:block"
          viewBox="0 0 500 100"
          fill="none"
        >
          <path
            d="M0 60 C 120 10, 260 90, 500 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2 8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* header */}
      <header className="relative z-20 flex items-center justify-between px-4 py-4 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#c2394f]/15">
            <Sparkles className="h-4 w-4 text-[#c2394f]" strokeWidth={2} />
          </span>
          <span className="text-base font-bold tracking-tight">ACTA Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHistoryOpen(true)}
            aria-label="Chat history"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a0d0d] text-[#a98686] transition hover:text-[#f4ece9]"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={startNewChat}
            aria-label="New chat"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a0d0d] text-[#a98686] transition hover:text-[#f4ece9]"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* history panel */}
      <AnimatePresence>
        {historyOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close history"
              onClick={() => setHistoryOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-30 bg-black/50"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className="absolute inset-y-0 left-0 z-40 flex w-[85%] max-w-xs flex-col border-r border-[#3a1a1c] bg-[#150808] sm:w-80"
            >
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-sm font-semibold">Chat history</span>
                <button
                  type="button"
                  onClick={() => setHistoryOpen(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#a98686] hover:text-[#f4ece9]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={startNewChat}
                className="mx-4 mb-2 flex items-center gap-2 rounded-xl border border-[#3a1a1c] px-3 py-2.5 text-sm text-[#e4d3d3] transition hover:border-[#c2394f]/50 hover:text-[#f4ece9]"
              >
                <Plus className="h-4 w-4 text-[#c2394f]" />
                New chat
              </button>

              <div className="flex-1 overflow-y-auto px-2 py-2">
                {conversations.length === 0 ? (
                  <p className="px-3 py-6 text-center text-sm text-[#7a5c5c]">
                    No past conversations yet.
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {conversations.map((c) => (
                      <li key={c.id}>
                        <button
                          type="button"
                          onClick={() => openConversation(c.id)}
                          className={`w-full truncate rounded-lg px-3 py-2.5 text-left text-sm transition ${
                            c.id === activeId
                              ? "bg-[#c2394f]/15 text-[#f4ece9]"
                              : "text-[#a98686] hover:bg-[#1a0d0d] hover:text-[#f4ece9]"
                          }`}
                        >
                          {c.title || "New chat"}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* hero (empty state) */}
      <AnimatePresence>
        {!started && (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-10 sm:px-8"
          >
            <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c2394f]/15">
              <Sparkles className="h-6 w-6 text-[#c2394f]" strokeWidth={2} />
            </span>
            <h1 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              ACTA Assistant
            </h1>
            <p className="mt-3 max-w-md text-center text-sm leading-relaxed text-[#a98686] sm:text-base">
              Ask me anything about Santa Council: civil registration, permits,
              markets, sanitation, councillors, or how to reach your Mayor. I
              draw on ACTA&apos;s civic data for Santa Subdivision.
            </p>

            <div className="mt-8 w-full max-w-xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex items-center gap-2 rounded-2xl border border-[#3a1a1c] bg-[#1a0d0d] px-4 py-3 sm:px-5 sm:py-4"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your question about Santa Council…"
                  className="flex-1 bg-transparent text-sm text-[#f4ece9] placeholder:text-[#7a5c5c] focus:outline-none sm:text-base"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c2394f] text-white transition disabled:opacity-40"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </form>

              <p className="mt-3 text-center text-xs italic text-[#c9a06a]/80">
                Answers are based on ACTA&apos;s Santa Council civic data. For
                forms and reports, I&apos;ll point you to the right page.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => sendMessage(s)}
                    className="flex items-center gap-1.5 rounded-full border border-[#3a1a1c] bg-[#1a0d0d] px-3.5 py-2 text-xs text-[#e4d3d3] transition hover:border-[#c2394f]/50 hover:text-[#f4ece9] sm:text-sm"
                  >
                    <PenLine className="h-3.5 w-3.5 text-[#c2394f]" />
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* conversation (active state) */}
      {started && (
        <>
          <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4 sm:px-8">
            <div className="mx-auto flex max-w-2xl flex-col gap-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:text-base ${
                      m.role === "user"
                        ? "bg-[#c2394f] text-white"
                        : "border border-[#3a1a1c] bg-[#1a0d0d] text-[#f4ece9]"
                    }`}
                  >
                    {m.content || (loading && i === messages.length - 1 ? "…" : "")}
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>

          <div className="relative z-10 px-4 pb-5 pt-2 sm:px-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="mx-auto flex max-w-2xl items-center gap-2 rounded-2xl border border-[#3a1a1c] bg-[#1a0d0d] px-4 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your question about Santa Council…"
                className="flex-1 bg-transparent text-sm text-[#f4ece9] placeholder:text-[#7a5c5c] focus:outline-none sm:text-base"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c2394f] text-white transition disabled:opacity-40"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
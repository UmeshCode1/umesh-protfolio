"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Loader2, Sparkles } from "lucide-react";
import { askAssistant } from "@/app/ai/actions";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STARTER_PROMPTS = [
  "What is Umesh's tech stack?",
  "Tell me about his projects",
  "Is Umesh available for work?",
];

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Umesh's AI assistant. Ask me anything about his skills, projects, or background! 👋",
    },
  ]);
  const [isPending, startTransition] = useTransition();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  function handleSend(text?: string) {
    const message = (text ?? input).trim();
    if (!message || isPending) return;

    setInput("");
    const newMessages: Message[] = [...messages, { role: "user", content: message }];
    setMessages(newMessages);

    startTransition(async () => {
      const { reply } = await askAssistant(message);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    });
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        id="ai-chat-toggle"
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] bg-[#0D0F1A]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
            style={{ maxHeight: "min(520px, 80vh)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Umesh's Assistant</p>
                <p className="text-xs text-white/40">Powered by Gemini 2.0</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-white/10 text-white/90 rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isPending && (
                <div className="flex gap-2 justify-start">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white/10 rounded-xl rounded-bl-sm px-3 py-2 flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 text-white/50 animate-spin" />
                    <span className="text-xs text-white/50">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Starter Prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {STARTER_PROMPTS.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSend(p)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-primary/40 transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  id="ai-chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isPending}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 disabled:opacity-50"
                />
                <button
                  id="ai-chat-submit"
                  type="submit"
                  disabled={!input.trim() || isPending}
                  className="w-9 h-9 rounded-xl bg-primary hover:bg-accent flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

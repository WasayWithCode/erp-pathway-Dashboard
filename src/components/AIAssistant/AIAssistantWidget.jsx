import { useState } from "react";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";
import { assistantSuggestions } from "../Dashboard/dashboardData";
import GlassPanel from "../Widgets/GlassPanel";

const initialMessages = [
  {
    role: "assistant",
    text: "I can help with ERP concepts, simulator workflows, career planning, and module recommendations.",
  },
];

const AIAssistantWidget = ({ onFocusSection }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      {
        role: "assistant",
        text: "Recommended next step: open a focused lab, review the related concept notes, then compare your score against the career skill map.",
      },
    ]);
    setInput("");
    onFocusSection?.("/ai-assistant");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <GlassPanel
          className="mb-4 flex h-[32rem] w-[min(calc(100vw-2.5rem),25rem)] flex-col overflow-hidden"
          tone="strong"
        >
          <div className="flex items-center justify-between border-b border-slate-200/70 p-4 dark:border-white/10">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 text-white">
                <FaRobot />
              </span>
              <div>
                <h3 className="font-semibold text-slate-950 dark:text-white">
                  AI ERP Assistant
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Learning and career copilot
                </p>
              </div>
            </div>
            <button
              className="grid h-9 w-9 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white"
              type="button"
              aria-label="Close AI assistant"
              onClick={() => setOpen(false)}
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "ml-auto bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                    : "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200/70 p-4 dark:border-white/10">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {assistantSuggestions.slice(0, 3).map((question) => (
                <button
                  key={question}
                  className="shrink-0 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-cyan-100 hover:text-cyan-700 dark:bg-white/10 dark:text-slate-300 dark:hover:bg-cyan-400/15 dark:hover:text-cyan-300"
                  type="button"
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage(input);
              }}
            >
              <input
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/10 dark:text-white"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about ERP..."
              />
              <button
                className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-600 text-white transition hover:bg-cyan-500"
                type="submit"
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </GlassPanel>
      ) : null}

      <button
        className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 text-xl text-white shadow-[0_18px_50px_rgba(37,99,235,0.35)] transition hover:-translate-y-1"
        type="button"
        aria-label="Open AI ERP Assistant"
        onClick={() => setOpen((current) => !current)}
      >
        <FaRobot />
      </button>
    </div>
  );
};

export default AIAssistantWidget;

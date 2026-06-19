import { Bot, Check, Copy } from "lucide-react";
import { useState } from "react";

const formatTimestamp = (value) => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AIMessage = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const timestamp = formatTimestamp(message.createdAt);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={`group flex gap-2 px-1 py-2.5 ${isUser ? "justify-end" : "justify-start"}`} data-ai-message>
      {!isUser ? (
        <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-[1rem] bg-gradient-to-br from-blue-600 via-cyan-500 to-violet-500 text-white shadow-[0_12px_30px_rgba(37,99,235,0.22)]">
          <Bot className="h-4 w-4" />
        </div>
      ) : null}

      <div className={`max-w-[84%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`relative overflow-hidden px-4 py-3 text-sm font-medium leading-6 shadow-[0_12px_34px_rgba(15,23,42,0.08)] ${
            isUser
              ? "rounded-[1.25rem] rounded-br-md bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-500 text-white shadow-[0_14px_34px_rgba(37,99,235,0.22)]"
              : "rounded-[1.25rem] rounded-bl-md border border-white/85 bg-white/92 text-slate-700 backdrop-blur-xl"
          }`}
        >
          {isUser ? <span className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" /> : null}
          <p className="relative whitespace-pre-wrap">{message.content}</p>
          {message.isStreaming ? <span className="ml-1 inline-block h-4 w-1 animate-pulse rounded-full bg-blue-500 align-middle" /> : null}
        </div>
        {message.content ? (
          <div className={`mt-1.5 flex items-center gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
            {timestamp ? <span className="text-[11px] font-bold text-slate-400">{timestamp}</span> : null}
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex h-7 items-center gap-1 rounded-lg border border-transparent px-2 text-[11px] font-bold text-slate-400 opacity-0 transition hover:border-slate-200 hover:bg-white hover:text-blue-700 group-hover:opacity-100 focus:opacity-100"
              title="Copy message"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AIMessage;

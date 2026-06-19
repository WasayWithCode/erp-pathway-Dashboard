import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { requestErpAssistantResponse } from "../../services/erpAiApi";
import { ChatContext } from "./chatContextValue";

const STORAGE_KEY = "erp-pathway-ai-chat";

const basePrompts = [
  "What is ERP?",
  "Explain Finance Module",
  "ERP Career Roadmap",
  "SAP vs Oracle",
  "ERP Interview Questions",
  "Inventory Management",
];

const contextMap = [
  {
    key: "finance",
    label: "Finance ERP learning",
    prompts: [
      "Explain SAP FICO for beginners",
      "How does finance connect with procurement?",
      "What is a chart of accounts?",
      "Finance module interview questions",
    ],
  },
  {
    key: "hr",
    label: "HR and HCM ERP learning",
    prompts: [
      "Explain the HR module",
      "What is hire-to-retire?",
      "How does payroll work in ERP?",
      "HR module interview questions",
    ],
  },
  {
    key: "inventory",
    label: "Inventory ERP learning",
    prompts: [
      "Inventory Management",
      "Explain goods receipt and goods issue",
      "What is SAP MM?",
      "Inventory interview questions",
    ],
  },
  {
    key: "procurement",
    label: "Procurement ERP learning",
    prompts: [
      "Explain procure-to-pay",
      "What is a purchase requisition?",
      "How does vendor master data work?",
      "Procurement interview questions",
    ],
  },
  {
    key: "roadmap",
    label: "ERP career roadmap",
    prompts: [
      "Build my ERP career roadmap",
      "Which ERP module should I learn first?",
      "ERP certifications for beginners",
      "How do I get an ERP internship?",
    ],
  },
  {
    key: "jobs",
    label: "ERP careers and jobs",
    prompts: [
      "What ERP jobs are beginner friendly?",
      "ERP business analyst roadmap",
      "Functional consultant interview questions",
      "How do I build an ERP portfolio?",
    ],
  },
];

const createMessage = (role, content, meta = {}) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  role,
  content,
  createdAt: new Date().toISOString(),
  ...meta,
});

const welcomeMessage = createMessage(
  "assistant",
  "Hi, I am your ERP Learning Assistant. Ask me about ERP basics, SAP, Oracle, Dynamics, modules, careers, certifications, or interview preparation.",
  { isWelcome: true },
);

const safeJsonParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const resolvePageContext = (pathname, search, hash) => {
  const routeText = `${pathname} ${search} ${hash}`.toLowerCase();
  const matched = contextMap.find((item) => routeText.includes(item.key));

  if (matched) return matched;
  if (pathname === "/") {
    return {
      key: "home",
      label: "Home page ERP discovery",
      prompts: basePrompts,
    };
  }
  if (pathname.includes("module")) {
    return {
      key: "modules",
      label: "ERP module comparison",
      prompts: ["Compare ERP modules", "Which module fits me?", "SAP FICO vs SAP MM", "Explain ERP module skills"],
    };
  }

  return {
    key: "general",
    label: "General ERP Pathway learning",
    prompts: basePrompts,
  };
};

export const ChatProvider = ({ children }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");
  const streamTimerRef = useRef(null);
  const [messages, setMessages] = useState(() => {
    const stored = safeJsonParse(window.localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) && stored.length ? stored : [welcomeMessage];
  });

  const pageContext = useMemo(
    () => resolvePageContext(location.pathname, location.search, location.hash),
    [location.hash, location.pathname, location.search],
  );

  const suggestedPrompts = useMemo(() => {
    const merged = [...pageContext.prompts, ...basePrompts];
    return [...new Set(merged)].slice(0, 6);
  }, [pageContext.prompts]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-60)));
  }, [messages]);

  useEffect(() => () => window.clearTimeout(streamTimerRef.current), []);

  const toggleChat = useCallback(() => setIsOpen((current) => !current), []);
  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  const streamAssistantMessage = useCallback((fullContent) => {
    const assistantId = `assistant-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const words = fullContent.split(/(\s+)/);
    let index = 0;

    setMessages((current) => [
      ...current,
      createMessage("assistant", "", { id: assistantId, isStreaming: true }),
    ]);

    const tick = () => {
      index += 2;
      const nextContent = words.slice(0, index).join("");
      const complete = index >= words.length;

      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId
            ? { ...message, content: nextContent, isStreaming: !complete }
            : message,
        ),
      );

      if (!complete) {
        streamTimerRef.current = window.setTimeout(tick, 18);
      }
    };

    tick();
  }, []);

  const sendMessage = useCallback(
    async (content) => {
      const prompt = content.trim();
      if (!prompt || isTyping) return;

      setError("");
      openChat();
      const userMessage = createMessage("user", prompt);
      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setIsTyping(true);

      try {
        const response = await requestErpAssistantResponse({
          messages: nextMessages.filter((message) => !message.isWelcome),
          pageContext,
        });
        setIsTyping(false);
        streamAssistantMessage(response);
      } catch {
        setIsTyping(false);
        setError("The AI service is unavailable, so I used the built-in ERP tutor response.");
        streamAssistantMessage(
          "I could not reach the AI service right now. You can still ask me ERP learning questions here, and I will guide you with the built-in ERP tutor knowledge.",
        );
      }
    },
    [isTyping, messages, openChat, pageContext, streamAssistantMessage],
  );

  const clearChat = useCallback(() => {
    setMessages([welcomeMessage]);
    setError("");
  }, []);

  const value = useMemo(
    () => ({
      messages,
      isOpen,
      isTyping,
      error,
      pageContext,
      suggestedPrompts,
      toggleChat,
      openChat,
      closeChat,
      sendMessage,
      clearChat,
    }),
    [
      clearChat,
      closeChat,
      error,
      isOpen,
      isTyping,
      messages,
      openChat,
      pageContext,
      sendMessage,
      suggestedPrompts,
      toggleChat,
    ],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

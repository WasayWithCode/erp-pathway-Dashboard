const OPENAI_ENDPOINT = import.meta.env.VITE_OPENAI_BASE_URL || "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini";
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const ERP_SYSTEM_PROMPT = `You are ERP Pathway AI, a professional AI Learning Assistant for students learning ERP.
Answer clearly, practically, and interactively. Focus on ERP concepts, modules, SAP, Oracle ERP, Microsoft Dynamics, finance, HR, inventory, procurement, supply chain, careers, certifications, and interview preparation.
Use short sections, concrete examples, and beginner-friendly language. If a question is outside ERP learning, politely connect it back to ERP education.`;

const contextLine = (pageContext) => {
  if (!pageContext?.label) return "Current page: ERP Pathway.";
  return `Current page context: ${pageContext.label}. Prioritize helpful suggestions for this page when relevant.`;
};

const toApiMessages = (messages, pageContext) => [
  { role: "system", content: `${ERP_SYSTEM_PROMPT}\n${contextLine(pageContext)}` },
  ...messages.slice(-10).map((message) => ({
    role: message.role === "assistant" ? "assistant" : "user",
    content: message.content,
  })),
];

const compactList = (items) => items.map((item) => `- ${item}`).join("\n");

const fallbackKnowledge = [
  {
    match: ["what is erp", "erp meaning", "define erp", "erp?"],
    answer:
      "ERP stands for Enterprise Resource Planning. It is software that connects core business functions like finance, HR, inventory, procurement, sales, and reporting into one shared system.\n\nA simple way to think about it: ERP is the operational backbone of a company. Instead of each department keeping separate spreadsheets, ERP lets everyone work from the same data, approvals, and processes.\n\nStart with these concepts: master data, transactions, modules, workflows, reporting, and integration.",
  },
  {
    match: ["finance", "fico", "accounting", "general ledger", "payable", "receivable"],
    answer:
      "The Finance module manages how money moves through an organization. It usually includes general ledger, accounts payable, accounts receivable, assets, bank reconciliation, budgeting, and financial reporting.\n\nIn SAP, the finance path is commonly SAP FI or SAP FICO. Good beginner topics are chart of accounts, journal entries, posting periods, cost centers, profit centers, invoices, payments, and financial statements.\n\nCareer direction: ERP finance consultant, SAP FICO associate, Oracle Financials analyst, or Microsoft Dynamics finance functional consultant.",
  },
  {
    match: ["hr", "hcm", "human resource", "payroll", "employee"],
    answer:
      "The HR module, often called HCM, manages employee data and people processes. It can include recruitment, onboarding, attendance, payroll, performance, leave management, training, and employee self-service.\n\nImportant concepts include organization structure, personnel records, payroll rules, approval workflows, compliance, and HR analytics.\n\nFor careers, HR module learners often move toward SAP SuccessFactors, Oracle HCM, Workday, or Microsoft Dynamics HR consulting.",
  },
  {
    match: ["inventory", "warehouse", "stock", "material", "mm"],
    answer:
      "Inventory Management tracks stock movement across purchases, warehouses, production, sales, and returns. In ERP, inventory is not just a stock count; it affects procurement, finance, supply chain planning, and customer delivery.\n\nLearn these first: item master, stock levels, goods receipt, goods issue, reorder point, valuation, batches, warehouses, purchase orders, and stock reports.\n\nIn SAP, inventory is strongly connected with SAP MM and supply chain processes.",
  },
  {
    match: ["procurement", "purchase", "supplier", "vendor"],
    answer:
      "Procurement is the ERP process for buying goods and services. It usually starts with a purchase requisition, moves to purchase order creation, supplier confirmation, goods receipt, invoice verification, and payment.\n\nKey terms: vendor master, purchase requisition, purchase order, RFQ, goods receipt, three-way match, approval workflow, and contract management.\n\nThis is a strong path for students interested in supply chain, operations, or SAP MM.",
  },
  {
    match: ["supply chain", "scm", "logistics"],
    answer:
      "Supply Chain ERP connects planning, procurement, inventory, production, warehousing, transportation, and order fulfillment. The goal is to make sure the right product is available at the right time, cost, and location.\n\nBegin with demand planning, procurement, stock control, order management, warehouse operations, and supplier performance.\n\nERP supply chain roles often use SAP MM, SAP SD, SAP PP, Oracle SCM, or Microsoft Dynamics Supply Chain Management.",
  },
  {
    match: ["sap vs oracle", "oracle vs sap", "sap", "oracle erp"],
    answer:
      "SAP and Oracle are both major enterprise ERP platforms, but they are often chosen for different strengths.\n\nSAP is widely used in large manufacturing, supply chain, finance, and complex global operations. Oracle ERP Cloud is strong in finance, procurement, project management, and cloud-first enterprise workflows.\n\nFor students: choose SAP if you see more SAP jobs in your target market or want module-specific paths like FICO, MM, SD, HCM. Choose Oracle if you want cloud ERP, finance, procurement, or HCM opportunities.",
  },
  {
    match: ["microsoft dynamics", "dynamics 365", "d365"],
    answer:
      "Microsoft Dynamics 365 is Microsoft's ERP and CRM business application suite. The ERP side includes Finance, Supply Chain Management, Business Central, Commerce, Project Operations, and Human Resources.\n\nIt is a good path for students who like Microsoft ecosystems, Power BI, Excel, Azure, and business process automation.\n\nBegin with Business Central for small to mid-sized business ERP concepts, or Dynamics 365 Finance and Supply Chain for enterprise roles.",
  },
  {
    match: ["career", "roadmap", "job", "certification", "certifications"],
    answer:
      "A practical ERP career roadmap:\n\n1. Learn ERP basics: modules, master data, workflows, and reporting.\n2. Choose one module: Finance, HR, Inventory, Procurement, Sales, or Supply Chain.\n3. Pick a platform: SAP, Oracle ERP Cloud, Microsoft Dynamics, Odoo, or NetSuite.\n4. Practice business scenarios: invoice to payment, purchase to pay, hire to retire, order to cash.\n5. Build proof: notes, mini projects, dashboards, process maps, and interview answers.\n6. Prepare for roles: functional consultant, business analyst, ERP support analyst, or junior implementation consultant.\n\nCertifications help, but practical process understanding matters first.",
  },
  {
    match: ["interview", "questions", "prepare"],
    answer:
      `Common ERP interview questions:\n\n${compactList([
        "What is ERP, and why do companies use it?",
        "Explain master data versus transaction data.",
        "What are the main ERP modules?",
        "Describe procure-to-pay or order-to-cash.",
        "How does the Finance module connect with procurement or inventory?",
        "What is implementation, configuration, customization, and support?",
        "How would you gather requirements from a business user?",
      ])}\n\nStrong answer pattern: define the concept, give a business example, then explain the ERP impact.`,
  },
];

export const getLocalErpResponse = (prompt, pageContext) => {
  const normalized = prompt.toLowerCase();
  const matched = fallbackKnowledge.find((item) => item.match.some((phrase) => normalized.includes(phrase)));

  if (matched) return matched.answer;

  const contextSuggestion = pageContext?.prompts?.length
    ? `\n\nSince you are on ${pageContext.label}, useful next questions are:\n${compactList(pageContext.prompts.slice(0, 3))}`
    : "";

  return `I can help you learn ERP step by step. A strong way to begin is to choose one business process and trace it through the system: finance, HR, inventory, procurement, supply chain, or sales.\n\nAsk me for a module explanation, a career roadmap, a platform comparison, or interview practice.${contextSuggestion}`;
};

export const requestErpAssistantResponse = async ({ messages, pageContext }) => {
  const latestPrompt = messages.at(-1)?.content || "";

  if (!OPENAI_API_KEY) {
    return getLocalErpResponse(latestPrompt, pageContext);
  }

  const response = await fetch(OPENAI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: toApiMessages(messages, pageContext),
      temperature: 0.45,
      max_tokens: 700,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || "AI service request failed.");
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || getLocalErpResponse(latestPrompt, pageContext);
};

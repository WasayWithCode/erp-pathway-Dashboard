export const calculateQuizResult = (answers) => {
  const scoreMap = answers.reduce((acc, moduleName) => {
    acc[moduleName] = (acc[moduleName] || 0) + 1;
    return acc;
  }, {});

  const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
  const [moduleName = "SAP FICO", score = 0] = sorted[0] || [];

  return {
    moduleName,
    score,
    confidence: Math.round((score / Math.max(answers.length, 1)) * 100),
  };
};

export const resultMessages = {
  "SAP FICO":
    "Your answers show a strong match with finance, accounting, reporting, and controlling work. SAP FICO is a practical first ERP path for you.",
  "SAP MM":
    "Your answers show interest in procurement, inventory, and supply chain operations. SAP MM can help you enter business operations roles.",
  "SAP SD":
    "Your answers point toward sales operations, customer order handling, pricing, delivery, and billing. SAP SD is a strong fit.",
  "SAP HCM":
    "Your answers show interest in HR operations and employee data. SAP HCM can fit students who enjoy people processes and payroll support.",
  "Oracle ERP":
    "Your answers show interest in cloud enterprise systems and broad business applications. Oracle ERP is a strong modern ERP path.",
  "Odoo ERP":
    "Your answers suggest flexibility, freelancing potential, and small business implementation work. Odoo ERP is a practical path.",
  "Microsoft Dynamics":
    "Your answers fit cloud business applications, CRM, automation, and Microsoft tools. Dynamics 365 is a strong direction.",
};

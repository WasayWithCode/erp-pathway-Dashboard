import {
  FaAddressCard,
  FaAward,
  FaBell,
  FaBookOpen,
  FaBoxOpen,
  FaBriefcase,
  FaBuilding,
  FaBullseye,
  FaCalendarCheck,
  FaCertificate,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaClipboardCheck,
  FaClipboardList,
  FaComments,
  FaCubes,
  FaDatabase,
  FaDollarSign,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaFire,
  FaHandshake,
  FaHeadset,
  FaIndustry,
  FaLayerGroup,
  FaMapSigns,
  FaMedal,
  FaMicrophone,
  FaNetworkWired,
  FaPeopleArrows,
  FaProjectDiagram,
  FaRobot,
  FaRoute,
  FaShieldAlt,
  FaShoppingCart,
  FaSlidersH,
  FaStar,
  FaTachometerAlt,
  FaTasks,
  FaTh,
  FaUserCheck,
  FaUserCog,
  FaUserFriends,
  FaUserGraduate,
  FaUserTie,
  FaUsers,
  FaUsersCog,
} from "react-icons/fa";

const page = (id, label, path, icon, config) => ({
  id,
  label,
  path,
  icon,
  eyebrow: config.section,
  type: "workspace",
  tone: "cyan",
  metrics: [],
  highlights: [],
  ...config,
});

export const platformPages = [
  page("dashboard", "Dashboard", "/dashboard", FaTachometerAlt, {
    section: "MAIN",
    title: "Executive dashboard",
    description: "A focused ERP learning overview with progress, activity, quick actions, and AI signals.",
  }),

  page("learning-path", "Learning Path", "/learning-path", FaRoute, {
    section: "LEARNING",
    title: "Learning path",
    description: "Follow a role-based ERP roadmap from fundamentals through simulator evidence and career proof.",
    metrics: [["Milestones", "18/25"], ["Weekly pace", "6.5h"], ["Next", "SAP FICO"]],
    highlights: ["ERP foundation complete", "Finance and procurement labs in progress", "Career specialization queued"],
  }),
  page("erp-modules", "ERP Modules", "/erp-modules", FaLayerGroup, {
    section: "LEARNING",
    title: "ERP modules",
    description: "Explore finance, HR, inventory, procurement, sales, analytics, and cross-functional ERP processes.",
    metrics: [["Core modules", "8"], ["Labs", "42"], ["Coverage", "91%"]],
    highlights: ["Finance close controls", "Procure-to-pay", "Order-to-cash"],
  }),
  page("erp-glossary", "ERP Glossary", "/erp-glossary", FaBookOpen, {
    section: "LEARNING",
    title: "ERP glossary",
    description: "A practical concept library for ERP terms, documents, controls, and business process vocabulary.",
    metrics: [["Terms", "186"], ["Flows", "31"], ["Exam focus", "High"]],
    highlights: ["Master data", "Three-way match", "Order-to-cash"],
  }),
  page("case-studies", "Case Studies", "/case-studies", FaFileAlt, {
    section: "LEARNING",
    title: "Case studies",
    description: "Review ERP implementation scenarios and learn how teams solve rollout, process, and adoption issues.",
    metrics: [["Cases", "12"], ["Industries", "6"], ["Decision drills", "24"]],
    highlights: ["Manufacturing rollout recovery", "Retail stock visibility", "Finance shared services"],
  }),
  page("erp-process-maps", "ERP Process Maps", "/erp-process-maps", FaProjectDiagram, {
    section: "LEARNING",
    title: "ERP process maps",
    description: "Map handoffs, approvals, controls, documents, and exceptions across enterprise workflows.",
    metrics: [["Maps", "18"], ["Controls", "54"], ["Exceptions", "27"]],
    highlights: ["Procure-to-pay", "Order-to-cash", "Hire-to-retire"],
  }),

  page("sap", "SAP", "/sap", FaIndustry, {
    section: "ERP SYSTEMS",
    title: "SAP",
    description: "Build SAP process fluency across FICO, MM, SD, implementation roles, and S/4HANA foundations.",
    metrics: [["FICO", "82%"], ["MM", "74%"], ["SD", "69%"]],
    highlights: ["Universal journal", "Material master", "Sales order to billing"],
  }),
  page("oracle-erp", "Oracle ERP", "/oracle-erp", FaDatabase, {
    section: "ERP SYSTEMS",
    title: "Oracle ERP",
    description: "Practice Oracle Cloud financials, procurement, projects, approvals, and reporting foundations.",
    tone: "rose",
    metrics: [["Financials", "71%"], ["P2P", "66%"], ["Projects", "58%"]],
    highlights: ["Ledger design", "Supplier portal", "OTBI reporting"],
  }),
  page("dynamics-365", "Microsoft Dynamics 365", "/dynamics-365", FaCubes, {
    section: "ERP SYSTEMS",
    title: "Microsoft Dynamics 365",
    description: "Learn finance, supply chain, reporting, and Power Platform patterns for Microsoft ERP work.",
    tone: "blue",
    metrics: [["Finance", "74%"], ["SCM", "70%"], ["Power BI", "81%"]],
    highlights: ["Business Central", "Finance and Operations", "Dataverse automation"],
  }),
  page("odoo", "Odoo", "/odoo", FaTasks, {
    section: "ERP SYSTEMS",
    title: "Odoo",
    description: "Understand modular ERP delivery for CRM, invoicing, inventory, HR, projects, and SMB workflows.",
    tone: "violet",
    metrics: [["Apps", "11"], ["Studio flows", "8"], ["SMB fit", "High"]],
    highlights: ["App configuration", "Quotation to invoice", "Low-code customization"],
  }),
  page("erpnext", "ERPNext", "/erpnext", FaShieldAlt, {
    section: "ERP SYSTEMS",
    title: "ERPNext",
    description: "Explore open-source accounting, buying, selling, stock, manufacturing, and workflow concepts.",
    tone: "emerald",
    metrics: [["Stock", "77%"], ["Manufacturing", "61%"], ["Accounting", "64%"]],
    highlights: ["DocType model", "BOM and work orders", "Open-source implementation"],
  }),

  page("erp-simulator", "ERP Simulator", "/erp-simulator", FaCubes, {
    section: "SIMULATORS",
    title: "ERP simulator",
    description: "Run integrated ERP scenarios across master data, approvals, postings, exceptions, and review.",
    metrics: [["Scenarios", "18"], ["Accuracy", "91%"], ["Avg cycle", "7m"]],
    highlights: ["Scenario setup", "Data validation", "Posting review"],
  }),
  page("finance-simulator", "Finance Simulator", "/finance-simulator", FaFileInvoiceDollar, {
    section: "SIMULATORS",
    title: "Finance simulator",
    description: "Create invoices, process payments, reconcile items, and review financial report signals.",
    tone: "emerald",
    metrics: [["Invoices", "24"], ["Payment match", "96%"], ["Close tasks", "7"]],
    highlights: ["Invoice creation", "Payment flow", "Financial reports"],
  }),
  page("hr-simulator", "HR Simulator", "/hr-simulator", FaUsersCog, {
    section: "SIMULATORS",
    title: "HR simulator",
    description: "Manage employee records, leave requests, payroll readiness, and HR controls.",
    tone: "blue",
    metrics: [["Employees", "128"], ["Leave queue", "9"], ["Payroll ready", "94%"]],
    highlights: ["Employee management", "Leave requests", "Payroll overview"],
  }),
  page("inventory-simulator", "Inventory Simulator", "/inventory-simulator", FaBoxOpen, {
    section: "SIMULATORS",
    title: "Inventory simulator",
    description: "Track warehouse stock, movement history, reorder alerts, and inventory health.",
    tone: "amber",
    metrics: [["SKUs", "436"], ["Reorder alerts", "18"], ["Fill rate", "93%"]],
    highlights: ["Warehouse management", "Stock tracking", "Reorder alerts"],
  }),
  page("procurement-simulator", "Procurement Simulator", "/procurement-simulator", FaClipboardCheck, {
    section: "SIMULATORS",
    title: "Procurement simulator",
    description: "Move purchase requests through approval, vendor selection, receiving, and invoice matching.",
    tone: "violet",
    metrics: [["PR queue", "16"], ["Vendor SLA", "89%"], ["3-way match", "92%"]],
    highlights: ["Purchase requests", "Vendor workflow", "Receiving checks"],
  }),
  page("sales-simulator", "Sales Simulator", "/sales-simulator", FaShoppingCart, {
    section: "SIMULATORS",
    title: "Sales simulator",
    description: "Manage leads, quotes, orders, deliveries, invoices, and customer payment status.",
    tone: "rose",
    metrics: [["Leads", "42"], ["Orders", "19"], ["Invoice value", "$84k"]],
    highlights: ["Lead management", "Orders", "Invoice flow"],
  }),

  page("ai-erp-mentor", "AI ERP Mentor", "/ai-erp-mentor", FaRobot, {
    section: "AI CENTER",
    title: "AI ERP mentor",
    description: "Chat through ERP questions, receive learning recommendations, and identify weak process areas.",
    metrics: [["Weak areas", "4"], ["Next lesson", "P2P"], ["Confidence", "92%"]],
    highlights: ["Chat interface", "Learning recommendations", "Weakness analysis"],
  }),
  page("ai-career-advisor", "AI Career Advisor", "/ai-career-advisor", FaUserTie, {
    section: "AI CENTER",
    title: "AI career advisor",
    description: "Translate learning progress into role matches, portfolio steps, and certification priorities.",
    tone: "emerald",
    metrics: [["Role match", "84%"], ["Portfolio gaps", "3"], ["Next role", "ERP Analyst"]],
    highlights: ["Role matching", "Career action plan", "Portfolio positioning"],
  }),
  page("ai-resume-analyzer", "AI Resume Analyzer", "/ai-resume-analyzer", FaAddressCard, {
    section: "AI CENTER",
    title: "AI resume analyzer",
    description: "Review ERP keywords, skill gaps, readiness, and practical resume recommendations.",
    tone: "blue",
    metrics: [["ERP keywords", "36"], ["ATS score", "82%"], ["Skill gaps", "5"]],
    highlights: ["Resume upload", "Skill gap analysis", "Recommendations"],
  }),
  page("ai-interview-simulator", "AI Interview Simulator", "/ai-interview-simulator", FaMicrophone, {
    section: "AI CENTER",
    title: "AI interview simulator",
    description: "Practice ERP interview questions with scoring, feedback, and answer improvement prompts.",
    tone: "amber",
    metrics: [["Questions", "12"], ["Confidence", "86%"], ["Score", "Good"]],
    highlights: ["Mock interview flow", "Question cards", "Feedback panel"],
  }),
  page("ai-assistant", "AI Assistant", "/ai-assistant", FaHeadset, {
    section: "AI CENTER",
    title: "AI assistant",
    description: "Ask for ERP explanations, comparisons, study plans, and workflow summaries.",
    tone: "violet",
    metrics: [["Saved prompts", "18"], ["Fast answers", "94%"], ["Study plans", "11"]],
    highlights: ["ERP Q&A", "Scenario explanations", "Study planning"],
  }),

  page("analytics-dashboard", "Analytics Dashboard", "/analytics-dashboard", FaChartPie, {
    section: "ANALYTICS",
    title: "Analytics dashboard",
    description: "Track KPI trends, weekly activity, progress metrics, and learning momentum.",
    metrics: [["KPI trend", "+12%"], ["Weekly activity", "25.4h"], ["Progress delta", "+8"]],
    highlights: ["Multiple charts", "KPI trends", "Weekly activity"],
  }),
  page("erp-readiness-score", "ERP Readiness Score", "/erp-readiness-score", FaBullseye, {
    section: "ANALYTICS",
    title: "ERP readiness score",
    description: "Review platform knowledge, process fluency, simulator accuracy, and career readiness.",
    tone: "emerald",
    metrics: [["Process fluency", "88%"], ["Tool depth", "79%"], ["Career signal", "84%"]],
    highlights: ["Finance strength", "Integration gap", "Interview proof"],
  }),
  page("skills-matrix", "Skills Matrix", "/skills-matrix", FaTh, {
    section: "ANALYTICS",
    title: "Skills matrix",
    description: "Inspect ERP capabilities by module, proficiency, evidence, and recommended next practice.",
    tone: "blue",
    metrics: [["Tracked skills", "36"], ["Verified", "21"], ["High priority", "6"]],
    highlights: ["Finance reporting", "Procurement approvals", "Warehouse replenishment"],
  }),
  page("learning-heatmap", "Learning Heatmap", "/learning-heatmap", FaFire, {
    section: "ANALYTICS",
    title: "Learning heatmap",
    description: "See practice consistency across days, modules, labs, reviews, and AI sessions.",
    tone: "amber",
    metrics: [["Streak", "14 days"], ["Peak hour", "8 PM"], ["Deep work", "11h"]],
    highlights: ["Evening practice", "Saturday review dip", "Finance lab momentum"],
  }),
  page("progress-tracking", "Progress Tracking", "/progress-tracking", FaChartLine, {
    section: "ANALYTICS",
    title: "Progress tracking",
    description: "Follow milestones, open tasks, proof artifacts, and readiness movement over time.",
    tone: "violet",
    metrics: [["Milestones", "18/25"], ["Open tasks", "7"], ["Artifacts", "12"]],
    highlights: ["SAP FICO proof", "Procurement lab pending", "Roadmap recalculated"],
  }),

  page("career-roadmap", "Career Roadmap", "/career-roadmap", FaMapSigns, {
    section: "CAREER",
    title: "Career roadmap",
    description: "Plan your route to ERP analyst, functional consultant, implementation, or systems roles.",
    metrics: [["Target role", "ERP Analyst"], ["Role match", "84%"], ["Next proof", "Finance case"]],
    highlights: ["Entry analyst path", "Functional specialization", "Consultant portfolio"],
  }),
  page("certification-roadmap", "Certification Roadmap", "/certification-roadmap", FaCertificate, {
    section: "CAREER",
    title: "Certification roadmap",
    description: "Prioritize ERP, analytics, finance, cloud, and platform certifications by career value.",
    tone: "emerald",
    metrics: [["Recommended", "5"], ["In progress", "2"], ["Exam readiness", "72%"]],
    highlights: ["ERP fundamentals", "SAP finance", "Power BI"],
  }),
  page("job-board", "Job Board", "/job-board", FaBriefcase, {
    section: "CAREER",
    title: "Job board",
    description: "Review ERP roles, skill requirements, application status, and fit signals.",
    tone: "blue",
    metrics: [["Open roles", "24"], ["Strong matches", "8"], ["Applications", "3"]],
    highlights: ["ERP Analyst", "SAP FICO Associate", "Business Systems Analyst"],
  }),
  page("learning-to-career-tracker", "Learning To Career Tracker", "/learning-to-career-tracker", FaPeopleArrows, {
    section: "CAREER",
    title: "Learning to career tracker",
    description: "Connect lessons, simulator evidence, certificates, and case artifacts to job-ready proof.",
    tone: "violet",
    metrics: [["Proof points", "15"], ["Portfolio ready", "68%"], ["Role stories", "5"]],
    highlights: ["Resume bullets", "Certificate evidence", "Interview stories"],
  }),

  page("certificates", "Certificates", "/certificates", FaAward, {
    section: "ACHIEVEMENTS",
    title: "Certificates",
    description: "Manage verified certificates, in-progress credentials, and share-ready achievements.",
    metrics: [["Earned", "6"], ["In progress", "2"], ["Verification", "100%"]],
    highlights: ["ERP Fundamentals", "Finance Lab Specialist", "Process Champion"],
  }),
  page("badges", "Badges", "/badges", FaMedal, {
    section: "ACHIEVEMENTS",
    title: "Badges",
    description: "Track earned badges for practice consistency, process mastery, and community contribution.",
    tone: "amber",
    metrics: [["Unlocked", "18"], ["Rare badges", "4"], ["Next badge", "P2P Pro"]],
    highlights: ["Finance closer", "Procurement reviewer", "Inventory controller"],
  }),
  page("xp-rewards", "XP & Rewards", "/xp-rewards", FaStar, {
    section: "ACHIEVEMENTS",
    title: "XP and rewards",
    description: "Track XP, streaks, reward tiers, weekly goals, and learning momentum.",
    tone: "emerald",
    metrics: [["XP", "18,420"], ["Level", "24"], ["Streak", "14d"]],
    highlights: ["Weekly challenge", "Simulator bonus", "Level 25 reward"],
  }),
  page("leaderboard", "Leaderboard", "/leaderboard", FaChartBar, {
    section: "ACHIEVEMENTS",
    title: "Leaderboard",
    description: "Compare rankings, XP points, achievement velocity, and ERP specialty strengths.",
    tone: "rose",
    metrics: [["Your rank", "#12"], ["Top XP", "25,810"], ["Weekly climb", "+6"]],
    highlights: ["Rankings", "XP points", "Achievement system"],
  }),

  page("community-hub", "Community Hub", "/community-hub", FaUsers, {
    section: "COMMUNITY",
    title: "Community hub",
    description: "Find discussions, study sessions, mentor reviews, and peer learning opportunities.",
    metrics: [["Members", "8.4k"], ["Live rooms", "12"], ["Peer reviews", "31"]],
    highlights: ["SAP learner circle", "Finance study room", "Resume review sprint"],
  }),
  page("discussion-forum", "Discussion Forum", "/discussion-forum", FaComments, {
    section: "COMMUNITY",
    title: "Discussion forum",
    description: "Ask ERP questions, share blockers, and learn from scenario-based practitioner answers.",
    tone: "blue",
    metrics: [["Threads", "426"], ["Solved", "87%"], ["Avg reply", "18m"]],
    highlights: ["Three-way match", "SAP vs Oracle careers", "Inventory valuation"],
  }),
  page("study-groups", "Study Groups", "/study-groups", FaUserFriends, {
    section: "COMMUNITY",
    title: "Study groups",
    description: "Join cohort rooms for modules, certifications, simulator practice, and interview prep.",
    tone: "emerald",
    metrics: [["Groups", "18"], ["Seats open", "64"], ["Next session", "Today"]],
    highlights: ["SAP FICO sprint", "ERP analyst prep", "Procurement mapping"],
  }),
  page("mentor-network", "Mentor Network", "/mentor-network", FaUserGraduate, {
    section: "COMMUNITY",
    title: "Mentor network",
    description: "Book ERP mentor feedback for portfolios, interviews, and implementation scenarios.",
    tone: "violet",
    metrics: [["Mentors", "42"], ["Open slots", "16"], ["Avg rating", "4.8"]],
    highlights: ["Finance office hour", "Portfolio review", "Stakeholder mock interview"],
  }),

  page("employer-dashboard", "Employer Dashboard", "/employer-dashboard", FaBuilding, {
    section: "EMPLOYER",
    title: "Employer dashboard",
    description: "Monitor talent readiness, department analytics, hiring workflow, and ERP development.",
    metrics: [["Employees", "248"], ["Ready candidates", "38"], ["Hiring stages", "5"]],
    highlights: ["Employee table", "Department analytics", "Hiring workflow"],
  }),
  page("talent-pool", "Talent Pool", "/talent-pool", FaUserCheck, {
    section: "EMPLOYER",
    title: "Talent pool",
    description: "Search ERP-ready candidates by module strength, proof, certifications, and role intent.",
    tone: "emerald",
    metrics: [["Candidates", "1,284"], ["Verified", "63%"], ["Shortlisted", "42"]],
    highlights: ["SAP finance candidates", "Dynamics analysts", "ERPNext implementers"],
  }),
  page("candidate-ranking", "Candidate Ranking", "/candidate-ranking", FaClipboardList, {
    section: "EMPLOYER",
    title: "Candidate ranking",
    description: "Rank candidates using ERP readiness, simulator evidence, certifications, and role fit.",
    tone: "blue",
    metrics: [["Ranked", "186"], ["Top tier", "24"], ["Confidence", "91%"]],
    highlights: ["Weighted skills", "Evidence ranking", "Interview queue"],
  }),
  page("hiring-dashboard", "Hiring Dashboard", "/hiring-dashboard", FaHandshake, {
    section: "EMPLOYER",
    title: "Hiring dashboard",
    description: "Coordinate requisitions, interview stages, candidate feedback, and offer readiness.",
    tone: "amber",
    metrics: [["Open reqs", "9"], ["Interviews", "17"], ["Offer-ready", "5"]],
    highlights: ["ERP analyst req", "SAP consultant panel", "Offer workflow"],
  }),

  page("notifications", "Notifications", "/notifications", FaBell, {
    section: "SYSTEM",
    title: "Notifications",
    description: "Review learning alerts, mentor updates, certificate events, job matches, and workflow notices.",
    tone: "rose",
    metrics: [["Unread", "7"], ["Priority", "2"], ["Muted topics", "3"]],
    highlights: ["SAP sprint unlocked", "Mentor feedback", "Job deadline"],
  }),
  page("user-profile", "User Profile", "/user-profile", FaUserCog, {
    section: "SYSTEM",
    title: "User profile",
    description: "Manage identity, career goal, portfolio evidence, preferences, and public achievement profile.",
    tone: "blue",
    metrics: [["Profile strength", "86%"], ["Artifacts", "12"], ["Goal", "ERP Analyst"]],
    highlights: ["Career goal", "Verified certificates", "Portfolio evidence"],
  }),
  page("settings", "Settings", "/settings", FaSlidersH, {
    section: "SYSTEM",
    title: "Settings",
    description: "Configure theme, notifications, learning preferences, privacy, security, and integrations.",
    tone: "slate",
    metrics: [["Theme", "Auto"], ["MFA", "On"], ["Integrations", "4"]],
    highlights: ["Light and dark mode", "Notification routing", "Security export"],
  }),
];

export const sidebarSections = [
  "MAIN",
  "LEARNING",
  "ERP SYSTEMS",
  "SIMULATORS",
  "AI CENTER",
  "ANALYTICS",
  "CAREER",
  "ACHIEVEMENTS",
  "COMMUNITY",
  "EMPLOYER",
  "SYSTEM",
].map((label) => ({
  label,
  items: platformPages
    .filter((item) => item.section === label)
    .map(({ id, label: itemLabel, path, icon }) => ({
      id,
      label: itemLabel,
      path,
      icon,
    })),
}));

export const pageByKey = Object.fromEntries(
  platformPages.map((item) => [item.id, item]),
);

export const dashboardKpis = [
  { label: "ERP Progress", value: 76, suffix: "%", detail: "Across your learning roadmap", trend: "+12% this month", tone: "cyan", icon: FaChartLine },
  { label: "Modules Completed", value: 18, suffix: "/25", detail: "Core and advanced modules", trend: "5 active", tone: "emerald", icon: FaLayerGroup },
  { label: "Learning Hours", value: 124, suffix: "h", detail: "Guided lessons and labs", trend: "+9h weekly", tone: "amber", icon: FaCalendarCheck },
  { label: "Practice Score", value: 91, suffix: "%", detail: "Simulator accuracy", trend: "+6 points", tone: "blue", icon: FaBullseye },
  { label: "Career Readiness", value: 84, suffix: "%", detail: "Role-fit assessment", trend: "Analyst-ready", tone: "violet", icon: FaBriefcase },
  { label: "Certificates", value: 6, detail: "Verified milestones", trend: "2 in progress", tone: "rose", icon: FaCertificate },
];

export const quickActions = [
  { label: "Open learning path", path: "/learning-path", icon: FaRoute },
  { label: "Open ERP simulator", path: "/erp-simulator", icon: FaCubes },
  { label: "Ask ERP AI", path: "/ai-assistant", icon: FaRobot },
];

export const notifications = [
  { title: "SAP FICO sprint unlocked", detail: "3 new posting simulations are ready.", icon: FaBell },
  { title: "Certificate review complete", detail: "ERP Fundamentals can be added to your profile.", icon: FaCertificate },
  { title: "Career roadmap updated", detail: "Two finance analyst roles match your current skills.", icon: FaRoute },
  { title: "Practice hub activity", detail: "ERP Simulator and Practice Labs are available from the sidebar.", icon: FaCubes },
];

export const recentActivity = [
  { title: "Completed SAP FICO: GL Posting", time: "12 min ago", detail: "Scored 94% on document splitting and validation.", icon: FaClipboardCheck },
  { title: "Practiced procurement approvals", time: "Yesterday", detail: "Resolved 8 simulated purchase requisitions.", icon: FaTasks },
  { title: "Unlocked ERP Fundamentals certificate", time: "2 days ago", detail: "Milestone added to your verified achievement vault.", icon: FaMedal },
  { title: "Career roadmap recalculated", time: "Jun 14", detail: "SAP FICO Associate moved into your top role matches.", icon: FaRoute },
];

export const weeklyActivity = [
  { day: "Mon", hours: 3.4 },
  { day: "Tue", hours: 4.2 },
  { day: "Wed", hours: 2.8 },
  { day: "Thu", hours: 5.1 },
  { day: "Fri", hours: 4.6 },
  { day: "Sat", hours: 2.2 },
  { day: "Sun", hours: 3.1 },
];

export const skillRadar = [
  { skill: "Finance", value: 88 },
  { skill: "Procurement", value: 78 },
  { skill: "Inventory", value: 82 },
  { skill: "HR", value: 70 },
  { skill: "Analytics", value: 76 },
  { skill: "Integration", value: 64 },
];

export const learningProgress = [
  { label: "Core ERP Concepts", value: 92 },
  { label: "Finance Operations", value: 86 },
  { label: "Supply Chain", value: 74 },
  { label: "People Operations", value: 69 },
];

export const learningModules = [
  { name: "SAP", track: "FICO, MM, SD foundations", progress: 82, icon: FaIndustry, color: "from-cyan-500 to-blue-600" },
  { name: "Oracle ERP", track: "Procure-to-pay and financials", progress: 68, icon: FaDatabase, color: "from-rose-500 to-orange-500" },
  { name: "Microsoft Dynamics", track: "Operations, CRM, and reporting", progress: 74, icon: FaLayerGroup, color: "from-indigo-500 to-violet-600" },
  { name: "Odoo", track: "SMB workflows and app studio", progress: 59, icon: FaTasks, color: "from-emerald-500 to-teal-600" },
  { name: "ERPNext", track: "Open-source manufacturing flows", progress: 63, icon: FaShieldAlt, color: "from-amber-500 to-yellow-500" },
];

export const simulatorLabs = [
  { name: "Finance", detail: "Journal entries, invoices, reconciliations", progress: 88, icon: FaDollarSign },
  { name: "HR", detail: "Hiring, payroll, attendance, performance", progress: 71, icon: FaUsers },
  { name: "Inventory", detail: "Stock movements, batches, reorder rules", progress: 79, icon: FaBoxOpen },
  { name: "Sales", detail: "Quotes, orders, pricing, fulfillment", progress: 66, icon: FaShoppingCart },
  { name: "Procurement", detail: "Purchase requests, approvals, vendors", progress: 73, icon: FaClipboardCheck },
  { name: "Cross-functional", detail: "End-to-end ERP scenario practice", progress: 91, icon: FaNetworkWired },
];

export const careerRoadmap = [
  { phase: "Foundation", title: "ERP concepts", status: "Complete", detail: "Process mapping, requirements, master data" },
  { phase: "Platform", title: "Core ERP modules", status: "In progress", detail: "Module specialization and hands-on practice" },
  { phase: "Specialization", title: "Role-specific labs", status: "Next", detail: "Integrations, governance, cross-functional design" },
];

export const jobRoles = [
  { role: "ERP Analyst", match: 92, salary: "$76k - $105k", requirements: "SQL, process mapping, UAT, finance basics" },
  { role: "SAP FICO Associate", match: 84, salary: "$88k - $122k", requirements: "GL, AP, AR, asset accounting" },
  { role: "Business Systems Analyst", match: 81, salary: "$82k - $115k", requirements: "Requirements, reporting, integrations" },
];

export const candidates = [
  { name: "Ayesha Khan", role: "ERP Analyst", dept: "Finance", score: 94, status: "Interview" },
  { name: "Bilal Ahmed", role: "SAP FICO Associate", dept: "Finance", score: 89, status: "Shortlisted" },
  { name: "Sara Malik", role: "Dynamics Operations Analyst", dept: "Operations", score: 86, status: "Assessment" },
  { name: "Usman Tariq", role: "ERPNext Implementer", dept: "Manufacturing", score: 82, status: "Review" },
];

export const employees = [
  { id: "E001", name: "Ayesha Khan", dept: "Finance", role: "Sr. Accountant", readiness: 92, status: "Active" },
  { id: "E002", name: "Bilal Ahmed", dept: "IT", role: "ERP Analyst", readiness: 86, status: "Training" },
  { id: "E003", name: "Sara Malik", dept: "HR", role: "HR Manager", readiness: 78, status: "Active" },
  { id: "E004", name: "Usman Tariq", dept: "Operations", role: "Implementation Lead", readiness: 88, status: "Mentor" },
];

export const achievements = [
  { title: "ERP Fundamentals", status: "Earned", progress: 100, icon: FaAward },
  { title: "Finance Lab Specialist", status: "In progress", progress: 78, icon: FaFileInvoiceDollar },
  { title: "Process Champion", status: "Milestone", progress: 64, icon: FaProjectDiagram },
  { title: "Career Ready", status: "Locked", progress: 42, icon: FaUserTie },
];

export const glossaryTerms = [
  ["Master data", "Stable records such as customers, vendors, materials, accounts, employees, and cost centers."],
  ["Three-way match", "A procurement control comparing purchase order, goods receipt, and supplier invoice."],
  ["Order-to-cash", "The sales process from order entry through delivery, invoice, and payment."],
  ["Procure-to-pay", "The buying process from requisition and approval through receiving, invoice, and payment."],
];

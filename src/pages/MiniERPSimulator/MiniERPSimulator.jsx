import { useMemo, useState } from "react";
import {
  FaBoxOpen,
  FaBuilding,
  FaCheckCircle,
  FaFileInvoiceDollar,
  FaPlus,
  FaUsers,
} from "react-icons/fa";
import GlassPanel from "../../components/Widgets/GlassPanel";
import FeaturePage from "../PageTemplates/FeaturePage";
import mockData from "../../data/erpSaasMockData.json";

const initialInvoices = [
  { id: "INV-001", client: "Pak Suzuki Motors", amount: 450000, status: "Paid" },
  { id: "INV-002", client: "Lucky Cement", amount: 780000, status: "Pending" },
];

const initialEmployees = [
  { id: "E-001", name: "Ayesha Khan", role: "Finance Analyst", dept: "Finance", salary: 95000 },
  { id: "E-002", name: "Bilal Ahmed", role: "ERP Analyst", dept: "IT", salary: 110000 },
  { id: "E-003", name: "Sara Malik", role: "HR Manager", dept: "HR", salary: 85000 },
];

const initialInventory = [
  { id: "SKU-001", name: "Laptop Dell XPS", qty: 12, reorderAt: 5, value: 180000 },
  { id: "SKU-002", name: "Office Chair", qty: 3, reorderAt: 5, value: 25000 },
  { id: "SKU-003", name: "A4 Paper Ream", qty: 45, reorderAt: 10, value: 800 },
];

const tabs = [
  { id: "finance", label: "Finance", icon: FaFileInvoiceDollar },
  { id: "people", label: "People", icon: FaUsers },
  { id: "inventory", label: "Inventory", icon: FaBoxOpen },
];

const currency = (value) => `PKR ${Number(value).toLocaleString("en-PK")}`;

const MiniERPSimulator = () => {
  const [activeTab, setActiveTab] = useState("finance");
  const [stepIndex, setStepIndex] = useState(0);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [employees, setEmployees] = useState(initialEmployees);
  const [inventory, setInventory] = useState(initialInventory);

  const metrics = useMemo(() => {
    const revenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const pending = invoices.filter((invoice) => invoice.status === "Pending").length;
    const payroll = employees.reduce((sum, employee) => sum + employee.salary, 0);
    const stockValue = inventory.reduce((sum, item) => sum + item.qty * item.value, 0);
    return { revenue, pending, payroll, stockValue };
  }, [employees, inventory, invoices]);

  const addInvoice = () => {
    setInvoices((current) => [
      { id: `INV-${String(current.length + 1).padStart(3, "0")}`, client: "ERP Practice Client", amount: 250000, status: "Pending" },
      ...current,
    ]);
  };

  const addEmployee = () => {
    setEmployees((current) => [
      ...current,
      { id: `E-${String(current.length + 1).padStart(3, "0")}`, name: "New Trainee", role: "ERP Trainee", dept: "Operations", salary: 65000 },
    ]);
  };

  const adjustStock = (id, delta) => {
    setInventory((current) =>
      current.map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)),
    );
  };

  const nextStep = () => setStepIndex((current) => (current + 1) % mockData.simulator.steps.length);

  return (
    <FeaturePage
      eyebrow="Practice"
      title="Mini ERP Simulator"
      description="A compact ERP sandbox for finance, people, and inventory workflows."
      primaryAction={{ label: "Practice Labs", to: "/practice-labs", icon: FaBoxOpen }}
      secondaryAction={{ label: "Dashboard", to: "/dashboard", icon: FaFileInvoiceDollar }}
      accent="violet"
      score={89}
      scoreLabel="simulation readiness"
      summaryTitle="Simulator focus"
      summaryPoints={[
        "Use the simulator to rehearse ERP operations in short, repeatable loops.",
        "Finance, people, and inventory are isolated into practical exercises.",
        "Switch to the labs page when you want more guided practice cards.",
      ]}
      stats={[
        { label: "Revenue", value: currency(metrics.revenue), tone: "cyan", icon: FaFileInvoiceDollar, detail: "Invoices and revenue snapshots." },
        { label: "Pending", value: metrics.pending, tone: "amber", icon: FaCheckCircle, detail: "Invoices waiting for settlement." },
        { label: "Payroll", value: currency(metrics.payroll), tone: "violet", icon: FaUsers, detail: "Monthly payroll impact." },
        { label: "Stock value", value: currency(metrics.stockValue), tone: "emerald", icon: FaBoxOpen, detail: "Inventory at current value." },
      ]}
    >
      <section className="grid gap-4 md:grid-cols-4" data-page-enter>
        {mockData.simulator.modules.map((module) => {
          const Icon = module.key === "finance" ? FaFileInvoiceDollar : module.key === "hr" ? FaUsers : FaBoxOpen;
          const active = activeTab === module.key;
          return (
            <button
              key={module.key}
              type="button"
              onClick={() => setActiveTab(module.key)}
              className={`rounded-2xl border p-4 text-left transition hover:-translate-y-1 ${
                active
                  ? "border-cyan-300 bg-white shadow-lg dark:border-cyan-300/30 dark:bg-white/[0.08]"
                  : "border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 text-white">
                  <Icon />
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:bg-white/10 dark:text-slate-300">
                  {active ? "Active" : module.progress > 70 ? "Ready" : "Queued"}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{module.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{module.detail}</p>
            </button>
          );
        })}
      </section>

      <GlassPanel className="overflow-hidden" data-page-enter>
        <div className="flex flex-wrap gap-2 border-b border-slate-200 p-4 dark:border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
                  activeTab === tab.id
                    ? "bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300"
                }`}
                type="button"
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-5">
          <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Simulation flow
                </p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                  {mockData.simulator.steps[stepIndex]}
                </h3>
              </div>
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950"
              >
                Next step
              </button>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-5">
              {mockData.simulator.steps.map((step, index) => (
                <div
                  key={step}
                  className={`rounded-xl px-3 py-2 text-center text-xs font-semibold ${
                    index === stepIndex
                      ? "bg-cyan-600 text-white"
                      : index < stepIndex
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300"
                        : "bg-white text-slate-500 dark:bg-white/10 dark:text-slate-400"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>

          {activeTab === "finance" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Invoice control</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Create and settle practice receivables.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500" type="button" onClick={addInvoice}>
                  <FaPlus /> New invoice
                </button>
              </div>
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06] sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-white">{invoice.client}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{invoice.id} - {invoice.status}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-300">{currency(invoice.amount)}</span>
                    {invoice.status === "Pending" ? (
                      <button
                        className="rounded-xl border border-emerald-300 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-300/30 dark:text-emerald-200 dark:hover:bg-emerald-400/10"
                        type="button"
                        onClick={() => setInvoices((current) => current.map((item) => (item.id === invoice.id ? { ...item, status: "Paid" } : item)))}
                      >
                        Mark paid
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {activeTab === "people" ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-950 dark:text-white">People operations</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Practice HR records and payroll impact.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500" type="button" onClick={addEmployee}>
                  <FaPlus /> Add trainee
                </button>
              </div>
              <div className="grid gap-3 lg:grid-cols-3">
                {employees.map((employee) => (
                  <div key={employee.id} className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.06]">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 font-bold text-white dark:bg-white dark:text-slate-950">
                      {employee.name.charAt(0)}
                    </span>
                    <p className="mt-4 font-semibold text-slate-950 dark:text-white">{employee.name}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{employee.role} - {employee.dept}</p>
                    <p className="mt-3 text-sm font-semibold text-violet-700 dark:text-violet-300">{currency(employee.salary)}/mo</p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addEmployee}
                className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-100 dark:border-violet-400/20 dark:bg-violet-400/10 dark:text-violet-200"
              >
                <FaPlus />
                Simulate new hire
              </button>
            </div>
          ) : null}

          {activeTab === "inventory" ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950 dark:text-white">Inventory movements</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Adjust stock and spot reorder alerts.</p>
              </div>
              {inventory.map((item) => {
                const lowStock = item.qty <= item.reorderAt;
                return (
                  <div
                    key={item.id}
                    className={`flex flex-col gap-3 rounded-2xl border p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                      lowStock
                        ? "border-amber-300 bg-amber-50/80 dark:border-amber-300/20 dark:bg-amber-400/10"
                        : "border-slate-200 bg-white/70 dark:border-white/10 dark:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                        <FaBuilding />
                      </span>
                      <div>
                        <p className="font-semibold text-slate-950 dark:text-white">{item.name}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.id} - Reorder at {item.reorderAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-lg font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-white/10 dark:text-white" type="button" onClick={() => adjustStock(item.id, -1)}>
                        -
                      </button>
                      <span className={`w-12 text-center text-xl font-semibold ${lowStock ? "text-amber-700 dark:text-amber-200" : "text-slate-950 dark:text-white"}`}>
                        {item.qty}
                      </span>
                      <button className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100 text-lg font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-white/10 dark:text-white" type="button" onClick={() => adjustStock(item.id, 1)}>
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </GlassPanel>
    </FeaturePage>
  );
};

export default MiniERPSimulator;

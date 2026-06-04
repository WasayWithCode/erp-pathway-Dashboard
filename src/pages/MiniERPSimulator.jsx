import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Badge,
  Button,
  DashboardCard,
  GlassCard,
  Modal,
  ProgressBar,
  SectionHeader,
  StatCard,
} from "../components/dashboard";
import Icon from "../components/UI/Icon";
import { useGsapReveal } from "../hooks/useGsapReveal";

const money = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

const initialInvoices = [
  {
    id: "INV-2026-001",
    client: "Pak Suzuki Motors",
    project: "ERP consulting retainer",
    amount: 450000,
    status: "Paid",
    invoiceDate: "2026-05-18",
    dueDate: "2026-06-01",
  },
  {
    id: "INV-2026-002",
    client: "Lucky Cement Ltd.",
    project: "SAP FICO implementation",
    amount: 780000,
    status: "Pending",
    invoiceDate: "2026-05-28",
    dueDate: "2026-06-12",
  },
  {
    id: "INV-2026-003",
    client: "HBL Pakistan",
    project: "Support and training package",
    amount: 310000,
    status: "Overdue",
    invoiceDate: "2026-05-11",
    dueDate: "2026-05-30",
  },
];

const initialEmployees = [
  {
    id: "EMP-101",
    name: "Ayesha Khan",
    department: "Finance",
    role: "Senior Accountant",
    salary: 95000,
    status: "Active",
    joined: "2024-02-12",
  },
  {
    id: "EMP-102",
    name: "Bilal Ahmed",
    department: "IT",
    role: "ERP Analyst",
    salary: 110000,
    status: "Active",
    joined: "2023-09-20",
  },
  {
    id: "EMP-103",
    name: "Sara Malik",
    department: "HR",
    role: "HR Manager",
    salary: 87000,
    status: "Active",
    joined: "2022-11-08",
  },
  {
    id: "EMP-104",
    name: "Usman Tariq",
    department: "Operations",
    role: "Support Specialist",
    salary: 72000,
    status: "On Leave",
    joined: "2024-08-01",
  },
];

const initialInventory = [
  {
    id: "SKU-2001",
    name: "Dell Latitude Laptop",
    category: "IT Equipment",
    quantity: 12,
    unitCost: 180000,
    reorderPoint: 5,
  },
  {
    id: "SKU-2002",
    name: "Office Chair",
    category: "Furniture",
    quantity: 4,
    unitCost: 25000,
    reorderPoint: 6,
  },
  {
    id: "SKU-2003",
    name: "Printer Toner",
    category: "Stationery",
    quantity: 2,
    unitCost: 12000,
    reorderPoint: 4,
  },
  {
    id: "SKU-2004",
    name: "A4 Paper Ream",
    category: "Stationery",
    quantity: 41,
    unitCost: 800,
    reorderPoint: 10,
  },
];

const tabs = [
  { id: "overview", label: "Overview", icon: "dashboard" },
  { id: "invoices", label: "Invoices", icon: "finance" },
  { id: "employees", label: "Employees", icon: "people" },
  { id: "inventory", label: "Inventory", icon: "inventory" },
];

const invoiceStatusTone = (status) => {
  if (status === "Paid") return "emerald";
  if (status === "Pending") return "amber";
  return "rose";
};

const randomId = (prefix) => `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

const initialInvoiceForm = {
  client: "",
  project: "",
  amount: "",
  invoiceDate: new Date().toISOString().slice(0, 10),
  dueDate: "",
  status: "Pending",
};

const initialEmployeeForm = {
  name: "",
  department: "Finance",
  role: "ERP Analyst",
  salary: "",
  status: "Active",
  joined: new Date().toISOString().slice(0, 10),
};

const initialInventoryForm = {
  name: "",
  category: "IT Equipment",
  quantity: "",
  unitCost: "",
  reorderPoint: "5",
};

const MiniERPSimulator = () => {
  const rootRef = useRef(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [invoices, setInvoices] = useState(initialInvoices);
  const [employees, setEmployees] = useState(initialEmployees);
  const [inventory, setInventory] = useState(initialInventory);
  const [modal, setModal] = useState(null);
  const [invoiceForm, setInvoiceForm] = useState(initialInvoiceForm);
  const [employeeForm, setEmployeeForm] = useState(initialEmployeeForm);
  const [inventoryForm, setInventoryForm] = useState(initialInventoryForm);
  const [search, setSearch] = useState("");

  useGsapReveal(rootRef);

  useEffect(() => {
    if (!rootRef.current) return;
    const tween = gsap.fromTo(
      rootRef.current.querySelectorAll("[data-hero]"),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
    );
    return () => tween.kill();
  }, []);

  const summary = useMemo(() => {
    const revenue = invoices.reduce((sum, item) => sum + item.amount, 0);
    const paid = invoices.filter((item) => item.status === "Paid").reduce((sum, item) => sum + item.amount, 0);
    const pending = invoices.filter((item) => item.status !== "Paid").reduce((sum, item) => sum + item.amount, 0);
    const payroll = employees.filter((item) => item.status === "Active").reduce((sum, item) => sum + item.salary, 0);
    const inventoryValue = inventory.reduce((sum, item) => sum + item.quantity * item.unitCost, 0);
    const lowStock = inventory.filter((item) => item.quantity <= item.reorderPoint);
    return {
      revenue,
      paid,
      pending,
      payroll,
      inventoryValue,
      lowStock,
      activeEmployees: employees.filter((item) => item.status === "Active").length,
      overdueInvoices: invoices.filter((item) => item.status === "Overdue").length,
    };
  }, [employees, inventory, invoices]);

  const departmentBreakdown = useMemo(() => {
    const counts = employees.reduce((acc, employee) => {
      acc[employee.department] = (acc[employee.department] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([department, count]) => ({ department, count }))
      .sort((a, b) => b.count - a.count);
  }, [employees]);

  const filteredInvoices = useMemo(
    () =>
      invoices.filter((item) => {
        const term = search.trim().toLowerCase();
        if (!term) return true;
        return (
          item.client.toLowerCase().includes(term) ||
          item.project.toLowerCase().includes(term) ||
          item.id.toLowerCase().includes(term)
        );
      }),
    [invoices, search],
  );

  const monthlyBars = useMemo(
    () => [
      { label: "May", value: 48 },
      { label: "Jun", value: 72 },
      { label: "Jul", value: 54 },
      { label: "Aug", value: 88 },
      { label: "Sep", value: 66 },
    ],
    [],
  );

  const invoiceFormReady = invoiceForm.client.trim() && invoiceForm.project.trim() && invoiceForm.amount;
  const employeeFormReady = employeeForm.name.trim() && employeeForm.salary;
  const inventoryFormReady = inventoryForm.name.trim() && inventoryForm.quantity && inventoryForm.unitCost;

  const resetModal = () => {
    setModal(null);
    setInvoiceForm(initialInvoiceForm);
    setEmployeeForm(initialEmployeeForm);
    setInventoryForm(initialInventoryForm);
  };

  const submitInvoice = (event) => {
    event.preventDefault();
    if (!invoiceFormReady) return;
    setInvoices((current) => [
      {
        id: randomId("INV-2026"),
        client: invoiceForm.client.trim(),
        project: invoiceForm.project.trim(),
        amount: Number(invoiceForm.amount),
        invoiceDate: invoiceForm.invoiceDate,
        dueDate: invoiceForm.dueDate,
        status: invoiceForm.status,
      },
      ...current,
    ]);
    resetModal();
  };

  const submitEmployee = (event) => {
    event.preventDefault();
    if (!employeeFormReady) return;
    setEmployees((current) => [
      {
        id: randomId("EMP"),
        name: employeeForm.name.trim(),
        department: employeeForm.department,
        role: employeeForm.role,
        salary: Number(employeeForm.salary),
        status: employeeForm.status,
        joined: employeeForm.joined,
      },
      ...current,
    ]);
    resetModal();
  };

  const submitInventory = (event) => {
    event.preventDefault();
    if (!inventoryFormReady) return;
    setInventory((current) => [
      {
        id: randomId("SKU"),
        name: inventoryForm.name.trim(),
        category: inventoryForm.category,
        quantity: Number(inventoryForm.quantity),
        unitCost: Number(inventoryForm.unitCost),
        reorderPoint: Number(inventoryForm.reorderPoint),
      },
      ...current,
    ]);
    resetModal();
  };

  const markInvoicePaid = (invoiceId) => {
    setInvoices((current) =>
      current.map((invoice) => (invoice.id === invoiceId ? { ...invoice, status: "Paid" } : invoice)),
    );
  };

  const toggleEmployeeStatus = (employeeId) => {
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === employeeId
          ? { ...employee, status: employee.status === "Active" ? "On Leave" : "Active" }
          : employee,
      ),
    );
  };

  const adjustInventory = (itemId, delta) => {
    setInventory((current) =>
      current.map((item) => (item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item)),
    );
  };

  return (
    <DashboardLayout>
      <div ref={rootRef} className="space-y-10">
        <section className="grid gap-8 xl:grid-cols-[1.12fr_0.88fr]">
          <div className="space-y-6" data-hero>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="cyan">ERP Practice Simulator</Badge>
              <Badge tone="indigo">Invoice Management</Badge>
              <Badge tone="emerald">Inventory Control</Badge>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl bg-gradient-to-r from-[#0F172A] via-[#2563EB] to-[#8B5CF6] bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                A polished ERP sandbox for finance, people, and inventory operations.
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-[#64748B] sm:text-base">
                Simulate day-to-day ERP work with modern KPI cards, editable records, and clean workflows that
                feel like a production system.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={() => setModal("invoice")} icon={<Icon name="finance" className="h-4 w-4" />}>
                New invoice
              </Button>
              <Button
                variant="secondary"
                onClick={() => setModal("employee")}
                icon={<Icon name="people" className="h-4 w-4" />}
              >
                Add employee
              </Button>
              <Button
                variant="ghost"
                onClick={() => setModal("inventory")}
                icon={<Icon name="inventory" className="h-4 w-4" />}
              >
                Add inventory
              </Button>
            </div>
          </div>

          <GlassCard className="p-5" data-hero>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#64748B]">Practice mode</p>
                <h2 className="mt-2 text-xl font-semibold text-[#0F172A]">ERP control center</h2>
              </div>
              <Badge tone={summary.overdueInvoices > 0 ? "rose" : "emerald"}>
                {summary.overdueInvoices > 0 ? `${summary.overdueInvoices} overdue` : "All clear"}
              </Badge>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Revenue</p>
                <p className="mt-3 text-3xl font-semibold text-[#0F172A]">{money.format(summary.revenue)}</p>
                <p className="mt-2 text-sm text-[#64748B]">Gross invoiced value across the simulator.</p>
              </div>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Inventory</p>
                <p className="mt-3 text-3xl font-semibold text-[#0F172A]">{money.format(summary.inventoryValue)}</p>
                <p className="mt-2 text-sm text-[#64748B]">Stock on hand multiplied by unit cost.</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Pending receivables</p>
                  <p className="mt-2 text-3xl font-semibold text-[#0F172A]">{money.format(summary.pending)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Active employees</p>
                  <p className="mt-2 text-3xl font-semibold text-[#0F172A]">{summary.activeEmployees}</p>
                </div>
              </div>
              <div className="mt-4">
                <ProgressBar
                  value={summary.revenue === 0 ? 0 : (summary.paid / summary.revenue) * 100}
                  tone="emerald"
                  label="Collection rate"
                />
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<Icon name="finance" className="h-5 w-5 text-cyan-600" />}
            label="Revenue"
            value={summary.revenue}
            detail="Total invoice value generated."
          />
          <StatCard
            icon={<Icon name="support" className="h-5 w-5 text-emerald-600" />}
            label="Collected"
            value={summary.paid}
            detail="Invoices marked as paid."
          />
          <StatCard
            icon={<Icon name="people" className="h-5 w-5 text-violet-600" />}
            label="Payroll"
            value={summary.payroll}
            detail="Active headcount cost per month."
          />
          <StatCard
            icon={<Icon name="inventory" className="h-5 w-5 text-amber-600" />}
            label="Inventory value"
            value={summary.inventoryValue}
            detail="Cost of all items on hand."
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <DashboardCard
            title="Cash collection curve"
            subtitle="A simple view of how payment momentum is changing."
            action={<Badge tone="slate">5-month view</Badge>}
          >
            <div className="space-y-4">
              {monthlyBars.map((bar) => (
                <div key={bar.label} className="space-y-2">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-600">{bar.label}</span>
                    <span className="text-[#64748B]">{bar.value}%</span>
                  </div>
                  <ProgressBar value={bar.value} tone="indigo" />
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Department mix"
            subtitle="Headcount distribution inside the practice dataset."
            action={<Badge tone="cyan">People</Badge>}
          >
            <div className="space-y-4">
              {departmentBreakdown.map((item) => {
                const value = Math.max(24, Math.round((item.count / employees.length) * 100));
                return (
                  <div key={item.department} className="space-y-2">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-700">{item.department}</span>
                      <span className="text-[#64748B]">{item.count} employees</span>
                    </div>
                    <ProgressBar value={value} tone="cyan" />
                  </div>
                );
              })}
            </div>
          </DashboardCard>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-4" data-reveal>
          <SectionHeader
            eyebrow="ERP dashboard"
            title="A working simulator with familiar operational controls."
            description="Switch between invoices, employees, inventory, and overview data without leaving the page."
          />

          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/80 bg-slate-50/90 p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-blue-50 text-[#0F172A]"
                    : "text-[#64748B] hover:bg-slate-50/90 hover:text-[#0F172A]"
                }`}
              >
                <Icon name={tab.icon} className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {activeTab === "overview" ? (
          <section className="grid gap-6 xl:grid-cols-[1fr_0.82fr]">
            <DashboardCard
              title="Operations snapshot"
              subtitle="What a manager would scan first."
              action={<Badge tone="emerald">Live</Badge>}
            >
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { label: "Paid ratio", value: summary.revenue === 0 ? 0 : Math.round((summary.paid / summary.revenue) * 100), tone: "emerald" },
                  { label: "Overdue invoices", value: Math.max(0, 100 - summary.overdueInvoices * 30), tone: "rose" },
                  { label: "Payroll coverage", value: 78, tone: "cyan" },
                  { label: "Stock health", value: summary.lowStock.length > 0 ? 62 : 92, tone: "amber" },
                ].map((metric) => (
                  <GlassCard key={metric.label} className="p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">{metric.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-[#0F172A]">{metric.value}%</p>
                    <div className="mt-4">
                      <ProgressBar value={metric.value} tone={metric.tone} />
                    </div>
                  </GlassCard>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard
              title="Recent activity"
              subtitle="A concise activity feed for simulation context."
              action={<Badge tone="slate">Today</Badge>}
            >
              <div className="space-y-4">
                {[
                  { icon: "finance", title: "Invoice INV-2026-002 received", detail: "Lucky Cement Ltd. - SAP FICO implementation" },
                  { icon: "people", title: "Employee review updated", detail: "Sara Malik moved to active payroll" },
                  { icon: "inventory", title: "Stock alert generated", detail: "Printer Toner fell below reorder point" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-slate-200/80 bg-slate-50/90">
                      <Icon name={item.icon} className="h-5 w-5 text-cyan-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-[#0F172A]">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-[#64748B]">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </section>
        ) : null}

        {activeTab === "invoices" ? (
          <section className="space-y-5">
            <DashboardCard
              title="Invoices"
              subtitle="A clean ERP table with status, due dates, and quick actions."
              action={
                <Button onClick={() => setModal("invoice")} icon={<Icon name="spark" className="h-4 w-4" />}>
                  New invoice
                </Button>
              }
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <label className="relative w-full max-w-md">
                    <span className="sr-only">Search invoices</span>
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search invoice, client, or project"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 pl-11 text-sm text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
                    />
                    <Icon name="search" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
                  </label>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200/80">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200/80">
                      <thead className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl">
                        <tr className="text-left text-xs uppercase tracking-[0.22em] text-[#64748B]">
                          <th className="px-4 py-3 font-medium">Invoice</th>
                          <th className="px-4 py-3 font-medium">Client</th>
                          <th className="px-4 py-3 font-medium">Project</th>
                          <th className="px-4 py-3 font-medium">Status</th>
                          <th className="px-4 py-3 font-medium">Amount</th>
                          <th className="px-4 py-3 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/80 bg-white" data-row-reveal>
                        {filteredInvoices.map((invoice) => (
                          <tr key={invoice.id} data-row className="transition hover:bg-blue-50/60">
                            <td className="px-4 py-4">
                              <p className="font-medium text-[#0F172A]">{invoice.id}</p>
                              <p className="mt-1 text-xs text-[#64748B]">
                                {invoice.invoiceDate} - due {invoice.dueDate || "-"}
                              </p>
                            </td>
                            <td className="px-4 py-4 text-sm text-slate-600">{invoice.client}</td>
                            <td className="px-4 py-4 text-sm text-[#64748B]">{invoice.project}</td>
                            <td className="px-4 py-4">
                              <Badge tone={invoiceStatusTone(invoice.status)}>{invoice.status}</Badge>
                            </td>
                            <td className="px-4 py-4 text-sm font-semibold text-[#0F172A]">
                              {money.format(invoice.amount)}
                            </td>
                            <td className="px-4 py-4">
                              {invoice.status !== "Paid" ? (
                                <Button variant="secondary" onClick={() => markInvoicePaid(invoice.id)}>
                                  Mark paid
                                </Button>
                              ) : (
                                <Badge tone="emerald">Completed</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                        {filteredInvoices.length === 0 ? (
                          <tr data-row>
                            <td colSpan={6} className="px-4 py-10">
                              <div className="mx-auto max-w-sm text-center">
                                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
                                  <Icon name="search" className="h-6 w-6" />
                                </div>
                                <p className="mt-4 text-sm font-semibold text-[#0F172A]">No invoices found</p>
                                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                                  Try a different client, project, or invoice reference.
                                </p>
                              </div>
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </DashboardCard>
          </section>
        ) : null}

        {activeTab === "employees" ? (
          <section className="grid gap-6 xl:grid-cols-[1fr_0.88fr]">
            <DashboardCard
              title="Employees"
              subtitle="Track people, roles, salaries, and status changes."
              action={
                <Button onClick={() => setModal("employee")} icon={<Icon name="people" className="h-4 w-4" />}>
                  Add employee
                </Button>
              }
            >
              <div className="space-y-3">
                {employees.map((employee) => (
                  <GlassCard key={employee.id} className="p-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-slate-200/80 bg-slate-50/90 text-lg font-semibold text-[#0F172A]">
                          {employee.name.slice(0, 1)}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-semibold text-[#0F172A]">{employee.name}</h4>
                            <Badge tone={employee.status === "Active" ? "emerald" : "amber"}>{employee.status}</Badge>
                          </div>
                          <p className="mt-2 text-sm text-[#64748B]">
                            {employee.role} - {employee.department}
                          </p>
                          <p className="mt-1 text-xs text-[#64748B]">
                            {employee.id} - joined {employee.joined}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Monthly salary</p>
                        <p className="mt-2 text-lg font-semibold text-[#0F172A]">{money.format(employee.salary)}</p>
                        <Button
                          variant="secondary"
                          className="mt-3"
                          onClick={() => toggleEmployeeStatus(employee.id)}
                        >
                          Toggle status
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </DashboardCard>

            <DashboardCard
              title="Payroll health"
              subtitle="A compact view of department mix and active coverage."
              action={<Badge tone="slate">Monthly</Badge>}
            >
              <div className="space-y-4">
                <ProgressBar
                  value={summary.payroll === 0 ? 0 : Math.min(100, (summary.activeEmployees / employees.length) * 100)}
                  tone="cyan"
                  label="Active employee ratio"
                />
                {departmentBreakdown.map((item) => (
                  <div key={item.department} className="space-y-2">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-slate-600">{item.department}</span>
                      <span className="text-[#64748B]">{item.count}</span>
                    </div>
                    <ProgressBar value={Math.max(24, Math.round((item.count / employees.length) * 100))} tone="indigo" />
                  </div>
                ))}
              </div>
            </DashboardCard>
          </section>
        ) : null}

        {activeTab === "inventory" ? (
          <section className="grid gap-6 xl:grid-cols-[1fr_0.88fr]">
            <DashboardCard
              title="Inventory"
              subtitle="Watch stock levels, reorder points, and item value."
              action={
                <Button onClick={() => setModal("inventory")} icon={<Icon name="inventory" className="h-4 w-4" />}>
                  Add item
                </Button>
              }
            >
              <div className="space-y-3">
                {inventory.map((item) => {
                  const stockPercent = Math.max(12, Math.min(100, Math.round((item.quantity / Math.max(item.reorderPoint * 2, 1)) * 100)));
                  const lowStock = item.quantity <= item.reorderPoint;
                  return (
                    <GlassCard key={item.id} className="p-4">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-semibold text-[#0F172A]">{item.name}</h4>
                            {lowStock ? <Badge tone="rose">Low stock</Badge> : <Badge tone="emerald">Healthy</Badge>}
                          </div>
                          <p className="mt-2 text-sm text-[#64748B]">
                            {item.id} - {item.category}
                          </p>
                          <p className="mt-1 text-xs text-[#64748B]">
                            Unit cost {money.format(item.unitCost)} - reorder at {item.reorderPoint}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Quantity</p>
                          <p className={`mt-2 text-3xl font-semibold ${lowStock ? "text-rose-300" : "text-[#0F172A]"}`}>
                            {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <ProgressBar value={stockPercent} tone={lowStock ? "rose" : "amber"} />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button variant="secondary" onClick={() => adjustInventory(item.id, -1)}>
                          -1
                        </Button>
                        <Button variant="secondary" onClick={() => adjustInventory(item.id, 1)}>
                          +1
                        </Button>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </DashboardCard>

            <DashboardCard
              title="Reorder alerts"
              subtitle="Items that deserve attention before the month-end close."
              action={<Badge tone={summary.lowStock.length > 0 ? "rose" : "emerald"}>{summary.lowStock.length} alerts</Badge>}
            >
              <div className="space-y-4">
                {summary.lowStock.length > 0 ? (
                  summary.lowStock.map((item) => (
                    <div key={item.id} className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-[#0F172A]">{item.name}</p>
                          <p className="mt-1 text-sm text-[#64748B]">
                            Reorder point {item.reorderPoint} - current {item.quantity}
                          </p>
                        </div>
                        <Badge tone="rose">Alert</Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/90 p-5 text-sm text-[#64748B]">
                    No low-stock items right now. Nice and tidy.
                  </div>
                )}
              </div>
            </DashboardCard>
          </section>
        ) : null}
      </div>

      <Modal
        open={modal === "invoice"}
        title="Create invoice"
        subtitle="Capture billing details and push the record into the ledger."
        onClose={resetModal}
      >
        <form className="grid gap-4" onSubmit={submitInvoice}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Client</span>
              <input
                value={invoiceForm.client}
                onChange={(event) => setInvoiceForm((current) => ({ ...current, client: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
                placeholder="Lucky Cement Ltd."
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Project</span>
              <input
                value={invoiceForm.project}
                onChange={(event) => setInvoiceForm((current) => ({ ...current, project: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
                placeholder="SAP FICO implementation"
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Amount</span>
              <input
                type="number"
                value={invoiceForm.amount}
                onChange={(event) => setInvoiceForm((current) => ({ ...current, amount: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
                placeholder="780000"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Invoice date</span>
              <input
                type="date"
                value={invoiceForm.invoiceDate}
                onChange={(event) => setInvoiceForm((current) => ({ ...current, invoiceDate: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] focus:border-cyan-300 focus:outline-none"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Due date</span>
              <input
                type="date"
                value={invoiceForm.dueDate}
                onChange={(event) => setInvoiceForm((current) => ({ ...current, dueDate: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] focus:border-cyan-300 focus:outline-none"
              />
            </label>
          </div>
          <label className="grid gap-2 text-sm">
            <span className="text-[#64748B]">Status</span>
            <select
              value={invoiceForm.status}
              onChange={(event) => setInvoiceForm((current) => ({ ...current, status: event.target.value }))}
              className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] focus:border-cyan-300 focus:outline-none"
            >
              {["Pending", "Paid", "Overdue"].map((option) => (
                <option key={option} value={option} className="bg-white">
                  {option}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center justify-between gap-3 pt-2">
            <p className="text-sm text-[#64748B]">{invoiceFormReady ? "Ready to save." : "Complete the required fields."}</p>
            <Button type="submit" disabled={!invoiceFormReady} icon={<Icon name="finance" className="h-4 w-4" />}>
              Save invoice
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={modal === "employee"}
        title="Add employee"
        subtitle="Bring a new teammate into the ERP practice workspace."
        onClose={resetModal}
      >
        <form className="grid gap-4" onSubmit={submitEmployee}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Full name</span>
              <input
                value={employeeForm.name}
                onChange={(event) => setEmployeeForm((current) => ({ ...current, name: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
                placeholder="Muhammad Usman"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Department</span>
              <select
                value={employeeForm.department}
                onChange={(event) => setEmployeeForm((current) => ({ ...current, department: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] focus:border-cyan-300 focus:outline-none"
              >
                {["Finance", "IT", "HR", "Operations", "Sales"].map((option) => (
                  <option key={option} value={option} className="bg-white">
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Role</span>
              <select
                value={employeeForm.role}
                onChange={(event) => setEmployeeForm((current) => ({ ...current, role: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] focus:border-cyan-300 focus:outline-none"
              >
                {["ERP Analyst", "Senior Accountant", "HR Manager", "Support Specialist", "Consultant"].map((option) => (
                  <option key={option} value={option} className="bg-white">
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Salary</span>
              <input
                type="number"
                value={employeeForm.salary}
                onChange={(event) => setEmployeeForm((current) => ({ ...current, salary: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
                placeholder="110000"
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Status</span>
              <select
                value={employeeForm.status}
                onChange={(event) => setEmployeeForm((current) => ({ ...current, status: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] focus:border-cyan-300 focus:outline-none"
              >
                {["Active", "On Leave"].map((option) => (
                  <option key={option} value={option} className="bg-white">
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Join date</span>
              <input
                type="date"
                value={employeeForm.joined}
                onChange={(event) => setEmployeeForm((current) => ({ ...current, joined: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] focus:border-cyan-300 focus:outline-none"
              />
            </label>
          </div>
          <div className="flex items-center justify-between gap-3 pt-2">
            <p className="text-sm text-[#64748B]">{employeeFormReady ? "Ready to add." : "Name and salary are required."}</p>
            <Button type="submit" disabled={!employeeFormReady} icon={<Icon name="people" className="h-4 w-4" />}>
              Add employee
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={modal === "inventory"}
        title="Add inventory item"
        subtitle="Create stock entries and keep the warehouse healthy."
        onClose={resetModal}
      >
        <form className="grid gap-4" onSubmit={submitInventory}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Item name</span>
              <input
                value={inventoryForm.name}
                onChange={(event) => setInventoryForm((current) => ({ ...current, name: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
                placeholder="Wireless mouse"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Category</span>
              <select
                value={inventoryForm.category}
                onChange={(event) => setInventoryForm((current) => ({ ...current, category: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] focus:border-cyan-300 focus:outline-none"
              >
                {["IT Equipment", "Furniture", "Stationery", "Electronics", "Machinery"].map((option) => (
                  <option key={option} value={option} className="bg-white">
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Quantity</span>
              <input
                type="number"
                value={inventoryForm.quantity}
                onChange={(event) => setInventoryForm((current) => ({ ...current, quantity: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
                placeholder="24"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Unit cost</span>
              <input
                type="number"
                value={inventoryForm.unitCost}
                onChange={(event) => setInventoryForm((current) => ({ ...current, unitCost: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
                placeholder="12000"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-[#64748B]">Reorder point</span>
              <input
                type="number"
                value={inventoryForm.reorderPoint}
                onChange={(event) => setInventoryForm((current) => ({ ...current, reorderPoint: event.target.value }))}
                className="rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-[#0F172A] placeholder:text-[#64748B] focus:border-cyan-300 focus:outline-none"
                placeholder="5"
              />
            </label>
          </div>
          <div className="flex items-center justify-between gap-3 pt-2">
            <p className="text-sm text-[#64748B]">{inventoryFormReady ? "Ready to add." : "Name, quantity, and cost are required."}</p>
            <Button type="submit" disabled={!inventoryFormReady} icon={<Icon name="inventory" className="h-4 w-4" />}>
              Add item
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};

export default MiniERPSimulator;


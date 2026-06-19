import { useMemo, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaTrash,
  FaUserTie,
  FaUsers,
  FaBuilding,
  FaFilter,
} from "react-icons/fa";
import GlassPanel from "../../components/Widgets/GlassPanel";
import PageShell from "../DashboardPages/PageShell";
import mockData from "../../data/erpSaasMockData.json";

const statusTone = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300",
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
  Inactive: "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-300",
};

const fieldClass =
  "h-11 w-full rounded-xl border border-slate-200 bg-white/80 px-3 text-sm text-slate-900 outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-white/10 dark:text-white";

const EmployerDashboard = () => {
  const [employees, setEmployees] = useState(mockData.employer.employees);
  const [dept, setDept] = useState("All");
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    name: "",
    dept: "Finance",
    role: "",
    salary: "",
    status: "Pending",
  });

  const filteredEmployees = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return employees.filter((employee) => {
      const matchesQuery =
        !normalized ||
        [employee.name, employee.role, employee.dept].some((value) =>
          value.toLowerCase().includes(normalized),
        );
      const matchesDept = dept === "All" || employee.dept === dept;
      const matchesStatus = status === "All" || employee.status === status;
      return matchesQuery && matchesDept && matchesStatus;
    });
  }, [dept, employees, query, status]);

  const totals = useMemo(() => {
    const active = employees.filter((employee) => employee.status === "Active").length;
    const pending = employees.filter((employee) => employee.status === "Pending").length;
    const inactive = employees.filter((employee) => employee.status === "Inactive").length;
    return { active, pending, inactive };
  }, [employees]);

  const addEmployee = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.role.trim()) return;

    setEmployees((current) => [
      {
        id: `E${String(current.length + 1).padStart(3, "0")}`,
        name: form.name.trim(),
        dept: form.dept,
        role: form.role.trim(),
        salary: Number(form.salary || 0),
        status: form.status,
        joined: new Date().toISOString().slice(0, 10),
      },
      ...current,
    ]);

    setForm({ name: "", dept: "Finance", role: "", salary: "", status: "Pending" });
  };

  const removeEmployee = (id) => {
    setEmployees((current) => current.filter((employee) => employee.id !== id));
  };

  return (
    <PageShell
      eyebrow="Employer"
      title="Employer Dashboard"
      description="Manage employees, departments, and lifecycle status in a clean HR system view."
      action={
        <form
          className="grid gap-2 rounded-2xl border border-white/70 bg-white/70 p-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/10 lg:grid-cols-[1fr_10rem_1fr_10rem_auto]"
          onSubmit={addEmployee}
        >
          <input className={fieldClass} placeholder="Employee name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <select className={fieldClass} value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })}>
            {mockData.employer.departments.map((department) => (
              <option key={department}>{department}</option>
            ))}
          </select>
          <input className={fieldClass} placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          <select className={fieldClass} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {["Active", "Pending", "Inactive"].map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950"
            type="submit"
          >
            <FaPlus />
            Add
          </button>
        </form>
      }
    >
      <section className="grid gap-4 md:grid-cols-3" data-page-enter>
        {[
          { label: "Active", value: totals.active, icon: FaUsers, tone: "from-emerald-500 to-teal-600" },
          { label: "Pending", value: totals.pending, icon: FaBuilding, tone: "from-amber-500 to-orange-500" },
          { label: "Inactive", value: totals.inactive, icon: FaUserTie, tone: "from-violet-500 to-fuchsia-600" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <GlassPanel key={item.label} className="p-5">
              <span className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${item.tone} text-white shadow-lg`}>
                <Icon />
              </span>
              <p className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">{item.value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.label} employees</p>
            </GlassPanel>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.35fr]" data-page-enter>
        <GlassPanel className="p-5">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 dark:border-white/10 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className={`${fieldClass} pl-11`}
                placeholder="Search employees, roles, departments..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500 dark:bg-white/10 dark:text-slate-300">
                <FaFilter />
                Filter
              </span>
              {["All", ...mockData.employer.departments].map((department) => (
                <button
                  key={department}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                    dept === department
                      ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300"
                  }`}
                  type="button"
                  onClick={() => setDept(department)}
                >
                  {department}
                </button>
              ))}
              {["All", "Active", "Pending", "Inactive"].map((value) => (
                <button
                  key={value}
                  className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                    status === value
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300"
                  }`}
                  type="button"
                  onClick={() => setStatus(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-white/10">
              <thead className="bg-slate-50/90 dark:bg-white/[0.05]">
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  <th className="px-4 py-3">Employee</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white/70 dark:divide-white/10 dark:bg-white/[0.03]">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="align-top">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-950 dark:text-white">{employee.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {employee.id} - Joined {employee.joined}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{employee.dept}</td>
                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{employee.role}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusTone[employee.status]}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => removeEmployee(employee.id)}
                        className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-200"
                      >
                        <FaTrash />
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>

        <GlassPanel className="p-5">
          <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
            Workforce notes
          </h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-slate-100/80 px-4 py-3 text-sm text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
              Department filter keeps the table useful for HR reviews.
            </div>
            <div className="rounded-xl bg-slate-100/80 px-4 py-3 text-sm text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
              Add new employees with status and salary to simulate onboarding.
            </div>
            <div className="rounded-xl bg-slate-100/80 px-4 py-3 text-sm text-slate-600 dark:bg-white/[0.08] dark:text-slate-300">
              Removing a row updates the table immediately, like a live admin panel.
            </div>
          </div>
        </GlassPanel>
      </section>
    </PageShell>
  );
};

export default EmployerDashboard;

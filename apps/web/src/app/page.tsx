"use client";

import React, { useCallback, useState } from "react";
import { InnovationProject, ProjectStage } from "../types/innovation";
import { InnovationService } from "../services/innovation";
import { Navbar } from "../components/layout/Navbar";
import { MetricCard } from "../components/ui/MetricCard";
import { ProjectForm } from "../components/flow/ProjectForm";
import { ProjectDetail } from "../components/flow/ProjectDetail";
import { CoachWorkspace } from "../components/coach/CoachWorkspace";
import { DiscoveryWorkspace } from "../components/discovery/DiscoveryWorkspace";
import { ImpactWorkspace } from "../components/impact/ImpactWorkspace";
import { CouncilWorkspace } from "../components/council/CouncilWorkspace";
import { ExportCenterModal } from "../components/flow/ExportCenterModal";
import { ToastContainer, ToastMessage } from "../components/ui/Toast";

type Module = "dashboard" | "discovery" | "impact" | "council";

/* ── Stage badge colours ─────────────────────────────── */
const STAGE_COLORS: Record<ProjectStage, string> = {
  Ideation: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Prototyping: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Validation: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Scaling: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const PRIORITY_COLORS = {
  High: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Low: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

/* ── Toast helper ────────────────────────────────────── */
function makeToast(
  message: string,
  variant: ToastMessage["variant"] = "success",
): ToastMessage {
  return { id: crypto.randomUUID(), message, variant };
}

/* ── Empty State ─────────────────────────────────────── */
function EmptyState({
  onNewProject,
  hasFilter,
}: {
  onNewProject: () => void;
  hasFilter: boolean;
}) {
  if (hasFilter) {
    return (
      <div className="flex flex-col items-center justify-center py-24 rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 animate-fade-in-up">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/60 text-slate-400 mb-4">
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"
            />
          </svg>
        </div>
        <p className="text-sm font-semibold text-slate-300">
          No matching projects
        </p>
        <p className="text-xs text-slate-500 mt-1.5 text-center max-w-xs leading-relaxed">
          Try adjusting your search or filter criteria to find the project
          you&#39;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 animate-fade-in-up">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 text-indigo-400 mb-5">
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a14.998 14.998 0 01-3.75 0M15 11.25a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
          <svg
            className="h-2.5 w-2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
      </div>
      <p className="text-sm font-bold text-slate-200">
        Start your first innovation project
      </p>
      <p className="text-xs text-slate-500 mt-2 text-center max-w-sm leading-relaxed">
        Create a project to unlock the AI Design Thinking Coach, Problem
        Discovery Engine, Impact Intelligence Centre, and the Multi-Agent AI
        Council.
      </p>
      <button
        onClick={onNewProject}
        className="btn-glow mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2.5 text-xs font-bold text-white hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Create Innovation Project
      </button>
    </div>
  );
}

/* ── Project Card ────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: InnovationProject;
  index: number;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open project: ${project.name}`}
      className={`group relative rounded-2xl border border-white/[0.06] bg-slate-900/30 p-5 cursor-pointer flex flex-col justify-between min-h-[210px] transition-all duration-200 hover:border-indigo-500/20 hover:bg-slate-900/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-950/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 animate-fade-in-up`}
      style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(99,102,241,0.05) 0%, transparent 70%)",
        }}
      />

      <div>
        {/* Theme + Stage */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="tag bg-indigo-500/8 text-indigo-300 border-indigo-500/15 truncate max-w-[140px]">
            {project.innovationTheme}
          </span>
          <span className={`tag ${STAGE_COLORS[project.projectStage]}`}>
            {project.projectStage}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-sm font-bold text-slate-100 tracking-tight group-hover:text-indigo-300 transition-colors duration-200 line-clamp-2">
          {project.name}
        </h3>

        {/* Problem Statement */}
        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {project.problemStatement}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-4 space-y-2.5 pt-3 border-t border-white/[0.04]">
        {/* Scores row */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-[10px] text-slate-500 font-medium">
                Innovation
              </span>
              <span className="text-[10px] font-bold text-indigo-400">
                {project.innovationScore}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill bg-gradient-to-r from-indigo-500 to-violet-500"
                style={{ width: `${project.innovationScore}%` }}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-[10px] text-slate-500 font-medium">
                Health
              </span>
              <span className="text-[10px] font-bold text-emerald-400">
                {project.engineeringHealth}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill bg-gradient-to-r from-emerald-500 to-teal-500"
                style={{ width: `${project.engineeringHealth}%` }}
              />
            </div>
          </div>
        </div>

        {/* Priority + Timeline */}
        <div className="flex items-center justify-between">
          <span className={`tag ${PRIORITY_COLORS[project.priority]}`}>
            {project.priority} Priority
          </span>
          <span className="text-[10px] text-slate-500 font-medium">
            {project.timeline}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Page Component ──────────────────────────────────── */
export default function HomePage() {
  const [projects, setProjects] = useState<InnovationProject[]>(() =>
    InnovationService.getProjects(),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [selectedProject, setSelectedProject] =
    useState<InnovationProject | null>(null);
  const [activeCoachProject, setActiveCoachProject] =
    useState<InnovationProject | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] =
    useState<InnovationProject | null>(null);
  const [activeModule, setActiveModule] = useState<Module>("dashboard");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = useCallback(
    (message: string, variant: ToastMessage["variant"] = "success") => {
      setToasts((prev) => [...prev.slice(-3), makeToast(message, variant)]);
    },
    [],
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* ── Demo Mode ─────────────────────────────────────── */
  const handleDemoModeLaunch = useCallback(() => {
    const demoProjects = InnovationService.getProjects();
    setProjects(demoProjects);
    localStorage.removeItem("devflow_problem_discoveries");
    localStorage.removeItem("devflow_impact_metrics");
    localStorage.removeItem("devflow_council_data");
    setActiveModule("dashboard");
    pushToast(
      "Samsung Solve for Tomorrow demo mode loaded. All modules pre-populated.",
      "info",
    );
  }, [pushToast]);

  /* ── Project Actions ───────────────────────────────── */
  const handleSaveProject = useCallback(
    (project: InnovationProject) => {
      const updated = InnovationService.saveProject(project);
      setProjects(updated);
      setIsFormOpen(false);
      setEditingProject(null);
      if (selectedProject?.id === project.id) setSelectedProject(project);
      pushToast(`"${project.name}" saved successfully.`);
    },
    [selectedProject, pushToast],
  );

  const handleDeleteProject = useCallback(
    (id: string) => {
      if (!confirm("Delete this innovation project? This cannot be undone."))
        return;
      const updated = InnovationService.deleteProject(id);
      setProjects(updated);
      setSelectedProject(null);
      pushToast("Project deleted.", "warning");
    },
    [pushToast],
  );

  const handleEditClick = useCallback((project: InnovationProject) => {
    setEditingProject(project);
    setIsFormOpen(true);
  }, []);

  const handleNewProjectClick = useCallback(() => {
    setEditingProject(null);
    setIsFormOpen(true);
  }, []);

  /* ── Filtering ─────────────────────────────────────── */
  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.innovationTheme.toLowerCase().includes(q) ||
      p.problemStatement.toLowerCase().includes(q) ||
      p.sdgGoals.some((g) => g.toLowerCase().includes(q));
    const matchTheme =
      selectedTheme === "All" || p.innovationTheme === selectedTheme;
    const matchStage =
      selectedStage === "All" || p.projectStage === selectedStage;
    return matchSearch && matchTheme && matchStage;
  });

  const stats = InnovationService.getWorkspaceStats(filteredProjects);
  const uniqueThemes = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.innovationTheme))),
  ];
  const hasActiveFilter =
    searchQuery !== "" || selectedTheme !== "All" || selectedStage !== "All";

  /* ── Module Views ──────────────────────────────────── */
  if (activeModule === "discovery")
    return (
      <DiscoveryWorkspace
        projects={projects}
        onBack={() => setActiveModule("dashboard")}
      />
    );
  if (activeModule === "impact")
    return (
      <ImpactWorkspace
        projects={projects}
        onBack={() => setActiveModule("dashboard")}
      />
    );
  if (activeModule === "council")
    return (
      <CouncilWorkspace
        projects={projects}
        onBack={() => setActiveModule("dashboard")}
      />
    );
  if (activeCoachProject) {
    return (
      <CoachWorkspace
        project={activeCoachProject}
        onSave={(updated) => {
          handleSaveProject(updated);
          setActiveCoachProject(updated);
        }}
        onBack={() => setActiveCoachProject(null)}
      />
    );
  }

  /* ── Dashboard ─────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Ambient background */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-64 -left-32 h-[600px] w-[600px] rounded-full bg-indigo-600/4 blur-[120px]" />
        <div className="absolute top-1/2 -right-64 h-[500px] w-[500px] rounded-full bg-violet-600/4 blur-[120px]" />
      </div>

      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewProjectClick={handleNewProjectClick}
        onDemoModeClick={handleDemoModeLaunch}
        onExportCenterClick={() => setIsExportOpen(true)}
        activeModule={activeModule}
        onModuleChange={setActiveModule}
      />

      {isExportOpen && (
        <ExportCenterModal
          project={projects[0] || ({} as InnovationProject)}
          onClose={() => setIsExportOpen(false)}
        />
      )}

      <main
        className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 pb-24"
        id="main-content"
      >
        {/* Page heading */}
        <div className="animate-fade-in-up">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Innovation Workspace
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {projects.length > 0
              ? `Managing ${projects.length} active innovation project${
                  projects.length > 1 ? "s" : ""
                } across all design thinking phases.`
              : "Start your first innovation project to unlock all AI-powered modules."}
          </p>
        </div>

        {/* ── Metric Cards ───────────────────────────────── */}
        <section aria-label="Workspace metrics">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <MetricCard
              title="Innovation Score"
              value={stats.avgInnovation}
              description="Novelty index & design thinking"
              variant="indigo"
              icon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 21l8.982-5.097c.36-.204.64-.543.766-.948l.848-2.735a2.25 2.25 0 00-1.848-2.883l-2.61-.227a1.056 1.056 0 01-.827-.58l-1.084-2.114a2.25 2.25 0 00-4.004 0L8.14 8.766a1.056 1.056 0 01-.827.58l-2.61.227a2.25 2.25 0 00-1.848 2.883l.848 2.735c.127.405.406.744.766.948l8.982 5.097z"
                  />
                </svg>
              }
            />
            <MetricCard
              title="Eng Health"
              value={stats.avgHealth}
              description="Lint, code quality & coverage"
              variant="emerald"
              icon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              }
            />
            <MetricCard
              title="Progress"
              value={stats.avgProgress}
              description="Roadmap completion"
              variant="amber"
              icon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              }
            />
            <MetricCard
              title="Impact Score"
              value={stats.avgImpact}
              description="UN SDG alignment index"
              variant="rose"
              icon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              }
            />
            <MetricCard
              title="Readiness"
              value={stats.avgReadiness}
              description="Technology Readiness Level"
              variant="violet"
              icon={
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.952 11.952 0 0112 16.5c-2.998 0-5.74-1.1-7.843-2.918m0 0A8.959 8.959 0 013 12c0-.778.099-1.533.284-2.253"
                  />
                </svg>
              }
            />
          </div>
        </section>

        {/* ── Executive Summary Row ───────────────────────── */}
        <section
          aria-label="Executive summary"
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-fade-in-up delay-150"
        >
          {/* Council Consensus */}
          <div className="lg:col-span-2 rounded-2xl border border-white/[0.06] bg-slate-900/30 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                AI Council Consensus
              </h3>
              <span className="tag bg-emerald-500/10 text-emerald-400 border-emerald-500/15">
                Live
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: "Research Readiness",
                  value: "85%",
                  sub: "12 verified interviews",
                },
                {
                  label: "AI Model Readiness",
                  value: "78%",
                  sub: "Convergence stable",
                },
                {
                  label: "Council Verdict",
                  value: "Proceed",
                  sub: "No blockers found",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-slate-950/60 border border-white/[0.04] p-3.5"
                >
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block">
                    {item.label}
                  </span>
                  <span className="text-lg font-black text-white block mt-1">
                    {item.value}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    {item.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-2xl border border-white/[0.06] bg-slate-900/30 p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Recent Activity
            </h3>
            <div className="space-y-3 overflow-y-auto max-h-32">
              {[
                {
                  time: "Just now",
                  action: "AI Council evaluation completed",
                  tag: "COUNCIL",
                  dot: "bg-indigo-400",
                },
                {
                  time: "1h ago",
                  action: "Impact reach metrics updated",
                  tag: "IMPACT",
                  dot: "bg-rose-400",
                },
                {
                  time: "Yesterday",
                  action: "5 Whys discovery phase done",
                  tag: "RESEARCH",
                  dot: "bg-emerald-400",
                },
              ].map((act, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[11px]">
                  <div
                    className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${act.dot}`}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-slate-300 font-medium block truncate">
                      {act.action}
                    </span>
                    <span className="text-slate-500">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Filter Bar ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-white/[0.04] pt-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              Filter:
            </span>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              aria-label="Filter by theme"
              className="rounded-xl border border-white/[0.08] bg-slate-900/60 py-1.5 px-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              <option value="All">All Themes</option>
              {uniqueThemes
                .filter((t) => t !== "All")
                .map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
            </select>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              aria-label="Filter by stage"
              className="rounded-xl border border-white/[0.08] bg-slate-900/60 py-1.5 px-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              <option value="All">All Stages</option>
              <option value="Ideation">Ideation</option>
              <option value="Prototyping">Prototyping</option>
              <option value="Validation">Validation</option>
              <option value="Scaling">Scaling</option>
            </select>
            {hasActiveFilter && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTheme("All");
                  setSelectedStage("All");
                }}
                className="rounded-xl border border-white/[0.06] bg-slate-900/40 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:border-slate-700 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              >
                Clear filters
              </button>
            )}
          </div>
          <span className="text-xs text-slate-500">
            <span className="text-white font-semibold">
              {filteredProjects.length}
            </span>{" "}
            of <span className="text-slate-400">{projects.length}</span>{" "}
            projects
          </span>
        </div>

        {/* ── Projects Grid ───────────────────────────────── */}
        <section aria-label="Innovation projects">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              onNewProject={handleNewProjectClick}
              hasFilter={hasActiveFilter}
            />
          )}
        </section>
      </main>

      {/* ── Slide-over detail ──────────────────────────── */}
      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onEdit={() => handleEditClick(selectedProject)}
          onDelete={() => handleDeleteProject(selectedProject.id)}
          onClose={() => setSelectedProject(null)}
          onLaunchCoach={() => {
            setActiveCoachProject(selectedProject);
            setSelectedProject(null);
          }}
        />
      )}

      {/* ── Form modal ─────────────────────────────────── */}
      {isFormOpen && (
        <ProjectForm
          key={editingProject ? editingProject.id : "new"}
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {/* ── Toast notifications ─────────────────────────── */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

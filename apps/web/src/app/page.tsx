"use client";

import React, { useState } from "react";
import { SharedComponentPlaceholder } from "@devflow/ui";
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

export default function HomePage() {
  const [projects, setProjects] = useState<InnovationProject[]>(() => {
    return InnovationService.getProjects();
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");

  // Selection states
  const [selectedProject, setSelectedProject] =
    useState<InnovationProject | null>(null);
  const [activeCoachProject, setActiveCoachProject] =
    useState<InnovationProject | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] =
    useState<InnovationProject | null>(null);
  const [activeModule, setActiveModule] = useState<
    "dashboard" | "discovery" | "impact" | "council"
  >("dashboard");

  // Sync state helpers
  const handleSaveProject = (project: InnovationProject) => {
    const updated = InnovationService.saveProject(project);
    setProjects(updated);
    setIsFormOpen(false);
    setEditingProject(null);
    if (selectedProject?.id === project.id) {
      setSelectedProject(project);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this innovation project?")) {
      const updated = InnovationService.deleteProject(id);
      setProjects(updated);
      setSelectedProject(null);
    }
  };

  const handleEditClick = (project: InnovationProject) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleNewProjectClick = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  // Filter logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.innovationTheme
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      project.problemStatement
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      project.sdgGoals.some((goal) =>
        goal.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesTheme =
      selectedTheme === "All" || project.innovationTheme === selectedTheme;
    const matchesStage =
      selectedStage === "All" || project.projectStage === selectedStage;

    return matchesSearch && matchesTheme && matchesStage;
  });

  // Calculate statistics
  const stats = InnovationService.getWorkspaceStats(filteredProjects);

  // Unique list of themes
  const uniqueThemes = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.innovationTheme))),
  ];

  const getStageColor = (stage: ProjectStage) => {
    switch (stage) {
      case "Ideation":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "Prototyping":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Validation":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "Scaling":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const priorityColors = {
    High: "bg-rose-500/10 text-rose-450 border-rose-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Low: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  if (activeModule === "discovery") {
    return (
      <DiscoveryWorkspace
        projects={projects}
        onBack={() => setActiveModule("dashboard")}
      />
    );
  }

  if (activeModule === "impact") {
    return (
      <ImpactWorkspace
        projects={projects}
        onBack={() => setActiveModule("dashboard")}
      />
    );
  }

  if (activeModule === "council") {
    return (
      <CouncilWorkspace
        projects={projects}
        onBack={() => setActiveModule("dashboard")}
      />
    );
  }

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewProjectClick={handleNewProjectClick}
        activeModule={activeModule}
        onModuleChange={setActiveModule}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8 pb-20">
        {/* Workspace Summary Row */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Workspace Summary
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <MetricCard
              title="Innovation Score"
              value={stats.avgInnovation}
              description="Novelty index & design thinking score"
              variant="indigo"
              icon={
                <svg
                  className="h-5 w-5"
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
              title="Engineering Health"
              value={stats.avgHealth}
              description="Lint success, code quality, and test coverage"
              variant="emerald"
              icon={
                <svg
                  className="h-5 w-5"
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
              title="Project Progress"
              value={stats.avgProgress}
              description="Project roadmap completion percentage"
              variant="amber"
              icon={
                <svg
                  className="h-5 w-5"
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
              description="Estimated UN SDG goal alignment index"
              variant="rose"
              icon={
                <svg
                  className="h-5 w-5"
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
              title="Readiness Score"
              value={stats.avgReadiness}
              description="Technology Readiness Level (TRL) index"
              variant="violet"
              icon={
                <svg
                  className="h-5 w-5"
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
        </div>

        {/* Filters and Search Summary Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Filter Projects:
            </span>
            <div className="flex gap-2">
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-900 py-1.5 px-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                className="rounded-xl border border-slate-800 bg-slate-900 py-1.5 px-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="All">All Stages</option>
                <option value="Ideation">Ideation</option>
                <option value="Prototyping">Prototyping</option>
                <option value="Validation">Validation</option>
                <option value="Scaling">Scaling</option>
              </select>
            </div>
          </div>

          <div className="text-xs text-slate-400">
            Showing{" "}
            <span className="text-white font-bold">
              {filteredProjects.length}
            </span>{" "}
            of <span className="text-slate-500">{projects.length}</span>{" "}
            Innovation Projects
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-2xl border border-slate-900 bg-slate-900/10 p-6 shadow-md transition-all hover:border-slate-800 hover:bg-slate-900/30 cursor-pointer flex flex-col justify-between min-h-[220px]"
              >
                {/* Header row */}
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-indigo-400 bg-indigo-500/5 px-2.5 py-0.5 rounded border border-indigo-900/40">
                      {project.innovationTheme}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider ${getStageColor(
                        project.projectStage,
                      )}`}
                    >
                      {project.projectStage}
                    </span>
                  </div>

                  <h3 className="mt-3.5 text-base font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                    {project.name}
                  </h3>

                  <p className="mt-2 text-xs text-slate-450 line-clamp-3 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>

                {/* Footer details */}
                <div className="mt-6 space-y-3 pt-3 border-t border-slate-950/60">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Innovation Score</span>
                    <span className="font-semibold text-indigo-400">
                      {project.innovationScore}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500">Eng Health</span>
                    <span className="font-semibold text-emerald-400">
                      {project.engineeringHealth}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span
                      className={`rounded border px-1.5 py-0.5 text-[8px] font-bold tracking-wider uppercase ${
                        priorityColors[project.priority]
                      }`}
                    >
                      {project.priority} Priority
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {project.timeline}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-dashed border-slate-800 bg-slate-900/10">
            <svg
              className="h-10 w-10 text-slate-600 mb-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 13.5h3.86a2.25 2.25 0 012.008 1.24l.885 1.77a2.25 2.25 0 002.007 1.24h1.98a2.25 2.25 0 002.007-1.24l.885-1.77a2.25 2.25 0 012.007-1.24h3.86m-18 0h18a2.25 2.25 0 012.25 2.25v4.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75v-4.5A2.25 2.25 0 015.25 13.5zm3.69-9h7.12a2.25 2.25 0 012.25 2.25v4.13a2.25 2.25 0 01-2.25 2.25H8.94a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 018.94 4.5z"
              />
            </svg>
            <p className="text-sm font-semibold text-slate-400">
              No innovation projects found
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Refine your search criteria or create a new project above.
            </p>
          </div>
        )}

        {/* Workspace Shared UI Placeholder Section */}
        <div className="border-t border-slate-900 pt-8 mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
            Shared Component Integration
          </h2>
          <SharedComponentPlaceholder />
        </div>
      </main>

      {/* Slide-over details pane */}
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

      {/* Creation and Edit modal form */}
      {isFormOpen && (
        <ProjectForm
          key={editingProject ? editingProject.id : "new"}
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}

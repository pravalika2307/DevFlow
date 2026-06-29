"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InnovationProject, ProjectStage } from "../types/innovation";
import { InnovationService } from "../services/innovation";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { BootSequence } from "../components/ui/BootSequence";
import { MetricCard } from "../components/ui/MetricCard";
import { ProjectForm } from "../components/flow/ProjectForm";
import { ProjectDetail } from "../components/flow/ProjectDetail";
import { CoachWorkspace } from "../components/coach/CoachWorkspace";
import { DiscoveryWorkspace } from "../components/discovery/DiscoveryWorkspace";
import { ImpactWorkspace } from "../components/impact/ImpactWorkspace";
import { CouncilWorkspace } from "../components/council/CouncilWorkspace";
import { ExportCenterModal } from "../components/flow/ExportCenterModal";
import { ToastContainer, ToastMessage } from "../components/ui/Toast";
import { InnovationGalaxy } from "../components/ui/InnovationGalaxy";
import { AIMentorPanel } from "../components/mentor/AIMentorPanel";
import {
  WorkflowBanner,
  WorkflowModule,
} from "../components/ui/WorkflowBanner";
import { JourneyStepsBar } from "../components/ui/JourneyStepsBar";
import { QuickActionsBar } from "../components/ui/QuickActionsBar";
import {
  MilestoneSuccessModal,
  MilestoneTrigger,
} from "../components/ui/MilestoneSuccessModal";
import { AutoSaveIndicator } from "../components/ui/AutoSaveIndicator";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { SettingsCenterModal } from "../components/flow/SettingsCenterModal";
import { DemoTourOverlay, TourType } from "../components/ui/DemoTourOverlay";

type Module = "dashboard" | "discovery" | "impact" | "council" | "galaxy";

/* ── Stage badge colours ──────────────────────────────── */
const STAGE_CONFIG: Record<ProjectStage, { badge: string; label: string }> = {
  Ideation: { badge: "df-badge-cyan", label: "Ideation" },
  Prototyping: { badge: "df-badge-amber", label: "Prototyping" },
  Validation: { badge: "df-badge-violet", label: "Validation" },
  Scaling: { badge: "df-badge-emerald", label: "Scaling" },
};

const PRIORITY_BADGE: Record<string, string> = {
  High: "df-badge-rose",
  Medium: "df-badge-amber",
  Low: "df-badge-blue",
};

/* ── Toast helper ─────────────────────────────────────── */
function makeToast(
  message: string,
  variant: ToastMessage["variant"] = "success",
): ToastMessage {
  return { id: crypto.randomUUID(), message, variant };
}

/* ── Framer Motion variants ───────────────────────────── */
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

const cardContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

/* ── Empty State ──────────────────────────────────────── */
function EmptyState({
  onNewProject,
  hasFilter,
}: {
  onNewProject: () => void;
  hasFilter: boolean;
}) {
  if (hasFilter) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 32px",
          borderRadius: 24,
          border: "1px dashed var(--border-accent)",
          background: "var(--bg-card)",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
            color: "var(--text-tertiary)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"
            />
          </svg>
        </div>
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: 6,
          }}
        >
          No matching projects
        </p>
        <p
          style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 320,
          }}
        >
          Try adjusting your search or filter criteria.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 32px",
        borderRadius: 24,
        border: "1px dashed var(--border-accent)",
        background: "var(--bg-card)",
        textAlign: "center",
      }}
    >
      {/* Animated icon */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
        style={{
          width: 72,
          height: 72,
          borderRadius: 22,
          background:
            "linear-gradient(135deg, var(--blue-dim) 0%, var(--violet-dim) 100%)",
          border: "1px solid var(--blue-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          boxShadow: "var(--shadow-glow-blue)",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#93c5fd"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a14.998 14.998 0 01-3.75 0M15 11.25a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </motion.div>

      <p
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: "var(--text-primary)",
          letterSpacing: "-0.03em",
          marginBottom: 10,
        }}
      >
        Start your first innovation
      </p>
      <p
        style={{
          fontSize: 13,
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          maxWidth: 360,
          marginBottom: 28,
        }}
      >
        Create a project to unlock the AI Design Thinking Coach, Problem
        Discovery Engine, Impact Intelligence Centre, and the Multi-Agent AI
        Council.
      </p>
      <button
        onClick={onNewProject}
        className="df-btn df-btn-primary"
        style={{ padding: "10px 24px", fontSize: 13 }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Create Innovation Project
      </button>
    </motion.div>
  );
}

/* ── Project Card ─────────────────────────────────────── */
function ProjectCard({
  project,
  onClick,
}: {
  project: InnovationProject;
  onClick: () => void;
}) {
  const stage = STAGE_CONFIG[project.projectStage];
  return (
    <motion.div
      variants={cardVariants}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open project: ${project.name}`}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      className="df-card df-card-glow-blue"
      style={{
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 220,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle corner glow on hover */}
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          transition: "opacity 300ms ease",
        }}
        aria-hidden="true"
      />

      {/* Top row */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <span
            className="df-badge df-badge-blue"
            style={{
              maxWidth: 160,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {project.innovationTheme}
          </span>
          <span className={`df-badge ${stage.badge}`}>{stage.label}</span>
        </div>

        <h3
          style={{
            marginTop: 14,
            fontSize: 14,
            fontWeight: 700,
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.name}
        </h3>
        <p
          style={{
            marginTop: 6,
            fontSize: 12,
            color: "var(--text-tertiary)",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.problemStatement}
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 16,
          paddingTop: 14,
          borderTop: "1px solid var(--border)",
        }}
      >
        {/* Score bars */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Innovation
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#93c5fd" }}>
                {project.innovationScore}%
              </span>
            </div>
            <div className="df-progress">
              <div
                className="df-progress-fill"
                style={{
                  width: `${project.innovationScore}%`,
                  background:
                    "linear-gradient(90deg, var(--blue), var(--violet))",
                }}
              />
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 4,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "var(--text-tertiary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Eng Health
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#6ee7b7" }}>
                {project.engineeringHealth}%
              </span>
            </div>
            <div className="df-progress">
              <div
                className="df-progress-fill"
                style={{
                  width: `${project.engineeringHealth}%`,
                  background:
                    "linear-gradient(90deg, var(--emerald), var(--cyan))",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            className={`df-badge ${
              PRIORITY_BADGE[project.priority] ?? "df-badge-blue"
            }`}
          >
            {project.priority}
          </span>
          <span
            style={{
              fontSize: 11,
              color: "var(--text-tertiary)",
              fontWeight: 500,
            }}
          >
            {project.timeline}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Dashboard Page ───────────────────────────────────── */
export default function HomePage() {
  const [projects, setProjects] = useState<InnovationProject[]>(() =>
    InnovationService.getRawMockProjects(),
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
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  // AutoSave state
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Milestone modal state
  const [milestoneTrigger, setMilestoneTrigger] =
    useState<MilestoneTrigger | null>(null);
  const [milestoneProject, setMilestoneProject] =
    useState<InnovationProject | null>(null);
  const prevProjectCount = useRef(projects.length);
  // Confirm delete state (replaces window.confirm)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteName, setConfirmDeleteName] = useState<string>("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourType, setTourType] = useState<TourType>("general");
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHasHydrated(true);
      setProjects(InnovationService.getProjects());
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const pushToast = useCallback(
    (message: string, variant: ToastMessage["variant"] = "success") => {
      setToasts((prev) => [...prev.slice(-3), makeToast(message, variant)]);
    },
    [],
  );
  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleResetDemo = useCallback(() => {
    localStorage.removeItem("devflow_innovation_projects");
    localStorage.removeItem("devflow_problem_discoveries");
    localStorage.removeItem("devflow_impact_metrics");
    localStorage.removeItem("devflow_council_data");
    const fresh = InnovationService.getProjects();
    setProjects(fresh);
    setSelectedProject(null);
    setActiveCoachProject(null);
    setActiveModule("dashboard");
    pushToast(
      "DevFlow system database reset. Demo parameters restored successfully.",
      "info",
    );
  }, [pushToast]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isEditing =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.getAttribute("contenteditable") === "true");

      if (
        (e.ctrlKey && e.key.toLowerCase() === "k") ||
        (e.key === "/" && !isEditing)
      ) {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[type="search"]',
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }

      // Alt + D: Dashboard
      if (e.altKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setActiveModule("dashboard");
        setActiveCoachProject(null);
        pushToast("Navigated to Workspace", "info");
      }

      // Alt + G: Galaxy
      if (e.altKey && e.key.toLowerCase() === "g") {
        e.preventDefault();
        setActiveModule("galaxy");
        pushToast("Navigated to Innovation Galaxy Map", "info");
      }

      // Alt + R: Reports
      if (e.altKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        setIsExportOpen(true);
        pushToast("Reports & Export center launched", "info");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pushToast]);

  // First-visit onboarding check
  useEffect(() => {
    const onboarded = localStorage.getItem("devflow_onboarded");
    if (!onboarded) {
      localStorage.setItem("devflow_onboarded", "true");
      const t = setTimeout(() => {
        setIsTourOpen(true);
        setTourType("general");
      }, 3500);
      return () => clearTimeout(t);
    }
  }, []);

  const triggerAutoSave = useCallback(() => {
    setIsSaving(true);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setIsSaving(false);
      setLastSaved(Date.now());
    }, 700);
  }, []);

  // Workflow navigation — maps WorkflowModule to page state
  const handleWorkflowNavigate = useCallback(
    (mod: WorkflowModule) => {
      switch (mod) {
        case "dashboard":
          setActiveModule("dashboard");
          setActiveCoachProject(null);
          break;
        case "discovery":
          setActiveModule("discovery");
          break;
        case "coach":
          if (projects.length > 0) {
            setActiveCoachProject(projects[0]);
          } else {
            pushToast(
              "Create a project first to launch Design Thinking.",
              "info",
            );
          }
          break;
        case "mentor":
          setActiveModule("dashboard");
          setActiveCoachProject(null);
          break;
        case "galaxy":
          setActiveModule("galaxy");
          break;
        case "impact":
          setActiveModule("impact");
          break;
        case "council":
          setActiveModule("council");
          break;
        case "reports":
          setIsExportOpen(true);
          break;
      }
    },
    [projects, pushToast],
  );

  const handleTourNavigate = useCallback(
    (
      mod:
        | "dashboard"
        | "discovery"
        | "impact"
        | "council"
        | "galaxy"
        | "coach"
        | "reports"
        | "slides",
    ) => {
      if (mod === "slides") {
        setIsPresentationOpen(true);
        setCurrentSlide(0);
        if (projects.length > 0) {
          setSelectedProject(projects[0]);
        }
        return;
      }
      setIsPresentationOpen(false);
      if (mod === "dashboard") {
        setActiveModule("dashboard");
        setActiveCoachProject(null);
      } else if (mod === "discovery") {
        setActiveModule("discovery");
      } else if (mod === "coach") {
        if (projects.length > 0) setActiveCoachProject(projects[0]);
      } else if (mod === "galaxy") {
        setActiveModule("galaxy");
      } else if (mod === "impact") {
        setActiveModule("impact");
      } else if (mod === "council") {
        setActiveModule("council");
      } else if (mod === "reports") {
        setIsExportOpen(true);
      }
    },
    [projects],
  );

  // Detect workflow module for WorkflowBanner
  const currentWorkflowModule: WorkflowModule = activeCoachProject
    ? "coach"
    : (activeModule as WorkflowModule);

  const handleSaveProject = useCallback(
    (project: InnovationProject) => {
      const isNew = !projects.find((p) => p.id === project.id);
      const updated = InnovationService.saveProject(project);
      setProjects(updated);
      setIsFormOpen(false);
      setEditingProject(null);
      if (selectedProject?.id === project.id) setSelectedProject(project);
      pushToast(`"${project.name}" saved successfully.`);
      triggerAutoSave();
      // Fire first-project milestone
      if (isNew && prevProjectCount.current === 0) {
        setMilestoneTrigger("first_project");
        setMilestoneProject(project);
      }
      prevProjectCount.current = updated.length;
    },
    [selectedProject, pushToast, triggerAutoSave, projects],
  );

  const handleDeleteProject = useCallback((id: string, name: string) => {
    setConfirmDeleteName(name);
    setConfirmDeleteId(id);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!confirmDeleteId) return;
    const updated = InnovationService.deleteProject(confirmDeleteId);
    setProjects(updated);
    setSelectedProject(null);
    setConfirmDeleteId(null);
    pushToast("Project deleted.", "warning");
  }, [confirmDeleteId, pushToast]);

  const handleEditClick = useCallback((project: InnovationProject) => {
    setEditingProject(project);
    setIsFormOpen(true);
  }, []);

  const handleNewProjectClick = useCallback(() => {
    setEditingProject(null);
    setIsFormOpen(true);
  }, []);

  /* Filtering */
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

  /* Module views */
  if (activeModule === "galaxy")
    return (
      <InnovationGalaxy
        projects={projects}
        onBack={() => setActiveModule("dashboard")}
      />
    );
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

  const presentationSlides = selectedProject
    ? [
        {
          title: "Project Scope & Challenge",
          subtitle: "Milestone 1: The Core Solution Matrix",
          content: (
            <div className="space-y-6 max-w-2xl text-center flex flex-col items-center">
              <span className="df-badge df-badge-blue text-xs py-1 px-3">
                {selectedProject.innovationTheme}
              </span>
              <h2 className="text-4xl font-black text-white tracking-tight">
                {selectedProject.name}
              </h2>
              <p className="text-lg text-slate-355 leading-relaxed italic">
                &ldquo;{selectedProject.problemStatement}&rdquo;
              </p>
              <div className="p-4 rounded-2xl border border-border-default bg-bg-card max-w-lg mx-auto">
                <span className="df-section-label">Target Beneficiaries</span>
                <p className="text-xs text-slate-400 mt-2 font-semibold">
                  {selectedProject.targetBeneficiaries ||
                    "Localized populations requiring assistance."}
                </p>
              </div>
            </div>
          ),
        },
        {
          title: "AI Design Thinking Lifecycle",
          subtitle: "Milestone 2: Stages of Innovation",
          content: (
            <div className="space-y-6 w-full max-w-3xl">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                <span>Progress Matrix</span>
                <span className="text-violet-accent">
                  {selectedProject.projectProgress}% Complete
                </span>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {[
                  {
                    label: "Empathise",
                    active: true,
                    desc: selectedProject.empathise?.targetUser,
                  },
                  {
                    label: "Define",
                    active: true,
                    desc: selectedProject.define?.problemStatement,
                  },
                  {
                    label: "Ideate",
                    active: true,
                    desc: `${selectedProject.ideate?.length || 3} Solutions`,
                  },
                  {
                    label: "Prototype",
                    active: selectedProject.projectProgress >= 70,
                    desc: `${
                      selectedProject.prototype?.length || 1
                    } Build logs`,
                  },
                  {
                    label: "Test",
                    active: selectedProject.projectProgress >= 90,
                    desc: `${
                      selectedProject.test?.length || 1
                    } Tests completed`,
                  },
                ].map((stg) => (
                  <div
                    key={stg.label}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      stg.active
                        ? "bg-violet-accent/10 border-violet-accent text-white"
                        : "bg-bg-card border-border-default opacity-40"
                    }`}
                  >
                    <span className="text-xs font-black block">
                      {stg.label}
                    </span>
                    <span className="text-[9px] text-slate-500 block mt-2 font-semibold truncate">
                      {stg.desc || "Dormant Stage"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          title: "NOVA Council Evaluation Verdict",
          subtitle: "Milestone 3: 8-Agent Consensus",
          content: (
            <div className="space-y-6 max-w-2xl text-center flex flex-col items-center">
              <h3 className="text-3xl font-black text-white">
                Verdict:{" "}
                <span className="text-emerald-accent">Approve to Scale</span>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto">
                The multi-agent council concluded evaluation with 0 high-risk
                blockers detected and stable innovation ratios.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto w-full">
                <div className="p-4 rounded-xl border border-border-default bg-bg-card text-center">
                  <span className="df-section-label">Innovation Score</span>
                  <span className="text-2xl font-black text-blue-accent block mt-1">
                    {selectedProject.innovationScore}%
                  </span>
                </div>
                <div className="p-4 rounded-xl border border-border-default bg-bg-card text-center">
                  <span className="df-section-label">Readiness Level</span>
                  <span className="text-2xl font-black text-emerald-accent block mt-1">
                    {selectedProject.engineeringHealth}%
                  </span>
                </div>
              </div>
            </div>
          ),
        },
      ]
    : [
        {
          title: "Samsung Solve for Tomorrow Deck",
          subtitle: "Interactive Presentation Console",
          content: (
            <div className="space-y-6 text-center">
              <h2 className="text-2xl font-black text-white">
                Select a project on the workspace to launch the widescreen
                presentation deck.
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Widescreen slide controllers allow you to demonstrate structural
                milestones, research layers, and AI verdicts.
              </p>
            </div>
          ),
        },
      ];

  return (
    <>
      <AnimatePresence>
        {isBooting && <BootSequence onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      <div className="flex min-h-screen bg-bg-base text-text-primary">
        <Sidebar
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          activeCoachProject={!!activeCoachProject}
          onLaunchCoach={() => {
            if (projects.length > 0) {
              setActiveCoachProject(projects[0]);
            } else {
              pushToast(
                "Please create a project first before launching Coach.",
                "info",
              );
            }
          }}
          onExportCenterClick={() => setIsExportOpen(true)}
          onDemoModeClick={() => {
            setTourType("samsung");
            setIsTourOpen(true);
          }}
          onResourcesClick={() => {
            setIsSettingsOpen(true);
          }}
          onSettingsClick={() => {
            setIsSettingsOpen(true);
          }}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0 md:pl-64 relative z-10">
          <Navbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onNewProjectClick={handleNewProjectClick}
            onDemoModeClick={() => {
              setTourType("samsung");
              setIsTourOpen(true);
            }}
            onExportCenterClick={() => setIsExportOpen(true)}
            onMobileMenuToggle={() => setIsMobileSidebarOpen(true)}
          />
          {/* AutoSave indicator — positioned alongside Navbar visually via overlay */}
          <div
            style={{
              position: "absolute",
              top: 26,
              right: 80,
              zIndex: 60,
              pointerEvents: "none",
            }}
            aria-hidden="true"
          >
            <AutoSaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
          </div>

          <AnimatePresence>
            {isExportOpen && (
              <ExportCenterModal
                project={
                  selectedProject || projects[0] || ({} as InnovationProject)
                }
                onClose={() => setIsExportOpen(false)}
              />
            )}
          </AnimatePresence>

          <motion.main
            key="dashboard"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "28px 20px 96px",
              position: "relative",
            }}
            id="main-content"
          >
            {/* ── Journey Steps Bar ──────────────────────────── */}
            <JourneyStepsBar
              currentModule={currentWorkflowModule}
              project={projects.length > 0 ? projects[0] : null}
              onNavigate={handleWorkflowNavigate}
            />

            {/* ── Workflow Banner ─────────────────────────────── */}
            <WorkflowBanner
              currentModule={currentWorkflowModule}
              project={projects.length > 0 ? projects[0] : null}
              onNavigate={handleWorkflowNavigate}
            />

            {/* ── Executive AI Briefing ───────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.4 }}
              className="p-5 rounded-2xl border border-blue-accent/25 bg-blue-accent/5 backdrop-blur-md mb-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-2xl shadow-glow-blue/5"
            >
              <div className="space-y-1.5 max-w-2xl text-left">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-accent"></span>
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-blue-accent">
                    Cognitive executive update
                  </span>
                </div>
                <h2 className="text-xs font-black text-white">
                  Welcome back, Pravalika.
                </h2>
                <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                  Three innovation opportunities were detected overnight. NOVA
                  Council recommends prioritizing{" "}
                  <span className="text-white font-bold">
                    Smart Waste Management
                  </span>{" "}
                  because projected environmental impact increased by{" "}
                  <span className="text-emerald-accent font-bold">18%</span>.
                  Your project readiness is now among the top{" "}
                  <span className="text-blue-accent font-bold">10%</span>.
                </p>
              </div>
              <button
                onClick={() => {
                  if (projects.length > 0) setSelectedProject(projects[0]);
                  setIsPresentationOpen(true);
                }}
                className="df-btn df-btn-primary py-2 px-3 text-[10px] whitespace-nowrap self-stretch md:self-auto text-center"
              >
                🚀 Launch Presentation Deck
              </button>
            </motion.div>

            {/* ── Page Header ─────────────────────────────── */}
            <div style={{ marginBottom: 32 }}>
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: EASE_OUT }}
              >
                <h1
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    color: "var(--text-primary)",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  Innovation <span className="df-gradient-text">Workspace</span>
                </h1>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {hasHydrated && projects.length > 0
                    ? `${projects.length} active project${
                        projects.length > 1 ? "s" : ""
                      } across all innovation phases`
                    : "Create your first project to unlock all AI-powered modules"}
                </p>
              </motion.div>
            </div>

            {/* ── Metric Cards ─────────────────────────────── */}
            <section
              aria-label="Workspace metrics"
              style={{ marginBottom: 36, marginTop: 12 }}
            >
              <div
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  justifyContent: "space-between",
                  alignItems: "stretch",
                  gap: 16,
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  width: "100%",
                  paddingBottom: 8,
                }}
                className="no-scrollbar"
              >
                <div
                  style={{
                    flex: "1 1 0px",
                    minWidth: 200,
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                  }}
                  className="md:min-w-0 md:flex-shrink"
                >
                  <MetricCard
                    title="Innovation"
                    value={stats.avgInnovation}
                    description="Novelty index & design thinking"
                    variant="blue"
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904L9 21l8.982-5.097c.36-.204.64-.543.766-.948l.848-2.735a2.25 2.25 0 00-1.848-2.883l-2.61-.227a1.056 1.056 0 01-.827-.58l-1.084-2.114a2.25 2.25 0 00-4.004 0L8.14 8.766a1.056 1.056 0 01-.827.58l-2.61.227a2.25 2.25 0 00-1.848 2.883l.848 2.735c.127.405.406.744.766.948l8.982 5.097z"
                        />
                      </svg>
                    }
                  />
                </div>

                <div
                  style={{
                    flex: "1 1 0px",
                    minWidth: 200,
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                  }}
                  className="md:min-w-0 md:flex-shrink"
                >
                  <MetricCard
                    title="Eng Health"
                    value={stats.avgHealth}
                    description="Code quality & test coverage"
                    variant="emerald"
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                        />
                      </svg>
                    }
                  />
                </div>

                <div
                  style={{
                    flex: "1 1 0px",
                    minWidth: 200,
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                  }}
                  className="md:min-w-0 md:flex-shrink"
                >
                  <MetricCard
                    title="Progress"
                    value={stats.avgProgress}
                    description="Roadmap completion rate"
                    variant="violet"
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                        />
                      </svg>
                    }
                  />
                </div>

                <div
                  style={{
                    flex: "1 1 0px",
                    minWidth: 200,
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                  }}
                  className="md:min-w-0 md:flex-shrink"
                >
                  <MetricCard
                    title="Impact"
                    value={stats.avgImpact}
                    description="UN SDG alignment index"
                    variant="cyan"
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    }
                  />
                </div>

                <div
                  style={{
                    flex: "1 1 0px",
                    minWidth: 200,
                    flexShrink: 0,
                    scrollSnapAlign: "start",
                  }}
                  className="md:min-w-0 md:flex-shrink"
                >
                  <MetricCard
                    title="Readiness"
                    value={stats.avgReadiness}
                    description="Technology Readiness Level"
                    variant="emerald"
                    icon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
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
            </section>

            {/* ── Executive Panel ───────────────────────────── */}
            <section
              aria-label="Executive summary"
              style={{ marginBottom: 28 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr",
                  gap: 12,
                }}
                className="df-hide-mobile"
              >
                {/* Council Status */}
                <div className="df-card" style={{ padding: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 16,
                    }}
                  >
                    <span
                      className="df-section-label"
                      style={{ color: "#93c5fd" }}
                    >
                      NOVA Council Consensus
                    </span>
                    <span
                      className="df-badge df-badge-emerald"
                      style={{ display: "flex", alignItems: "center", gap: 5 }}
                    >
                      <span
                        className="df-live-dot"
                        style={{ width: 5, height: 5 }}
                        aria-hidden="true"
                      />
                      Live
                    </span>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 10,
                    }}
                  >
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
                        style={{
                          background: "var(--bg-surface)",
                          border: "1px solid var(--border)",
                          borderRadius: 12,
                          padding: "12px 14px",
                        }}
                      >
                        <span className="df-section-label">{item.label}</span>
                        <div
                          style={{
                            fontSize: 20,
                            fontWeight: 900,
                            letterSpacing: "-0.03em",
                            color: "var(--text-primary)",
                            marginTop: 6,
                            marginBottom: 4,
                          }}
                        >
                          {item.value}
                        </div>
                        <span
                          style={{
                            fontSize: 11,
                            color: "var(--text-tertiary)",
                            fontWeight: 500,
                          }}
                        >
                          {item.sub}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity Log */}
                <div className="df-card" style={{ padding: 20 }}>
                  <span
                    className="df-section-label"
                    style={{ display: "block", marginBottom: 14 }}
                  >
                    Recent Activity
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    {[
                      {
                        action: "NOVA Council evaluation completed",
                        tag: "COUNCIL",
                        dot: "var(--blue)",
                      },
                      {
                        action: "Impact reach metrics updated",
                        tag: "IMPACT",
                        dot: "var(--cyan)",
                      },
                      {
                        action: "5 Whys discovery phase done",
                        tag: "RESEARCH",
                        dot: "var(--emerald)",
                      },
                    ].map((act, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: act.dot,
                            marginTop: 5,
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        />
                        <div>
                          <p
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: "var(--text-primary)",
                              lineHeight: 1.4,
                            }}
                          >
                            {act.action}
                          </p>
                          <span
                            className="df-badge df-badge-blue"
                            style={{ marginTop: 4, fontSize: 9 }}
                          >
                            {act.tag}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </section>

            {/* ── AI Innovation Mentor ──────────────────────── */}
            <AIMentorPanel project={projects.length > 0 ? projects[0] : null} />

            {/* ── Filter Bar ────────────────────────────────── */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                marginBottom: 20,
                paddingTop: 20,
                borderTop: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <span className="df-section-label">Filter:</span>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  aria-label="Filter by theme"
                  className="df-input"
                  style={{
                    padding: "6px 10px",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  <option value="All">All Themes</option>
                  {uniqueThemes
                    .filter((t) => t !== "All")
                    .map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                </select>
                <select
                  value={selectedStage}
                  onChange={(e) => setSelectedStage(e.target.value)}
                  aria-label="Filter by stage"
                  className="df-input"
                  style={{
                    padding: "6px 10px",
                    fontSize: 12,
                    cursor: "pointer",
                  }}
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
                    className="df-btn df-btn-ghost"
                    style={{ padding: "5px 12px", fontSize: 12 }}
                  >
                    Clear
                  </button>
                )}
              </div>
              <span
                style={{
                  fontSize: 12,
                  color: "var(--text-tertiary)",
                  fontWeight: 500,
                }}
              >
                <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
                  {filteredProjects.length}
                </span>{" "}
                / {projects.length} projects
              </span>
            </div>

            {/* ── Projects Grid ─────────────────────────────── */}
            <section aria-label="Innovation projects">
              <AnimatePresence mode="wait">
                {filteredProjects.length > 0 ? (
                  <motion.div
                    key="grid"
                    variants={cardContainerVariants}
                    initial="hidden"
                    animate="show"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: 12,
                    }}
                  >
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => setSelectedProject(project)}
                      />
                    ))}
                  </motion.div>
                ) : (
                  <EmptyState
                    key="empty"
                    onNewProject={handleNewProjectClick}
                    hasFilter={hasActiveFilter}
                  />
                )}
              </AnimatePresence>
            </section>
          </motion.main>

          {/* ── Premium Footer ────────────────────────────────── */}
          <footer
            style={{
              padding: "32px 20px 110px",
              borderTop: "1px solid var(--border)",
              marginTop: "auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              fontSize: 12,
              color: "var(--text-tertiary)",
              maxWidth: 1280,
              width: "100%",
              margin: "0 auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  letterSpacing: "0.05em",
                }}
              >
                DEVFLOW OS
              </span>
              <span style={{ color: "var(--border)" }}>|</span>
              <span>v1.0.0</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
                color: "var(--text-tertiary)",
                transition: "opacity 150ms ease",
              }}
              className="hover:opacity-80 transition-opacity duration-150 cursor-default"
            >
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ color: "var(--rose)", fontSize: 11 }}>❤️</span>{" "}
                Built by{" "}
                <span style={{ color: "var(--violet)", fontWeight: 700 }}>
                  Pravalika Palle
                </span>
              </span>
              <span style={{ color: "var(--border)" }}>|</span>
              <span
                style={{
                  color: "var(--blue-accent)",
                  fontWeight: 800,
                  letterSpacing: "0.02em",
                }}
              >
                NovaForge AI
              </span>
              <span style={{ color: "var(--border)" }}>|</span>
              <span>© 2026 DevFlow OS</span>
            </div>
          </footer>
        </div>

        {/* Slide-over */}
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onEdit={() => handleEditClick(selectedProject)}
            onDelete={() =>
              handleDeleteProject(selectedProject.id, selectedProject.name)
            }
            onClose={() => setSelectedProject(null)}
            onLaunchCoach={() => {
              setActiveCoachProject(selectedProject);
              setSelectedProject(null);
            }}
          />
        )}

        {/* Form modal */}
        {isFormOpen && (
          <ProjectForm
            key={editingProject ? editingProject.id : "new"}
            project={editingProject}
            onSave={handleSaveProject}
            onClose={() => setIsFormOpen(false)}
          />
        )}

        {/* Toasts */}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />

        {/* Samsung Presentation Widescreen Deck Overlay */}
        <AnimatePresence>
          {isPresentationOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex flex-col bg-bg-base/98 backdrop-blur-lg p-8"
            >
              <div className="flex justify-between items-center border-b border-border-default pb-4 z-10">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Samsung Presentation Mode
                  </span>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mt-1">
                    {selectedProject ? selectedProject.name : "DevFlow OS"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsPresentationOpen(false)}
                  className="df-btn df-btn-ghost text-slate-400 hover:text-white text-lg font-bold"
                >
                  Exit Presentation
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center relative p-6">
                <div className="text-center space-y-2 mb-6">
                  <span className="text-[10px] font-bold text-blue-accent uppercase tracking-widest block">
                    {presentationSlides[currentSlide]?.subtitle}
                  </span>
                  <h1 className="text-2xl font-black text-white">
                    {presentationSlides[currentSlide]?.title}
                  </h1>
                </div>

                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="w-full flex items-center justify-center py-4"
                >
                  {presentationSlides[currentSlide]?.content}
                </motion.div>
              </div>

              <div className="flex justify-between items-center border-t border-border-default pt-4">
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentSlide === 0}
                  className="df-btn df-btn-ghost text-xs"
                >
                  Previous Slide
                </button>
                <span className="text-xs text-slate-500 font-semibold">
                  Slide {currentSlide + 1} / {presentationSlides.length}
                </span>
                <button
                  onClick={() =>
                    setCurrentSlide((prev) =>
                      Math.min(presentationSlides.length - 1, prev + 1),
                    )
                  }
                  disabled={currentSlide === presentationSlides.length - 1}
                  className="df-btn df-btn-primary text-xs"
                >
                  Next Slide
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Quick Actions FAB ──────────────────────────────── */}
      <QuickActionsBar
        project={projects.length > 0 ? projects[0] : null}
        onNavigate={handleWorkflowNavigate}
        onOpenMentor={() => {
          setActiveModule("dashboard");
          setActiveCoachProject(null);
        }}
        onOpenCoach={() => {
          if (projects.length > 0) setActiveCoachProject(projects[0]);
          else
            pushToast(
              "Create a project first to launch Design Thinking.",
              "info",
            );
        }}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenCouncil={() => setActiveModule("council")}
      />

      {/* ── Milestone Success Modal ────────────────────────── */}
      <MilestoneSuccessModal
        trigger={milestoneTrigger}
        project={milestoneProject}
        onClose={() => setMilestoneTrigger(null)}
        onCTA={() => {
          if (milestoneTrigger === "first_project") {
            setActiveModule("discovery");
          } else if (milestoneTrigger === "council_complete") {
            setActiveModule("council");
          } else if (
            milestoneTrigger === "project_complete" ||
            milestoneTrigger === "report_exported"
          ) {
            setIsExportOpen(true);
          } else if (milestoneTrigger === "first_mentor") {
            setActiveModule("dashboard");
          }
          setMilestoneTrigger(null);
        }}
      />

      {/* ── Confirm Delete Dialog ───────────────────────── */}
      <ConfirmDialog
        isOpen={confirmDeleteId !== null}
        title="Delete Project"
        message={`"${confirmDeleteName}" will be permanently deleted. This action cannot be undone.`}
        confirmLabel="Delete Project"
        cancelLabel="Keep Project"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDeleteId(null)}
      />

      {/* ── Settings / Guides Modal Center ───────────────── */}
      <SettingsCenterModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onResetDemo={handleResetDemo}
        onStartTour={(type) => {
          setTourType(type);
          setIsTourOpen(true);
        }}
      />

      {/* ── Guided Interactive Tour Overlay ──────────────── */}
      <DemoTourOverlay
        isOpen={isTourOpen}
        type={tourType}
        project={projects.length > 0 ? projects[0] : null}
        onClose={() => setIsTourOpen(false)}
        onNavigate={handleTourNavigate}
      />
    </>
  );
}

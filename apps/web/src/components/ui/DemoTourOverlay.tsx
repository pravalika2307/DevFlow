"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InnovationProject } from "../../types/innovation";

export type TourType = "general" | "samsung";

interface TourStep {
  title: string;
  moduleName?: string;
  description?: string;
  targetId?: string;
  actionLabel?: string;
  setupEffect?: () => void;
  whatItDoes?: string;
  whyItMatters?: string;
  solveForTomorrow?: string;
  currentGoal?: string;
  estTimeRemaining?: string;
  mission?: string;
  tasks?: string[];
  requiredTask?: string;
  celebrationText?: string;
}

interface DemoTourOverlayProps {
  isOpen: boolean;
  type: TourType;
  project: InnovationProject | null;
  onClose: () => void;
  onNavigate: (
    module:
      | "dashboard"
      | "discovery"
      | "impact"
      | "council"
      | "galaxy"
      | "coach"
      | "reports"
      | "slides",
  ) => void;
  isPresenterMode: boolean;
  setIsPresenterMode: (val: boolean) => void;
}

export function DemoTourOverlay({
  isOpen,
  type: _type,
  project: _project,
  onClose,
  onNavigate,
  isPresenterMode,
  setIsPresenterMode,
}: DemoTourOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  // Live Task Detection State
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(
    {},
  );
  const [showCelebration, setShowCelebration] = useState(false);

  const steps: TourStep[] = useMemo(
    () => [
      // 1. Welcome
      {
        title: "Welcome to DevFlow",
        description: "Let's build an innovation that can change lives.",
        actionLabel: "Begin Journey",
        targetId: undefined,
        estTimeRemaining: "4 Minutes",
        setupEffect: () => onNavigate("dashboard"),
      },
      // 2. Workspace (Step 1 of 8)
      {
        title: "Executive Workspace",
        moduleName: "Workspace Dashboard",
        currentGoal: "Understand the metrics dashboard overview.",
        estTimeRemaining: "3m 45s",
        targetId: "#workspace-metrics",
        setupEffect: () => onNavigate("dashboard"),
        whatItDoes:
          "Aggregates core project parameters: innovation index, engineering health, progress, and UN SDG impact scores.",
        whyItMatters:
          "Innovation requires constant feedback. Visualizing key metrics keeps the project aligned to success criteria.",
        solveForTomorrow:
          "Validates project maturity indices before the final evaluation gates.",
        mission: "Explore your innovation project's overview.",
        tasks: [
          "Click on the 'Satkhira SafeWater Initiative' project card to view details",
        ],
        requiredTask: "view-project",
        celebrationText: "🎉 Dashboard Analyzed",
      },
      // 3. Problem Discovery (Step 2 of 8)
      {
        title: "Empathy & Research",
        moduleName: "Problem Discovery",
        currentGoal:
          "Understand root-cause validation before writing solutions.",
        estTimeRemaining: "3m 15s",
        targetId: "#discovery-panel",
        setupEffect: () => onNavigate("discovery"),
        whatItDoes:
          "Runs structured Empathy maps, 5 Whys root-cause analyses, stakeholder priority maps, and chronological research logs.",
        whyItMatters:
          "Proposing solutions before understanding the root cause is the #1 reason why startups fail.",
        solveForTomorrow:
          "Fulfills the core research requirement of the Empathize stage for Samsung Solve for Tomorrow.",
        mission: "Record your first research timeline observation.",
        tasks: [
          "Select Timeline Category",
          "Enter Observer Name",
          "Write one short observation",
          "Press Add Timeline Record",
        ],
        requiredTask: "add-observation",
        celebrationText: "🎉 Research Completed",
      },
      // 4. Design Thinking (Step 3 of 8)
      {
        title: "Human-Centered Design",
        moduleName: "Design Thinking Workspace",
        currentGoal: "Structure human-centered design steps.",
        estTimeRemaining: "2m 45s",
        targetId: "#coach-panel",
        setupEffect: () => onNavigate("coach"),
        whatItDoes:
          "Structures user personas, empathy charts, journey mapping, and problem definitions.",
        whyItMatters:
          "Ensures the product is highly intuitive and centered around genuine, validated user pain points.",
        solveForTomorrow:
          "Develops human-centric solutions that score highly in community impact.",
        mission: "Complete one Empathy Map field.",
        tasks: [
          "Refine target goals, pains, or behaviors in the Empathy grid",
          "Click Save Empathy Map",
        ],
        requiredTask: "edit-empathy",
        celebrationText: "✨ Persona Created",
      },
      // 5. NOVA AI Mentor (Step 4 of 8)
      {
        title: "Cooperative AI Assistant",
        moduleName: "NOVA AI Mentor",
        currentGoal: "Interactively coach and improve the core idea.",
        estTimeRemaining: "2m 15s",
        targetId: "#ai-mentor-panel",
        setupEffect: () => onNavigate("dashboard"),
        whatItDoes:
          "Context-aware mentor to improve ideas, identify risks, and draft Galaxy pitches in real-time.",
        whyItMatters:
          "Acts as a 24/7 innovation advisor to stress-test your design strategy.",
        solveForTomorrow:
          "Accelerates preparation cycles with specialized feedback aligned to SDG frameworks.",
        mission: "Request AI mentoring feedback on your idea.",
        tasks: ["Click the 'Improve Idea' button in the NOVA Mentor panel"],
        requiredTask: "improve-idea",
        celebrationText: "🤖 AI Recommendation Generated",
      },
      // 6. Innovation Galaxy (Step 5 of 8)
      {
        title: "Relational Modeling",
        moduleName: "Innovation Galaxy Map",
        currentGoal: "Discover collaboration and SDG clusters across projects.",
        estTimeRemaining: "1m 45s",
        targetId: "#galaxy-panel",
        setupEffect: () => onNavigate("galaxy"),
        whatItDoes:
          "Visualizes projects orbiting the AI Core, tracing shared SDG nodes and collaboration potential.",
        whyItMatters:
          "Breaks modular silos by highlighting how multiple solutions form a cohesive system.",
        solveForTomorrow:
          "Demonstrates system-level thinking and cross-team execution.",
        mission: "Discover relational connections in the solar cluster.",
        tasks: ["Hover over any project node in the interactive canvas"],
        requiredTask: "hover-galaxy",
        celebrationText: "🌌 Innovation Relationships Discovered",
      },
      // 7. Impact Intelligence (Step 6 of 8)
      {
        title: "Quantitative Societal Reach",
        moduleName: "Impact Intelligence Matrix",
        currentGoal: "Quantify societal reach and map SDG objectives.",
        estTimeRemaining: "1m 15s",
        targetId: "#impact-panel",
        setupEffect: () => onNavigate("impact"),
        whatItDoes:
          "Maps SDG alignments, models beneficiary growth curves, and highlights inclusivity hazards.",
        whyItMatters:
          "Provides hard data and target evidence rather than generic promises of success.",
        solveForTomorrow:
          "Delivers clean data-driven impact summaries for high evaluation grading.",
        mission: "Map your primary UN SDG goal parameters.",
        tasks: [
          "Select SDG Goal (e.g. Clean Water)",
          "Define contribution level, reasoning, or outcomes",
          "Click Add Goal Mapping",
        ],
        requiredTask: "review-sdg",
        celebrationText: "🌍 Impact Calculated",
      },
      // 8. NOVA Council (Step 7 of 8)
      {
        title: "Compliance Audit",
        moduleName: "NOVA AI Council Panel",
        currentGoal:
          "Evaluate innovation proposals from 8 expert AI advisor perspectives.",
        estTimeRemaining: "45s",
        targetId: "#council-panel",
        setupEffect: () => onNavigate("council"),
        whatItDoes:
          "Orchestrates evaluations by 8 AI experts checking technical feasibility, ethics, accessibility, and scale.",
        whyItMatters:
          "Eliminates bias and checks that solutions are compliance-ready before public release.",
        solveForTomorrow:
          "Simulates official Samsung judging panels to optimize submission viability.",
        mission: "Run a multi-expert consensus review.",
        tasks: [
          "Click 'Simulate Live Consensus' and wait for evaluation completion",
        ],
        requiredTask: "run-council",
        celebrationText: "🧠 AI Council Consensus Achieved",
      },
      // 9. Reports & Export (Step 8 of 8)
      {
        title: "Widescreen Pitch Deck",
        moduleName: "Reports & Export Center",
        currentGoal: "Export presentation-ready slide decks and PDF briefs.",
        estTimeRemaining: "15s",
        targetId: "#reports-panel",
        setupEffect: () => onNavigate("reports"),
        whatItDoes:
          "Generates widescreen slides, executive summary sheets, and complete PDF deliverables with one click.",
        whyItMatters:
          "Reduces administrative friction so innovators can focus purely on solving problems.",
        solveForTomorrow:
          "Compiles compliance sheets ready for Solve for Tomorrow portal upload.",
        mission: "Compile presentation pitch deck documentation.",
        tasks: ["Click 'Generate Report' in the Export Center Dialog"],
        requiredTask: "generate-report",
        celebrationText: "📄 Executive Report Generated",
      },
      // 10. Completion
      {
        title: "Congratulations!",
        description: "You've completed the DevFlow Innovation Journey.",
        targetId: undefined,
      },
    ],
    [onNavigate],
  );

  // Monitor target elements bounding box for spotlight mask
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => setCoords(null), 0);
      return () => clearTimeout(t);
    }

    const targetId = steps[currentStep]?.targetId;
    if (!targetId) {
      const t = setTimeout(() => setCoords(null), 0);
      return () => clearTimeout(t);
    }

    const updateCoords = () => {
      const el =
        document.getElementById(targetId.substring(1)) ||
        document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        const rect = el.getBoundingClientRect();
        // Add safety padding margins around target element
        setCoords({
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
        });
      } else {
        setCoords(null);
      }
    };

    const timer = setTimeout(updateCoords, 250);
    window.addEventListener("resize", updateCoords);
    window.addEventListener("scroll", updateCoords);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateCoords);
      window.removeEventListener("scroll", updateCoords);
    };
  }, [currentStep, isOpen, steps]);

  // Navigate automatically based on step effects
  useEffect(() => {
    if (isOpen && steps[currentStep]?.setupEffect) {
      steps[currentStep].setupEffect?.();
    }
  }, [currentStep, isOpen, steps]);

  // Reset local step transitions and listen for live events
  useEffect(() => {
    const t = setTimeout(() => setShowCelebration(false), 0);
    return () => clearTimeout(t);
  }, [currentStep]);

  // Listen to Custom Task Completion Events
  useEffect(() => {
    const handleTaskComplete = (e: Event) => {
      if (!isOpen) return;
      const customEvent = e as CustomEvent;
      const completedTaskType = customEvent.detail?.task;
      const activeRequiredTask = steps[currentStep]?.requiredTask;

      if (completedTaskType && completedTaskType === activeRequiredTask) {
        setCompletedTasks((prev) => ({ ...prev, [completedTaskType]: true }));
        setShowCelebration(true);
      }
    };
    window.addEventListener("devflow-task-complete", handleTaskComplete);
    return () =>
      window.removeEventListener("devflow-task-complete", handleTaskComplete);
  }, [isOpen, currentStep, steps]);

  // Accessibility: Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        setIsPresenterMode(false);
        onClose();
      } else if (e.key === "ArrowRight" || e.key === " ") {
        if (e.key === " ") {
          e.preventDefault();
        }
        if (currentStep < steps.length - 1) {
          // If task not complete yet, simulate completion to prevent dead-ends
          const activeRequiredTask = steps[currentStep]?.requiredTask;
          if (activeRequiredTask && !completedTasks[activeRequiredTask]) {
            setCompletedTasks((prev) => ({
              ...prev,
              [activeRequiredTask]: true,
            }));
            setShowCelebration(true);
          } else {
            setCurrentStep((prev) => prev + 1);
          }
        }
      } else if (e.key === "ArrowLeft") {
        if (currentStep > 0) {
          setCurrentStep((prev) => prev - 1);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    currentStep,
    steps,
    onClose,
    isPresenterMode,
    setIsPresenterMode,
    completedTasks,
  ]);

  // Helper simulator trigger to complete tasks programmatically
  const simulateActiveTask = () => {
    const activeRequiredTask = steps[currentStep]?.requiredTask;
    if (!activeRequiredTask) return;

    if (activeRequiredTask === "improve-idea") {
      const btn = document.querySelector(
        '[data-action-id="improve_idea"]',
      ) as HTMLButtonElement;
      if (btn) {
        btn.click();
      } else {
        setCompletedTasks((prev) => ({ ...prev, [activeRequiredTask]: true }));
        setShowCelebration(true);
      }
    } else if (activeRequiredTask === "run-council") {
      const btn = document.querySelector(
        '[data-action-id="run-council"]',
      ) as HTMLButtonElement;
      if (btn) btn.click();
    } else if (activeRequiredTask === "generate-report") {
      const btn = document.querySelector(
        '[data-action-id="generate-report"]',
      ) as HTMLButtonElement;
      if (btn) btn.click();
    } else {
      // General tasks simulation
      setCompletedTasks((prev) => ({ ...prev, [activeRequiredTask]: true }));
      setShowCelebration(true);
    }
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const progressPercent = Math.round((currentStep / (steps.length - 1)) * 100);
  const activeRequiredTask = step.requiredTask;
  const isTaskDone = activeRequiredTask
    ? !!completedTasks[activeRequiredTask]
    : false;

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 990,
        }}
      >
        {/* Spotlight SVG Mask dimming */}
        <svg
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 991,
          }}
        >
          <defs>
            <mask id="tour-spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              {coords && (
                <rect
                  x={coords.left}
                  y={coords.top}
                  width={coords.width}
                  height={coords.height}
                  rx="16"
                  ry="16"
                  fill="black"
                />
              )}
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="rgba(3, 7, 18, 0.85)"
            mask="url(#tour-spotlight-mask)"
            style={{ pointerEvents: "auto" }}
          />
        </svg>

        {/* Modal/Card Layer */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            pointerEvents: "none",
            zIndex: 992,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            style={{
              width: "min(530px, 92vw)",
              borderRadius: 24,
              background: "rgba(10, 10, 10, 0.85)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.8), 0 0 40px rgba(59,130,246,0.1)",
              pointerEvents: "auto",
              overflow: "hidden",
            }}
          >
            {/* Header progress line */}
            <div
              style={{
                height: 4,
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, #7C4DFF 0%, #3B82F6 100%)",
                transition: "width 0.3s ease",
              }}
            />

            {/* 1. Welcome Card Layout */}
            {currentStep === 0 && (
              <div style={{ padding: 32 }} className="space-y-6 text-center">
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 16,
                    background: "rgba(124, 77, 255, 0.1)",
                    border: "1px solid rgba(124, 77, 255, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    fontSize: 24,
                  }}
                >
                  🎓
                </div>
                <div className="space-y-2">
                  <h3 style={{ fontSize: 24, fontWeight: 900, color: "white" }}>
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: "var(--text-secondary)",
                      fontStyle: "italic",
                      marginTop: 4,
                    }}
                  >
                    &ldquo;{step.description}&rdquo;
                  </p>
                </div>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  In the next four minutes, you&apos;ll experience the complete
                  innovation journey used to transform an idea into a Samsung
                  Solve for Tomorrow solution.
                </p>

                {/* Journey Flow Visualization */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    padding: "14px 18px",
                  }}
                  className="space-y-2 text-left"
                >
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      color: "var(--text-tertiary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      display: "block",
                      marginBottom: 8,
                    }}
                  >
                    Journey Overview
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexFlow: "row wrap",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--text-secondary)",
                    }}
                  >
                    <span>Problem Discovery</span>
                    <span style={{ color: "var(--text-tertiary)" }}>
                      &rarr;
                    </span>
                    <span>Design Thinking</span>
                    <span style={{ color: "var(--text-tertiary)" }}>
                      &rarr;
                    </span>
                    <span>AI Mentor</span>
                    <span style={{ color: "var(--text-tertiary)" }}>
                      &rarr;
                    </span>
                    <span>Innovation Galaxy</span>
                    <span style={{ color: "var(--text-tertiary)" }}>
                      &rarr;
                    </span>
                    <span>Impact Intelligence</span>
                    <span style={{ color: "var(--text-tertiary)" }}>
                      &rarr;
                    </span>
                    <span>AI Council</span>
                    <span style={{ color: "var(--text-tertiary)" }}>
                      &rarr;
                    </span>
                    <span>Presentation Report</span>
                  </div>
                </div>

                {/* Presenter Mode Toggle Switch */}
                <div
                  style={{
                    padding: "12px 18px",
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      cursor: "pointer",
                      fontSize: 13,
                      color: "white",
                      fontWeight: 700,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isPresenterMode}
                      onChange={(e) => setIsPresenterMode(e.target.checked)}
                      style={{
                        width: 18,
                        height: 18,
                        accentColor: "var(--blue-accent)",
                        cursor: "pointer",
                      }}
                    />
                    Enable Presenter Mode
                  </label>
                  <span
                    style={{
                      fontSize: 9.5,
                      color: "var(--text-tertiary)",
                      fontWeight: 600,
                    }}
                  >
                    (Projection Optimize)
                  </span>
                </div>

                <div className="flex gap-3 justify-center pt-2">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/[0.05] text-xs font-bold text-slate-400 hover:text-white transition-all"
                  >
                    Exit
                  </button>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-2.5 rounded-xl bg-blue-accent hover:bg-blue-600 text-xs font-bold text-white transition-all shadow-lg shadow-blue-500/20"
                  >
                    {step.actionLabel}
                  </button>
                </div>
              </div>
            )}

            {/* 2. Walkthrough Steps Overlay */}
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <div style={{ padding: 24 }} className="space-y-5">
                {/* Progress Indicators */}
                <div className="flex justify-between items-center border-b border-border-default pb-3">
                  <div className="space-y-0.5">
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 900,
                        color: "var(--blue-accent)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      {step.moduleName}
                    </span>
                    <h3
                      style={{ fontSize: 18, fontWeight: 900, color: "white" }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <div style={{ textAlign: "right" }} className="space-y-0.5">
                    <span
                      style={{
                        fontSize: 10.5,
                        color: "var(--text-tertiary)",
                        fontWeight: 700,
                        display: "block",
                      }}
                    >
                      Step {currentStep} of {steps.length - 2}
                    </span>
                    <span
                      style={{
                        fontSize: 9.5,
                        color: "var(--text-tertiary)",
                        fontWeight: 500,
                        display: "block",
                      }}
                    >
                      Est: {step.estTimeRemaining} left
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {/* Contextual Explanations: Concisely answers three questions */}
                  <div className="space-y-2">
                    {/* Why this matters */}
                    <div className="space-y-0.5">
                      <span
                        style={{
                          fontSize: 9.5,
                          fontWeight: 700,
                          color: "var(--text-tertiary)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Why this matters
                      </span>
                      <p
                        style={{
                          fontSize: 12.5,
                          color: "var(--text-secondary)",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {step.whyItMatters}
                      </p>
                    </div>

                    {/* How it helps & SFT alignment */}
                    <div
                      style={{
                        padding: "10px 12px",
                        borderRadius: 12,
                        background: "rgba(139, 92, 246, 0.04)",
                        border: "1px solid rgba(139, 92, 246, 0.12)",
                      }}
                      className="space-y-1"
                    >
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: "var(--violet)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          display: "block",
                        }}
                      >
                        Samsung Solve for Tomorrow Alignment
                      </span>
                      <p
                        style={{
                          fontSize: 12,
                          color: "var(--text-secondary)",
                          lineHeight: 1.45,
                          margin: 0,
                        }}
                      >
                        {step.solveForTomorrow}
                      </p>
                    </div>
                  </div>

                  {/* Task Instructions / Mission */}
                  <div
                    style={{
                      padding: 14,
                      borderRadius: 16,
                      background: isTaskDone
                        ? "rgba(16, 185, 129, 0.05)"
                        : "rgba(255,255,255,0.02)",
                      border: isTaskDone
                        ? "1px solid rgba(16, 185, 129, 0.2)"
                        : "1px solid var(--border)",
                    }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: "var(--text-tertiary)",
                            textTransform: "uppercase",
                          }}
                        >
                          Today&apos;s Mission
                        </span>
                        <h4
                          style={{
                            fontSize: 13,
                            fontWeight: 800,
                            color: "white",
                            marginTop: 1,
                          }}
                        >
                          {step.mission}
                        </h4>
                      </div>
                      <span
                        style={{
                          fontSize: 9.5,
                          fontWeight: 700,
                          color: isTaskDone
                            ? "var(--emerald-accent)"
                            : "var(--text-tertiary)",
                          textTransform: "uppercase",
                          background: isTaskDone
                            ? "rgba(16, 185, 129, 0.1)"
                            : "rgba(255,255,255,0.04)",
                          padding: "2px 8px",
                          borderRadius: 6,
                        }}
                      >
                        {isTaskDone ? "Completed" : "Action Required"}
                      </span>
                    </div>

                    {/* Checkbox tasks list */}
                    <div className="space-y-1.5 pt-1">
                      {step.tasks?.map((t, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 8,
                            fontSize: 12,
                            color: isTaskDone
                              ? "var(--text-tertiary)"
                              : "var(--text-secondary)",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isTaskDone}
                            readOnly
                            style={{
                              marginTop: 3,
                              width: 13,
                              height: 13,
                              accentColor: "var(--emerald)",
                            }}
                          />
                          <span
                            style={{
                              textDecoration: isTaskDone
                                ? "line-through"
                                : "none",
                              lineHeight: 1.4,
                            }}
                          >
                            {t}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Simulator Trigger */}
                    {!isTaskDone && (
                      <button
                        onClick={simulateActiveTask}
                        className="w-full mt-2 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[10.5px] font-bold text-slate-300 transition-all"
                      >
                        Simulate task action and proceed
                      </button>
                    )}
                  </div>
                </div>

                {/* Celebration Announcement Banner */}
                <AnimatePresence>
                  {showCelebration && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{
                        padding: 12,
                        borderRadius: 12,
                        background: "rgba(16, 185, 129, 0.08)",
                        border: "1px solid rgba(16, 185, 129, 0.25)",
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 800,
                          color: "var(--emerald-accent)",
                          display: "block",
                        }}
                      >
                        {step.celebrationText}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "var(--text-secondary)",
                          display: "block",
                          marginTop: 2,
                        }}
                      >
                        Excellent! Your research evidence has been successfully
                        updated.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Actions */}
                <div className="flex justify-between items-center pt-3 border-t border-t-white/10">
                  <button
                    onClick={onClose}
                    className="text-xs font-bold text-slate-500 hover:text-white transition-all"
                  >
                    Exit Tour
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/[0.05] text-xs font-bold text-slate-400 hover:text-white transition-all"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        if (isTaskDone) {
                          setCurrentStep((prev) => prev + 1);
                        } else {
                          simulateActiveTask();
                        }
                      }}
                      className={`px-5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-lg ${
                        isTaskDone
                          ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
                          : "bg-blue-accent hover:bg-blue-600 shadow-blue-500/20"
                      }`}
                    >
                      {isTaskDone ? "Continue →" : "Verify Task"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Celebration / Completion Card */}
            {currentStep === steps.length - 1 && (
              <div style={{ padding: 32 }} className="space-y-6 text-center">
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 50,
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    fontSize: 26,
                  }}
                >
                  🏆
                </div>
                <div className="space-y-2">
                  <h3 style={{ fontSize: 24, fontWeight: 900, color: "white" }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    {step.description}
                  </p>
                </div>

                {/* Journey Summary Checklist */}
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    padding: "16px 20px",
                  }}
                  className="text-left space-y-2.5"
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--text-tertiary)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      display: "block",
                      marginBottom: 6,
                    }}
                  >
                    Your Completed Journey
                  </span>
                  {[
                    "Discovered a real-world problem",
                    "Applied Design Thinking",
                    "Collaborated with NOVA AI",
                    "Explored Innovation Galaxy",
                    "Measured Social Impact",
                    "Validated your solution using AI Council",
                    "Generated a professional innovation report",
                  ].map((label) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 12.5,
                        color: "var(--text-secondary)",
                      }}
                    >
                      <span
                        style={{ color: "var(--emerald)", fontWeight: 900 }}
                      >
                        ✓
                      </span>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-tertiary)",
                    lineHeight: 1.4,
                  }}
                >
                  Your project is now ready for Samsung Solve for Tomorrow
                  presentation.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => {
                      setCompletedTasks({});
                      setCurrentStep(0);
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-accent hover:bg-blue-600 text-xs font-bold text-white transition-all shadow-lg"
                  >
                    Restart Tour
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={onClose}
                      className="flex-1 py-2.5 rounded-xl border border-white/10 hover:bg-white/[0.05] text-xs font-bold text-slate-400 hover:text-white transition-all"
                    >
                      Explore DevFlow
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onNavigate("dashboard");
                      }}
                      className="flex-1 py-2.5 rounded-xl border border-white/10 hover:bg-white/[0.05] text-xs font-bold text-slate-400 hover:text-white transition-all"
                    >
                      Return Home
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

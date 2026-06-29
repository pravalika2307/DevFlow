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
}

export function DemoTourOverlay({
  isOpen,
  type: _type,
  project: _project,
  onClose,
  onNavigate,
}: DemoTourOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const steps: TourStep[] = useMemo(
    () => [
      // 1. Welcome
      {
        title: "Welcome to DevFlow OS",
        description:
          "In the next few minutes, you'll experience how DevFlow guides teams from identifying real-world problems to building impactful, AI-assisted innovations.",
        actionLabel: "Start Journey",
        targetId: undefined,
        setupEffect: () => onNavigate("dashboard"),
      },
      // 2. Workspace
      {
        title: "Executive Workspace",
        moduleName: "Workspace Dashboard",
        targetId: "#workspace-metrics",
        setupEffect: () => onNavigate("dashboard"),
        whatItDoes:
          "Aggregates core project parameters: innovation index, engineering health, progress, and UN SDG impact scores.",
        whyItMatters:
          "Innovation requires constant feedback. Visualizing key metrics keeps the project aligned to success criteria.",
        solveForTomorrow:
          "Validates project maturity indices before the final evaluation gates.",
      },
      // 3. Problem Discovery
      {
        title: "Empathy & Research",
        moduleName: "Problem Discovery",
        targetId: "#discovery-panel",
        setupEffect: () => onNavigate("discovery"),
        whatItDoes:
          "Runs structured Empathy maps, 5 Whys root-cause analyses, stakeholder priority maps, and chronological research logs.",
        whyItMatters:
          "Proposing solutions before understanding the root cause is the #1 reason why startups fail.",
        solveForTomorrow:
          "Fulfills the core research requirement of the Empathize stage for Samsung Solve for Tomorrow.",
      },
      // 4. Design Thinking
      {
        title: "Human-Centered Design",
        moduleName: "Design Thinking Workspace",
        targetId: "#coach-panel",
        setupEffect: () => onNavigate("coach"),
        whatItDoes:
          "Structures user personas, empathy charts, journey mapping, and problem definitions.",
        whyItMatters:
          "Ensures the product is highly intuitive and centered around genuine, validated user pain points.",
        solveForTomorrow:
          "Develops human-centric solutions that score highly in community impact.",
      },
      // 5. AI Mentor (NOVA)
      {
        title: "Cooperative AI Assistant",
        moduleName: "NOVA AI Mentor",
        targetId: "#ai-mentor-panel",
        setupEffect: () => onNavigate("dashboard"),
        whatItDoes:
          "Context-aware mentor to improve ideas, identify risks, and draft Galaxy pitches in real-time.",
        whyItMatters:
          "Acts as a 24/7 innovation advisor to stress-test your design strategy.",
        solveForTomorrow:
          "Accelerates preparation cycles with specialized feedback aligned to SDG frameworks.",
      },
      // 6. Innovation Galaxy
      {
        title: "Relational Modeling",
        moduleName: "Innovation Galaxy Map",
        targetId: "#galaxy-panel",
        setupEffect: () => onNavigate("galaxy"),
        whatItDoes:
          "Visualizes projects orbiting the AI Core, tracing shared SDG nodes and collaboration potential.",
        whyItMatters:
          "Breaks modular silos by highlighting how multiple solutions form a cohesive system.",
        solveForTomorrow:
          "Demonstrates system-level thinking and cross-team execution.",
      },
      // 7. Impact Intelligence
      {
        title: "Quantitative Societal Reach",
        moduleName: "Impact Intelligence Matrix",
        targetId: "#impact-panel",
        setupEffect: () => onNavigate("impact"),
        whatItDoes:
          "Maps SDG alignments, models beneficiary growth curves, and highlights inclusivity hazards.",
        whyItMatters:
          "Provides hard data and target evidence rather than generic promises of success.",
        solveForTomorrow:
          "Delivers clean data-driven impact summaries for high evaluation grading.",
      },
      // 8. NOVA Council
      {
        title: "Compliance Audit",
        moduleName: "NOVA AI Council Panel",
        targetId: "#council-panel",
        setupEffect: () => onNavigate("council"),
        whatItDoes:
          "Orchestrates evaluations by 8 AI experts checking technical feasibility, ethics, accessibility, and scale.",
        whyItMatters:
          "Eliminates bias and checks that solutions are compliance-ready before public release.",
        solveForTomorrow:
          "Simulates official Samsung judging panels to optimize submission viability.",
      },
      // 9. Reports & Export
      {
        title: "Widescreen Pitch Deck",
        moduleName: "Reports & Export Center",
        targetId: "#reports-panel",
        setupEffect: () => onNavigate("reports"),
        whatItDoes:
          "Generates widescreen slides, executive summary sheets, and complete PDF deliverables with one click.",
        whyItMatters:
          "Reduces administrative friction so innovators can focus purely on solving problems.",
        solveForTomorrow:
          "Compiles compliance sheets ready for Solve for Tomorrow portal upload.",
      },
      // 10. Completion
      {
        title: "Innovation Journey Complete",
        description:
          "You've successfully experienced the complete DevFlow innovation workflow.",
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

  // Accessibility: Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        if (currentStep < steps.length - 1) setCurrentStep((prev) => prev + 1);
      } else if (e.key === "ArrowLeft") {
        if (currentStep > 0) setCurrentStep((prev) => prev - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStep, steps.length, onClose]);

  if (!isOpen) return null;

  const step = steps[currentStep];
  const progressPercent = Math.round((currentStep / (steps.length - 1)) * 100);

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
              width: "min(500px, 92vw)",
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
                height: 3,
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
                  🚀
                </div>
                <div className="space-y-2">
                  <h3 style={{ fontSize: 24, fontWeight: 900, color: "white" }}>
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "var(--blue-accent)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    Samsung Demo Center v2.0
                  </p>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {step.description}
                </p>
                <div
                  style={{
                    padding: "10px 16px",
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border)",
                    display: "inline-block",
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
                    Estimated duration:{" "}
                  </span>
                  <span
                    style={{ fontSize: 12, color: "white", fontWeight: 700 }}
                  >
                    4–5 minutes
                  </span>
                </div>
                <div className="flex gap-3 justify-center pt-4">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/[0.05] text-xs font-bold text-slate-400 hover:text-white transition-all"
                  >
                    Cancel
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
              <div style={{ padding: 28 }} className="space-y-6">
                <div className="flex justify-between items-center border-b border-border-default pb-3">
                  <div className="space-y-1">
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
                  <span
                    style={{
                      fontSize: 11,
                      color: "var(--text-tertiary)",
                      fontWeight: 700,
                    }}
                  >
                    Step {currentStep} of {steps.length - 2}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* What it does */}
                  <div className="space-y-1">
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "var(--text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      What it does
                    </span>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {step.whatItDoes}
                    </p>
                  </div>

                  {/* Why it matters */}
                  <div className="space-y-1">
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "var(--text-tertiary)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Why it matters
                    </span>
                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {step.whyItMatters}
                    </p>
                  </div>

                  {/* Solve for Tomorrow value */}
                  <div
                    style={{
                      padding: 12,
                      borderRadius: 12,
                      background: "rgba(139, 92, 246, 0.05)",
                      border: "1px solid rgba(139, 92, 246, 0.15)",
                    }}
                    className="space-y-1"
                  >
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "var(--violet)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        display: "block",
                      }}
                    >
                      Solve for Tomorrow Alignment
                    </span>
                    <p
                      style={{
                        fontSize: 12.5,
                        color: "var(--text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {step.solveForTomorrow}
                    </p>
                  </div>
                </div>

                {/* Navigation Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-border-default">
                  <button
                    onClick={onClose}
                    className="text-xs font-bold text-slate-500 hover:text-white transition-all"
                  >
                    Skip Tour
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/[0.05] text-xs font-bold text-slate-400 hover:text-white transition-all"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentStep((prev) => prev + 1)}
                      className="px-5 py-2 rounded-xl bg-blue-accent hover:bg-blue-600 text-xs font-bold text-white transition-all shadow-lg shadow-blue-500/20"
                    >
                      Next
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
                    Rediness Checklist
                  </span>
                  {[
                    "Problem Discovery",
                    "Design Thinking Map",
                    "NOVA AI Mentor Audit",
                    "Innovation Galaxy Map",
                    "Impact Intelligence Matrix",
                    "NOVA Council Review",
                    "Compliance Pitch Reports",
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

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => {
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
                      Explore Freely
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

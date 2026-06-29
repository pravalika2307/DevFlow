"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { InnovationProject } from "../../types/innovation";

export type WorkflowModule =
  | "dashboard"
  | "discovery"
  | "coach"
  | "mentor"
  | "galaxy"
  | "impact"
  | "council"
  | "reports";

export const WORKFLOW_STEPS: {
  id: WorkflowModule;
  label: string;
  icon: string;
  novaHint: (project: InnovationProject | null) => string;
}[] = [
  {
    id: "dashboard",
    label: "Workspace",
    icon: "🏠",
    novaHint: (p) =>
      p
        ? `${p.name} is at ${p.projectProgress}% completion. Great momentum — keep building.`
        : "Create your first innovation project to begin the journey.",
  },
  {
    id: "discovery",
    label: "Problem Discovery",
    icon: "💡",
    novaHint: (p) =>
      p
        ? `Problem Discovery validates your core assumptions. Run the 5 Whys and stakeholder interviews for ${p.name}.`
        : "Define the problem deeply before designing a solution.",
  },
  {
    id: "coach",
    label: "Design Thinking",
    icon: "🎯",
    novaHint: (p) =>
      p
        ? `You have ${
            p.ideate?.length ?? 0
          } ideas in the ideation phase. Select the strongest candidate and prototype it.`
        : "Design Thinking guides you from empathy to testable prototypes.",
  },
  {
    id: "mentor",
    label: "AI Mentor",
    icon: "✦",
    novaHint: (p) =>
      p
        ? `NOVA has analyzed ${p.name}. Ask for risks, next steps, or a Samsung pitch — I'm ready.`
        : "Get personalized AI coaching on your innovation project.",
  },
  {
    id: "galaxy",
    label: "Innovation Galaxy",
    icon: "🌌",
    novaHint: (p) =>
      p
        ? `${p.name} appears in the Galaxy as a ${p.projectStage} node. Explore its connections to other innovations.`
        : "The Innovation Galaxy maps all projects in an interactive universe.",
  },
  {
    id: "impact",
    label: "Impact Intelligence",
    icon: "🌍",
    novaHint: (p) =>
      p
        ? `${p.name} aligns with ${p.sdgGoals.length} SDGs. Quantify your reach to strengthen the case for ${p.targetBeneficiaries}.`
        : "Measure the real-world impact of your innovation.",
  },
  {
    id: "council",
    label: "NOVA Council",
    icon: "🤖",
    novaHint: (p) =>
      p
        ? `NOVA Council evaluates ${p.name} across 8 expert dimensions. Submit when your readiness score exceeds 70%.`
        : "8 AI experts evaluate every dimension of your innovation.",
  },
  {
    id: "reports",
    label: "Reports & Export",
    icon: "📊",
    novaHint: (p) =>
      p
        ? `${p.name} is ready for export. Generate a full PDF report or launch the Samsung presentation deck.`
        : "Export your innovation as a polished report or presentation.",
  },
];

interface WorkflowBannerProps {
  currentModule: WorkflowModule;
  project: InnovationProject | null;
  onNavigate: (module: WorkflowModule) => void;
}

export function WorkflowBanner({
  currentModule,
  project,
  onNavigate,
}: WorkflowBannerProps) {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHasHydrated(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const currentIdx = WORKFLOW_STEPS.findIndex((s) => s.id === currentModule);
  const step = WORKFLOW_STEPS[currentIdx];
  const prevStep = currentIdx > 0 ? WORKFLOW_STEPS[currentIdx - 1] : null;
  const nextStep =
    currentIdx < WORKFLOW_STEPS.length - 1
      ? WORKFLOW_STEPS[currentIdx + 1]
      : null;

  // Use null project during server side rendering and initial hydration to guarantee identical markup
  const activeProject = hasHydrated ? project : null;

  // Derive progress % from project or step index
  const overallProgress = useMemo(() => {
    if (activeProject)
      return Math.min(100, Math.round(activeProject.projectProgress));
    // Fall back to position-based estimate
    return Math.round(((currentIdx + 1) / WORKFLOW_STEPS.length) * 100);
  }, [activeProject, currentIdx]);

  const hint = step?.novaHint(activeProject) ?? "";

  if (!step) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        marginBottom: 20,
        padding: "12px 16px",
        borderRadius: 14,
        background:
          "linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.04) 100%)",
        border: "1px solid rgba(59,130,246,0.15)",
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
      }}
      role="navigation"
      aria-label="Innovation workflow progress"
    >
      {/* Prev */}
      {prevStep ? (
        <button
          onClick={() => onNavigate(prevStep.id)}
          aria-label={`Go to previous step: ${prevStep.label}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text-secondary)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            flexShrink: 0,
            transition: "all 150ms ease",
          }}
        >
          ← {prevStep.icon} {prevStep.label}
        </button>
      ) : (
        <div style={{ width: 0 }} />
      )}

      {/* Center: step info + progress */}
      <div style={{ flex: 1, minWidth: 200 }}>
        {/* Step label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 14 }}>{step.icon}</span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.01em",
            }}
          >
            Step {currentIdx + 1} of {WORKFLOW_STEPS.length} ·{" "}
            <span style={{ color: "var(--blue)" }}>{step.label}</span>
          </span>
          <span
            className="df-badge df-badge-blue"
            style={{ fontSize: 9, marginLeft: "auto" }}
          >
            {overallProgress}% Complete
          </span>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: 4,
            borderRadius: 99,
            background: "var(--bg-surface)",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: "100%",
              borderRadius: 99,
              background:
                "linear-gradient(90deg, var(--blue) 0%, var(--violet) 100%)",
            }}
          />
        </div>

        {/* NOVA hint */}
        <p
          style={{
            fontSize: 11,
            color: "var(--text-tertiary)",
            marginTop: 6,
            fontWeight: 500,
            lineHeight: 1.4,
          }}
        >
          <span style={{ color: "var(--blue)", fontWeight: 700 }}>✦ NOVA:</span>{" "}
          {hint}
        </p>
      </div>

      {/* Next */}
      {nextStep ? (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onNavigate(nextStep.id)}
          aria-label={`Go to next step: ${nextStep.label}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            borderRadius: 8,
            border: "1px solid rgba(59,130,246,0.3)",
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.08) 100%)",
            color: "var(--text-primary)",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            flexShrink: 0,
            transition: "all 150ms ease",
          }}
        >
          {nextStep.icon} {nextStep.label} →
        </motion.button>
      ) : (
        <span
          className="df-badge df-badge-emerald"
          style={{ fontSize: 10, flexShrink: 0 }}
        >
          🏁 Journey Complete
        </span>
      )}
    </motion.div>
  );
}

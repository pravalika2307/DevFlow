"use client";

import React from "react";
import { motion } from "framer-motion";
import { InnovationProject } from "../../types/innovation";
import { WORKFLOW_STEPS, WorkflowModule } from "./WorkflowBanner";

interface JourneyStepsBarProps {
  currentModule: WorkflowModule;
  project: InnovationProject | null;
  onNavigate: (module: WorkflowModule) => void;
}

function getStepStatus(
  stepIdx: number,
  currentIdx: number,
  project: InnovationProject | null,
): "done" | "active" | "future" {
  if (stepIdx < currentIdx) return "done";
  if (stepIdx === currentIdx) return "active";
  // If project progress is high enough, future steps may be "done" too
  if (project) {
    const threshold = (stepIdx / WORKFLOW_STEPS.length) * 100;
    if (project.projectProgress >= threshold) return "done";
  }
  return "future";
}

export function JourneyStepsBar({
  currentModule,
  project,
  onNavigate,
}: JourneyStepsBarProps) {
  const [hasHydrated, setHasHydrated] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setHasHydrated(true);
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const currentIdx = WORKFLOW_STEPS.findIndex((s) => s.id === currentModule);
  // Use null project during server side rendering and initial hydration to guarantee identical markup
  const activeProject = hasHydrated ? project : null;

  return (
    <div
      role="navigation"
      aria-label="Innovation journey steps"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        marginBottom: 24,
        overflowX: "auto",
        paddingBottom: 4,
      }}
      className="no-scrollbar"
    >
      {WORKFLOW_STEPS.map((step, idx) => {
        const status = getStepStatus(idx, currentIdx, activeProject);
        const isLast = idx === WORKFLOW_STEPS.length - 1;

        return (
          <React.Fragment key={step.id}>
            {/* Step node */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(step.id)}
              aria-label={`Navigate to ${step.label}`}
              aria-current={status === "active" ? "step" : undefined}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                padding: "8px 10px",
                borderRadius: 12,
                border:
                  status === "active"
                    ? "1px solid rgba(59,130,246,0.4)"
                    : "1px solid transparent",
                background:
                  status === "active" ? "rgba(59,130,246,0.08)" : "transparent",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all 200ms ease",
                minWidth: 72,
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  border:
                    status === "done"
                      ? "2px solid var(--emerald)"
                      : status === "active"
                        ? "2px solid var(--blue)"
                        : "2px solid var(--border)",
                  background:
                    status === "done"
                      ? "rgba(16,185,129,0.12)"
                      : status === "active"
                        ? "rgba(59,130,246,0.12)"
                        : "var(--bg-surface)",
                  boxShadow:
                    status === "active"
                      ? "0 0 12px rgba(59,130,246,0.35)"
                      : "none",
                  position: "relative",
                }}
              >
                {status === "done" ? (
                  <span style={{ fontSize: 12, color: "var(--emerald)" }}>
                    ✓
                  </span>
                ) : status === "active" ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        position: "absolute",
                        inset: -4,
                        borderRadius: "50%",
                        border: "2px solid var(--blue)",
                      }}
                    />
                    <span>{step.icon}</span>
                  </>
                ) : (
                  <span style={{ opacity: 0.4 }}>{step.icon}</span>
                )}
              </div>

              {/* Label */}
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color:
                    status === "done"
                      ? "var(--emerald)"
                      : status === "active"
                        ? "var(--blue)"
                        : "var(--text-tertiary)",
                  textAlign: "center",
                  lineHeight: 1.2,
                  maxWidth: 64,
                }}
              >
                {step.label}
              </span>
            </motion.button>

            {/* Connector line */}
            {!isLast && (
              <div
                aria-hidden="true"
                style={{
                  height: 2,
                  width: 20,
                  flexShrink: 0,
                  borderRadius: 99,
                  background:
                    getStepStatus(idx, currentIdx, activeProject) === "done"
                      ? "var(--emerald)"
                      : "var(--border)",
                  opacity:
                    getStepStatus(idx, currentIdx, activeProject) === "done"
                      ? 0.6
                      : 0.3,
                  marginTop: -16, // align with circle center
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

"use client";

import React, { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InnovationProject, ProjectStage } from "../../types/innovation";
import { WorkflowModule } from "./WorkflowBanner";

interface QuickAction {
  icon: string;
  label: string;
  color: string;
  onClick: () => void;
}

interface QuickActionsBarProps {
  project: InnovationProject | null;
  onNavigate: (module: WorkflowModule) => void;
  onOpenMentor: () => void;
  onOpenCoach: () => void;
  onOpenExport: () => void;
  onOpenCouncil: () => void;
}

const STAGE_ACTIONS: Record<
  ProjectStage,
  (cb: QuickActionsBarProps) => QuickAction[]
> = {
  Ideation: (cb) => [
    {
      icon: "💡",
      label: "Generate Ideas",
      color: "var(--blue)",
      onClick: cb.onOpenCoach,
    },
    {
      icon: "🥊",
      label: "Challenge My Idea",
      color: "var(--violet)",
      onClick: cb.onOpenMentor,
    },
    {
      icon: "🔍",
      label: "Research Solutions",
      color: "var(--cyan)",
      onClick: () => cb.onNavigate("discovery"),
    },
    {
      icon: "🌍",
      label: "SDG Alignment",
      color: "var(--emerald)",
      onClick: () => cb.onNavigate("impact"),
    },
  ],
  Prototyping: (cb) => [
    {
      icon: "📊",
      label: "Impact Prediction",
      color: "var(--cyan)",
      onClick: () => cb.onNavigate("impact"),
    },
    {
      icon: "🤖",
      label: "AI Review",
      color: "var(--blue)",
      onClick: cb.onOpenMentor,
    },
    {
      icon: "🧪",
      label: "Generate Test Plan",
      color: "var(--violet)",
      onClick: cb.onOpenCoach,
    },
    {
      icon: "🌌",
      label: "Galaxy View",
      color: "var(--violet)",
      onClick: () => cb.onNavigate("galaxy"),
    },
  ],
  Validation: (cb) => [
    {
      icon: "🤖",
      label: "Council Verdict",
      color: "var(--blue)",
      onClick: cb.onOpenCouncil,
    },
    {
      icon: "📤",
      label: "Export Report",
      color: "var(--emerald)",
      onClick: cb.onOpenExport,
    },
    {
      icon: "🎤",
      label: "Prepare Pitch",
      color: "var(--violet)",
      onClick: cb.onOpenMentor,
    },
    {
      icon: "🌍",
      label: "Impact Analysis",
      color: "var(--cyan)",
      onClick: () => cb.onNavigate("impact"),
    },
  ],
  Scaling: (cb) => [
    {
      icon: "📤",
      label: "Export",
      color: "var(--emerald)",
      onClick: cb.onOpenExport,
    },
    {
      icon: "🎬",
      label: "Launch Demo",
      color: "var(--blue)",
      onClick: () => cb.onNavigate("dashboard"),
    },
    {
      icon: "📊",
      label: "Full Report",
      color: "var(--violet)",
      onClick: cb.onOpenExport,
    },
    {
      icon: "🚀",
      label: "Next Innovations",
      color: "var(--cyan)",
      onClick: () => cb.onNavigate("mentor"),
    },
  ],
};

export function QuickActionsBar({
  project,
  onNavigate,
  onOpenMentor,
  onOpenCoach,
  onOpenExport,
  onOpenCouncil,
}: QuickActionsBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((p) => !p), []);

  if (!project) return null;

  const stage = project.projectStage;
  const actions = STAGE_ACTIONS[stage]({
    project,
    onNavigate,
    onOpenMentor,
    onOpenCoach,
    onOpenExport,
    onOpenCouncil,
  });

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 10,
      }}
    >
      {/* Action buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              alignItems: "flex-end",
            }}
          >
            {/* Stage label */}
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-tertiary)",
                padding: "4px 10px",
              }}
            >
              {stage} Quick Actions
            </div>

            {actions.map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.04, x: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                aria-label={action.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  borderRadius: 12,
                  border: `1px solid ${action.color}33`,
                  background: `rgba(5,5,5,0.9)`,
                  backdropFilter: "blur(16px)",
                  color: "var(--text-primary)",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px ${action.color}22`,
                  transition: "all 200ms ease",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    background: `${action.color}15`,
                  }}
                >
                  {action.icon}
                </span>
                {action.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB trigger */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={toggle}
        aria-label={isOpen ? "Close quick actions" : "Open quick actions"}
        aria-expanded={isOpen}
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "none",
          background: isOpen
            ? "linear-gradient(135deg, var(--violet) 0%, var(--blue) 100%)"
            : "linear-gradient(135deg, var(--blue) 0%, var(--cyan) 100%)",
          color: "#fff",
          fontSize: 22,
          cursor: "pointer",
          boxShadow: `0 8px 32px rgba(59,130,246,0.4), 0 0 0 1px rgba(255,255,255,0.08)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 250ms ease",
        }}
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: "block", lineHeight: 1 }}
        >
          ⚡
        </motion.span>
      </motion.button>
    </div>
  );
}

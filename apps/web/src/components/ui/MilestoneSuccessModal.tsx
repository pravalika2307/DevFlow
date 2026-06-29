"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InnovationProject } from "../../types/innovation";

export type MilestoneTrigger =
  | "first_project"
  | "council_complete"
  | "project_complete"
  | "report_exported"
  | "first_mentor";

interface MilestoneConfig {
  icon: string;
  title: string;
  subtitle: string;
  badge: string;
  cta: string;
  color: string;
}

const MILESTONE_CONFIG: Record<MilestoneTrigger, MilestoneConfig> = {
  first_project: {
    icon: "🚀",
    title: "Your Innovation Journey Begins",
    subtitle:
      "Your first project is live. NOVA is ready to guide you through every step — from problem discovery to Samsung-ready presentation.",
    badge: "Pioneer",
    cta: "Start with Problem Discovery →",
    color: "var(--blue)",
  },
  council_complete: {
    icon: "🤖",
    title: "NOVA Council Review Complete",
    subtitle:
      "8 AI experts have evaluated every dimension of your innovation. Review their consensus verdict and recommendations.",
    badge: "Evaluated",
    cta: "View Council Verdict →",
    color: "var(--violet)",
  },
  project_complete: {
    icon: "🏆",
    title: "Presentation Ready",
    subtitle:
      "Your innovation has reached 100% completion. You're ready for the Samsung Solve for Tomorrow stage. Generate your final report.",
    badge: "Samsung Ready",
    cta: "Generate Report & Present →",
    color: "var(--emerald)",
  },
  report_exported: {
    icon: "📤",
    title: "Report Exported Successfully",
    subtitle:
      "Your innovation report is ready. Share it with judges, mentors, or investors to amplify your impact.",
    badge: "Exported",
    cta: "Back to Workspace →",
    color: "var(--cyan)",
  },
  first_mentor: {
    icon: "✦",
    title: "NOVA Mentor Activated",
    subtitle:
      "NOVA has analyzed your project and is ready to coach you. Ask for risks, improvements, a pitch, or your next steps.",
    badge: "AI Coaching Active",
    cta: "Ask NOVA Now →",
    color: "var(--blue)",
  },
};

// Stable particle offsets — computed once at module load (not during render)
const PARTICLE_OFFSETS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 360;
  // Use a deterministic pseudo-random distance based on index
  const distance = 80 + ((i * 37 + 17) % 60);
  return {
    x: Math.cos((angle * Math.PI) / 180) * distance,
    y: Math.sin((angle * Math.PI) / 180) * distance,
  };
});

// Particle component
function Particles({ color }: { color: string }) {
  const particles = useMemo(() => PARTICLE_OFFSETS, []);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3 }}
          transition={{
            duration: 1.2,
            delay: i * 0.05,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      ))}
    </div>
  );
}

interface MilestoneSuccessModalProps {
  trigger: MilestoneTrigger | null;
  project: InnovationProject | null;
  onClose: () => void;
  onCTA: () => void;
}

export function MilestoneSuccessModal({
  trigger,
  project,
  onClose,
  onCTA,
}: MilestoneSuccessModalProps) {
  const isOpen = trigger !== null;
  const config = trigger ? MILESTONE_CONFIG[trigger] : null;
  const dismissRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  // Auto-focus the primary CTA button when the modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        ctaRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape key & Focus Trap
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab") {
        const focused = document.activeElement;
        if (e.shiftKey) {
          if (focused === dismissRef.current) {
            e.preventDefault();
            ctaRef.current?.focus();
          }
        } else {
          if (focused === ctaRef.current) {
            e.preventDefault();
            dismissRef.current?.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && config && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              zIndex: 1000,
            }}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="milestone-title"
            initial={{ opacity: 0, scale: 0.85, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1001,
              width: "min(480px, 92vw)",
              borderRadius: 24,
              border: `1px solid ${config.color}33`,
              background: "var(--bg-card)",
              boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${config.color}15`,
              overflow: "hidden",
            }}
          >
            {/* Top accent bar */}
            <div
              style={{
                height: 4,
                background: `linear-gradient(90deg, ${config.color} 0%, transparent 100%)`,
              }}
            />

            <div
              style={{
                padding: "36px 32px 28px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                textAlign: "center",
                position: "relative",
              }}
            >
              {/* Particle burst origin */}
              <div style={{ position: "relative", width: 80, height: 80 }}>
                <Particles color={config.color} />

                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                    delay: 0.1,
                  }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 24,
                    background: `linear-gradient(135deg, ${config.color}22 0%, ${config.color}0a 100%)`,
                    border: `2px solid ${config.color}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 36,
                    boxShadow: `0 0 40px ${config.color}30`,
                  }}
                >
                  {config.icon}
                </motion.div>
              </div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span
                  className="df-badge"
                  style={{
                    background: `${config.color}15`,
                    border: `1px solid ${config.color}40`,
                    color: config.color,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  ✦ {config.badge}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                id="milestone-title"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{
                  fontSize: 22,
                  fontWeight: 900,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {config.title}
              </motion.h2>

              {project && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    fontSize: 12,
                    color: "var(--blue)",
                    fontWeight: 700,
                    margin: 0,
                  }}
                >
                  {project.name}
                </motion.p>
              )}

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                style={{
                  fontSize: 13.5,
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: 360,
                }}
              >
                {config.subtitle}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 4,
                  width: "100%",
                }}
              >
                <button
                  ref={dismissRef}
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-secondary)",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Dismiss
                </button>
                <motion.button
                  ref={ctaRef}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    onCTA();
                    onClose();
                  }}
                  style={{
                    flex: 2,
                    padding: "10px 16px",
                    borderRadius: 12,
                    border: "none",
                    background: `linear-gradient(135deg, ${config.color} 0%, ${config.color}bb 100%)`,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: `0 4px 16px ${config.color}44`,
                  }}
                >
                  {config.cta}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

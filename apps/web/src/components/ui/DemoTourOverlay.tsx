"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InnovationProject } from "../../types/innovation";

export type TourType = "general" | "samsung";

interface TourStep {
  title: string;
  description: string;
  targetId?: string;
  actionLabel?: string;
  setupEffect?: () => void;
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
  type,
  project,
  onClose,
  onNavigate,
}: DemoTourOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: TourStep[] = useMemo(
    () =>
      type === "samsung"
        ? [
            {
              title: "Welcome to DevFlow OS ✦",
              description:
                "DevFlow is an AI Innovation Operating System designed to guide teams from empathy-driven problem discovery to presentation-ready Samsung Solve for Tomorrow submissions.",
              actionLabel: "Start Guided Tour",
              setupEffect: () => onNavigate("dashboard"),
            },
            {
              title: "Step 1: Define the Challenge",
              description: `Every project starts in the Innovation Workspace. Here, we track core parameters for "${
                project?.name || "Smart Waste Management"
              }" with progress levels, engineering metrics, and priorities.`,
              actionLabel: "Analyze Root Causes",
              setupEffect: () => onNavigate("dashboard"),
            },
            {
              title: "Step 2: Problem Discovery",
              description:
                "In Problem Discovery, teams run structured tools like the 5 Whys, root cause analysis categorizations, and stakeholder confidence scores before jumping to any coding.",
              actionLabel: "Enter Design Thinking",
              setupEffect: () => onNavigate("discovery"),
            },
            {
              title: "Step 3: Design Thinking Workspace",
              description:
                "Our interactive Design Thinking workspace models the double-diamond process: Empathise, Define, Ideate, Prototype, and Test. Live user personas and feedback loops keep designs human-centered.",
              actionLabel: "Consult AI Mentor",
              setupEffect: () => onNavigate("coach"),
            },
            {
              title: "Step 4: AI Innovation Mentor",
              description:
                "NOVA, the AI mentor, provides real-time coaching. It flags blind spots, estimates technical feasibility, calculates risk margins, and suggests SDG connection strategies.",
              actionLabel: "Launch Innovation Galaxy",
              setupEffect: () => onNavigate("dashboard"),
            },
            {
              title: "Step 5: Innovation Galaxy Map",
              description:
                "The Innovation Galaxy displays all of your projects orbiting the AI Core. Observe SDG colors, orbit levels representing stages, and visual connections between related solutions.",
              actionLabel: "Measure Global Impact",
              setupEffect: () => onNavigate("galaxy"),
            },
            {
              title: "Step 6: Impact Intelligence Matrix",
              description:
                "Judges seek evidence. Impact Intelligence maps target SDG alignments, runs predictive beneficiary growth charts, and profiles inclusivity risks.",
              actionLabel: "Consult the AI Council",
              setupEffect: () => onNavigate("impact"),
            },
            {
              title: "Step 7: NOVA Expert Council",
              description:
                "A team of 8 specialized AI agents (Tech Lead, SDG Ethicist, Financial Analyst, etc.) reviews the project's parameters and reaches a joint consensus verdict.",
              actionLabel: "Prepare Export Deliverables",
              setupEffect: () => onNavigate("council"),
            },
            {
              title: "Step 8: Reports & Exports",
              description:
                "Instantly compile a Samsung Solve for Tomorrow PDF containing the Empathy Map, SDG metrics, and the full AI Council Consensus matrix.",
              actionLabel: "Open Presentation Deck",
              setupEffect: () => onNavigate("reports"),
            },
            {
              title: "Demo Day Ready! 🏆",
              description:
                "Pitch DevFlow's top innovation to judges using our built-in high-contrast Presentation Slide Deck overlay.",
              actionLabel: "Start Presentation",
              setupEffect: () => onNavigate("slides"),
            },
          ]
        : [
            {
              title: "Welcome to DevFlow OS",
              description:
                "Let's take a quick 4-step tour of the primary controls to get you familiarized with the workspace.",
              actionLabel: "Next",
              setupEffect: () => onNavigate("dashboard"),
            },
            {
              title: "The Main Workspace",
              description:
                "Your dashboard acts as a flight deck. Create projects, inspect team metrics, and track progress rings.",
              actionLabel: "Next",
              setupEffect: () => onNavigate("dashboard"),
            },
            {
              title: "Innovation Galaxy Map",
              description:
                "Visualizes all active projects orbiting a central AI star. Stages correspond to orbital distances.",
              actionLabel: "Next",
              setupEffect: () => onNavigate("galaxy"),
            },
            {
              title: "NOVA Expert Council",
              description:
                "Evaluate your readiness with an automated panel of multi-agent AI judges scoring your work.",
              actionLabel: "Finish Tour",
              setupEffect: () => onNavigate("council"),
            },
          ],
    [type, project, onNavigate],
  );

  useEffect(() => {
    if (isOpen && steps[currentStep]?.setupEffect) {
      steps[currentStep].setupEffect?.();
    }
  }, [currentStep, isOpen, steps]);

  if (!isOpen) return null;

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 999,
        }}
      >
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(6px)",
              pointerEvents: "auto",
              zIndex: 998,
            }}
          />
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 180 }}
          style={{
            position: "fixed",
            bottom: currentStep === 0 ? "40%" : 24,
            left: "50%",
            transform:
              currentStep === 0 ? "translate(-50%, -50%)" : "translateX(-50%)",
            width: "min(440px, 92vw)",
            borderRadius: 20,
            background: "rgba(10, 10, 10, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.8), 0 0 40px rgba(59,130,246,0.15)",
            pointerEvents: "auto",
            zIndex: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: 3,
              background:
                "linear-gradient(90deg, var(--blue) 0%, var(--violet) 100%)",
            }}
          />

          <div style={{ padding: "24px 24px 20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  color: "var(--blue)",
                  textTransform: "uppercase",
                }}
              >
                ✦{" "}
                {type === "samsung"
                  ? "SAMSUNG PRESENTATION TOUR"
                  : "WORKSPACE ONBOARDING"}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "var(--text-tertiary)",
                  fontWeight: 700,
                }}
              >
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            <h3
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "var(--text-primary)",
                margin: "0 0 8px",
              }}
            >
              {step?.title}
            </h3>

            <p
              style={{
                fontSize: 12.5,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                margin: "0 0 20px",
              }}
            >
              {step?.description}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 10,
              }}
            >
              <button
                onClick={onClose}
                style={{
                  padding: "8px 14px",
                  borderRadius: 10,
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--text-tertiary)",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Skip
              </button>

              <div style={{ display: "flex", gap: 8 }}>
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: 10,
                      background: "transparent",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => {
                    if (isLast) {
                      onClose();
                    } else {
                      setCurrentStep((prev) => prev + 1);
                    }
                  }}
                  style={{
                    padding: "8px 16px",
                    borderRadius: 10,
                    border: "none",
                    background: "var(--blue)",
                    color: "white",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
                  }}
                >
                  {isLast ? "Complete" : step?.actionLabel || "Next"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

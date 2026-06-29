"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InnovationProject } from "../../types/innovation";

interface NovaGuidanceBannerProps {
  module: "discovery" | "impact" | "council" | "coach" | "galaxy";
  project: InnovationProject | null;
  onNext?: () => void;
  nextLabel?: string;
}

const MODULE_GUIDANCE: Record<
  NovaGuidanceBannerProps["module"],
  {
    icon: string;
    headline: (p: InnovationProject | null) => string;
    body: (p: InnovationProject | null) => string;
    ctaLabel?: string;
  }
> = {
  discovery: {
    icon: "💡",
    headline: (p) =>
      p
        ? `Validating assumptions for ${p.name}`
        : "Start with Problem Discovery",
    body: (p) =>
      p
        ? `Your problem statement has ${p.innovationScores.problemClarity}% clarity. Run the 5 Whys exercise and gather at least 5 stakeholder interviews before moving to Design Thinking. Unvalidated assumptions are the #1 cause of failed innovations.`
        : "Define the real problem before designing a solution. Use the 5 Whys, stakeholder interviews, and root cause analysis to validate your assumptions.",
    ctaLabel: "Next: Design Thinking →",
  },
  impact: {
    icon: "🌍",
    headline: (p) =>
      p
        ? `Impact analysis for ${p.name}`
        : "Measure your innovation's reach",
    body: (p) =>
      p
        ? `${p.name} aligns with ${p.sdgGoals.length} SDG${p.sdgGoals.length !== 1 ? "s" : ""}. Social impact score: ${p.innovationScores.socialImpact}/100. To strengthen your Samsung submission, quantify your beneficiary reach with specific numbers — judges respond to evidence over estimates.`
        : "Use Impact Intelligence to map SDG alignment, predict beneficiary reach, and build the evidence base judges expect.",
    ctaLabel: "Next: NOVA Council →",
  },
  council: {
    icon: "🤖",
    headline: (p) =>
      p
        ? `Council evaluation ready for ${p.name}`
        : "Submit for multi-agent review",
    body: (p) =>
      p
        ? `NOVA Council evaluates ${p.name} across 8 expert dimensions. Current readiness: ${p.readinessScore}%. Recommendation: ${p.readinessScore >= 70 ? "Proceed with council review — your readiness score meets the threshold." : "Strengthen your readiness score to 70%+ before submitting to council for the strongest verdict."}`
        : "8 specialized AI agents evaluate every dimension of your innovation — feasibility, impact, scalability, ethics, and more.",
    ctaLabel: "Next: Reports & Export →",
  },
  coach: {
    icon: "🎯",
    headline: (p) =>
      p ? `Design Thinking: ${p.projectStage} phase` : "Build your solution",
    body: (p) =>
      p
        ? `Design Thinking progress: ${p.projectProgress}%. You have ${p.ideate?.length ?? 0} ideas in the ideation pool. ${p.projectProgress < 50 ? "Focus on completing the Empathise and Define stages before prototyping." : "You're past the halfway mark — prioritize prototype quality and user testing."}`
        : "Design Thinking guides you from deep empathy to testable prototypes. Follow the 5 stages: Empathise, Define, Ideate, Prototype, Test.",
    ctaLabel: "Next: AI Mentor →",
  },
  galaxy: {
    icon: "🌌",
    headline: (p) =>
      p
        ? `${p.name} in the Innovation Galaxy`
        : "Explore the Innovation Galaxy",
    body: () =>
      "The Innovation Galaxy maps all your projects as interconnected nodes. Explore connections, discover patterns, and see how your innovations relate to each other.",
    ctaLabel: "Next: Impact Intelligence →",
  },
};

export function NovaGuidanceBanner({
  module,
  project,
  onNext,
  nextLabel,
}: NovaGuidanceBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const config = MODULE_GUIDANCE[module];

  if (isDismissed) return null;

  const headline = config.headline(project);
  const body = config.body(project);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          margin: "0 0 16px 0",
          padding: "12px 16px",
          borderRadius: 12,
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.04) 100%)",
          border: "1px solid rgba(59,130,246,0.15)",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
        }}
        role="note"
        aria-label="NOVA guidance"
      >
        {/* Icon */}
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(59,130,246,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {config.icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--blue)",
              }}
            >
              ✦ NOVA Guidance
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {headline}
            </span>
          </div>
          <p
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            {body}
          </p>
          {onNext && (
            <button
              onClick={onNext}
              style={{
                marginTop: 8,
                fontSize: 11,
                fontWeight: 700,
                color: "var(--blue)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
                textDecorationStyle: "dotted",
              }}
            >
              {nextLabel ?? config.ctaLabel}
            </button>
          )}
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss NOVA guidance"
          style={{
            color: "var(--text-tertiary)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 14,
            padding: "2px 4px",
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          ×
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

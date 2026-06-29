"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InnovationProject } from "../../types/innovation";

// ── Types ──────────────────────────────────────────────────────────────

interface MentorMessage {
  id: string;
  role: "mentor" | "user";
  content: string;
  badges?: string[];
  confidence?: number;
  action?: string;
  timestamp: number;
}

type MentorAction =
  | "improve_idea"
  | "next_steps"
  | "find_risks"
  | "suggest_innovations"
  | "sdg_alignment"
  | "generate_pitch"
  | "challenge"
  | "ask";

type ThinkingPhase =
  | "Analyzing innovation scores..."
  | "Researching similar problems..."
  | "Comparing existing solutions..."
  | "Evaluating technical feasibility..."
  | "Building recommendations..."
  | "Assessing SDG alignment..."
  | "Identifying blind spots..."
  | "Generating insights...";

const THINKING_PHASES: ThinkingPhase[] = [
  "Analyzing innovation scores...",
  "Researching similar problems...",
  "Comparing existing solutions...",
  "Evaluating technical feasibility...",
  "Building recommendations...",
  "Assessing SDG alignment...",
  "Identifying blind spots...",
  "Generating insights...",
];

// ── Response generator ─────────────────────────────────────────────────

function generateMentorResponse(
  project: InnovationProject,
  action: MentorAction,
  userInput?: string,
): { content: string; badges: string[]; confidence: number } {
  const s = project.innovationScores;
  const avg = Math.round(
    (s.problemClarity +
      s.innovation +
      s.feasibility +
      s.socialImpact +
      s.aiReadiness +
      s.scalability +
      s.sustainability) /
      7,
  );
  const weakest = [
    { name: "Problem Clarity", val: s.problemClarity },
    { name: "Innovation Novelty", val: s.innovation },
    { name: "Technical Feasibility", val: s.feasibility },
    { name: "Social Impact", val: s.socialImpact },
    { name: "AI Readiness", val: s.aiReadiness },
    { name: "Scalability", val: s.scalability },
    { name: "Sustainability", val: s.sustainability },
  ].sort((a, b) => a.val - b.val)[0];
  const strongest = [
    { name: "Problem Clarity", val: s.problemClarity },
    { name: "Innovation Novelty", val: s.innovation },
    { name: "Technical Feasibility", val: s.feasibility },
    { name: "Social Impact", val: s.socialImpact },
  ].sort((a, b) => b.val - a.val)[0];

  switch (action) {
    case "improve_idea":
      return {
        content: `Your project "${project.name}" scores ${avg}/100 overall — a solid foundation. The biggest opportunity is ${weakest.name} at ${weakest.val}/100.\n\nTo strengthen it:\n\n1. Conduct 5+ additional stakeholder interviews with ${project.targetBeneficiaries} to sharpen problem framing.\n2. Consider integrating one breakthrough technology — IoT sensors, edge AI, or federated learning — to differentiate from existing solutions.\n3. Build a proof-of-concept prototype this sprint to validate your riskiest technical assumption before investing further.\n\nThe one change with the highest leverage: narrow your problem scope rather than broadening it. Precision beats breadth at every stage of innovation.`,
        badges: ["Improvement Roadmap", "Diagnostic", "Actionable"],
        confidence: 91,
      };

    case "next_steps": {
      const stageMap: Record<string, string> = {
        Ideation: `You're in the Ideation phase — the most creative stage. Your next moves:\n\n1. Validate the Problem: Conduct 10+ user interviews with ${
          project.targetBeneficiaries
        }. Don't fall in love with your solution yet.\n2. Competitive Audit: Map 5 existing solutions and identify what's missing.\n3. SDG Mapping: Your target SDGs are ${project.sdgGoals.join(
          ", ",
        )}. Quantify the impact gap.\n4. Rapid Sketching: Generate 20+ wild ideas then narrow to 3 strong candidates.\n5. Team Formation: Ensure coverage across UX, engineering, and domain expertise.`,
        Prototyping: `You're in Prototyping — momentum is critical. Your next moves:\n\n1. MVP Definition: Strip to the one core user journey. Cut everything else.\n2. Weekly Demo Cadence: Demo every Friday to 2–3 real users. Capture feedback systematically.\n3. Technical Debt Audit: With ${project.engineeringHealth}% engineering health, address critical blockers before adding features.\n4. Test Coverage: Push above 80% to ensure stability during rapid iteration.\n5. Define your pivot threshold now, before emotion clouds judgment.`,
        Validation: `You're in Validation — evidence is everything. Your next moves:\n\n1. Pilot Program: Deploy to a controlled group. Target 50+ active users from ${
          project.targetBeneficiaries
        }.\n2. Metrics Dashboard: Instrument every key interaction. Data drives every decision.\n3. Impact Measurement: Document outcomes mapping to ${
          project.sdgGoals[0] ?? "your primary SDG"
        }.\n4. Investor Narrative: Package your validation data into a 10-slide impact story.\n5. Partnership Pipeline: Identify 3 NGOs, government agencies, or corporates who could scale your solution.`,
        Scaling: `You're Scaling — execution discipline matters most. Your next moves:\n\n1. Unit Economics: Calculate cost-per-beneficiary and your path to sustainability.\n2. Geographic Expansion: Identify the next 3 markets with similar problem profiles.\n3. Automation: Systematize everything that doesn't require human judgment.\n4. Policy Engagement: Brief decision-makers on your impact data — policy change multiplies reach.\n5. Open Source Strategy: Release non-core components to build ecosystem credibility.`,
      };
      return {
        content:
          stageMap[project.projectStage] ??
          "Define your stage to unlock tailored next steps.",
        badges: [
          "Stage-Specific",
          "Action Plan",
          `${project.projectStage} Phase`,
        ],
        confidence: 94,
      };
    }

    case "find_risks": {
      const risks: string[] = [];
      if (s.feasibility < 70)
        risks.push(
          "Technical Risk: Feasibility score below 70. Prototype may encounter integration challenges with legacy infrastructure.",
        );
      if (s.scalability < 65)
        risks.push(
          "Scalability Risk: Current architecture may not handle 10x growth without significant re-engineering.",
        );
      if (s.sustainability < 60)
        risks.push(
          "Sustainability Risk: Long-term operation model is unclear. Define funding mechanism before launch.",
        );
      if (project.teamMembers.length < 3)
        risks.push(
          "Team Risk: Small team creates key-person dependency. Build an advisory board.",
        );
      if (s.problemClarity < 75)
        risks.push(
          "Market Risk: Problem definition needs sharper focus. A vague problem leads to a solution looking for a problem.",
        );
      if (risks.length === 0)
        risks.push(
          "Execution Risk: Your scores look strong, but the highest risk is always execution speed. Set aggressive milestones with accountability partners.",
        );
      return {
        content: `I found ${risks.length} risk${
          risks.length > 1 ? "s" : ""
        } that could derail your project:\n\n${risks
          .map((r, i) => `${i + 1}. ${r}`)
          .join(
            "\n\n",
          )}\n\nMy recommendation: Prioritize the top risk this sprint. Don't let it compound.`,
        badges: ["Risk Assessment", "Critical Analysis", "Mitigation"],
        confidence: 88,
      };
    }

    case "suggest_innovations":
      return {
        content: `Based on the ${project.innovationTheme} theme, here are breakthrough ideas worth exploring:\n\n1. Federated Learning Integration: Train models at the edge, protecting user privacy while improving accuracy.\n2. Digital Twin Simulation: Create a virtual model of the environment to test interventions before deployment.\n3. Community Sensor Networks: Low-cost IoT nodes deployed by the community, creating ownership and sustainability.\n4. Explainable AI Layer: Add transparency to AI decisions — critical for trust in high-stakes domains.\n5. Gamification Engine: Drive behavior change through achievement systems tailored to your beneficiary culture.\n\nMost differentiated path: Combine ideas 1 and 3. Federated edge networks owned by communities is genuinely novel with massive SDG potential.`,
        badges: ["Innovation Synthesis", "Breakthrough Ideas", "SDG-Aligned"],
        confidence: 86,
      };

    case "sdg_alignment": {
      const sdgs = project.sdgGoals;
      const sdgLines =
        sdgs.length > 0
          ? sdgs
              .map(
                (s) =>
                  `• ${s}: Directly addressed through your solution approach.`,
              )
              .join("\n")
          : "• No SDGs currently defined — add them in your project settings.";
      return {
        content: `Your project maps to: ${
          sdgs.length > 0 ? sdgs.join(", ") : "no SDGs defined"
        }.\n\nDeep analysis:\n\nDirect Impact:\n${sdgLines}\n\nHidden Connections:\n• SDG 17 (Partnerships): Your solution requires multi-stakeholder collaboration — document this explicitly.\n• SDG 10 (Reduced Inequalities): If ${
          project.targetBeneficiaries
        } includes underserved groups, this applies strongly.\n• SDG 9 (Innovation): Your technical work directly supports infrastructure development.\n\nRecommendation: Quantify your SDG impact. "We will reduce X by Y% for Z people by [date]" is 10x more compelling than vague alignment claims. Samsung judges will ask for numbers.`,
        badges: ["SDG Mapping", "Impact Quantification", "Samsung-Ready"],
        confidence: 93,
      };
    }

    case "generate_pitch":
      return {
        content: `Your 60-second Samsung elevator pitch:\n\n---\n\n"Every year, millions face [${project.problemStatement.slice(
          0,
          80,
        )}]... and existing solutions have failed because they lack [key gap].\n\n${
          project.name
        } is an AI-powered platform that [${project.proposedSolution.slice(
          0,
          100,
        )}]. We use intelligent automation to deliver measurable outcomes for ${
          project.targetBeneficiaries
        }.\n\nIn ${
          project.timeline
        }, we will validate with real users and demonstrate impact on ${
          project.sdgGoals[0] ?? "our primary SDG"
        }. Our solution reaches an estimated [X] beneficiaries at [Y] cost.\n\nWe're not just building software. We're building a system that scales without us."\n\n---\n\nPolish tips: Lead with the human story. End with the multiplier effect. Practice until it's under 55 seconds — judges remember brevity.`,
        badges: ["Pitch Generation", "Samsung-Ready", "Presentation"],
        confidence: 89,
      };

    case "challenge":
      return {
        content: `Let me play devil's advocate on ${project.name} — the strongest ideas survive tough questioning:\n\n1. Why hasn't this been solved? If this problem is so important, what stopped others? "No one thought of it" is never true.\n\n2. What's your unfair advantage? What do you know that a well-funded team wouldn't? Domain access, community trust, proprietary data?\n\n3. What happens if it works? At 100x scale, does your solution create new problems? Think second-order effects.\n\n4. Who loses if you win? Every innovation disrupts an incumbent. That incumbent may fight back. Have you planned for resistance?\n\n5. The sustainability test: Remove all grant funding. Remove all volunteer time. Does this still run in 5 years?\n\nAnswer these before a Samsung judge asks them. The best innovators defend every assumption.`,
        badges: ["Critical Thinking", "Devil's Advocate", "Pressure Test"],
        confidence: 97,
      };

    case "ask":
    default: {
      const query = userInput?.toLowerCase() ?? "";
      if (query.includes("sdg") || query.includes("impact")) {
        return {
          content: `Great question about SDG alignment. Your project connects most strongly to ${
            project.sdgGoals[0] ?? "your defined SDGs"
          }. To maximize impact, quantify beneficiary reach in concrete terms — judges respond to specific numbers far more than estimates. What specific impact metric would you like to define?`,
          badges: ["SDG Analysis", "Impact Metrics"],
          confidence: 90,
        };
      }
      if (query.includes("tech") || query.includes("feasib")) {
        return {
          content: `Technical feasibility is at ${s.feasibility}/100. The main concern is whether your infrastructure handles real-world load. I recommend building a stress-testing framework in your next sprint and defining explicit performance SLAs. What's the expected concurrent user count at launch?`,
          badges: ["Technical Analysis", "Feasibility"],
          confidence: 87,
        };
      }
      return {
        content: `I've analyzed "${project.name}" across all dimensions. Overall score: ${avg}/100.\n\nYour strongest dimension is ${strongest.name}. Your biggest opportunity is ${weakest.name} at ${weakest.val}/100.\n\nMy honest assessment: this idea has real merit, but it needs sharper execution focus. The gap between a good idea and an award-winning innovation is always in the details. Use the action buttons to dive deeper — I'm here to help you build something remarkable.`,
        badges: ["Overview", "Holistic Analysis"],
        confidence: 85,
      };
    }
  }
}

// ── ThinkingIndicator ──────────────────────────────────────────────────

function ThinkingIndicator({ phase }: { phase: ThinkingPhase }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 18px",
        background:
          "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.06) 100%)",
        border: "1px solid rgba(59,130,246,0.15)",
        borderRadius: 14,
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            style={{
              display: "block",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "var(--blue)",
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: "var(--text-secondary)",
        }}
      >
        NOVA •{" "}
        <motion.span
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ color: "var(--blue)", fontStyle: "italic" }}
        >
          {phase}
        </motion.span>
      </span>
    </motion.div>
  );
}

// ── ConfidenceBar ──────────────────────────────────────────────────────

function ConfidenceBar({ value }: { value: number }) {
  const color =
    value >= 90
      ? "var(--emerald)"
      : value >= 75
        ? "var(--blue)"
        : "var(--amber)";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--text-tertiary)",
          flexShrink: 0,
        }}
      >
        Confidence
      </span>
      <div
        style={{
          flex: 1,
          height: 3,
          borderRadius: 99,
          background: "var(--bg-surface)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "100%", borderRadius: 99, background: color }}
        />
      </div>
      <span
        style={{
          fontSize: 10,
          fontWeight: 700,
          color,
          flexShrink: 0,
          minWidth: 28,
          textAlign: "right",
        }}
      >
        {value}%
      </span>
    </div>
  );
}

// ── TypewriterText ─────────────────────────────────────────────────────

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    const newText = text;
    idx.current = 0;
    // Schedule resets asynchronously to avoid synchronous setState in effect
    const reset = setTimeout(() => {
      setDisplayed("");
      setDone(false);
    }, 0);
    const interval = setInterval(() => {
      if (idx.current >= newText.length) {
        setDone(true);
        clearInterval(interval);
        return;
      }
      const chunk = Math.min(4, newText.length - idx.current);
      setDisplayed(
        (prev) => prev + newText.slice(idx.current, idx.current + chunk),
      );
      idx.current += chunk;
    }, 12);
    return () => {
      clearTimeout(reset);
      clearInterval(interval);
    };
  }, [text]);

  return (
    <span>
      {displayed}
      {!done && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            background: "var(--blue)",
            marginLeft: 2,
            verticalAlign: "middle",
            borderRadius: 1,
          }}
        />
      )}
    </span>
  );
}

// ── MessageCard ────────────────────────────────────────────────────────

function MentorMessageCard({
  message,
  isLatest,
}: {
  message: MentorMessage;
  isLatest: boolean;
}) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: 12,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          background: isUser
            ? "linear-gradient(135deg, var(--violet), var(--blue))"
            : "linear-gradient(135deg, var(--blue), var(--cyan))",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: isUser
            ? "0 0 12px rgba(139,92,246,0.25)"
            : "0 0 12px rgba(59,130,246,0.25)",
        }}
      >
        {isUser ? "👤" : "✦"}
      </div>

      <div style={{ maxWidth: "80%", minWidth: 120 }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-tertiary)",
            marginBottom: 6,
            textAlign: isUser ? "right" : "left",
          }}
        >
          {isUser ? "You" : "NOVA Mentor"}
        </p>
        <div
          style={{
            padding: "14px 16px",
            borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
            background: isUser
              ? "linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(59,130,246,0.12) 100%)"
              : "var(--bg-elevated)",
            border: isUser
              ? "1px solid rgba(139,92,246,0.2)"
              : "1px solid var(--border-accent)",
            boxShadow: isUser ? "none" : "0 2px 12px rgba(0,0,0,0.2)",
          }}
        >
          <p
            style={{
              fontSize: 13.5,
              lineHeight: 1.65,
              color: "var(--text-primary)",
              whiteSpace: "pre-wrap",
              margin: 0,
            }}
          >
            {isLatest && !isUser ? (
              <TypewriterText text={message.content} />
            ) : (
              message.content
            )}
          </p>
          {!isUser && message.badges && message.badges.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 12,
              }}
            >
              {message.badges.map((b) => (
                <span
                  key={b}
                  className="df-badge df-badge-blue"
                  style={{ fontSize: 10 }}
                >
                  {b}
                </span>
              ))}
            </div>
          )}
          {!isUser && message.confidence !== undefined && (
            <div style={{ marginTop: 12 }}>
              <ConfidenceBar value={message.confidence} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── ActionBtn ──────────────────────────────────────────────────────────

interface ActionBtnProps {
  icon: string;
  label: string;
  sub?: string;
  color: string;
  onClick: () => void;
  disabled?: boolean;
}

function ActionBtn({
  icon,
  label,
  sub,
  color,
  onClick,
  disabled,
  "data-action-id": actionId,
}: ActionBtnProps & { "data-action-id"?: string }) {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      data-action-id={actionId}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 2,
        padding: "10px 14px",
        borderRadius: 12,
        border: `1px solid ${color}33`,
        background: `${color}0d`,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 200ms ease",
        textAlign: "left",
        flex: "1 1 0px",
        minWidth: 100,
      }}
    >
      <span style={{ fontSize: 16, lineHeight: 1 }}>{icon}</span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "var(--text-primary)",
          lineHeight: 1.2,
          marginTop: 4,
        }}
      >
        {label}
      </span>
      {sub && (
        <span
          style={{
            fontSize: 10,
            color: "var(--text-tertiary)",
            fontWeight: 500,
          }}
        >
          {sub}
        </span>
      )}
    </motion.button>
  );
}

// ── AIMentorPanel (main) ───────────────────────────────────────────────

const ACTIONS: {
  id: MentorAction;
  icon: string;
  label: string;
  sub: string;
  color: string;
}[] = [
  {
    id: "improve_idea",
    icon: "💡",
    label: "Improve Idea",
    sub: "Score analysis",
    color: "var(--blue)",
  },
  {
    id: "next_steps",
    icon: "🗺️",
    label: "Next Steps",
    sub: "Stage roadmap",
    color: "var(--emerald)",
  },
  {
    id: "find_risks",
    icon: "⚠️",
    label: "Find Risks",
    sub: "Risk audit",
    color: "var(--amber)",
  },
  {
    id: "suggest_innovations",
    icon: "🚀",
    label: "Innovations",
    sub: "Breakthroughs",
    color: "var(--violet)",
  },
  {
    id: "sdg_alignment",
    icon: "🌍",
    label: "SDG Alignment",
    sub: "Impact mapping",
    color: "var(--cyan)",
  },
  {
    id: "generate_pitch",
    icon: "🎤",
    label: "Generate Pitch",
    sub: "60-sec elevator",
    color: "var(--blue)",
  },
  {
    id: "challenge",
    icon: "🥊",
    label: "Challenge Idea",
    sub: "Devil's advocate",
    color: "var(--rose)",
  },
];

interface AIMentorPanelProps {
  project: InnovationProject | null;
}

export function AIMentorPanel({ project }: AIMentorPanelProps) {
  const [messages, setMessages] = useState<MentorMessage[]>([]);
  const [thinking, setThinking] = useState(false);
  const [thinkingPhase, setThinkingPhase] = useState<ThinkingPhase>(
    THINKING_PHASES[0],
  );
  const [userInput, setUserInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const phaseTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Greet on project change — use setTimeout to avoid synchronous setState in effect
  useEffect(() => {
    if (!project) return;
    const s = project.innovationScores;
    const avg = Math.round(
      (s.problemClarity + s.innovation + s.feasibility + s.socialImpact) / 4,
    );
    const name = project.name;
    const timer = setTimeout(() => {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "mentor",
          content: `Hello! I'm NOVA, your AI Innovation Mentor. I've analyzed ${name} and I'm ready to help you build something extraordinary.\n\nYour core innovation readiness sits at ${avg}/100 — a strong start. Use the action buttons below to get tailored coaching, or ask me anything about your project.`,
          badges: ["Welcome", "Project Overview"],
          confidence: 98,
          action: "ask",
          timestamp: Date.now(),
        },
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }, [project]);

  // Scroll to bottom on new messages or thinking state change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const startThinkingAnimation = useCallback(() => {
    let i = 0;
    phaseTimer.current = setInterval(() => {
      i = (i + 1) % THINKING_PHASES.length;
      setThinkingPhase(THINKING_PHASES[i]);
    }, 750);
  }, []);

  const stopThinkingAnimation = useCallback(() => {
    if (phaseTimer.current) {
      clearInterval(phaseTimer.current);
      phaseTimer.current = null;
    }
  }, []);

  const triggerAction = useCallback(
    (action: MentorAction, input?: string) => {
      if (!project || thinking) return;

      if (action === "ask" && input?.trim()) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "user",
            content: input.trim(),
            timestamp: Date.now(),
          },
        ]);
        setUserInput("");
      }

      setThinking(true);
      setThinkingPhase(THINKING_PHASES[0]);
      startThinkingAnimation();

      const delay = 1800 + Math.random() * 1200;
      setTimeout(() => {
        stopThinkingAnimation();
        setThinking(false);
        const resp = generateMentorResponse(project, action, input);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "mentor",
            content: resp.content,
            badges: resp.badges,
            confidence: resp.confidence,
            action,
            timestamp: Date.now(),
          },
        ]);
      }, delay);
    },
    [project, thinking, startThinkingAnimation, stopThinkingAnimation],
  );

  const handleAsk = useCallback(() => {
    if (!userInput.trim()) return;
    triggerAction("ask", userInput);
  }, [userInput, triggerAction]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleAsk();
      }
    },
    [handleAsk],
  );

  const clearConversation = useCallback(() => {
    if (!project) return;
    setMessages([
      {
        id: crypto.randomUUID(),
        role: "mentor",
        content: `Ready to continue coaching on ${project.name}. What would you like to explore?`,
        badges: ["New Session"],
        confidence: 99,
        action: "ask",
        timestamp: Date.now(),
      },
    ]);
  }, [project]);

  if (!project) {
    return (
      <section aria-label="AI Innovation Mentor" style={{ marginBottom: 28 }}>
        <div
          style={{
            padding: "36px 28px",
            borderRadius: 20,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 18,
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(6,182,212,0.1) 100%)",
              border: "1px solid rgba(59,130,246,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            ✦
          </div>
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            NOVA AI Mentor
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              margin: 0,
              maxWidth: 340,
            }}
          >
            Select an innovation project to unlock personalized AI coaching,
            risk analysis, and next-step recommendations.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="AI Innovation Mentor" style={{ marginBottom: 28 }}>
      <div
        style={{
          borderRadius: 20,
          border: "1px solid rgba(59,130,246,0.2)",
          background: "var(--bg-card)",
          overflow: "hidden",
          boxShadow:
            "0 0 0 1px rgba(59,130,246,0.06), 0 8px 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(139,92,246,0.04) 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 8px rgba(59,130,246,0.3)",
                  "0 0 20px rgba(59,130,246,0.5)",
                  "0 0 8px rgba(59,130,246,0.3)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, var(--blue) 0%, var(--cyan) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                color: "#fff",
                flexShrink: 0,
                fontWeight: 900,
              }}
            >
              ✦
            </motion.div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  NOVA Innovation Mentor
                </span>
                <span
                  className="df-badge df-badge-emerald"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 9,
                  }}
                >
                  <span
                    className="df-live-dot"
                    style={{ width: 5, height: 5 }}
                    aria-hidden="true"
                  />
                  Active
                </span>
              </div>
              <p
                style={{
                  fontSize: 11,
                  color: "var(--text-tertiary)",
                  margin: 0,
                  fontWeight: 500,
                }}
              >
                Coaching on{" "}
                <span style={{ color: "var(--blue)" }}>{project.name}</span>
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={clearConversation}
              aria-label="Clear conversation"
              style={{
                padding: "5px 10px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-tertiary)",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Clear
            </button>
            <button
              onClick={() => setIsExpanded((p) => !p)}
              aria-label={
                isExpanded ? "Collapse mentor panel" : "Expand mentor panel"
              }
              style={{
                padding: "5px 10px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "transparent",
                color: "var(--text-secondary)",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {isExpanded ? "▲ Collapse" : "▼ Expand"}
            </button>
          </div>
        </div>

        {/* Collapsible body */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="mentor-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              {/* Conversation */}
              <div
                ref={scrollRef}
                style={{
                  maxHeight: 440,
                  overflowY: "auto",
                  padding: "20px 20px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  scrollBehavior: "smooth",
                }}
                className="no-scrollbar"
                aria-live="polite"
                aria-label="Mentor conversation"
              >
                {messages.map((msg, idx) => (
                  <MentorMessageCard
                    key={msg.id}
                    message={msg}
                    isLatest={
                      idx === messages.length - 1 && msg.role === "mentor"
                    }
                  />
                ))}
                <AnimatePresence>
                  {thinking && (
                    <ThinkingIndicator key="thinking" phase={thinkingPhase} />
                  )}
                </AnimatePresence>
              </div>

              {/* Action buttons */}
              <div
                style={{
                  padding: "12px 20px",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {ACTIONS.map((a) => (
                  <ActionBtn
                    key={a.id}
                    icon={a.icon}
                    label={a.label}
                    sub={a.sub}
                    color={a.color}
                    onClick={() => triggerAction(a.id)}
                    disabled={thinking}
                    data-action-id={a.id}
                  />
                ))}
              </div>

              {/* Text input */}
              <div
                style={{
                  padding: "12px 20px 20px",
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-end",
                }}
              >
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask NOVA anything about your project… (Enter to send)"
                  disabled={thinking}
                  rows={2}
                  aria-label="Ask NOVA a question"
                  style={{
                    flex: 1,
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "1px solid var(--border-accent)",
                    background: "var(--bg-surface)",
                    color: "var(--text-primary)",
                    fontSize: 13,
                    fontFamily: "inherit",
                    lineHeight: 1.5,
                    resize: "none",
                    outline: "none",
                    transition: "border-color 150ms ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "rgba(59,130,246,0.4)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border-accent)";
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAsk}
                  disabled={thinking || !userInput.trim()}
                  aria-label="Send message to NOVA"
                  style={{
                    padding: "10px 18px",
                    borderRadius: 12,
                    border: "none",
                    background:
                      userInput.trim() && !thinking
                        ? "linear-gradient(135deg, var(--blue) 0%, var(--cyan) 100%)"
                        : "var(--bg-surface)",
                    color:
                      userInput.trim() && !thinking
                        ? "#fff"
                        : "var(--text-tertiary)",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor:
                      userInput.trim() && !thinking ? "pointer" : "not-allowed",
                    transition: "all 200ms ease",
                    flexShrink: 0,
                    height: 66,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {thinking ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ◌
                    </motion.span>
                  ) : (
                    "Ask ✦"
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

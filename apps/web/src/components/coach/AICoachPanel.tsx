import React, { useState } from "react";
import { InnovationProject } from "../../types/innovation";

interface AICoachPanelProps {
  project: InnovationProject;
  activeStage:
    | "empathise"
    | "define"
    | "ideate"
    | "prototype"
    | "test"
    | "dashboard";
}

interface Message {
  sender: "coach" | "user";
  text: string;
}

// Helper: Get initial contextual prompt based on stage
const getContextualGreeting = (stage: string, name: string) => {
  switch (stage) {
    case "empathise":
      return `Hello! I am your AI Design Thinking Coach. I am reviewing the Empathy phase of "${name}". Make sure you list specific pains and behaviors to construct a deep user persona. Click any prompt below to audit your empathy inputs!`;
    case "define":
      return `Welcome to the Define phase. For "${name}", we need to hone in on a single, clear Problem Statement and construct a strong "How Might We" question. Click a prompt below to audit your clarity!`;
    case "ideate":
      return `Let's brainstorm! Ideation for "${name}" should focus on multiple diverse solutions. Ensure you select the best fit as your core solution. Select a prompt below to evaluate novelty!`;
    case "prototype":
      return `You are in the Prototype stage. I see you are tracking versions for "${name}". We want to focus on high-fidelity user workflows. Click below to test accessibility or verify Figma parameters.`;
    case "test":
      return `Welcome to User Testing. Let's record feedback for "${name}" chronologically. It's critical to identify what worked and what lessons were learned. Select a prompt to review.`;
    default:
      return `Reviewing your Overall Innovation Score Dashboard. Let's look at the 7 dimensions of readiness to see how "${name}" can scale!`;
  }
};

export function AICoachPanel({ project, activeStage }: AICoachPanelProps) {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      sender: "coach",
      text: getContextualGreeting(activeStage, project.name),
    },
  ]);

  const handlePromptClick = (prompt: string) => {
    let responseText = "";

    // Generate responses based on prompt and active stage content
    if (prompt.includes("problem statement is too broad")) {
      responseText = `Reviewing your Define stage. Your current problem statement: "${project.define.problemStatement}". Coach Tip: Specify the exact geographical context or community (e.g. Satkhira coastal village). Avoid generalities like 'coastal NGO operation zones'.`;
    } else if (prompt.includes("specific beneficiary")) {
      responseText = `Empathy Audit: Your current target user is "${project.empathise.targetUser}". Coach Tip: Focus on a single persona representative (e.g. Ramesh, age 12, or Fatima, mother of four). This ensures you design features specifically addressing their daily workflows instead of trying to satisfy too broad a demographic.`;
    } else if (prompt.includes("accessibility")) {
      responseText = `Accessibility Audit: When prototyping "${project.name}", consider screen contrasts, local language text-to-speech, and offline reliability. For teachers or children with low technical literacy, interactive buttons should use intuitive universal colors (e.g., green checkmark for correct answers).`;
    } else if (prompt.includes("validate this assumption")) {
      responseText = `Testing Audit: Look at your latest test logs. You tested with "${
        project.test[0]?.testUsers || "no recorded users"
      }" and found: "${
        project.test[0]?.feedback || "no feedback yet"
      }". Have you verified if the local charcoal filter block remains effective after 3 months, or if students play quiz modules repeatedly? Validate by tracking usage metrics directly on the hardware.`;
    } else if (prompt.includes("scale across India")) {
      responseText = `Scalability Audit: To scale "${project.name}" across India, the solution must run on extremely low-cost hardware (e.g., Raspberry Pi Zero or recycled clay pots) and use regional language localization (Hindi, Tamil, Bengali). Make the assembly open-source so local NGOs can manufacture locally.`;
    } else if (prompt.includes("another innovative approach")) {
      responseText = `Ideation Advisory: Based on your solution, another approach is to implement a crowdsourced update distribution network where visitors with USB sticks automatically transfer new video lessons or clean charcoal cartridges when they travel to village centers (a sneakernet approach).`;
    } else {
      responseText = `Evaluating "${project.name}". Ensure that your success metrics are measurable (e.g. "10 metric tons sorted daily" or "daily output of 10,000 liters") to prove social impact to Solve for Tomorrow judges.`;
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: prompt },
      { sender: "coach", text: responseText },
    ]);
  };

  const prompts = [
    "Your problem statement is too broad.",
    "Identify one specific beneficiary.",
    "Consider accessibility.",
    "Have you validated this assumption?",
    "Can this solution scale across India?",
    "Suggest another innovative approach.",
  ];

  return (
    <aside className="w-80 border-l border-border-default bg-bg-surface/85 backdrop-blur-xl flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border-default bg-bg-surface flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="df-live-dot"
            aria-hidden="true"
            style={{ width: 6, height: 6 }}
          />
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">
            NOVA Coach OS
          </h3>
        </div>
        <span className="text-[9px] uppercase tracking-wider bg-violet-accent/10 border border-violet-accent/20 px-2 py-0.5 rounded text-violet-accent font-semibold">
          v1.1
        </span>
      </div>

      {/* Central AI Holographic Core */}
      <div className="p-4 border-b border-border-default bg-bg-base/40 flex flex-col gap-3">
        <div className="rounded-xl border border-border-default bg-bg-base/60 p-4 relative overflow-hidden flex flex-col items-center justify-center min-h-[120px]">
          <style>{`
            @keyframes orbit-cw {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes orbit-ccw {
              0% { transform: rotate(360deg); }
              100% { transform: rotate(0deg); }
            }
            @keyframes core-breathe {
              0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px var(--violet)); }
              50% { transform: scale(1.15); filter: drop-shadow(0 0 20px var(--blue)); }
            }
            .animate-core-breathe {
              animation: core-breathe 4s ease-in-out infinite;
              transform-origin: center;
            }
            .animate-orbit-cw {
              animation: orbit-cw 10s linear infinite;
              transform-origin: 100px 50px;
            }
            .animate-orbit-ccw {
              animation: orbit-ccw 14s linear infinite;
              transform-origin: 100px 50px;
            }
          `}</style>

          <svg
            width="100%"
            height="110"
            viewBox="0 0 200 110"
            className="relative"
            aria-hidden="true"
          >
            {/* Holographic grid base */}
            <line
              x1="10"
              y1="90"
              x2="190"
              y2="90"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
            />
            <line
              x1="20"
              y1="95"
              x2="180"
              y2="95"
              stroke="rgba(255,255,255,0.02)"
              strokeWidth="1"
            />

            {/* Orbit paths */}
            <ellipse
              cx="100"
              cy="50"
              rx="60"
              ry="18"
              fill="none"
              stroke="rgba(59,130,246,0.15)"
              strokeWidth="1"
              transform="rotate(-15, 100, 50)"
            />
            <ellipse
              cx="100"
              cy="50"
              rx="48"
              ry="32"
              fill="none"
              stroke="rgba(139,92,246,0.12)"
              strokeWidth="1"
              transform="rotate(35, 100, 50)"
            />

            {/* Pulsing Central Energy Core */}
            <g className="animate-core-breathe">
              <circle cx="100" cy="50" r="16" fill="url(#core-grad)" />
              <circle
                cx="100"
                cy="50"
                r="16"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
              />
            </g>

            {/* Gradient definition */}
            <defs>
              <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="35%" stopColor="var(--blue)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Outer revolving nodes */}
            <g className="animate-orbit-cw">
              <circle cx="160" cy="50" r="3.5" fill="var(--cyan)" />
              <line
                x1="100"
                y1="50"
                x2="160"
                y2="50"
                stroke="rgba(6,182,212,0.15)"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
            </g>

            <g className="animate-orbit-ccw">
              <circle cx="52" cy="50" r="2.5" fill="var(--violet)" />
              <line
                x1="100"
                y1="50"
                x2="52"
                y2="50"
                stroke="rgba(139,92,246,0.15)"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
            </g>
          </svg>
        </div>

        {/* Confidence Meter */}
        <div className="p-3 bg-bg-card border border-border-default rounded-xl space-y-1.5">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-500">
            <span>Confidence Index</span>
            <span className="text-emerald-accent">96%</span>
          </div>
          <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-accent to-emerald-accent rounded-full"
              style={{ width: "96%" }}
            />
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5 border border-border-default bg-bg-card/40 rounded-lg">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-accent"></span>
          </span>
          <span>Cognitive Audit Status: Ready</span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col max-w-[85%] ${
              msg.sender === "user"
                ? "ml-auto items-end"
                : "mr-auto items-start"
            }`}
          >
            <span className="text-[9px] uppercase tracking-widest text-slate-500 mb-1 font-bold">
              {msg.sender === "coach" ? "Coach" : "You"}
            </span>
            <div
              className={`rounded-xl p-3 text-xs leading-relaxed border ${
                msg.sender === "user"
                  ? "bg-blue-accent/15 border-blue-accent/30 text-blue-accent rounded-tr-none"
                  : "bg-bg-card border-border-default text-slate-300 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Coach Prompts */}
      <div className="p-4 border-t border-border-default bg-bg-surface/50 space-y-2">
        <span className="df-section-label block mb-1">
          Innovation Audit Prompts
        </span>
        <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handlePromptClick(prompt)}
              className="text-left w-full rounded-lg border border-border-default bg-bg-card p-2 text-[10px] text-slate-400 hover:border-blue-accent hover:bg-bg-surface hover:text-white transition-all truncate font-medium"
              title={prompt}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

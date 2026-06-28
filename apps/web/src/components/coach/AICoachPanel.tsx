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
    <aside className="w-80 border-l border-slate-900 bg-slate-950/60 backdrop-blur-md flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-900 bg-slate-900/10 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-white">
          AI Design Thinking Coach
        </h3>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col max-w-[90%] ${
              msg.sender === "user"
                ? "ml-auto items-end"
                : "mr-auto items-start"
            }`}
          >
            <span className="text-[9px] uppercase tracking-wider text-slate-500 mb-1">
              {msg.sender === "coach" ? "AI Innovation Coach" : "You"}
            </span>
            <div
              className={`rounded-xl p-3 text-xs leading-relaxed ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-slate-900 border border-slate-850 text-slate-300 rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Coach Prompts */}
      <div className="p-4 border-t border-slate-900 bg-slate-900/20 space-y-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
          Ask Coach (Samsung Solve for Tomorrow):
        </span>
        <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handlePromptClick(prompt)}
              className="text-left w-full rounded-lg border border-slate-900 bg-slate-950 p-2 text-[10px] text-slate-400 hover:border-indigo-500/50 hover:bg-slate-900 hover:text-white transition-all truncate"
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

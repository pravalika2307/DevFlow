import React, { useState } from "react";
import { ConsensusReport } from "../../../types/council";

interface ConsensusTabProps {
  consensus: ConsensusReport;
  onUpdate: (consensus: ConsensusReport) => void;
}

const ADVISORS = [
  {
    name: "Innovation Mentor",
    avatar: "🧠",
    vote: "Approve",
    comments: "Highly original approach to localized water purification.",
    rating: 92,
  },
  {
    name: "Technical Architect",
    avatar: "🏗",
    vote: "Approve",
    comments: "Failsafe design using gravity filtration works perfectly.",
    rating: 88,
  },
  {
    name: "Domain Advisor",
    avatar: "🎯",
    vote: "Approve",
    comments: "Addresses key regional needs in Satkhira zone.",
    rating: 85,
  },
  {
    name: "Target User Representative",
    avatar: "👥",
    vote: "Approve",
    comments: "Highly accessible, low friction learning curve.",
    rating: 90,
  },
  {
    name: "Sustainability Consultant",
    avatar: "🌍",
    vote: "Approve",
    comments: "Utilizes organic, bio-degradable local materials.",
    rating: 95,
  },
  {
    name: "Risk Assessment Officer",
    avatar: "🛡",
    vote: "Needs Revision",
    comments: "Verify durability under monsoonal storms.",
    rating: 78,
  },
  {
    name: "Inclusivity Advocate",
    avatar: "🤝",
    vote: "Approve",
    comments: "No electrical grid dependencies. Perfect.",
    rating: 91,
  },
  {
    name: "Presentation Coach",
    avatar: "📢",
    vote: "Approve",
    comments: "Strong story matrix for Solve for Tomorrow judges.",
    rating: 87,
  },
];

export function ConsensusTab({ consensus, onUpdate }: ConsensusTabProps) {
  const [newVal, setNewVal] = useState("");
  const [activeList, setActiveList] = useState<
    "topRisks" | "highestStrengths" | "highestPriorities" | "immediateActions"
  >("topRisks");

  const [isSimulating, setIsSimulating] = useState(false);
  const [currentAdvisorIdx, setCurrentAdvisorIdx] = useState(0);

  const startSimulation = () => {
    setIsSimulating(true);
    setCurrentAdvisorIdx(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= ADVISORS.length) {
        clearInterval(interval);
        setTimeout(() => setIsSimulating(false), 2000);
      } else {
        setCurrentAdvisorIdx(step);
      }
    }, 1800);
  };

  const handleAddField = (
    field: keyof Omit<
      ConsensusReport,
      "overallInnovationScore" | "overallReadiness"
    >,
  ) => {
    if (!newVal.trim()) return;
    const updated = {
      ...consensus,
      [field]: [...consensus[field], newVal.trim()],
    };
    onUpdate(updated);
    setNewVal("");
  };

  const handleRemoveField = (
    field: keyof Omit<
      ConsensusReport,
      "overallInnovationScore" | "overallReadiness"
    >,
    idx: number,
  ) => {
    const updated = {
      ...consensus,
      [field]: consensus[field].filter((_, i) => i !== idx),
    };
    onUpdate(updated);
  };

  const cards = [
    {
      key: "highestStrengths" as const,
      label: "Highest Strengths",
      icon: "💪",
      color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    },
    {
      key: "topRisks" as const,
      label: "Top Risks Registered",
      icon: "⚠️",
      color: "text-rose-455 border-rose-500/20 bg-rose-500/5",
    },
    {
      key: "highestPriorities" as const,
      label: "Highest Priorities",
      icon: "🎯",
      color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    },
    {
      key: "immediateActions" as const,
      label: "Immediate Next Actions",
      icon: "⚡",
      color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Consensus Engine Aggregations
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Synthesize overall ratings and generate priority execution plans
          compiled from all council members.
        </p>
      </div>

      {/* Live AI Council Consensus Mission Control Simulation */}
      <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-5 space-y-4 shadow-lg animate-fade-in-up">
        <div className="flex justify-between items-center pb-2 border-b border-border-default">
          <div className="flex items-center gap-2">
            <span className="df-live-dot" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Live AI Council Consensus Simulation
            </h4>
          </div>
          {!isSimulating ? (
            <button
              onClick={startSimulation}
              className="df-btn df-btn-primary px-3 py-1.5 text-[10px]"
            >
              Simulate Live Consensus
            </button>
          ) : (
            <span className="text-[10px] uppercase font-bold text-violet-accent animate-pulse">
              Simulating consensus...
            </span>
          )}
        </div>

        {isSimulating ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center animate-fade-in-up">
            {/* Left: Current speaking agent detail */}
            <div className="p-4 bg-bg-card rounded-xl border border-blue-accent/20 space-y-3 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-accent/10 border border-blue-accent/30 flex items-center justify-center text-lg animate-pulse">
                  {ADVISORS[currentAdvisorIdx].avatar}
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    {ADVISORS[currentAdvisorIdx].name}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
                    Advisor Board Panelist
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-350 italic leading-relaxed">
                &ldquo;{ADVISORS[currentAdvisorIdx].comments}&rdquo;
              </p>
              <div className="flex justify-between items-center pt-2">
                <span className="text-[10px] font-bold text-slate-500">
                  Confidence Rating
                </span>
                <span className="text-xs font-bold text-blue-accent">
                  {ADVISORS[currentAdvisorIdx].rating}%
                </span>
              </div>
            </div>

            {/* Right: Consolidated Live votes status */}
            <div className="grid grid-cols-4 gap-2">
              {ADVISORS.map((adv, idx) => {
                const active = idx === currentAdvisorIdx;
                const done = idx <= currentAdvisorIdx;
                return (
                  <div
                    key={adv.name}
                    className={`p-2 rounded-xl border transition-all flex flex-col items-center justify-center text-center ${
                      active
                        ? "bg-blue-accent/15 border-blue-accent text-white"
                        : done
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-accent"
                          : "bg-bg-card border-border-default opacity-40"
                    }`}
                  >
                    <span className="text-base mb-1">{adv.avatar}</span>
                    <span className="text-[8px] font-bold text-white truncate max-w-full">
                      {adv.name.split(" ")[0]}
                    </span>
                    {done && (
                      <span className="text-[8px] font-bold mt-1 uppercase text-emerald-accent">
                        {adv.vote === "Approve" ? "Approve" : "Revise"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-xs text-slate-450 leading-relaxed font-semibold">
              Trigger a real-time, cinematic multi-agent consensus sequence.
              Watch the 8 AI expert advisors submit feedback.
            </p>
          </div>
        )}
      </div>

      {/* Aggregate Score Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border-default bg-bg-card p-5 flex items-center justify-between shadow-md animate-fade-in-up">
          <div>
            <span className="df-section-label block">
              Aggregate Innovation Index
            </span>
            <span className="text-3xl font-black text-blue-accent block mt-1">
              {consensus.overallInnovationScore}%
            </span>
          </div>
          <div className="h-2 w-24 bg-white/[0.04] rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-accent rounded-full"
              style={{
                width: `${consensus.overallInnovationScore}%`,
                boxShadow: "0 0 6px var(--blue)",
              }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-border-default bg-bg-card p-5 flex items-center justify-between shadow-md animate-fade-in-up delay-50">
          <div>
            <span className="df-section-label block">
              Solve for Tomorrow Readiness
            </span>
            <span className="text-3xl font-black text-emerald-accent block mt-1">
              {consensus.overallReadiness}%
            </span>
          </div>
          <div className="h-2 w-24 bg-white/[0.04] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-accent rounded-full"
              style={{
                width: `${consensus.overallReadiness}%`,
                boxShadow: "0 0 6px var(--emerald)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Consensus lists grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, idx) => (
          <div
            key={card.key}
            className={`rounded-xl border p-5 space-y-3 bg-bg-card border-border-default hover:border-border-accent transition-colors shadow-md animate-fade-in-up`}
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            <div className="flex justify-between items-center pb-2 border-b border-border-default">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  card.color.split(" ")[0]
                } flex items-center gap-1.5`}
              >
                <span>{card.icon}</span>
                <span>{card.label}</span>
              </span>
            </div>

            <ul className="space-y-2.5 list-none pl-1 pt-1">
              {consensus[card.key].map((item, idx) => (
                <li
                  key={idx}
                  className="text-xs text-slate-300 leading-relaxed flex items-start justify-between gap-2 font-medium animate-fade-in-up"
                >
                  <span className="flex gap-2 items-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-700 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveField(card.key, idx)}
                    className="text-slate-555 hover:text-rose-accent transition-colors p-0.5 rounded font-bold text-sm"
                    aria-label="Remove consensus item"
                  >
                    &times;
                  </button>
                </li>
              ))}
              {consensus[card.key].length === 0 && (
                <li className="text-xs text-slate-500 italic">
                  No points registered in this category.
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* Add Consensus items */}
      <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-5 space-y-4 shadow-lg animate-fade-in-up">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-accent border-b border-border-default pb-2">
          Append Consensus Logs
        </h4>

        <div className="flex flex-wrap gap-2 items-center">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-2">
            Target List:
          </label>
          {cards.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setActiveList(c.key)}
              className={`rounded-lg border px-3 py-1 text-[10px] font-semibold transition-all ${
                activeList === c.key
                  ? "bg-blue-accent/10 border-blue-accent/30 text-blue-accent"
                  : "bg-bg-base border-border-default text-slate-400 hover:bg-white/[0.02] hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 pt-2 items-center">
          <input
            type="text"
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            className="flex-1 df-input px-3 py-2.5"
            placeholder={`Submit a new consensus point to the ${cards.find(
              (c) => c.key === activeList,
            )?.label} log...`}
          />
          <button
            type="button"
            onClick={() => handleAddField(activeList)}
            className="df-btn df-btn-primary px-4 py-2.5"
          >
            Append Point
          </button>
        </div>
      </div>
    </div>
  );
}

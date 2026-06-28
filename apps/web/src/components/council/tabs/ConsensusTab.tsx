import React, { useState } from "react";
import { ConsensusReport } from "../../../types/council";

interface ConsensusTabProps {
  consensus: ConsensusReport;
  onUpdate: (consensus: ConsensusReport) => void;
}

export function ConsensusTab({ consensus, onUpdate }: ConsensusTabProps) {
  const [newVal, setNewVal] = useState("");
  const [activeList, setActiveList] = useState<
    "topRisks" | "highestStrengths" | "highestPriorities" | "immediateActions"
  >("topRisks");

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
      <div className="border-b border-slate-900 pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Consensus Engine Aggregations
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Synthesize overall ratings and generate priority execution plans
          compiled from all council members.
        </p>
      </div>

      {/* Aggregate Score Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-slate-900 bg-slate-900/10 p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Aggregate Innovation Index
            </span>
            <span className="text-3xl font-black text-indigo-400 block mt-1">
              {consensus.overallInnovationScore}%
            </span>
          </div>
          <div className="h-2 w-24 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full"
              style={{ width: `${consensus.overallInnovationScore}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-900 bg-slate-900/10 p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Solve for Tomorrow Readiness
            </span>
            <span className="text-3xl font-black text-emerald-450 block mt-1">
              {consensus.overallReadiness}%
            </span>
          </div>
          <div className="h-2 w-24 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${consensus.overallReadiness}%` }}
            />
          </div>
        </div>
      </div>

      {/* Consensus lists grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.key}
            className={`rounded-xl border p-5 space-y-3 ${
              card.color.split(" ")[1]
            } ${card.color.split(" ")[2]}`}
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-900/60">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  card.color.split(" ")[0]
                } flex items-center gap-1.5`}
              >
                <span>{card.icon}</span>
                <span>{card.label}</span>
              </span>
            </div>

            <ul className="space-y-2 list-none pl-1">
              {consensus[card.key].map((item, idx) => (
                <li
                  key={idx}
                  className="text-xs text-slate-300 leading-relaxed flex items-start justify-between gap-2"
                >
                  <span className="flex gap-2 items-start">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-500 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveField(card.key, idx)}
                    className="text-slate-500 hover:text-rose-455 transition-colors p-0.5 rounded"
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
      <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-5 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-900 pb-2">
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
                  ? "bg-indigo-950/20 border-indigo-500/50 text-indigo-455"
                  : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-900"
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
            className="flex-1 rounded-xl border border-slate-850 bg-slate-950 py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
            placeholder={`Submit a new consensus point to the ${cards.find(
              (c) => c.key === activeList,
            )?.label} log...`}
          />
          <button
            type="button"
            onClick={() => handleAddField(activeList)}
            className="rounded-xl bg-indigo-650 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-600 transition-all"
          >
            Append Point
          </button>
        </div>
      </div>
    </div>
  );
}

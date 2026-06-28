import React from "react";
import {
  UserResearchRecord,
  ProblemExplorerData,
} from "../../../types/discovery";

interface InsightTabProps {
  explorer: ProblemExplorerData;
  records: UserResearchRecord[];
}

export function InsightTab({ explorer, records }: InsightTabProps) {
  // Generate insights list based on active project explorer context
  const hasData = explorer.initialProblem.length > 0;

  const painPoints = hasData
    ? explorer.rootCauses.map((rc) => `Target user suffers from: ${rc}`)
    : ["No active project loaded. Add problem details in Explorer first."];

  const trends = hasData
    ? [
        `Device allocation is biased towards primary household income earners.`,
        `Low-income cohorts prefer single-payment workarounds over subscription models.`,
        `Users avoid solutions that disrupt their daily regional mobility routines.`,
      ]
    : ["No active behaviors loaded."];

  const needs = hasData
    ? [
        `A localized solution that works with zero grid energy dependence.`,
        `Tool-free and repairable mechanics using regional supplies.`,
        `Visual, audio-assisted feedback to support users with low technical literacy.`,
      ]
    : ["No active needs loaded."];

  const opportunities = hasData
    ? explorer.innovationOpportunities
    : ["No active opportunities loaded."];

  const clusters = [
    {
      title: "Major Pain Points",
      desc: "Key frictions preventing users from achieving goals.",
      items: painPoints,
      border: "border-rose-500/20 text-rose-400",
    },
    {
      title: "Behaviour Trends & Patterns",
      desc: "Habits and sharing routines observed during field notes.",
      items: trends,
      border: "border-amber-500/20 text-amber-400",
    },
    {
      title: "Core & Unmet Needs",
      desc: "Design criteria that must be satisfied by any new concept.",
      items: needs,
      border: "border-indigo-500/20 text-indigo-400",
    },
    {
      title: "Innovation Opportunities",
      desc: "Technological paths to replace failed workarounds.",
      items: opportunities,
      border: "border-cyan-500/20 text-cyan-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-900 pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          AI Insight Generator
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Review generated patterns, core needs, and unmet user requirements
          extracted from your timeline log logs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clusters.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-slate-900 bg-slate-900/10 p-6 flex flex-col justify-between h-full"
          >
            <div>
              <span
                className={`text-xs font-bold uppercase tracking-wider block ${
                  c.border.split(" ")[1]
                }`}
              >
                {c.title}
              </span>
              <p className="text-[10px] text-slate-500 mt-1 mb-4 leading-relaxed">
                {c.desc}
              </p>

              <ul className="space-y-2 list-none">
                {c.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2 text-xs text-slate-300 leading-relaxed items-start"
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-700 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {records.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-900 text-[9px] text-slate-500 font-semibold uppercase tracking-wider text-right">
                Based on {records.length} timeline observations
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

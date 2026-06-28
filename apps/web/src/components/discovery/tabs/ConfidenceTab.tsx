import React from "react";
import {
  ConfidenceScores,
  RecommendationsData,
} from "../../../types/discovery";
import { DiscoveryService } from "../../../services/discovery";

interface ConfidenceTabProps {
  scores: ConfidenceScores;
  recommendations: RecommendationsData;
  onUpdateScores: (scores: ConfidenceScores) => void;
}

export function ConfidenceTab({
  scores,
  recommendations,
  onUpdateScores,
}: ConfidenceTabProps) {
  const overallReadiness = DiscoveryService.calculateReadiness(scores);

  const handleScoreChange = (field: keyof ConfidenceScores, val: number) => {
    onUpdateScores({
      ...scores,
      [field]: val,
    });
  };

  const categories = [
    {
      field: "researchCompleteness" as const,
      label: "Research Completeness",
      desc: "Percentage of target cohort segments interviewed and logged.",
    },
    {
      field: "userUnderstanding" as const,
      label: "User Understanding",
      desc: "Depth of user pain statements and daily habit profiling.",
    },
    {
      field: "problemClarity" as const,
      label: "Problem Clarity",
      desc: "Clarity of geographical scope, HMW scope, and industry constraints.",
    },
    {
      field: "evidenceStrength" as const,
      label: "Evidence Strength",
      desc: "Volume of secondary statistics and local surveys cataloged.",
    },
    {
      field: "validationLevel" as const,
      label: "Validation Level",
      desc: "Amount of field tests validating early assumptions in real situations.",
    },
  ];

  const recommendationsList = [
    {
      label: "Missing Interviews",
      items: recommendations.missingInterviews,
      color: "text-indigo-400 border-indigo-500/20",
    },
    {
      label: "Weak Assumptions Identified",
      items: recommendations.weakAssumptions,
      color: "text-amber-400 border-amber-500/20",
    },
    {
      label: "Research Gaps Detected",
      items: recommendations.researchGaps,
      color: "text-cyan-400 border-cyan-500/20",
    },
    {
      label: "Missing Stakeholders",
      items: recommendations.missingStakeholders,
      color: "text-blue-400 border-blue-500/20",
    },
    {
      label: "Potential Biases",
      items: recommendations.potentialBiases,
      color: "text-rose-450 border-rose-500/20",
    },
    {
      label: "Ethical Considerations",
      items: recommendations.ethicalConsiderations,
      color: "text-emerald-400 border-emerald-500/20",
    },
    {
      label: "Accessibility Improvements",
      items: recommendations.accessibilityImprovements,
      color: "text-teal-400 border-teal-500/20",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Readiness */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Readiness Circular gauge */}
        <div className="md:col-span-1 rounded-2xl border border-slate-900 bg-slate-900/10 p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute -left-12 -top-12 h-24 w-24 bg-indigo-500/5 rounded-full blur-2xl" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-6">
            Research Readiness Score
          </span>

          <div className="relative flex items-center justify-center">
            {/* SVG Ring */}
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="60"
                className="stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="60"
                className="stroke-indigo-500 transition-all duration-1000"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 60}
                strokeDashoffset={
                  2 * Math.PI * 60 * (1 - overallReadiness / 100)
                }
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-white">
                {overallReadiness}%
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 mt-1">
                Ready
              </span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-6 text-center leading-relaxed">
            Overall confidence weight based on the 5 qualitative validation
            dimensions.
          </p>
        </div>

        {/* Dynamic score editors */}
        <div className="md:col-span-2 rounded-2xl border border-slate-900 bg-slate-900/10 p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-900 pb-2">
            Research Confidence Matrix
          </h4>

          <div className="space-y-3">
            {categories.map((c) => (
              <div key={c.field} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span title={c.desc}>{c.label}</span>
                  <span className="text-indigo-400 font-bold">
                    {scores[c.field]}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scores[c.field]}
                  onChange={(e) =>
                    handleScoreChange(c.field, Number(e.target.value))
                  }
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-6 space-y-6">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Proactive AI Recommendations & Gaps Analysis
          </h4>
          <p className="text-[10px] text-slate-500 mt-1">
            Solve for Tomorrow AI continuously audits research timelines and
            outputs to identify weaknesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommendationsList.map((rec) => (
            <div
              key={rec.label}
              className="rounded-xl border border-slate-900 bg-slate-950/40 p-4 space-y-2.5"
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-wider block ${
                  rec.color.split(" ")[0]
                }`}
              >
                {rec.label}
              </span>
              <ul className="space-y-1.5 list-none">
                {rec.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2 text-xs text-slate-350 leading-relaxed items-start"
                  >
                    <span className="inline-block h-1 w-1 rounded-full bg-slate-700 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

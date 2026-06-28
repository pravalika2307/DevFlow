import React from "react";
import { ImpactPredictions } from "../../../types/impact";

interface PredictorTabProps {
  data: ImpactPredictions;
  onUpdate: (data: ImpactPredictions) => void;
}

export function PredictorTab({ data, onUpdate }: PredictorTabProps) {
  const handleScoreChange = (
    field: keyof Omit<ImpactPredictions, "timeToImpact" | "riskFactors">,
    val: number,
  ) => {
    onUpdate({
      ...data,
      [field]: val,
    });
  };

  const parameters = [
    {
      field: "potentialReach" as const,
      label: "Potential Reach",
      desc: "Percentage of total addresses reached in target geography.",
      color: "bg-blue-accent",
      text: "text-blue-accent",
    },
    {
      field: "expectedAdoption" as const,
      label: "Expected Adoption Rate",
      desc: "Estimated retention and active daily repeat use ratios.",
      color: "bg-violet-accent",
      text: "text-violet-accent",
    },
    {
      field: "implementationDifficulty" as const,
      label: "Implementation Complexity",
      desc: "Friction of logistics, local setup, and resource dependency.",
      color: "bg-amber-accent",
      text: "text-amber-accent",
    },
    {
      field: "economicBenefit" as const,
      label: "Economic Return Ratio",
      desc: "Local family savings or income increases relative to cost.",
      color: "bg-emerald-accent",
      text: "text-emerald-accent",
    },
    {
      field: "sustainabilityScore" as const,
      label: "Long-term Sustainability",
      desc: "Durability of operation without foreign financial inflows.",
      color: "bg-cyan-accent",
      text: "text-cyan-accent",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          AI Impact Predictor
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Simulate potential scale and societal adoption metrics under standard
          environmental models.
        </p>
      </div>

      {/* Progress Bars */}
      <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-6 space-y-5 shadow-lg animate-fade-in-up">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-450 border-b border-border-default pb-2">
          Estimated AI Projections
        </h4>

        <div className="space-y-4 pt-1">
          {parameters.map((param) => (
            <div
              key={param.field}
              className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center"
            >
              <div className="sm:col-span-1">
                <span className="text-xs font-bold text-white block">
                  {param.label}
                </span>
                <span className="text-[9px] text-slate-500 block leading-relaxed mt-1 font-semibold">
                  {param.desc}
                </span>
              </div>
              <div className="sm:col-span-2">
                <div className="h-2 w-full rounded-full bg-white/[0.04] relative">
                  <div
                    className={`h-2 rounded-full ${param.color} transition-all duration-500`}
                    style={{
                      width: `${data[param.field]}%`,
                      boxShadow: `0 0 8px ${
                        param.color === "bg-blue-accent"
                          ? "var(--blue)"
                          : param.color === "bg-violet-accent"
                            ? "var(--violet)"
                            : param.color === "bg-emerald-accent"
                              ? "var(--emerald)"
                              : "transparent"
                      }`,
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-1 text-right flex items-center justify-end gap-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={data[param.field]}
                  onChange={(e) =>
                    handleScoreChange(param.field, Number(e.target.value))
                  }
                  className="w-24 h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-blue-accent"
                />
                <span
                  className={`text-xs font-extrabold ${param.text} min-w-[32px] text-right`}
                >
                  {data[param.field]}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Narrative metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border-default bg-bg-card p-5 shadow-md">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Time to Impact
          </label>
          <input
            type="text"
            value={data.timeToImpact}
            onChange={(e) =>
              onUpdate({ ...data, timeToImpact: e.target.value })
            }
            className="w-full df-input px-3 py-2.5"
          />
        </div>

        <div className="rounded-xl border border-border-default bg-bg-card p-5 shadow-md">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Critical Risk Factors
          </label>
          <input
            type="text"
            value={data.riskFactors}
            onChange={(e) => onUpdate({ ...data, riskFactors: e.target.value })}
            className="w-full df-input px-3 py-2.5"
          />
        </div>
      </div>
    </div>
  );
}

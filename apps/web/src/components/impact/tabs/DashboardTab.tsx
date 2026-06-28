import React from "react";
import { ImpactProjectData } from "../../../types/impact";

interface DashboardTabProps {
  data: ImpactProjectData;
  onUpdate: (data: Partial<ImpactProjectData>) => void;
}

export function DashboardTab({ data, onUpdate }: DashboardTabProps) {
  const handleScoreChange = (
    field: keyof Omit<
      ImpactProjectData,
      | "projectId"
      | "beneficiary"
      | "sdgs"
      | "predictions"
      | "timeline"
      | "risks"
      | "inclusivity"
    >,
    val: number,
  ) => {
    const updated = {
      ...data,
      [field]: val,
    };

    // Recalculate aggregate Overall Impact Score
    if (field !== "overallImpactScore") {
      const sum =
        updated.innovationReadiness +
        updated.socialImpact +
        updated.technicalFeasibility +
        updated.scalability +
        updated.sustainability +
        updated.accessibility +
        updated.aiReadiness;
      updated.overallImpactScore = Math.round(sum / 7);
    }

    onUpdate(updated);
  };

  const metrics = [
    {
      field: "innovationReadiness" as const,
      label: "Innovation Readiness",
      color: "bg-indigo-500",
      text: "text-indigo-400",
    },
    {
      field: "socialImpact" as const,
      label: "Social Impact Scale",
      color: "bg-emerald-500",
      text: "text-emerald-400",
    },
    {
      field: "technicalFeasibility" as const,
      label: "Technical Feasibility",
      color: "bg-blue-500",
      text: "text-blue-400",
    },
    {
      field: "scalability" as const,
      label: "Scalability Index",
      color: "bg-purple-500",
      text: "text-purple-400",
    },
    {
      field: "sustainability" as const,
      label: "Sustainability Score",
      color: "bg-teal-500",
      text: "text-teal-400",
    },
    {
      field: "accessibility" as const,
      label: "Accessibility rating",
      color: "bg-pink-500",
      text: "text-pink-400",
    },
    {
      field: "aiReadiness" as const,
      label: "AI & Model Readiness",
      color: "bg-cyan-500",
      text: "text-cyan-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-900 pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Impact Dashboard
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Measure expected social, environmental, and technological return on
          your solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Radial gauge for overall score */}
        <div className="md:col-span-1 rounded-2xl border border-slate-900 bg-slate-900/10 p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute -left-12 -top-12 h-24 w-24 bg-indigo-500/5 rounded-full blur-2xl" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-6">
            Overall Impact Score
          </span>

          <div className="relative flex items-center justify-center">
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
                  2 * Math.PI * 60 * (1 - data.overallImpactScore / 100)
                }
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-white">
                {data.overallImpactScore}%
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-505 mt-1">
                Impact
              </span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-6 text-center leading-relaxed">
            Calculated average across social, scaling, and feasibility
            dimensions.
          </p>
        </div>

        {/* Sliders and risk indicator */}
        <div className="md:col-span-2 rounded-2xl border border-slate-900 bg-slate-900/10 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Dimension Scoring
            </h4>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium">Risk Level:</span>
              <span
                className={`font-bold ${
                  data.riskLevel > 50 ? "text-rose-400" : "text-emerald-400"
                }`}
              >
                {data.riskLevel}%
              </span>
            </div>
          </div>

          <div className="space-y-3.5">
            {metrics.map((m) => (
              <div key={m.field} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-350">
                  <span>{m.label}</span>
                  <span className={`${m.text} font-bold`}>
                    {data[m.field]}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={data[m.field]}
                    onChange={(e) =>
                      handleScoreChange(m.field, Number(e.target.value))
                    }
                    className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            ))}

            {/* Risk Slider */}
            <div className="space-y-1 pt-1.5 border-t border-slate-900">
              <div className="flex justify-between text-xs font-semibold text-slate-350">
                <span>Aggregated Risk Level</span>
                <span className="text-rose-455 font-bold">
                  {data.riskLevel}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={data.riskLevel}
                onChange={(e) =>
                  handleScoreChange("riskLevel", Number(e.target.value))
                }
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

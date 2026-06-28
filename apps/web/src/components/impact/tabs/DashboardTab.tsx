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
      color: "from-blue-accent to-violet-accent",
      text: "text-blue-accent",
    },
    {
      field: "socialImpact" as const,
      label: "Social Impact Scale",
      color: "from-emerald-accent to-cyan-accent",
      text: "text-emerald-accent",
    },
    {
      field: "technicalFeasibility" as const,
      label: "Technical Feasibility",
      color: "from-blue-accent to-cyan-accent",
      text: "text-cyan-accent",
    },
    {
      field: "scalability" as const,
      label: "Scalability Index",
      color: "from-violet-accent to-pink-500",
      text: "text-violet-accent",
    },
    {
      field: "sustainability" as const,
      label: "Sustainability Score",
      color: "from-emerald-accent to-teal-500",
      text: "text-emerald-accent",
    },
    {
      field: "accessibility" as const,
      label: "Accessibility rating",
      color: "from-pink-500 to-rose-accent",
      text: "text-rose-accent",
    },
    {
      field: "aiReadiness" as const,
      label: "AI & Model Readiness",
      color: "from-blue-accent to-emerald-accent",
      text: "text-blue-accent",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Impact Dashboard
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Measure expected social, environmental, and technological return on
          your solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Radial gauge for overall score */}
        <div className="md:col-span-1 rounded-2xl border border-border-default bg-bg-card p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-lg animate-fade-in-up">
          <div className="absolute -left-12 -top-12 h-24 w-24 bg-blue-accent/5 rounded-full blur-2xl" />
          <span className="df-section-label mb-6">Overall Impact Score</span>

          <div className="relative flex items-center justify-center">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="rgba(255, 255, 255, 0.04)"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="var(--blue)"
                style={{
                  transition: "stroke-dashoffset 1s ease",
                  filter: "drop-shadow(0 0 6px var(--blue))",
                }}
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 60}
                strokeDashoffset={
                  2 * Math.PI * 60 * (1 - data.overallImpactScore / 100)
                }
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white tracking-tight">
                {data.overallImpactScore}%
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 mt-1 font-bold">
                Impact
              </span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-6 text-center leading-relaxed font-medium">
            Calculated average across social, scaling, and feasibility
            dimensions.
          </p>
        </div>

        {/* Sliders and risk indicator */}
        <div className="md:col-span-2 rounded-2xl border border-border-default bg-bg-card p-6 space-y-4 shadow-lg animate-fade-in-up delay-100">
          <div className="flex items-center justify-between border-b border-border-default pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Dimension Scoring
            </h4>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-bold uppercase tracking-wider">
                Risk Level:
              </span>
              <span
                className={`font-black ${
                  data.riskLevel > 50
                    ? "text-rose-accent"
                    : "text-emerald-accent"
                }`}
              >
                {data.riskLevel}%
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-1">
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
                    className="flex-1 h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-blue-accent"
                  />
                </div>
              </div>
            ))}

            {/* Risk Slider */}
            <div className="space-y-1 pt-2 border-t border-border-default">
              <div className="flex justify-between text-xs font-semibold text-slate-355">
                <span>Aggregated Risk Level</span>
                <span className="text-rose-accent font-bold">
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
                className="w-full h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-rose-accent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

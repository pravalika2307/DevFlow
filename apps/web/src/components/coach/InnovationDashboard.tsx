import React from "react";
import { InnovationProject } from "../../types/innovation";
import { InnovationService } from "../../services/innovation";

interface InnovationDashboardProps {
  project: InnovationProject;
}

export function InnovationDashboard({ project }: InnovationDashboardProps) {
  const scores = project.innovationScores;
  const overallReadiness = InnovationService.calculateReadiness(scores);

  const parameters = [
    {
      label: "Problem Clarity",
      value: scores.problemClarity,
      color: "from-blue-accent to-violet-accent",
      text: "text-blue-accent",
      desc: "Clarity of specific community beneficiaries and pain definition.",
    },
    {
      label: "Innovation Novelty",
      value: scores.innovation,
      color: "from-violet-accent to-pink-500",
      text: "text-violet-accent",
      desc: "Uniqueness of proposed technology relative to existing workarounds.",
    },
    {
      label: "Technical Feasibility",
      value: scores.feasibility,
      color: "from-blue-accent to-cyan-accent",
      text: "text-cyan-accent",
      desc: "Reliability, code complexity, and hardware constraints.",
    },
    {
      label: "Social Impact Scale",
      value: scores.socialImpact,
      color: "from-emerald-accent to-cyan-accent",
      text: "text-emerald-accent",
      desc: "UN SDG alignment and volume of target beneficiaries reached.",
    },
    {
      label: "AI Readiness & Edge TRL",
      value: scores.aiReadiness,
      color: "from-blue-accent to-emerald-accent",
      text: "text-blue-accent",
      desc: "Integration of computer vision, microservices, or model edge speed.",
    },
    {
      label: "Scalability Index",
      value: scores.scalability,
      color: "from-amber-accent to-orange-500",
      text: "text-amber-accent",
      desc: "Ability to deploy cost-effectively across multiple regional centers.",
    },
    {
      label: "Sustainability",
      value: scores.sustainability,
      color: "from-emerald-accent to-teal-500",
      text: "text-emerald-accent",
      desc: "Reliance on renewable energy (e.g. solar) or low replacement cost.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Readiness Circular gauge */}
        <div className="md:col-span-1 rounded-2xl border border-border-default bg-bg-card p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-lg animate-fade-in-up">
          <div className="absolute -left-12 -top-12 h-24 w-24 bg-blue-accent/5 rounded-full blur-2xl" />
          <span className="df-section-label mb-6">Innovation Readiness</span>

          <div className="relative flex items-center justify-center">
            {/* SVG Ring */}
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
                  2 * Math.PI * 60 * (1 - overallReadiness / 100)
                }
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white tracking-tight">
                {overallReadiness}%
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-500 mt-1 font-bold">
                TRL Score
              </span>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 mt-6 text-center leading-relaxed font-medium">
            Solve for Tomorrow TRL score aggregated across all 7 evaluation
            parameters.
          </p>
        </div>

        {/* Evaluation Summary text */}
        <div className="md:col-span-2 rounded-2xl border border-border-default bg-bg-card p-6 flex flex-col justify-between shadow-lg animate-fade-in-up delay-100">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Solve for Tomorrow Evaluation
            </h3>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed font-medium">
              Based on the current input variables from your Empathise, Define,
              Ideate, and Prototype phases,
              <strong> {project.name}</strong> displays a high alignment with UN
              Sustainable Development Goals. The engineering metrics are
              integrated dynamically.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-border-default">
            <div>
              <span className="df-section-label">Top Strength</span>
              <p className="text-sm font-semibold text-emerald-accent mt-1.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-accent" />
                {
                  parameters.reduce((prev, curr) =>
                    prev.value > curr.value ? prev : curr,
                  ).label
                }
              </p>
            </div>
            <div>
              <span className="df-section-label">Areas for Growth</span>
              <p className="text-sm font-semibold text-violet-accent mt-1.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-accent" />
                {
                  parameters.reduce((prev, curr) =>
                    prev.value < curr.value ? prev : curr,
                  ).label
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7 dimensions parameters list */}
      <div className="rounded-2xl border border-border-default bg-bg-card p-6 space-y-5 shadow-lg animate-fade-in-up delay-150">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Evaluation Matrix Details (7 Parameters)
        </h4>

        <div className="space-y-4.5">
          {parameters.map((param) => (
            <div
              key={param.label}
              className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center"
            >
              <div className="sm:col-span-1">
                <span className="text-xs font-bold text-white block">
                  {param.label}
                </span>
                <span className="text-[9px] text-slate-500 block leading-relaxed mt-0.5 font-medium">
                  {param.desc}
                </span>
              </div>
              <div className="sm:col-span-2">
                <div className="df-progress bg-white/[0.04] h-2">
                  <div
                    className={`df-progress-fill bg-gradient-to-r ${param.color} h-2`}
                    style={{ width: `${param.value}%` }}
                  />
                </div>
              </div>
              <div className="sm:col-span-1 text-right">
                <span
                  className={`text-xs font-bold ${param.text} tabular-nums`}
                >
                  {param.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

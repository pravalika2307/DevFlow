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
      color: "bg-indigo-500",
      text: "text-indigo-400",
      desc: "Clarity of specific community beneficiaries and pain definition.",
    },
    {
      label: "Innovation Novelty",
      value: scores.innovation,
      color: "bg-purple-500",
      text: "text-purple-400",
      desc: "Uniqueness of proposed technology relative to existing workarounds.",
    },
    {
      label: "Technical Feasibility",
      value: scores.feasibility,
      color: "bg-blue-500",
      text: "text-blue-400",
      desc: "Reliability, code complexity, and hardware constraints.",
    },
    {
      label: "Social Impact Scale",
      value: scores.socialImpact,
      color: "bg-emerald-500",
      text: "text-emerald-400",
      desc: "UN SDG alignment and volume of target beneficiaries reached.",
    },
    {
      label: "AI Readiness & Edge TRL",
      value: scores.aiReadiness,
      color: "bg-cyan-500",
      text: "text-cyan-400",
      desc: "Integration of computer vision, microservices, or model edge speed.",
    },
    {
      label: "Scalability Index",
      value: scores.scalability,
      color: "bg-amber-500",
      text: "text-amber-400",
      desc: "Ability to deploy cost-effectively across multiple regional centers.",
    },
    {
      label: "Sustainability",
      value: scores.sustainability,
      color: "bg-teal-500",
      text: "text-teal-400",
      desc: "Reliance on renewable energy (e.g. solar) or low replacement cost.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Block */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Readiness Circular gauge */}
        <div className="md:col-span-1 rounded-2xl border border-slate-900 bg-slate-900/10 p-6 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute -left-12 -top-12 h-24 w-24 bg-indigo-500/5 rounded-full blur-2xl" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-6">
            Innovation Readiness Score
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
            Solve for Tomorrow TRL score aggregated across all 7 evaluation
            parameters.
          </p>
        </div>

        {/* Evaluation Summary text */}
        <div className="md:col-span-2 rounded-2xl border border-slate-900 bg-slate-900/10 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Solve for Tomorrow Evaluation
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Based on the current input variables from your Empathise, Define,
              Ideate, and Prototype phases,
              <strong> {project.name}</strong> displays a high alignment with UN
              Sustainable Development Goals. The engineering metrics are
              integrated dynamically.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-900">
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Top Strength
              </span>
              <p className="text-sm font-semibold text-emerald-400 mt-1">
                {
                  parameters.reduce((prev, curr) =>
                    prev.value > curr.value ? prev : curr,
                  ).label
                }
              </p>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider">
                Areas for Growth
              </span>
              <p className="text-sm font-semibold text-amber-400 mt-1">
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
      <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-6 space-y-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Evaluation Matrix Details (7 Parameters)
        </h4>

        <div className="space-y-4">
          {parameters.map((param) => (
            <div
              key={param.label}
              className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center"
            >
              <div className="sm:col-span-1">
                <span className="text-xs font-semibold text-white block">
                  {param.label}
                </span>
                <span className="text-[9px] text-slate-500 block leading-relaxed mt-0.5">
                  {param.desc}
                </span>
              </div>
              <div className="sm:col-span-2">
                <div className="h-2 w-full rounded-full bg-slate-900 relative">
                  <div
                    className={`h-2 rounded-full ${param.color} transition-all duration-500`}
                    style={{ width: `${param.value}%` }}
                  />
                </div>
              </div>
              <div className="sm:col-span-1 text-right">
                <span className={`text-sm font-bold ${param.text}`}>
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

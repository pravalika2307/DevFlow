import React from "react";
import { ImpactProjectData } from "../../../types/impact";

interface TimelineTabProps {
  timeline: ImpactProjectData["timeline"];
  onUpdate: (timeline: ImpactProjectData["timeline"]) => void;
}

export function TimelineTab({ timeline, onUpdate }: TimelineTabProps) {
  const steps = [
    {
      key: "threeMonths" as const,
      label: "3 Months",
      title: "Immediate Pilot Setup",
      color: "border-indigo-500 text-indigo-400",
    },
    {
      key: "sixMonths" as const,
      label: "6 Months",
      title: "Adoption & Refinement",
      color: "border-purple-500 text-purple-400",
    },
    {
      key: "oneYear" as const,
      label: "1 Year",
      title: "Regional Expansion",
      color: "border-emerald-500 text-emerald-450",
    },
    {
      key: "threeYears" as const,
      label: "3 Years",
      title: "Scalability & Open Source",
      color: "border-cyan-500 text-cyan-400",
    },
  ];

  const handleTextChange = (
    key: keyof ImpactProjectData["timeline"],
    val: string,
  ) => {
    onUpdate({
      ...timeline,
      [key]: val,
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Projected Impact Timeline
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Define growth targets, deployment metrics, and community scale targets
          across various milestones.
        </p>
      </div>

      {/* Visual Timeline Ribs */}
      <div className="relative pl-6 border-l border-border-default space-y-6">
        {steps.map((step, idx) => (
          <div
            key={step.key}
            className="relative animate-fade-in-up"
            style={{ animationDelay: `${idx * 40}ms` }}
          >
            {/* Bullet */}
            <div className="absolute -left-[30px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-bg-base border-2 border-blue-accent">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-accent" />
            </div>

            <div className="rounded-xl border border-border-default bg-bg-card p-5 space-y-3 shadow-md hover:border-border-accent transition-colors">
              <div className="flex items-center gap-2.5">
                <span
                  className={`rounded-lg border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${step.color}`}
                >
                  {step.label}
                </span>
                <h4 className="text-xs font-bold text-white leading-none">
                  {step.title}
                </h4>
              </div>

              <textarea
                value={timeline[step.key]}
                onChange={(e) => handleTextChange(step.key, e.target.value)}
                rows={2}
                className="w-full df-input p-3"
                placeholder={`Describe goals for ${step.label}...`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

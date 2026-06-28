import React from "react";
import { InclusivityData, InclusivityScores } from "../../../types/impact";

interface InclusivityTabProps {
  data: InclusivityData;
  onUpdate: (data: InclusivityData) => void;
}

export function InclusivityTab({ data, onUpdate }: InclusivityTabProps) {
  const handleScoreChange = (field: keyof InclusivityScores, val: number) => {
    onUpdate({
      ...data,
      scores: {
        ...data.scores,
        [field]: val,
      },
    });
  };

  const categories = [
    {
      field: "ruralScore" as const,
      label: "Rural Users Alignment",
      desc: "Considers isolation and lack of retail delivery.",
      color: "bg-blue-accent",
      text: "text-blue-accent",
    },
    {
      field: "urbanScore" as const,
      label: "Urban Users Alignment",
      desc: "Considers congestion and local municipality coordination.",
      color: "bg-violet-accent",
      text: "text-violet-accent",
    },
    {
      field: "disabilityScore" as const,
      label: "Accessibility for Disabilities",
      desc: "Screen readers, motor limits, visual contrast compliance.",
      color: "bg-emerald-accent",
      text: "text-emerald-accent",
    },
    {
      field: "lowInternetScore" as const,
      label: "Low Internet Tolerance",
      desc: "Functionality on offline cache or 2G connections.",
      color: "bg-cyan-accent",
      text: "text-cyan-accent",
    },
    {
      field: "languageScore" as const,
      label: "Multilingual Support",
      desc: "Availability of localization, dialect translation, or voice aids.",
      color: "bg-amber-accent",
      text: "text-amber-accent",
    },
    {
      field: "affordabilityScore" as const,
      label: "Economic Affordability",
      desc: "Pricing matched to lowest subsistence levels.",
      color: "bg-rose-accent",
      text: "text-rose-accent",
    },
    {
      field: "digitalLiteracyScore" as const,
      label: "Digital Literacy Adaptability",
      desc: "Familiarity required to operate controls.",
      color: "bg-violet-accent",
      text: "text-violet-accent",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Inclusivity Assessment
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Evaluate whether the project accommodates rural communities, low
          bandwidth, and diverse literacy ranges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sliders panel */}
        <div className="md:col-span-2 rounded-2xl border border-border-default bg-bg-card p-6 space-y-4 shadow-lg animate-fade-in-up">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-border-default pb-2">
            Inclusivity Score Details
          </h4>

          <div className="space-y-4 pt-1">
            {categories.map((c) => (
              <div key={c.field} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-330">
                  <span title={c.desc}>{c.label}</span>
                  <span className={`${c.text} font-bold`}>
                    {data.scores[c.field]}%
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={data.scores[c.field]}
                    onChange={(e) =>
                      handleScoreChange(c.field, Number(e.target.value))
                    }
                    className="flex-1 h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-blue-accent"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations panel */}
        <div className="md:col-span-1 rounded-2xl border border-border-default bg-bg-card p-6 flex flex-col justify-between shadow-lg animate-fade-in-up delay-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-accent block mb-4">
              AI Inclusivity Suggestions
            </span>
            <ul className="space-y-3.5 list-none">
              {data.suggestions.map((sug, idx) => (
                <li
                  key={idx}
                  className="flex gap-2.5 text-xs text-slate-300 leading-relaxed items-start font-medium"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-accent mt-1.5 flex-shrink-0" />
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-border-default text-[9px] text-slate-500 leading-relaxed font-bold uppercase tracking-wider">
            Suggestions comply with UN SDG 10 targets to reduce inequality in
            rural services.
          </div>
        </div>
      </div>
    </div>
  );
}

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
      color: "bg-indigo-500",
      text: "text-indigo-400",
    },
    {
      field: "urbanScore" as const,
      label: "Urban Users Alignment",
      desc: "Considers congestion and local municipality coordination.",
      color: "bg-purple-500",
      text: "text-purple-400",
    },
    {
      field: "disabilityScore" as const,
      label: "Accessibility for Disabilities",
      desc: "Screen readers, motor limits, visual contrast compliance.",
      color: "bg-emerald-500",
      text: "text-emerald-450",
    },
    {
      field: "lowInternetScore" as const,
      label: "Low Internet Tolerance",
      desc: "Functionality on offline cache or 2G connections.",
      color: "bg-blue-500",
      text: "text-blue-450",
    },
    {
      field: "languageScore" as const,
      label: "Multilingual Support",
      desc: "Availability of localization, dialect translation, or voice aids.",
      color: "bg-amber-500",
      text: "text-amber-400",
    },
    {
      field: "affordabilityScore" as const,
      label: "Economic Affordability",
      desc: "Pricing matched to lowest subsistence levels.",
      color: "bg-rose-500",
      text: "text-rose-455",
    },
    {
      field: "digitalLiteracyScore" as const,
      label: "Digital Literacy Adaptability",
      desc: "Familiarity required to operate controls.",
      color: "bg-cyan-500",
      text: "text-cyan-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-900 pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Inclusivity Assessment
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Evaluate whether the project accommodates rural communities, low
          bandwidth, and diverse literacy ranges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sliders panel */}
        <div className="md:col-span-2 rounded-2xl border border-slate-900 bg-slate-900/10 p-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-900 pb-2">
            Inclusivity Score Details
          </h4>

          <div className="space-y-3.5">
            {categories.map((c) => (
              <div key={c.field} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-350">
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
                    className="flex-1 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations panel */}
        <div className="md:col-span-1 rounded-2xl border border-indigo-950/40 bg-indigo-950/10 p-6 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-3">
              AI Inclusivity Suggestions
            </span>
            <ul className="space-y-3 list-none">
              {data.suggestions.map((sug, idx) => (
                <li
                  key={idx}
                  className="flex gap-2 text-xs text-slate-300 leading-relaxed items-start"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-900/60 text-[9px] text-slate-500 leading-relaxed">
            Suggestions comply with UN SDG 10 targets to reduce inequality in
            rural services.
          </div>
        </div>
      </div>
    </div>
  );
}

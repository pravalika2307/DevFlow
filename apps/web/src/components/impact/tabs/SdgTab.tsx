import React, { useState } from "react";
import { SdgMetric } from "../../../types/impact";
import { InnovationProject } from "../../../types/innovation";
import { DynamicImpactMap } from "../../ui/DynamicImpactMap";

interface SdgTabProps {
  sdgs: SdgMetric[];
  onUpdate: (sdgs: SdgMetric[]) => void;
  projects: InnovationProject[];
}

const SDG_LIST = [
  {
    num: 1,
    name: "No Poverty",
    color: "bg-red-650/15 border-red-500/20 text-red-400",
  },
  {
    num: 2,
    name: "Zero Hunger",
    color: "bg-amber-650/15 border-amber-500/20 text-amber-400",
  },
  {
    num: 3,
    name: "Good Health and Well-being",
    color: "bg-emerald-650/15 border-emerald-500/20 text-emerald-450",
  },
  {
    num: 4,
    name: "Quality Education",
    color: "bg-rose-650/15 border-rose-500/20 text-rose-450",
  },
  {
    num: 5,
    name: "Gender Equality",
    color: "bg-orange-600/15 border-orange-500/20 text-orange-400",
  },
  {
    num: 6,
    name: "Clean Water and Sanitation",
    color: "bg-blue-650/15 border-blue-500/20 text-blue-400",
  },
  {
    num: 7,
    name: "Affordable and Clean Energy",
    color: "bg-yellow-500/15 border-yellow-500/20 text-yellow-400",
  },
  {
    num: 8,
    name: "Decent Work and Economic Growth",
    color: "bg-red-800/15 border-red-800/20 text-red-300",
  },
  {
    num: 9,
    name: "Industry, Innovation and Infrastructure",
    color: "bg-orange-700/15 border-orange-700/20 text-orange-300",
  },
  {
    num: 10,
    name: "Reduced Inequalities",
    color: "bg-pink-650/15 border-pink-500/20 text-pink-400",
  },
  {
    num: 11,
    name: "Sustainable Cities and Communities",
    color: "bg-amber-600/15 border-amber-600/20 text-amber-300",
  },
  {
    num: 12,
    name: "Responsible Consumption and Production",
    color: "bg-teal-700/15 border-teal-700/20 text-teal-300",
  },
  {
    num: 13,
    name: "Climate Action",
    color: "bg-emerald-800/15 border-emerald-800/20 text-emerald-300",
  },
  {
    num: 14,
    name: "Life Below Water",
    color: "bg-blue-800/15 border-blue-800/20 text-blue-300",
  },
  {
    num: 15,
    name: "Life on Land",
    color: "bg-emerald-650/15 border-emerald-500/20 text-emerald-400",
  },
  {
    num: 16,
    name: "Peace, Justice and Strong Institutions",
    color: "bg-blue-900/15 border-blue-900/20 text-blue-200",
  },
  {
    num: 17,
    name: "Partnerships for the Goals",
    color: "bg-indigo-900/15 border-indigo-900/20 text-indigo-300",
  },
];

export function SdgTab({ sdgs, onUpdate, projects }: SdgTabProps) {
  const [sdgNum, setSdgNum] = useState<number>(4);
  const [contributionLevel, setContributionLevel] = useState(80);
  const [confidence, setConfidence] = useState(80);
  const [reasoning, setReasoning] = useState("");
  const [outcomes, setOutcomes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddSdg = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!reasoning.trim()) errs.reasoning = "Mapping reasoning is required";
    if (!outcomes.trim())
      errs.outcomes = "Expected outcomes statement is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const selectedDef = SDG_LIST.find((item) => item.num === sdgNum);
    const newMetric: SdgMetric = {
      sdgNumber: sdgNum,
      sdgName: selectedDef ? selectedDef.name : `SDG ${sdgNum}`,
      contributionLevel,
      confidence,
      reasoning: reasoning.trim(),
      outcomes: outcomes.trim(),
    };

    // Replace if already mapped, else add
    const exists = sdgs.findIndex((s) => s.sdgNumber === sdgNum) >= 0;
    let updated: SdgMetric[] = [];
    if (exists) {
      updated = sdgs.map((s) => (s.sdgNumber === sdgNum ? newMetric : s));
    } else {
      updated = [...sdgs, newMetric];
    }

    onUpdate(updated);

    window.dispatchEvent(
      new CustomEvent("devflow-task-complete", {
        detail: { task: "review-sdg" },
      }),
    );

    // Reset Form
    setReasoning("");
    setOutcomes("");
    setContributionLevel(80);
    setConfidence(80);
    setErrors({});
  };

  const handleRemoveSdg = (num: number) => {
    const updated = sdgs.filter((s) => s.sdgNumber !== num);
    onUpdate(updated);
  };

  const getSdgColor = (num: number) => {
    const found = SDG_LIST.find((s) => s.num === num);
    return found ? found.color : "bg-slate-900 border-slate-800 text-slate-400";
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          UN Sustainable Development Goals (SDGs)
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Map your project metrics directly against the 17 UN Sustainable
          Development Goals.
        </p>
      </div>

      {/* Dynamic Network Connection Map */}
      <DynamicImpactMap projects={projects} />

      {/* Mapped SDG Cards */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Target Mapped Goals
        </h4>

        {sdgs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sdgs.map((sdg) => (
              <div
                key={sdg.sdgNumber}
                className="rounded-xl border border-border-default bg-bg-card p-5 flex flex-col justify-between h-full space-y-4 shadow-md hover:border-border-accent transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getSdgColor(
                        sdg.sdgNumber,
                      )}`}
                    >
                      Goal {sdg.sdgNumber}: {sdg.sdgName}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSdg(sdg.sdgNumber)}
                      className="text-slate-500 hover:text-rose-accent p-1 rounded transition-colors"
                      aria-label="Remove SDG"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-xs text-slate-350 mt-3.5 leading-relaxed font-medium">
                    <strong className="text-slate-400 font-bold uppercase tracking-wider text-[9px] block mb-1">
                      Reasoning:
                    </strong>{" "}
                    {sdg.reasoning}
                  </p>
                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed font-medium">
                    <strong className="text-slate-450 font-bold uppercase tracking-wider text-[9px] block mb-1">
                      Outcomes:
                    </strong>{" "}
                    {sdg.outcomes}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-default text-[10px] font-bold uppercase tracking-wider">
                  <div>
                    <span className="text-slate-500 block">Contribution</span>
                    <span className="text-blue-accent block mt-0.5 font-extrabold text-xs">
                      {sdg.contributionLevel}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Confidence</span>
                    <span className="text-emerald-accent block mt-0.5 font-extrabold text-xs">
                      {sdg.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">
            No SDGs mapped yet. Define one below!
          </p>
        )}
      </div>

      {/* Inputs Form */}
      <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-5 space-y-4 shadow-lg animate-fade-in-up">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-accent border-b border-border-default pb-2">
          Map New SDG Alignment
        </h4>

        <form
          onSubmit={handleAddSdg}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                UN Goal Segment
              </label>
              <select
                value={sdgNum}
                onChange={(e) => setSdgNum(Number(e.target.value))}
                className="w-full df-input py-2.5 px-3 cursor-pointer text-xs font-semibold"
              >
                {SDG_LIST.map((t) => (
                  <option key={t.num} value={t.num}>
                    Goal {t.num}: {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Contribution Reasoning
              </label>
              <textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                rows={3}
                className={`w-full df-input p-3 ${
                  errors.reasoning ? "border-rose-accent" : ""
                }`}
                placeholder="Why does this technology assist this SDG?"
              />
              {errors.reasoning && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.reasoning}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Expected Outcomes
              </label>
              <input
                type="text"
                value={outcomes}
                onChange={(e) => setOutcomes(e.target.value)}
                className={`w-full df-input px-3 py-2.5 ${
                  errors.outcomes ? "border-rose-accent" : ""
                }`}
                placeholder="Measurable results of alignment..."
              />
              {errors.outcomes && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.outcomes}
                </p>
              )}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 bg-bg-card p-4 rounded-xl border border-border-default">
            <span className="df-section-label block mb-2">Metrics Weights</span>

            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-400 font-medium">
                  Contribution Level
                </span>
                <span className="text-white font-semibold">
                  {contributionLevel}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={contributionLevel}
                onChange={(e) => setContributionLevel(Number(e.target.value))}
                className="w-full h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-blue-accent"
              />
            </div>

            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-400 font-medium">Confidence</span>
                <span className="text-white font-semibold">{confidence}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={confidence}
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-blue-accent"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="df-btn df-btn-primary w-full py-2.5"
              >
                Map SDG Goal
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

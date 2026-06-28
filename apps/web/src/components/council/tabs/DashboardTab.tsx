import React, { useState } from "react";
import { AdvisorReview, CouncilProjectData } from "../../../types/council";

interface DashboardTabProps {
  data: CouncilProjectData;
  onUpdate: (data: Partial<CouncilProjectData>) => void;
}

export function DashboardTab({ data, onUpdate }: DashboardTabProps) {
  const [selectedAdvisorId, setSelectedAdvisorId] = useState<
    AdvisorReview["advisorId"] | null
  >(null);
  const [newVal, setNewVal] = useState("");

  const handleScoreChange = (
    advisorId: AdvisorReview["advisorId"],
    field: "score" | "confidence",
    val: number,
  ) => {
    const updatedAdvisors = data.advisors.map((adv) => {
      if (adv.advisorId === advisorId) {
        return {
          ...adv,
          [field]: val,
        };
      }
      return adv;
    });

    // Automatically recalculate consensus innovation and readiness scores
    const samsungScore =
      updatedAdvisors.find((a) => a.advisorId === "samsung")?.score ?? 60;
    const others = updatedAdvisors.filter((a) => a.advisorId !== "samsung");
    const othersAvg =
      others.reduce((acc, curr) => acc + curr.score, 0) / others.length;

    onUpdate({
      advisors: updatedAdvisors,
      consensus: {
        ...data.consensus,
        overallInnovationScore: Math.round((othersAvg + samsungScore) / 2),
        overallReadiness: Math.round(samsungScore),
      },
    });
  };

  const handleAddField = (
    advisorId: AdvisorReview["advisorId"],
    listField: "strengths" | "weaknesses" | "recommendations",
  ) => {
    if (!newVal.trim()) return;
    const updatedAdvisors = data.advisors.map((adv) => {
      if (adv.advisorId === advisorId) {
        return {
          ...adv,
          [listField]: [...adv[listField], newVal.trim()],
        };
      }
      return adv;
    });
    onUpdate({ advisors: updatedAdvisors });
    setNewVal("");
  };

  const handleRemoveField = (
    advisorId: AdvisorReview["advisorId"],
    listField: "strengths" | "weaknesses" | "recommendations",
    itemIdx: number,
  ) => {
    const updatedAdvisors = data.advisors.map((adv) => {
      if (adv.advisorId === advisorId) {
        return {
          ...adv,
          [listField]: adv[listField].filter((_, i) => i !== itemIdx),
        };
      }
      return adv;
    });
    onUpdate({ advisors: updatedAdvisors });
  };

  const getAvatarStyle = (id: string) => {
    switch (id) {
      case "mentor":
        return "from-amber-500 to-orange-500 text-amber-100";
      case "architect":
        return "from-blue-500 to-indigo-500 text-blue-100";
      case "ux":
        return "from-pink-500 to-rose-500 text-pink-100";
      case "sustainability":
        return "from-emerald-500 to-teal-500 text-emerald-100";
      case "strategist":
        return "from-purple-500 to-indigo-500 text-purple-100";
      case "research":
        return "from-cyan-500 to-blue-500 text-cyan-100";
      case "ethics":
        return "from-red-500 to-orange-500 text-red-100";
      default:
        return "from-violet-500 to-fuchsia-500 text-violet-100";
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          AI Expert Advisor Panel
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Review critical evaluation indices compiled by specialized AI advisors
          modeling Samsung criteria.
        </p>
      </div>

      {/* Grid of 8 advisors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.advisors.map((adv, idx) => {
          const avatar = getAvatarStyle(adv.advisorId);
          const active = selectedAdvisorId === adv.advisorId;
          return (
            <div
              key={adv.advisorId}
              className={`rounded-xl border p-5 flex flex-col justify-between space-y-4 transition-all relative overflow-hidden shadow-lg animate-fade-in-up ${
                active
                  ? "bg-bg-surface border-blue-accent"
                  : "bg-bg-card border-border-default hover:border-border-accent"
              }`}
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="flex gap-3">
                {/* Avatar Icon */}
                <div
                  className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${avatar} flex items-center justify-center font-black text-xs uppercase shadow-md shadow-slate-950/20`}
                >
                  {adv.advisorName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <h4 className="text-xs font-bold text-white truncate">
                      {adv.advisorName}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                      Score:{" "}
                      <strong className="text-blue-accent font-extrabold">
                        {adv.score}%
                      </strong>
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mt-1">
                    {adv.role}
                  </span>
                </div>
              </div>

              {/* Sliders for Score & Confidence */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border-default text-[10px] uppercase font-bold tracking-wider">
                <div className="space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Rating</span>
                    <span className="text-blue-accent">{adv.score}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={adv.score}
                    onChange={(e) =>
                      handleScoreChange(
                        adv.advisorId,
                        "score",
                        Number(e.target.value),
                      )
                    }
                    className="w-full h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-blue-accent"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Confidence</span>
                    <span className="text-emerald-accent">
                      {adv.confidence}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={adv.confidence}
                    onChange={(e) =>
                      handleScoreChange(
                        adv.advisorId,
                        "confidence",
                        Number(e.target.value),
                      )
                    }
                    className="w-full h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-blue-accent"
                  />
                </div>
              </div>

              {/* Trigger details drawer */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedAdvisorId(
                      selectedAdvisorId === adv.advisorId
                        ? null
                        : adv.advisorId,
                    )
                  }
                  className="text-[10px] font-bold text-blue-accent hover:text-white transition-colors uppercase tracking-wider"
                >
                  {selectedAdvisorId === adv.advisorId
                    ? "Collapse Feedback"
                    : "Explore Strengths & Weaknesses"}
                </button>
              </div>

              {/* Details Drawer */}
              {selectedAdvisorId === adv.advisorId && (
                <div className="pt-4 border-t border-border-default bg-bg-base/40 p-4 rounded-xl space-y-4 text-xs">
                  {/* Strengths */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-accent block">
                      Strengths
                    </span>
                    <ul className="space-y-1.5 list-none pl-1">
                      {adv.strengths.map((str, idx) => (
                        <li
                          key={idx}
                          className="text-[11px] text-slate-350 leading-relaxed flex items-center justify-between gap-2 font-medium"
                        >
                          <span className="flex gap-1.5 items-start">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-accent mt-1.5 flex-shrink-0" />
                            <span>{str}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveField(adv.advisorId, "strengths", idx)
                            }
                            className="text-slate-555 hover:text-rose-accent transition-colors p-0.5 rounded font-bold text-sm"
                            aria-label="Remove strength"
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newVal}
                        onChange={(e) => setNewVal(e.target.value)}
                        placeholder="Add positive factor..."
                        className="flex-1 df-input px-2.5 py-1 text-[10px]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleAddField(adv.advisorId, "strengths")
                        }
                        className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-semibold text-emerald-450 hover:bg-emerald-500/20 transition-all"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Weaknesses */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-rose-accent block">
                      Weaknesses
                    </span>
                    <ul className="space-y-1.5 list-none pl-1">
                      {adv.weaknesses.map((weak, idx) => (
                        <li
                          key={idx}
                          className="text-[11px] text-slate-355 leading-relaxed flex items-center justify-between gap-2 font-medium"
                        >
                          <span className="flex gap-1.5 items-start">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-accent mt-1.5 flex-shrink-0" />
                            <span>{weak}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveField(
                                adv.advisorId,
                                "weaknesses",
                                idx,
                              )
                            }
                            className="text-slate-555 hover:text-rose-accent transition-colors p-0.5 rounded font-bold text-sm"
                            aria-label="Remove weakness"
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newVal}
                        onChange={(e) => setNewVal(e.target.value)}
                        placeholder="Add constraint/pain point..."
                        className="flex-1 df-input px-2.5 py-1 text-[10px]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleAddField(adv.advisorId, "weaknesses")
                        }
                        className="rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-[10px] font-semibold text-rose-450 hover:bg-rose-500/20 transition-all"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-accent block">
                      AI Advisory Recommendations
                    </span>
                    <ul className="space-y-1.5 list-none pl-1">
                      {adv.recommendations.map((rec, idx) => (
                        <li
                          key={idx}
                          className="text-[11px] text-slate-350 leading-relaxed flex items-center justify-between gap-2 font-semibold"
                        >
                          <span className="flex gap-1.5 items-start">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-accent mt-1.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveField(
                                adv.advisorId,
                                "recommendations",
                                idx,
                              )
                            }
                            className="text-slate-555 hover:text-rose-accent transition-colors p-0.5 rounded font-bold text-sm"
                            aria-label="Remove recommendation"
                          >
                            &times;
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={newVal}
                        onChange={(e) => setNewVal(e.target.value)}
                        placeholder="Add advisor mitigation task..."
                        className="flex-1 df-input px-2.5 py-1 text-[10px]"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleAddField(adv.advisorId, "recommendations")
                        }
                        className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-[10px] font-semibold text-blue-450 hover:bg-blue-500/20 transition-all"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

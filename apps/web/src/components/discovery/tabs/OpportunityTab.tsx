import React, { useState } from "react";
import { OpportunityItem } from "../../../types/discovery";

interface OpportunityTabProps {
  opportunities: OpportunityItem[];
  onUpdate: (opportunities: OpportunityItem[]) => void;
}

const OPPORTUNITY_TYPES = [
  "High Impact",
  "Quick Win",
  "Long-term",
  "Innovation Area",
] as const;

export function OpportunityTab({
  opportunities,
  onUpdate,
}: OpportunityTabProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<OpportunityItem["type"]>("High Impact");

  const [impact, setImpact] = useState(80);
  const [feasibility, setFeasibility] = useState(80);
  const [scalability, setScalability] = useState(80);
  const [novelty, setNovelty] = useState(80);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!title.trim()) errs.title = "Opportunity title is required";
    if (!description.trim())
      errs.description = "Opportunity description is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newItem: OpportunityItem = {
      id: `opp-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      type,
      impact,
      feasibility,
      scalability,
      novelty,
    };

    const updated = [...opportunities, newItem];
    onUpdate(updated);

    // Reset Form
    setTitle("");
    setDescription("");
    setType("High Impact");
    setImpact(80);
    setFeasibility(80);
    setScalability(80);
    setNovelty(80);
    setErrors({});
  };

  const handleRemoveOpportunity = (id: string) => {
    const updated = opportunities.filter((o) => o.id !== id);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Opportunity Mapper
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Map high-leverage opportunities, quick wins, and long-term research
          trajectories. Rank by feasibility, impact, and scaling factors.
        </p>
      </div>

      {/* Grid of opportunities */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Ranked Innovation Opportunities Matrix
        </h4>

        {opportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opportunities.map((opp) => (
              <div
                key={opp.id}
                className="rounded-xl border border-border-default bg-bg-card p-5 flex flex-col justify-between h-full space-y-4 shadow-md hover:border-border-accent transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="df-badge df-badge-blue">{opp.type}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveOpportunity(opp.id)}
                      className="text-slate-500 hover:text-rose-accent p-1 rounded transition-colors"
                      aria-label="Remove opportunity"
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
                  <h5 className="text-sm font-bold text-white tracking-tight mt-3">
                    {opp.title}
                  </h5>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {opp.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border-default text-[10px] text-slate-450 font-bold uppercase tracking-wider">
                  <div>
                    <span className="text-slate-500 block">Impact</span>
                    <span className="font-extrabold text-blue-accent block mt-0.5">
                      {opp.impact}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Feasibility</span>
                    <span className="font-extrabold text-cyan-accent block mt-0.5">
                      {opp.feasibility}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Scalability</span>
                    <span className="font-extrabold text-emerald-accent block mt-0.5">
                      {opp.scalability}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Novelty</span>
                    <span className="font-extrabold text-violet-accent block mt-0.5">
                      {opp.novelty}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">
            No opportunities mapped yet. Submit a new area below!
          </p>
        )}
      </div>

      {/* Inputs Form */}
      <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-5 space-y-4 shadow-lg animate-fade-in-up">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-accent border-b border-border-default pb-2">
          Record Design Opportunity
        </h4>

        <form
          onSubmit={handleAddOpportunity}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Opportunity Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full df-input px-3 py-2.5 ${
                  errors.title ? "border-rose-accent" : ""
                }`}
                placeholder="e.g. Pi-based local web servers"
              />
              {errors.title && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Concept Classification
              </label>
              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as OpportunityItem["type"])
                }
                className="w-full df-input py-2.5 px-3 cursor-pointer text-xs font-semibold"
              >
                {OPPORTUNITY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Description / Alignment
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={`w-full df-input p-3 ${
                  errors.description ? "border-rose-accent" : ""
                }`}
                placeholder="Why does this opportunity bypass existing failures?"
              />
              {errors.description && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3 bg-bg-card p-4 rounded-xl border border-border-default">
            <span className="df-section-label block mb-2">
              Opportunity Scoring
            </span>

            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-400 font-medium">Impact Value</span>
                <span className="text-white font-semibold">{impact}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={impact}
                onChange={(e) => setImpact(Number(e.target.value))}
                className="w-full h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-blue-accent"
              />
            </div>

            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-400 font-medium">Feasibility</span>
                <span className="text-white font-semibold">{feasibility}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={feasibility}
                onChange={(e) => setFeasibility(Number(e.target.value))}
                className="w-full h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-blue-accent"
              />
            </div>

            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-400 font-medium">Scalability</span>
                <span className="text-white font-semibold">{scalability}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={scalability}
                onChange={(e) => setScalability(Number(e.target.value))}
                className="w-full h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-blue-accent"
              />
            </div>

            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-400 font-medium">Novelty</span>
                <span className="text-white font-semibold">{novelty}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={novelty}
                onChange={(e) => setNovelty(Number(e.target.value))}
                className="w-full h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-blue-accent"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="df-btn df-btn-primary w-full py-2.5"
              >
                Log Opportunity Area
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

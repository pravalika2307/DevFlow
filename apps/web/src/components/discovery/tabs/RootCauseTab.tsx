import React, { useState } from "react";
import {
  RootCauseAnalysisData,
  FiveWhysNode,
  FishboneCategory,
} from "../../../types/discovery";

interface RootCauseTabProps {
  data: RootCauseAnalysisData;
  onUpdate: (rootCause: RootCauseAnalysisData) => void;
}

export function RootCauseTab({ data, onUpdate }: RootCauseTabProps) {
  const [fiveWhys, setFiveWhys] = useState<FiveWhysNode[]>(data.fiveWhys);
  const [fishbone, setFishbone] = useState<FishboneCategory[]>(data.fishbone);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [newCause, setNewCause] = useState("");

  const handleWhyChange = (
    index: number,
    field: "question" | "answer",
    val: string,
  ) => {
    const updated = fiveWhys.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: val };
      }
      return item;
    });
    setFiveWhys(updated);
    onUpdate({ fiveWhys: updated, fishbone });
  };

  const handleAddCause = (category: FishboneCategory["category"]) => {
    if (!newCause.trim()) return;
    const updated = fishbone.map((item) => {
      if (item.category === category) {
        return {
          ...item,
          causes: [...item.causes, newCause.trim()],
        };
      }
      return item;
    });
    setFishbone(updated);
    onUpdate({ fiveWhys, fishbone: updated });
    setNewCause("");
  };

  const handleRemoveCause = (
    category: FishboneCategory["category"],
    causeIdx: number,
  ) => {
    const updated = fishbone.map((item) => {
      if (item.category === category) {
        return {
          ...item,
          causes: item.causes.filter((_, idx) => idx !== causeIdx),
        };
      }
      return item;
    });
    setFishbone(updated);
    onUpdate({ fiveWhys, fishbone: updated });
  };

  return (
    <div className="space-y-8">
      {/* 5 Whys Analysis */}
      <div className="space-y-4">
        <div className="border-b border-border-default pb-3">
          <h3 className="text-base font-bold text-white tracking-tight">
            5 Whys Analysis
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Drill down into the root causes of the problem by asking
            &quot;Why&quot; sequentially.
          </p>
        </div>

        <div className="space-y-3">
          {fiveWhys.map((node, idx) => (
            <div
              key={node.whyNumber}
              className="rounded-xl border border-border-default bg-bg-card p-5 space-y-3 relative overflow-hidden shadow-md animate-fade-in-up"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-accent" />
              <div className="flex items-center gap-2 pl-2">
                <span className="df-badge df-badge-blue">
                  #{node.whyNumber}
                </span>
                <span className="text-xs font-bold text-white tracking-tight">
                  Why Step {node.whyNumber}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2">
                <div>
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Question
                  </label>
                  <input
                    type="text"
                    value={node.question}
                    onChange={(e) =>
                      handleWhyChange(idx, "question", e.target.value)
                    }
                    className="w-full df-input px-3 py-2"
                    placeholder="Ask why..."
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                    Answer
                  </label>
                  <input
                    type="text"
                    value={node.answer}
                    onChange={(e) =>
                      handleWhyChange(idx, "answer", e.target.value)
                    }
                    className="w-full df-input px-3 py-2"
                    placeholder="Provide answer..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fishbone Ishikawa Diagram */}
      <div className="space-y-4">
        <div className="border-b border-border-default pb-3">
          <h3 className="text-base font-bold text-white tracking-tight">
            Fishbone (Ishikawa) Diagram
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Group causes of problem failures under five structured categories.
            Click to explore causes.
          </p>
        </div>

        {/* Visual Skeleton Row */}
        <div className="relative border border-border-default rounded-2xl bg-bg-card p-6 overflow-x-auto min-w-[600px] select-none h-64 flex flex-col justify-between shadow-lg">
          <div className="absolute inset-0 -z-10 bg-grid-slate-900/50" />

          {/* Top Ribs */}
          <div className="grid grid-cols-5 gap-4 relative h-24">
            {fishbone.slice(0, 3).map((item) => (
              <button
                key={item.category}
                type="button"
                onClick={() => setSelectedCategory(item.category)}
                className={`rounded-xl border p-3 flex flex-col items-center justify-center transition-all h-full ${
                  selectedCategory === item.category
                    ? "bg-blue-accent/10 border-blue-accent text-blue-accent"
                    : "bg-bg-base border-border-default text-slate-400 hover:bg-white/[0.02] hover:text-white"
                }`}
              >
                <span className="text-xs font-bold">{item.category}</span>
                <span className="text-[10px] text-slate-500 mt-1.5 font-bold uppercase tracking-wider">
                  {item.causes.length} causes
                </span>
              </button>
            ))}
          </div>

          {/* Central Spine Line */}
          <div className="relative h-2.5 w-full bg-border-accent rounded-full my-3 flex items-center justify-end pr-2">
            <div className="absolute right-0 h-4 w-4 bg-border-strong transform rotate-45 -mr-1" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mr-6">
              Problem Effect
            </span>
          </div>

          {/* Bottom Ribs */}
          <div className="grid grid-cols-5 gap-4 relative h-24">
            <div className="col-span-1" />
            {fishbone.slice(3).map((item) => (
              <button
                key={item.category}
                type="button"
                onClick={() => setSelectedCategory(item.category)}
                className={`rounded-xl border p-3 flex flex-col items-center justify-center transition-all h-full ${
                  selectedCategory === item.category
                    ? "bg-blue-accent/10 border-blue-accent text-blue-accent"
                    : "bg-bg-base border-border-default text-slate-400 hover:bg-white/[0.02] hover:text-white"
                }`}
              >
                <span className="text-xs font-bold">{item.category}</span>
                <span className="text-[10px] text-slate-500 mt-1.5 font-bold uppercase tracking-wider">
                  {item.causes.length} causes
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category Editor */}
        {selectedCategory && (
          <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-5 space-y-4 shadow-lg animate-fade-in-up">
            <div className="flex items-center justify-between border-b border-border-default pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-accent">
                Explore causes: {selectedCategory}
              </h4>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="text-[10px] text-slate-500 hover:text-white font-bold uppercase tracking-wider"
              >
                Close Editor
              </button>
            </div>

            {/* List */}
            {fishbone.find((f) => f.category === selectedCategory)?.causes
              .length ?? 0 > 0 ? (
              <div className="flex flex-wrap gap-2">
                {fishbone
                  .find((f) => f.category === selectedCategory)
                  ?.causes.map((cause, idx) => (
                    <span
                      key={idx}
                      className="rounded-lg border border-border-default bg-bg-card px-3 py-1.5 text-xs text-slate-350 flex items-center gap-2 font-medium"
                    >
                      {cause}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveCause(
                            selectedCategory as FishboneCategory["category"],
                            idx,
                          )
                        }
                        className="text-slate-500 hover:text-rose-accent transition-colors font-bold text-sm"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                No causes logged in this category yet. Submit one below!
              </p>
            )}

            {/* Add Cause */}
            <div className="flex gap-2 items-center pt-2">
              <input
                type="text"
                value={newCause}
                onChange={(e) => setNewCause(e.target.value)}
                className="flex-1 df-input px-3 py-2.5"
                placeholder={`Submit a new cause for ${selectedCategory}...`}
              />
              <button
                type="button"
                onClick={() =>
                  handleAddCause(
                    selectedCategory as FishboneCategory["category"],
                  )
                }
                className="df-btn df-btn-primary px-4 py-2.5"
              >
                Add Cause
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

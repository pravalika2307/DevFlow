import React, { useState } from "react";
import { InnovationProject, Idea } from "../../../types/innovation";

interface IdeateStageProps {
  project: InnovationProject;
  onUpdate: (ideas: Idea[]) => void;
}

export function IdeateStage({ project, onUpdate }: IdeateStageProps) {
  const [ideas, setIdeas] = useState<Idea[]>(project.ideate);

  // New Idea form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [innovationScore, setInnovationScore] = useState(80);
  const [feasibility, setFeasibility] = useState(80);
  const [socialImpact, setSocialImpact] = useState(80);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!title.trim()) errs.title = "Idea title is required";
    if (!description.trim()) errs.description = "Idea description is required";
    else if (description.trim().length < 15)
      errs.description = "Must be at least 15 characters";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // AI recommendation simulation based on scores
    let recommendation = "";
    const avgScore = (innovationScore + feasibility + socialImpact) / 3;
    if (avgScore >= 85) {
      recommendation =
        "Excellent overall profile. Highly recommended for prototype stage.";
    } else if (feasibility < 60) {
      recommendation =
        "High complexity detected. Consider simplifying core technology dependencies to raise feasibility.";
    } else if (innovationScore < 60) {
      recommendation =
        "Low novelty score. Consider adding IoT, automation, or edge-vision levers to boost innovation.";
    } else {
      recommendation =
        "Solid concept. Refine user interface and accessibility targets before moving to prototype.";
    }

    const newIdea: Idea = {
      id: `idea-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      innovationScore,
      feasibility,
      socialImpact,
      aiRecommendation: recommendation,
      isSelected: false,
    };

    const updated = [...ideas, newIdea];
    setIdeas(updated);
    onUpdate(updated);

    // Reset Form
    setTitle("");
    setDescription("");
    setInnovationScore(80);
    setFeasibility(80);
    setSocialImpact(80);
    setErrors({});
  };

  const handleSelectSolution = (id: string) => {
    const updated = ideas.map((idea) => ({
      ...idea,
      isSelected: idea.id === id,
    }));
    setIdeas(updated);
    onUpdate(updated);
  };

  const handleRemoveIdea = (id: string) => {
    const updated = ideas.filter((idea) => idea.id !== id);
    setIdeas(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Stage 3: Ideate
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Brainstorm and record multiple solution paths. Select one primary
          concept as your target implementation.
        </p>
      </div>

      {/* Ideas list grid */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Brainstormed Ideas List
        </h4>

        {ideas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className={`rounded-xl border p-5 shadow-sm flex flex-col justify-between transition-all ${
                  idea.isSelected
                    ? "border-blue-accent/50 bg-blue-accent/10 shadow-lg shadow-blue-accent/5"
                    : "border-border-default bg-bg-card hover:border-border-accent"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-sm font-bold text-white tracking-tight">
                      {idea.title}
                    </h5>
                    <button
                      type="button"
                      onClick={() => handleRemoveIdea(idea.id)}
                      className="text-slate-500 hover:text-rose-accent p-1 rounded transition-colors"
                      aria-label="Remove idea"
                    >
                      <svg
                        className="h-4 w-4"
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
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {idea.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-border-default space-y-3">
                  {/* Scores row */}
                  <div className="grid grid-cols-3 gap-2 text-[10px] font-medium">
                    <div>
                      <span className="text-slate-500 block uppercase tracking-wider">
                        Innovation
                      </span>
                      <span className="font-bold text-blue-accent block mt-0.5">
                        {idea.innovationScore}%
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase tracking-wider">
                        Feasibility
                      </span>
                      <span className="font-bold text-cyan-accent block mt-0.5">
                        {idea.feasibility}%
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block uppercase tracking-wider">
                        Impact
                      </span>
                      <span className="font-bold text-emerald-accent block mt-0.5">
                        {idea.socialImpact}%
                      </span>
                    </div>
                  </div>

                  {/* AI Suggestion */}
                  <div className="rounded-lg bg-bg-base p-2 text-[10px] text-slate-400 border border-border-default leading-relaxed">
                    <strong>AI Recommendation:</strong> {idea.aiRecommendation}
                  </div>

                  {/* Selected Toggle */}
                  <button
                    type="button"
                    onClick={() => handleSelectSolution(idea.id)}
                    className={`w-full rounded-xl py-2 text-center text-xs font-bold border transition-all ${
                      idea.isSelected
                        ? "bg-blue-accent/25 text-blue-accent border-blue-accent/40 shadow-sm"
                        : "bg-transparent text-slate-400 border-border-default hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {idea.isSelected
                      ? "Selected Solution"
                      : "Select as Solution"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">
            No ideas brainstormed yet. Submit one below!
          </p>
        )}
      </div>

      {/* Add idea form */}
      <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-5 space-y-4 shadow-lg">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-accent border-b border-border-default pb-2">
          Submit Brainstormed Concept
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Idea Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full df-input px-3 py-2.5 ${
                  errors.title ? "border-rose-accent" : ""
                }`}
                placeholder="e.g. Laser Spectroscopy sorter"
              />
              {errors.title && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Concept Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={`w-full df-input p-3 ${
                  errors.description ? "border-rose-accent" : ""
                }`}
                placeholder="How does this solution address the user pains?"
              />
              {errors.description && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          {/* Scores sliders */}
          <div className="space-y-3 bg-bg-card p-4 rounded-xl border border-border-default">
            <span className="df-section-label block mb-2">
              Concept Estimation
            </span>

            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-400 font-medium">Novelty</span>
                <span className="text-white font-semibold">
                  {innovationScore}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={innovationScore}
                onChange={(e) => setInnovationScore(Number(e.target.value))}
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
                <span className="text-slate-400 font-medium">
                  Social Impact
                </span>
                <span className="text-white font-semibold">
                  {socialImpact}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={socialImpact}
                onChange={(e) => setSocialImpact(Number(e.target.value))}
                className="w-full h-1 bg-white/[0.04] rounded-lg appearance-none cursor-pointer accent-blue-accent"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddIdea}
                className="df-btn df-btn-primary w-full py-2.5"
              >
                Log Brainstormed Idea
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

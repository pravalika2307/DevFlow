import React, { useState } from "react";
import { InnovationProject, EmpathiseData } from "../../../types/innovation";

interface EmpathiseStageProps {
  project: InnovationProject;
  onUpdate: (data: EmpathiseData) => void;
}

export function EmpathiseStage({ project, onUpdate }: EmpathiseStageProps) {
  const [targetUser, setTargetUser] = useState(project.empathise.targetUser);
  const [userPersona, setUserPersona] = useState(project.empathise.userPersona);
  const [goals, setGoals] = useState(project.empathise.goals);
  const [pains, setPains] = useState(project.empathise.pains);
  const [behaviours, setBehaviours] = useState(project.empathise.behaviours);
  const [needs, setNeeds] = useState(project.empathise.needs);

  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isReviewed, setIsReviewed] = useState(false);

  const handleSave = () => {
    onUpdate({
      targetUser: targetUser.trim(),
      userPersona: userPersona.trim(),
      goals: goals.trim(),
      pains: pains.trim(),
      behaviours: behaviours.trim(),
      needs: needs.trim(),
    });
  };

  const handleAIReview = () => {
    const suggestions: string[] = [];

    if (targetUser.trim().length < 15) {
      suggestions.push(
        "Target User description is too vague. Specify age brackets, technical familiarity, and regional setting.",
      );
    }
    if (userPersona.trim().length < 15) {
      suggestions.push(
        "User Persona lacks detail. Give your persona a name (e.g. Ramesh) and detailed context representing the cohort.",
      );
    }
    if (goals.trim().length < 15) {
      suggestions.push(
        "User Goals are too broad. Define specific actions the user wants to take (e.g. 'download modules' instead of 'learn').",
      );
    }
    if (pains.trim().length < 15) {
      suggestions.push(
        "Pains statement is too brief. Quantify their cost or difficulty (e.g., spending 20% of income on fuel).",
      );
    }
    if (behaviours.trim().length < 15) {
      suggestions.push(
        "Behaviours should describe regular routines and constraints (e.g., sharing a phone with 5 family members).",
      );
    }
    if (needs.trim().length < 15) {
      suggestions.push(
        "Needs statement is too simple. Focus on a design solution requirement rather than stating 'clean water'.",
      );
    }

    if (suggestions.length === 0) {
      suggestions.push(
        "Excellent work! All empathy fields are rich, specific, and provide high clarity for Samsung Solve for Tomorrow criteria.",
      );
    }

    setAiSuggestions(suggestions);
    setIsReviewed(true);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-900 pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Stage 1: Empathise
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Develop a deep, observation-based understanding of the target users
          and their environments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Target User Demographic
          </label>
          <textarea
            value={targetUser}
            onChange={(e) => setTargetUser(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
            placeholder="Who are you designing this solution for?"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            User Persona 代表 (Representative)
          </label>
          <textarea
            value={userPersona}
            onChange={(e) => setUserPersona(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
            placeholder="Introduce a representative user profile (e.g. Ramesh, age 12...)"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            User Goals
          </label>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
            placeholder="What positive outcomes does the user wish to achieve?"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            User Pains & Obstacles
          </label>
          <textarea
            value={pains}
            onChange={(e) => setPains(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
            placeholder="What current barriers cause frustration or cost?"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Behaviours & Habits
          </label>
          <textarea
            value={behaviours}
            onChange={(e) => setBehaviours(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
            placeholder="What daily habits and device sharing restrictions exist?"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            User Needs Statement
          </label>
          <textarea
            value={needs}
            onChange={(e) => setNeeds(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white focus:border-indigo-500 focus:outline-none"
            placeholder="What is the key functional requirement needed to support them?"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 border-t border-slate-900 pt-4">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-750 transition-colors"
        >
          Save Phase Inputs
        </button>
        <button
          type="button"
          onClick={handleAIReview}
          className="rounded-xl bg-gradient-to-r from-indigo-650 to-violet-650 px-4 py-2 text-xs font-semibold text-white hover:from-indigo-600 hover:to-violet-600 transition-all flex items-center gap-1.5"
        >
          <svg
            className="h-4 w-4 animate-pulse"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 21l8.982-5.097c.36-.204.64-.543.766-.948l.848-2.735a2.25 2.25 0 00-1.848-2.883l-2.61-.227a1.056 1.056 0 01-.827-.58l-1.084-2.114a2.25 2.25 0 00-4.004 0L8.14 8.766a1.056 1.056 0 01-.827.58l-2.61.227a2.25 2.25 0 00-1.848 2.883l.848 2.735c.127.405.406.744.766.948l8.982 5.097z"
            />
          </svg>
          AI Review Empathy
        </button>
      </div>

      {/* AI Suggestion Panel */}
      {isReviewed && (
        <div className="rounded-xl border border-indigo-950/50 bg-indigo-950/10 p-5 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Coach Empathy Review Suggestions:
          </h4>
          <ul className="space-y-1.5 list-disc pl-4 text-xs text-slate-300 leading-relaxed">
            {aiSuggestions.map((sug, i) => (
              <li key={i}>{sug}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { InnovationProject, DefineData } from "../../../types/innovation";

interface DefineStageProps {
  project: InnovationProject;
  onUpdate: (data: DefineData) => void;
}

export function DefineStage({ project, onUpdate }: DefineStageProps) {
  const [problemStatement, setProblemStatement] = useState(
    project.define.problemStatement,
  );
  const [opportunityStatement, setOpportunityStatement] = useState(
    project.define.opportunityStatement,
  );
  const [howMightWe, setHowMightWe] = useState(project.define.howMightWe);
  const [successMetrics, setSuccessMetrics] = useState(
    project.define.successMetrics,
  );

  const [clarityScore, setClarityScore] = useState<number | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const handleSave = () => {
    onUpdate({
      problemStatement: problemStatement.trim(),
      opportunityStatement: opportunityStatement.trim(),
      howMightWe: howMightWe.trim(),
      successMetrics: successMetrics.trim(),
    });
  };

  const handleClarityScore = () => {
    let score = 95;
    const suggestions: string[] = [];

    // Problem Statement length and keyword check
    if (problemStatement.trim().length < 20) {
      score -= 15;
      suggestions.push(
        "Problem statement is too short. Describe the user cohort, their exact problem, and why current options fail.",
      );
    }
    if (
      !problemStatement.toLowerCase().includes("how") &&
      !problemStatement.toLowerCase().includes("lacks") &&
      !problemStatement.toLowerCase().includes("prevent")
    ) {
      score -= 5;
      suggestions.push(
        "Add active action verbs or impact qualifiers to define the problem urgency clearly.",
      );
    }

    // Opportunity Statement check
    if (opportunityStatement.trim().length < 20) {
      score -= 10;
      suggestions.push(
        "Opportunity statement lacks definition. Specify what technological lever (e.g. computer vision, offline servers) enables this solution.",
      );
    }

    // How Might We check
    if (!howMightWe.toLowerCase().startsWith("how might we")) {
      score -= 10;
      suggestions.push(
        "'How Might We' question must start with the exact phrase 'How Might We' to set a structured design focus.",
      );
    }
    if (howMightWe.trim().length < 20) {
      score -= 5;
      suggestions.push(
        "Your HMW question is too narrow. A good HMW allows for multiple ideation approaches (e.g., 'How might we supply clean water' vs 'How might we build a clay pot').",
      );
    }

    // Success metrics check
    if (successMetrics.trim().length < 10) {
      score -= 10;
      suggestions.push(
        "Success metrics should be quantifiable (e.g. daily processed volume, accuracy ratings). Avoid general statements like 'clean water for everyone'.",
      );
    }

    setClarityScore(Math.max(score, 30));
    setAiSuggestions(
      suggestions.length > 0
        ? suggestions
        : [
            "Your statements are highly specific, follow Samsung Solve for Tomorrow definition frameworks, and list quantifiable target metrics!",
          ],
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Stage 2: Define
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Define a specific problem statement, specify the leverage opportunity,
          and frame the structured design question.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Refined Problem Statement
          </label>
          <textarea
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            rows={3}
            className="w-full df-input p-3"
            placeholder="Who has what specific problem, and why does it occur?"
          />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Opportunity Statement
          </label>
          <textarea
            value={opportunityStatement}
            onChange={(e) => setOpportunityStatement(e.target.value)}
            rows={3}
            className="w-full df-input p-3"
            placeholder="What recent technology, cost reduction, or environmental factor enables a unique solution?"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              How Might We (HMW) Question
            </label>
            <input
              type="text"
              value={howMightWe}
              onChange={(e) => setHowMightWe(e.target.value)}
              className="w-full df-input px-3 py-2.5"
              placeholder="How Might We [action] for [user] so that [impact]?"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Define Success Metrics
            </label>
            <input
              type="text"
              value={successMetrics}
              onChange={(e) => setSuccessMetrics(e.target.value)}
              className="w-full df-input px-3 py-2.5"
              placeholder="What measurable indicators prove the problem is resolved?"
            />
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex items-center gap-3 border-t border-border-default pt-4">
        <button
          type="button"
          onClick={handleSave}
          className="df-btn df-btn-ghost"
        >
          Save Phase Inputs
        </button>
        <button
          type="button"
          onClick={handleClarityScore}
          className="df-btn df-btn-primary"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3"
            />
          </svg>
          Score Statement Clarity
        </button>
      </div>

      {/* AI Score Feedback Panel */}
      {clarityScore !== null && (
        <div className="rounded-xl border border-violet-accent/20 bg-violet-accent/5 p-5 grid grid-cols-1 md:grid-cols-4 gap-6 items-center animate-fade-in-up">
          <div className="md:col-span-1 flex flex-col items-center justify-center border-r border-border-default pr-4">
            <span className="text-[9px] uppercase tracking-wider text-slate-500 mb-1 font-bold">
              Clarity Score
            </span>
            <span className="text-3xl font-extrabold text-violet-accent">
              {clarityScore}/100
            </span>
          </div>
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-violet-accent">
              Clarity Improvements Recommended:
            </h4>
            <ul className="space-y-1.5 list-disc pl-4 text-xs text-slate-350 leading-relaxed font-medium">
              {aiSuggestions.map((sug, i) => (
                <li key={i}>{sug}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

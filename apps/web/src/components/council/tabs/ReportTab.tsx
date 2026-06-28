import React from "react";
import { CouncilProjectData } from "../../../types/council";
import { InnovationProject } from "../../../types/innovation";

interface ReportTabProps {
  project: InnovationProject;
  data: CouncilProjectData;
  onUpdate: (data: Partial<CouncilProjectData>) => void;
}

export function ReportTab({ project, data, onUpdate }: ReportTabProps) {
  const handlePrint = () => {
    window.print();
  };

  const handleTextChange = (
    field: "executiveSummary" | "overallRecommendation",
    val: string,
  ) => {
    onUpdate({
      report: {
        ...data.report,
        [field]: val,
      },
    });
  };

  const handleAddImprovement = (val: string) => {
    if (!val.trim()) return;
    onUpdate({
      report: {
        ...data.report,
        priorityImprovements: [...data.report.priorityImprovements, val.trim()],
      },
    });
  };

  const handleRemoveImprovement = (idx: number) => {
    onUpdate({
      report: {
        ...data.report,
        priorityImprovements: data.report.priorityImprovements.filter(
          (_, i) => i !== idx,
        ),
      },
    });
  };

  const [newImp, setNewImp] = React.useState("");

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex justify-between items-center border-b border-border-default pb-3 flex-wrap gap-2 print:hidden">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Project Review Report
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Polished, multi-expert evaluation summary prepared for
            presentations.
          </p>
        </div>
        <button
          type="button"
          onClick={handlePrint}
          className="df-btn df-btn-secondary"
          style={{ padding: "8px 16px" }}
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
              d="M6.72 13.844l-.278-1.496A1.875 1.875 0 018.282 10H15.72a1.875 1.875 0 011.838 2.348l-.278 1.496A1.875 1.875 0 0115.442 15.25H8.558a1.875 1.875 0 01-1.838-1.406zM15 15.25v2.25A2.25 2.25 0 0112.75 19.75h-1.5A2.25 2.25 0 019 17.5v-2.25m6-3.75V8.25A2.25 2.25 0 0012.75 6h-1.5A2.25 2.25 0 009 8.25v3.25"
            />
          </svg>
          Print Report Sheet
        </button>
      </div>

      {/* A4 Report Sheet Canvas */}
      <div className="rounded-2xl border border-border-default bg-bg-card p-8 space-y-6 text-slate-200 border-dashed shadow-xl animate-fade-in-up print:border-solid print:bg-white print:text-black print:p-12 print:my-0">
        {/* Pitch Title */}
        <div className="flex justify-between items-start border-b border-border-default print:border-slate-300 pb-5">
          <div>
            <span className="df-badge df-badge-violet print:border print:border-indigo-400">
              Multi-Agent NOVA Council Evaluation Report
            </span>
            <h2 className="text-2xl font-black text-white print:text-black tracking-tight mt-4">
              {project.name}
            </h2>
            <p className="text-xs text-slate-400 print:text-slate-500 mt-2 font-semibold">
              Innovation Theme Category:{" "}
              <strong className="text-slate-200 print:text-slate-800">
                {project.innovationTheme}
              </strong>
            </p>
          </div>

          <div className="text-right flex gap-6">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block">
                Innovation Score
              </span>
              <span className="text-2xl font-black text-blue-accent mt-1.5 block">
                {data.consensus.overallInnovationScore}%
              </span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block">
                Readiness Score
              </span>
              <span className="text-2xl font-black text-emerald-accent mt-1.5 block">
                {data.consensus.overallReadiness}%
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 print:text-slate-600">
            Executive Summary
          </label>
          <textarea
            value={data.report.executiveSummary}
            onChange={(e) =>
              handleTextChange("executiveSummary", e.target.value)
            }
            rows={3}
            className="w-full df-input p-3 print:bg-transparent print:border-none print:p-0 print:text-black"
            placeholder="Executive summary of the evaluation..."
          />
        </div>

        {/* Overall Recommendation */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-455 print:text-slate-600">
            Overall Recommendation
          </label>
          <textarea
            value={data.report.overallRecommendation}
            onChange={(e) =>
              handleTextChange("overallRecommendation", e.target.value)
            }
            rows={2}
            className="w-full df-input p-3 text-blue-accent font-semibold print:bg-transparent print:border-none print:p-0 print:text-black print:font-bold"
            placeholder="Final recommendation to the implementation team..."
          />
        </div>

        {/* Priority Improvements List */}
        <div className="space-y-3">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-455 print:text-slate-600">
            Priority Improvements Needed
          </label>

          <ul className="space-y-2.5 list-none pl-1">
            {data.report.priorityImprovements.map((imp, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-300 print:text-black leading-relaxed flex items-center justify-between gap-2"
              >
                <span className="flex gap-2 items-start font-medium animate-fade-in-up">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-accent mt-1.5 flex-shrink-0" />
                  <span>{imp}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveImprovement(idx)}
                  className="text-slate-555 hover:text-rose-accent transition-colors p-0.5 rounded print:hidden font-bold text-sm"
                  aria-label="Remove improvement"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 pt-1 print:hidden">
            <input
              type="text"
              value={newImp}
              onChange={(e) => setNewImp(e.target.value)}
              placeholder="Add key improvement point..."
              className="flex-1 df-input px-3 py-2"
            />
            <button
              type="button"
              onClick={() => {
                handleAddImprovement(newImp);
                setNewImp("");
              }}
              className="df-btn df-btn-primary px-4 py-2"
            >
              Add Improvement
            </button>
          </div>
        </div>

        {/* Advisor Score matrix summary for print */}
        <div className="pt-6 border-t border-border-default print:border-slate-300 animate-fade-in-up">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-455 print:text-slate-600 mb-3">
            Individual Advisor Ratings
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {data.advisors.map((adv) => (
              <div
                key={adv.advisorId}
                className="rounded-xl bg-bg-base/40 print:bg-slate-100 p-3 border border-border-default print:border-slate-300 text-center"
              >
                <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wider">
                  {adv.role}
                </span>
                <span className="text-xl font-black text-blue-accent print:text-indigo-800 block mt-1">
                  {adv.score}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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
      <div className="flex justify-between items-center border-b border-slate-900 pb-3 flex-wrap gap-2 print:hidden">
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
          className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-850 hover:text-indigo-400 transition-all flex items-center gap-1.5"
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
      <div className="rounded-2xl border border-slate-900 bg-slate-900/5 p-8 space-y-6 text-slate-200 border-dashed print:border-solid print:bg-white print:text-black print:p-12 print:my-0">
        {/* Pitch Title */}
        <div className="flex justify-between items-start border-b border-slate-900 print:border-slate-300 pb-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded print:border print:border-indigo-400">
              Multi-Agent AI Council Evaluation Report
            </span>
            <h2 className="text-2xl font-extrabold text-white print:text-black tracking-tight mt-3">
              {project.name}
            </h2>
            <p className="text-xs text-slate-400 print:text-slate-500 mt-1.5 font-medium">
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
              <span className="text-2xl font-black text-indigo-400 mt-1 block">
                {data.consensus.overallInnovationScore}%
              </span>
            </div>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block">
                Readiness Score
              </span>
              <span className="text-2xl font-black text-emerald-450 mt-1 block">
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
            className="w-full rounded-xl border border-slate-850 bg-slate-950/40 py-2.5 px-3 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 leading-relaxed font-medium print:bg-transparent print:border-none print:p-0 print:text-black"
            placeholder="Executive summary of the evaluation..."
          />
        </div>

        {/* Overall Recommendation */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 print:text-slate-600">
            Overall Recommendation
          </label>
          <textarea
            value={data.report.overallRecommendation}
            onChange={(e) =>
              handleTextChange("overallRecommendation", e.target.value)
            }
            rows={2}
            className="w-full rounded-xl border border-slate-850 bg-slate-950/40 py-2.5 px-3 text-xs text-slate-350 focus:outline-none focus:border-indigo-500 leading-relaxed font-semibold print:bg-transparent print:border-none print:p-0 print:text-black print:font-bold text-indigo-400"
            placeholder="Final recommendation to the implementation team..."
          />
        </div>

        {/* Priority Improvements List */}
        <div className="space-y-3">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 print:text-slate-600">
            Priority Improvements Needed
          </label>

          <ul className="space-y-2 list-none pl-1">
            {data.report.priorityImprovements.map((imp, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-300 print:text-black leading-relaxed flex items-center justify-between gap-2"
              >
                <span className="flex gap-2 items-start font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                  <span>{imp}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveImprovement(idx)}
                  className="text-slate-500 hover:text-rose-455 transition-colors p-0.5 rounded print:hidden"
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
              className="flex-1 rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => {
                handleAddImprovement(newImp);
                setNewImp("");
              }}
              className="rounded-xl bg-indigo-650 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-600 transition-all"
            >
              Add Improvement
            </button>
          </div>
        </div>

        {/* Advisor Score matrix summary for print */}
        <div className="pt-6 border-t border-slate-900 print:border-slate-300">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450 print:text-slate-600 mb-3">
            Individual Advisor Ratings
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {data.advisors.map((adv) => (
              <div
                key={adv.advisorId}
                className="rounded-xl bg-slate-950/50 print:bg-slate-100 p-3 border border-slate-900 print:border-slate-300 text-center"
              >
                <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wider">
                  {adv.role}
                </span>
                <span className="text-xl font-black text-indigo-400 print:text-indigo-800 block mt-1">
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

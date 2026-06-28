import React from "react";
import { ImpactProjectData } from "../../../types/impact";
import { InnovationProject } from "../../../types/innovation";

interface ExecutiveTabProps {
  project: InnovationProject;
  impactData: ImpactProjectData;
}

export function ExecutiveTab({ project, impactData }: ExecutiveTabProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex justify-between items-center border-b border-slate-900 pb-3 flex-wrap gap-2 print:hidden">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Executive Summary Pitch Sheet
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Polished overview suitable for presentation to Solve for Tomorrow
            judges.
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
          Print Pitch Sheet
        </button>
      </div>

      {/* A4 Pitch Canvas */}
      <div className="rounded-2xl border border-slate-900 bg-slate-900/5 p-8 space-y-6 text-slate-200 border-dashed print:border-solid print:bg-white print:text-black print:p-12 print:my-0">
        {/* Pitch Title */}
        <div className="flex justify-between items-start border-b border-slate-900 print:border-slate-300 pb-5">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded print:border print:border-indigo-400">
              Solve for Tomorrow Innovation Project Pitch
            </span>
            <h2 className="text-2xl font-extrabold text-white print:text-black tracking-tight mt-3">
              {project.name}
            </h2>
            <p className="text-xs text-slate-400 print:text-slate-500 mt-1.5 font-medium">
              Theme Category:{" "}
              <strong className="text-slate-200 print:text-slate-800">
                {project.innovationTheme}
              </strong>{" "}
              | Geo Scope:{" "}
              <strong className="text-slate-200 print:text-slate-800">
                {impactData.beneficiary.geoReach}
              </strong>
            </p>
          </div>

          <div className="text-right">
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block">
              Overall Impact Score
            </span>
            <span className="text-4xl font-black text-indigo-400 mt-1 block">
              {impactData.overallImpactScore}%
            </span>
          </div>
        </div>

        {/* 2 column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            {/* Problem Statement */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-450 print:text-slate-600">
                Problem statement
              </h4>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed font-medium">
                {project.problemStatement}
              </p>
            </div>

            {/* Proposed Solution */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-450 print:text-slate-600">
                Proposed Solution
              </h4>
              <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed font-medium">
                {project.proposedSolution}
              </p>
            </div>

            {/* Target Beneficiary */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-450 print:text-slate-600">
                Target Beneficiary Group
              </h4>
              <p className="text-xs text-slate-350 print:text-slate-700 leading-relaxed">
                {impactData.beneficiary.primary}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Impact stats */}
            <div className="space-y-2 rounded-xl bg-slate-950/50 print:bg-slate-100 p-4 border border-slate-900 print:border-slate-300">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-450 print:text-slate-650">
                Score breakdown
              </h4>
              <div className="grid grid-cols-2 gap-3 text-[10px] font-medium text-slate-400 print:text-slate-600">
                <div>
                  <span>Readiness Score</span>
                  <span className="font-semibold text-white print:text-black block mt-0.5">
                    {project.readinessScore}%
                  </span>
                </div>
                <div>
                  <span>Innovation Novelty</span>
                  <span className="font-semibold text-white print:text-black block mt-0.5">
                    {project.innovationScore}%
                  </span>
                </div>
                <div>
                  <span>Technical Feasibility</span>
                  <span className="font-semibold text-white print:text-black block mt-0.5">
                    {impactData.technicalFeasibility}%
                  </span>
                </div>
                <div>
                  <span>Sustainability Index</span>
                  <span className="font-semibold text-white print:text-black block mt-0.5">
                    {impactData.sustainability}%
                  </span>
                </div>
              </div>
            </div>

            {/* UN SDGs */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-450 print:text-slate-600">
                Mapped UN SDG Alignment
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {impactData.sdgs.map((sdg) => (
                  <span
                    key={sdg.sdgNumber}
                    className="rounded border border-indigo-900/40 bg-indigo-950/20 px-2 py-1 text-[10px] text-indigo-300 font-semibold flex items-center gap-1.5 print:border-indigo-300 print:text-indigo-700 print:bg-indigo-50"
                  >
                    Goal {sdg.sdgNumber}: {sdg.sdgName}
                  </span>
                ))}
              </div>
            </div>

            {/* Critical Risks */}
            <div className="space-y-1.5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-450 print:text-slate-600">
                Critical Threat & Mitigation
              </h4>
              {impactData.risks.length > 0 ? (
                <div className="text-xs text-slate-350 print:text-slate-700 leading-relaxed">
                  <strong>Risk:</strong> {impactData.risks[0].description}
                  <br />
                  <strong className="text-emerald-450 print:text-emerald-700">
                    Mitigation:
                  </strong>{" "}
                  {impactData.risks[0].mitigation}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  No risks analyzed yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

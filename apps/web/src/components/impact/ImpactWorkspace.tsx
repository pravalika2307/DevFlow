import React, { useState } from "react";
import { InnovationProject } from "../../types/innovation";
import { ImpactProjectData } from "../../types/impact";
import { ImpactService } from "../../services/impact";
import { DashboardTab } from "./tabs/DashboardTab";
import { BeneficiaryTab } from "./tabs/BeneficiaryTab";
import { SdgTab } from "./tabs/SdgTab";
import { PredictorTab } from "./tabs/PredictorTab";
import { TimelineTab } from "./tabs/TimelineTab";
import { RiskTab } from "./tabs/RiskTab";
import { InclusivityTab } from "./tabs/InclusivityTab";
import { ExecutiveTab } from "./tabs/ExecutiveTab";

interface ImpactWorkspaceProps {
  projects: InnovationProject[];
  onBack: () => void;
}

type ImpactTab =
  | "dashboard"
  | "beneficiary"
  | "sdg"
  | "predictions"
  | "timeline"
  | "risk"
  | "inclusivity"
  | "executive";

export function ImpactWorkspace({ projects, onBack }: ImpactWorkspaceProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects.length > 0 ? projects[0].id : "draft",
  );

  const [impactData, setImpactData] = useState<ImpactProjectData>(() => {
    const initialId = projects.length > 0 ? projects[0].id : "draft";
    return ImpactService.getImpactForProject(initialId);
  });

  const [activeTab, setActiveTab] = useState<ImpactTab>("dashboard");

  const handleUpdate = (updated: Partial<ImpactProjectData>) => {
    const fullUpdated: ImpactProjectData = {
      ...impactData,
      ...updated,
    };
    setImpactData(fullUpdated);
    ImpactService.saveImpactData(fullUpdated);
  };

  const activeProject =
    projects.find((p) => p.id === selectedProjectId) ||
    ({
      id: "draft",
      name: "Independent Study Draft",
      problemStatement: "",
      proposedSolution: "",
      innovationTheme: "Draft",
      sdgGoals: [],
      targetBeneficiaries: "",
      expectedImpact: "",
      successMetrics: "",
      projectStage: "Ideation",
      teamMembers: [],
      timeline: "",
      priority: "Medium",
      innovationScore: 60,
      engineeringHealth: 60,
      projectProgress: 50,
      impactScore: 60,
      readinessScore: 60,
      codeQuality: 60,
      testCoverage: 60,
      buildStatus: "passing",
      openIssuesCount: 0,
    } as unknown as InnovationProject);

  const menuItems = [
    {
      id: "dashboard",
      label: "Impact Dashboard",
      desc: "Overall Summary Scores",
    },
    {
      id: "beneficiary",
      label: "Beneficiary Analysis",
      desc: "User demographics & reach",
    },
    { id: "sdg", label: "UN SDG Mapping", desc: "SDG weights & reasoning" },
    {
      id: "predictions",
      label: "AI Impact Predictor",
      desc: "Expected Adoption curves",
    },
    { id: "timeline", label: "Impact Timeline", desc: "3m, 6m, 1y, 3y goals" },
    { id: "risk", label: "Risk Assessment", desc: "Threats & mitigations" },
    {
      id: "inclusivity",
      label: "Inclusivity Assessment",
      desc: "Rural, affordability audits",
    },
    {
      id: "executive",
      label: "Executive Summary",
      desc: "One-page Presentation sheet",
    },
  ] as const;

  return (
    <div className="flex h-screen flex-col bg-slate-950 text-slate-100 font-sans">
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-slate-900 bg-slate-950 px-6 py-4 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white hover:border-slate-700 transition-all"
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back to Dashboard
          </button>
          <div className="h-6 w-[1px] bg-slate-900" />
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              Impact Intelligence Center
              <span className="text-[10px] uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2 py-0.5 rounded">
                Section 1-8
              </span>
            </h1>
            <p className="text-[10px] text-slate-500">
              Measure, validate and present real-world social impact ratios
            </p>
          </div>
        </div>

        {/* Project Selector dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-450">
            Active Study:
          </label>
          <select
            value={selectedProjectId}
            onChange={(e) => {
              const id = e.target.value;
              setSelectedProjectId(id);
              setImpactData(ImpactService.getImpactForProject(id));
            }}
            className="rounded-xl border border-slate-800 bg-slate-900 py-1.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500 min-w-48"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.innovationTheme})
              </option>
            ))}
            <option value="draft">Independent Study Draft</option>
          </select>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left tabs menu */}
        <nav className="w-64 border-r border-slate-900 bg-slate-950/20 flex flex-col justify-between overflow-y-auto p-4 space-y-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-3 mb-2">
              Impact Sections
            </span>
            {menuItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left rounded-xl p-3 flex flex-col transition-all border ${
                    active
                      ? "bg-indigo-950/20 border-indigo-500/30 text-white"
                      : "bg-transparent border-transparent text-slate-400 hover:bg-slate-900/60"
                  }`}
                >
                  <span className="text-xs font-semibold">{item.label}</span>
                  <span className="text-[9px] text-slate-500 mt-0.5 leading-relaxed">
                    {item.desc}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-slate-900 bg-slate-950 p-4">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
              Evaluation Scope
            </span>
            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
              UN SDG calculations ensure projects measure expected social return
              factors alongside build velocity.
            </p>
          </div>
        </nav>

        {/* Center content panel */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-900/10">
          <div className="max-w-4xl mx-auto">
            {activeTab === "dashboard" && (
              <DashboardTab
                data={impactData}
                onUpdate={(val) => handleUpdate(val)}
              />
            )}
            {activeTab === "beneficiary" && (
              <BeneficiaryTab
                data={impactData.beneficiary}
                onUpdate={(val) => handleUpdate({ beneficiary: val })}
              />
            )}
            {activeTab === "sdg" && (
              <SdgTab
                sdgs={impactData.sdgs}
                onUpdate={(val) => handleUpdate({ sdgs: val })}
              />
            )}
            {activeTab === "predictions" && (
              <PredictorTab
                data={impactData.predictions}
                onUpdate={(val) => handleUpdate({ predictions: val })}
              />
            )}
            {activeTab === "timeline" && (
              <TimelineTab
                timeline={impactData.timeline}
                onUpdate={(val) => handleUpdate({ timeline: val })}
              />
            )}
            {activeTab === "risk" && (
              <RiskTab
                risks={impactData.risks}
                onUpdate={(val) => handleUpdate({ risks: val })}
              />
            )}
            {activeTab === "inclusivity" && (
              <InclusivityTab
                data={impactData.inclusivity}
                onUpdate={(val) => handleUpdate({ inclusivity: val })}
              />
            )}
            {activeTab === "executive" && (
              <ExecutiveTab project={activeProject} impactData={impactData} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

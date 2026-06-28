import React, { useState } from "react";
import { InnovationProject } from "../../types/innovation";
import { CouncilProjectData } from "../../types/council";
import { CouncilService } from "../../services/council";
import { DashboardTab } from "./tabs/DashboardTab";
import { ConsensusTab } from "./tabs/ConsensusTab";
import { ReportTab } from "./tabs/ReportTab";

interface CouncilWorkspaceProps {
  projects: InnovationProject[];
  onBack: () => void;
}

type CouncilTab = "dashboard" | "consensus" | "report";

export function CouncilWorkspace({ projects, onBack }: CouncilWorkspaceProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects.length > 0 ? projects[0].id : "draft",
  );

  const [councilData, setCouncilData] = useState<CouncilProjectData>(() => {
    const initialId = projects.length > 0 ? projects[0].id : "draft";
    return CouncilService.getCouncilForProject(initialId);
  });

  const [activeTab, setActiveTab] = useState<CouncilTab>("dashboard");

  const handleUpdate = (updated: Partial<CouncilProjectData>) => {
    const fullUpdated: CouncilProjectData = {
      ...councilData,
      ...updated,
    };
    setCouncilData(fullUpdated);
    CouncilService.saveCouncilData(fullUpdated);
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
      label: "Advisor Panel",
      desc: "Strengths, weaknesses & scores",
    },
    {
      id: "consensus",
      label: "Consensus Engine",
      desc: "Risks, Priorities & Actions",
    },
    {
      id: "report",
      label: "Project Review Report",
      desc: "Presentation-ready Summaries",
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
              Multi-Agent AI Council
              <span className="text-[10px] uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2 py-0.5 rounded">
                Section 1-8
              </span>
            </h1>
            <p className="text-[10px] text-slate-500">
              Advisory consensus reviews modeling Samsung criteria
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
              setCouncilData(CouncilService.getCouncilForProject(id));
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
              Council Sections
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
              Methodology Scope
            </span>
            <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
              Advisor reviews model Samsung Solve for Tomorrow benchmarks to
              prepare projects for presentation stages.
            </p>
          </div>
        </nav>

        {/* Center content panel */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-900/10">
          <div className="max-w-4xl mx-auto">
            {activeTab === "dashboard" && (
              <DashboardTab
                data={councilData}
                onUpdate={(val) => handleUpdate(val)}
              />
            )}
            {activeTab === "consensus" && (
              <ConsensusTab
                consensus={councilData.consensus}
                onUpdate={(val) => handleUpdate({ consensus: val })}
              />
            )}
            {activeTab === "report" && (
              <ReportTab
                project={activeProject}
                data={councilData}
                onUpdate={(val) => handleUpdate(val)}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

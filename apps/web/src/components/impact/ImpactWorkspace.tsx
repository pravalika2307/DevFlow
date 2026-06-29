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
import { NovaGuidanceBanner } from "../ui/NovaGuidanceBanner";

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
    <div className="flex h-screen flex-col bg-bg-base text-text-primary font-sans">
      {/* Module Header */}
      <div className="flex items-center justify-between border-b border-border-default bg-bg-surface px-6 py-4 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="df-btn df-btn-ghost"
            style={{ padding: "6px 12px", fontSize: 12 }}
          >
            <svg
              className="h-3.5 w-3.5"
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
            Back
          </button>
          <div className="h-6 w-[1px] bg-border-default" />
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              Impact Intelligence Center
              <span className="df-badge df-badge-violet">Section 1-8</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">
              Measure, validate and present real-world social impact ratios
            </p>
          </div>
        </div>

        {/* Project Selector dropdown */}
        <div className="flex items-center gap-3">
          <label className="df-section-label">Active Study:</label>
          <select
            value={selectedProjectId}
            onChange={(e) => {
              const id = e.target.value;
              setSelectedProjectId(id);
              setImpactData(ImpactService.getImpactForProject(id));
            }}
            className="df-input py-1.5 px-3 min-w-48 text-xs font-semibold"
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
        {/* Left tabs menu (Floating Sidebar Layout) */}
        <nav className="w-64 bg-bg-surface border border-border-default rounded-2xl m-4 p-4 flex flex-col justify-between overflow-y-auto space-y-4 shadow-lg">
          <div className="space-y-2">
            <span className="df-section-label block px-2 mb-2">
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
                      ? "bg-blue-accent/10 border-blue-accent/25 text-blue-accent"
                      : "bg-transparent border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span className="text-xs font-bold">{item.label}</span>
                  <span className="text-[9px] text-slate-500 mt-1 leading-relaxed font-medium">
                    {item.desc}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-border-default bg-bg-card p-4">
            <span className="df-section-label block mb-2">Scope</span>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
              UN SDG calculations ensure projects measure expected social return
              factors alongside build velocity.
            </p>
          </div>
        </nav>

        {/* Center content panel */}
        <main className="flex-1 overflow-y-auto p-6 bg-bg-base">
          <div className="max-w-4xl mx-auto">
            <NovaGuidanceBanner
              module="impact"
              project={projects.find((p) => p.id === selectedProjectId) ?? null}
              onNext={onBack}
              nextLabel="Next: NOVA Council →"
            />
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
                projects={projects}
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

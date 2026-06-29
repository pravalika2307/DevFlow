import React, { useState } from "react";
import { InnovationProject } from "../../types/innovation";
import { ProblemDiscoveryData } from "../../types/discovery";
import { DiscoveryService } from "../../services/discovery";
import { ExplorerTab } from "./tabs/ExplorerTab";
import { ResearchTab } from "./tabs/ResearchTab";
import { InsightTab } from "./tabs/InsightTab";
import { RootCauseTab } from "./tabs/RootCauseTab";
import { OpportunityTab } from "./tabs/OpportunityTab";
import { ConfidenceTab } from "./tabs/ConfidenceTab";
import { NovaGuidanceBanner } from "../ui/NovaGuidanceBanner";

interface DiscoveryWorkspaceProps {
  projects: InnovationProject[];
  onBack: () => void;
}

type DiscoveryTab =
  | "explorer"
  | "research"
  | "insights"
  | "rootcause"
  | "opportunities"
  | "confidence";

export function DiscoveryWorkspace({
  projects,
  onBack,
}: DiscoveryWorkspaceProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects.length > 0 ? projects[0].id : "draft",
  );

  const [discoveryData, setDiscoveryData] = useState<ProblemDiscoveryData>(
    () => {
      const initialId = projects.length > 0 ? projects[0].id : "draft";
      return DiscoveryService.getDiscoveryForProject(initialId);
    },
  );

  const [activeTab, setActiveTab] = useState<DiscoveryTab>("explorer");

  const handleUpdate = (updated: Partial<ProblemDiscoveryData>) => {
    const fullUpdated: ProblemDiscoveryData = {
      ...discoveryData,
      ...updated,
    };
    setDiscoveryData(fullUpdated);
    DiscoveryService.saveDiscovery(fullUpdated);
  };

  const menuItems = [
    {
      id: "explorer",
      label: "Problem Explorer",
      desc: "Causes & Stakeholders",
    },
    {
      id: "research",
      label: "User Research Log",
      desc: "Interviews, Notes, Observations",
    },
    {
      id: "insights",
      label: "AI Insights Generator",
      desc: "Extracted Pain Points & Needs",
    },
    {
      id: "rootcause",
      label: "Root Cause Analysis",
      desc: "5 Whys & Fishbone Diagram",
    },
    {
      id: "opportunities",
      label: "Opportunity Mapper",
      desc: "Wins, Ranks & Ratios",
    },
    {
      id: "confidence",
      label: "Confidence & suggestions",
      desc: "Readiness & AI Auditing",
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
              Problem Discovery Assistant
              <span className="df-badge df-badge-violet">Section 1-7</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">
              Deconstruct & validate root assumptions before coding
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
              setDiscoveryData(DiscoveryService.getDiscoveryForProject(id));
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
              Discovery Sections
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
              Design validation ensures solutions target real, proven community
              friction vectors.
            </p>
          </div>
        </nav>

        {/* Center content panel */}
        <main className="flex-1 overflow-y-auto p-6 bg-bg-base">
          <div className="max-w-4xl mx-auto">
            <NovaGuidanceBanner
              module="discovery"
              project={projects.find((p) => p.id === selectedProjectId) ?? null}
              onNext={onBack}
              nextLabel="Next: Design Thinking →"
            />
            {activeTab === "explorer" && (
              <ExplorerTab
                data={discoveryData.explorer}
                onUpdate={(val) => handleUpdate({ explorer: val })}
              />
            )}
            {activeTab === "research" && (
              <ResearchTab
                records={discoveryData.userResearch}
                onUpdate={(val) => handleUpdate({ userResearch: val })}
              />
            )}
            {activeTab === "insights" && (
              <InsightTab
                explorer={discoveryData.explorer}
                records={discoveryData.userResearch}
              />
            )}
            {activeTab === "rootcause" && (
              <RootCauseTab
                data={discoveryData.rootCause}
                onUpdate={(val) => handleUpdate({ rootCause: val })}
              />
            )}
            {activeTab === "opportunities" && (
              <OpportunityTab
                opportunities={discoveryData.opportunities}
                onUpdate={(val) => handleUpdate({ opportunities: val })}
              />
            )}
            {activeTab === "confidence" && (
              <ConfidenceTab
                scores={discoveryData.confidence}
                recommendations={discoveryData.recommendations}
                onUpdateScores={(val) => handleUpdate({ confidence: val })}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  InnovationProject,
  EmpathiseData,
  DefineData,
  Idea,
  PrototypeVersion,
  TestRecord,
} from "../../types/innovation";
import { EmpathiseStage } from "./stages/EmpathiseStage";
import { DefineStage } from "./stages/DefineStage";
import { IdeateStage } from "./stages/IdeateStage";
import { PrototypeStage } from "./stages/PrototypeStage";
import { TestStage } from "./stages/TestStage";
import { InnovationDashboard } from "./InnovationDashboard";
import { AICoachPanel } from "./AICoachPanel";

interface CoachWorkspaceProps {
  project: InnovationProject;
  onSave: (project: InnovationProject) => void;
  onBack: () => void;
}

type WorkspaceTab =
  | "empathise"
  | "define"
  | "ideate"
  | "prototype"
  | "test"
  | "dashboard";

export function CoachWorkspace({
  project,
  onSave,
  onBack,
}: CoachWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("empathise");

  const handleUpdateEmpathise = (data: EmpathiseData) => {
    onSave({
      ...project,
      empathise: data,
    });
  };

  const handleUpdateDefine = (data: DefineData) => {
    // If problem statement changes, update problemClarity score and overall score
    const scoreDiff = data.problemStatement.length > 30 ? 95 : 60;
    const updatedScores = {
      ...project.innovationScores,
      problemClarity: scoreDiff,
    };
    onSave({
      ...project,
      define: data,
      innovationScores: updatedScores,
      problemStatement: data.problemStatement,
      successMetrics: data.successMetrics,
    });
  };

  const handleUpdateIdeate = (ideas: Idea[]) => {
    // If selected idea changes, update solution, innovation score, and overall readiness
    const selectedIdea = ideas.find((i) => i.isSelected);
    onSave({
      ...project,
      ideate: ideas,
      proposedSolution: selectedIdea
        ? selectedIdea.description
        : project.proposedSolution,
      innovationScore: selectedIdea
        ? selectedIdea.innovationScore
        : project.innovationScore,
      impactScore: selectedIdea
        ? selectedIdea.socialImpact
        : project.impactScore,
    });
  };

  const handleUpdatePrototype = (versions: PrototypeVersion[]) => {
    // If prototypes are logged, update progress indicator
    const newProgress = Math.min(50 + versions.length * 15, 100);
    onSave({
      ...project,
      prototype: versions,
      projectProgress: newProgress,
      projectStage: newProgress >= 90 ? "Scaling" : "Prototyping",
    });
  };

  const handleUpdateTest = (records: TestRecord[]) => {
    // If testing records change, update validation status
    onSave({
      ...project,
      test: records,
      projectStage: "Validation",
    });
  };

  const menuItems = [
    { id: "empathise", label: "1. Empathise", desc: "User Persona & Needs" },
    { id: "define", label: "2. Define", desc: "Statements & Metrics" },
    { id: "ideate", label: "3. Ideate", desc: "Multi-solution Sorting" },
    { id: "prototype", label: "4. Prototype", desc: "Evolution Timeline" },
    { id: "test", label: "5. Test", desc: "User Testing Logs" },
    {
      id: "dashboard",
      label: "Readiness Dashboard",
      desc: "7 Evaluation Scores",
    },
  ] as const;

  return (
    <div className="flex h-screen flex-col bg-bg-base text-text-primary">
      {/* Workspace Subheader */}
      <div className="flex items-center justify-between border-b border-border-default bg-bg-surface px-6 py-4">
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
              {project.name}
              <span className="df-badge df-badge-blue">Solve for Tomorrow</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">
              Design Thinking Innovation Coach Workspace
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Timeline Stage:{" "}
          <span className="df-badge df-badge-violet ml-1">
            {project.projectStage}
          </span>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Interactive Timeline list (Floating Sidebar Layout) */}
        <nav className="w-64 bg-bg-surface border border-border-default rounded-2xl m-4 p-4 flex flex-col justify-between overflow-y-auto space-y-4 shadow-lg">
          <div className="space-y-2">
            <span className="df-section-label block px-2 mb-2">
              Coach Timeline
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

          {/* Simple Info Badge */}
          <div className="rounded-xl border border-border-default bg-bg-card p-4">
            <span className="df-section-label block mb-2">Scope</span>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
              Design thinking aligns development logs directly with user pain
              points and success targets.
            </p>
          </div>
        </nav>

        {/* Center Workspace Stage View */}
        <main className="flex-1 overflow-y-auto p-6 bg-bg-base">
          <div className="max-w-3xl mx-auto">
            {activeTab === "empathise" && (
              <EmpathiseStage
                project={project}
                onUpdate={handleUpdateEmpathise}
              />
            )}
            {activeTab === "define" && (
              <DefineStage project={project} onUpdate={handleUpdateDefine} />
            )}
            {activeTab === "ideate" && (
              <IdeateStage project={project} onUpdate={handleUpdateIdeate} />
            )}
            {activeTab === "prototype" && (
              <PrototypeStage
                project={project}
                onUpdate={handleUpdatePrototype}
              />
            )}
            {activeTab === "test" && (
              <TestStage project={project} onUpdate={handleUpdateTest} />
            )}
            {activeTab === "dashboard" && (
              <InnovationDashboard project={project} />
            )}
          </div>
        </main>

        {/* Right AI Coach Assistant Panel */}
        <AICoachPanel
          key={project.id + "-" + activeTab}
          project={project}
          activeStage={activeTab}
        />
      </div>
    </div>
  );
}

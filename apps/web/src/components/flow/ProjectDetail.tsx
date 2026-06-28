import React, { useState } from "react";
import { InnovationProject } from "../../types/innovation";

interface ProjectDetailProps {
  project: InnovationProject;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
  onLaunchCoach: () => void;
}

export function ProjectDetail({
  project,
  onEdit,
  onDelete,
  onClose,
  onLaunchCoach,
}: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "engineering" | "ai">(
    "overview",
  );

  // Determine stage badge theme
  const getStageStyle = (stage: string) => {
    switch (stage) {
      case "Ideation":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "Prototyping":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Validation":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "Scaling":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const priorityStyles = {
    High: "bg-rose-500/10 text-rose-450 border-rose-500/20",
    Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Low: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl border-l border-slate-800 bg-slate-950 p-0 shadow-2xl backdrop-blur-md transition-all duration-300">
      <div className="flex h-full w-full flex-col">
        {/* Detail Header */}
        <div className="flex items-center justify-between border-b border-slate-900 bg-slate-900/10 p-6">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${getStageStyle(
                  project.projectStage,
                )}`}
              >
                {project.projectStage}
              </span>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
                  priorityStyles[project.priority]
                }`}
              >
                {project.priority} Priority
              </span>
              <span className="rounded-full border border-slate-800 bg-slate-900/50 px-2.5 py-0.5 text-[10px] font-medium text-slate-300 tracking-wider">
                {project.innovationTheme}
              </span>
            </div>
            <h2 className="mt-2.5 truncate text-xl font-bold tracking-tight text-white">
              {project.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onLaunchCoach}
              className="rounded-xl border border-indigo-900/40 bg-indigo-950/20 px-3.5 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-1.5"
              title="Launch AI Innovation Coach"
            >
              <svg
                className="h-4 w-4 animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              Launch AI Coach
            </button>
            <button
              onClick={onEdit}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-2 text-slate-400 hover:bg-slate-850 hover:text-indigo-400 transition-all"
              title="Edit Project"
            >
              <svg
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </button>
            <button
              onClick={onDelete}
              className="rounded-xl border border-slate-850 bg-slate-900/50 p-2 text-slate-400 hover:bg-rose-950/20 hover:text-rose-450 hover:border-rose-900/30 transition-all"
              title="Delete Project"
            >
              <svg
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-800 p-2 text-slate-400 hover:bg-slate-850 hover:text-white transition-all"
            >
              <svg
                className="h-4.5 w-4.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Workspace Navigation Tabs */}
        <div className="flex border-b border-slate-900 px-6 bg-slate-900/10">
          {(["overview", "engineering", "ai"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 py-4 px-4 text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === tab
                  ? "border-indigo-500 text-white"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab === "overview" && "Overview & Impact"}
              {tab === "engineering" && "Engineering Stats"}
              {tab === "ai" && "AI Recommendations"}
            </button>
          ))}
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Problem / Solution Grid */}
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-850 bg-slate-900/20 p-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Problem Statement
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.problemStatement}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-850 bg-slate-900/20 p-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Proposed Solution
                  </h4>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    {project.proposedSolution}
                  </p>
                </div>
              </div>

              {/* SDG Alignment Panel */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-2.5">
                  UN SDG Goals Targeted
                </h4>
                {project.sdgGoals.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {project.sdgGoals.map((sdg) => (
                      <span
                        key={sdg}
                        className="rounded-lg border border-indigo-900/40 bg-indigo-950/20 px-3 py-1.5 text-xs text-indigo-300 flex items-center gap-1.5"
                      >
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        {sdg}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    No specific SDGs selected.
                  </p>
                )}
              </div>

              {/* Targets, Impact, Metrics grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-900/50 bg-slate-950 p-4">
                  <h5 className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Target Beneficiaries
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.targetBeneficiaries}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-900/50 bg-slate-950 p-4">
                  <h5 className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Expected Impact
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.expectedImpact}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-900/50 bg-slate-950 p-4">
                  <h5 className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Success Metrics
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.successMetrics}
                  </p>
                </div>
              </div>

              {/* Progress & Scores Panel */}
              <div className="rounded-xl border border-slate-900 bg-slate-900/10 p-5 space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Alignment Score Matrix
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400">
                      Innovation Score
                    </span>
                    <p className="text-lg font-bold text-white mt-1">
                      {project.innovationScore}%
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">
                      Project Progress
                    </span>
                    <p className="text-lg font-bold text-white mt-1">
                      {project.projectProgress}%
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">
                      Impact Score
                    </span>
                    <p className="text-lg font-bold text-white mt-1">
                      {project.impactScore}%
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">
                      Readiness Score
                    </span>
                    <p className="text-lg font-bold text-white mt-1">
                      {project.readinessScore}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Team Section */}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-2.5">
                  Innovation Team
                </h4>
                {project.teamMembers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.teamMembers.map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-xl border border-slate-900 bg-slate-950 p-3"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-xs font-bold text-indigo-400">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">
                            {member.name}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    No team members assigned.
                  </p>
                )}
              </div>

              {/* Timeline Info */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-900 bg-slate-900/20 p-4">
                <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400 border border-indigo-500/20">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Target Timeline
                  </span>
                  <p className="text-xs font-semibold text-white mt-0.5">
                    {project.timeline}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "engineering" && (
            <div className="space-y-6">
              {/* Build status and quality summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-900 bg-slate-950 p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400">
                      Build Status
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`inline-block h-2.5 w-2.5 rounded-full ${
                          project.buildStatus === "passing"
                            ? "bg-emerald-400"
                            : "bg-rose-400"
                        } animate-pulse`}
                      />
                      <span className="text-sm font-semibold uppercase tracking-wider text-white">
                        {project.buildStatus}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-indigo-400 font-bold bg-indigo-500/5 px-2.5 py-1 rounded-lg">
                    CI Pipeline
                  </div>
                </div>

                <div className="rounded-xl border border-slate-900 bg-slate-950 p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400">
                      Open Issues
                    </span>
                    <p className="text-lg font-bold text-white mt-0.5">
                      {project.openIssuesCount}
                    </p>
                  </div>
                  <div className="text-xs text-rose-400 font-bold bg-rose-500/5 px-2.5 py-1 rounded-lg">
                    Bug Backlog
                  </div>
                </div>
              </div>

              {/* Progress metrics bars */}
              <div className="rounded-xl border border-slate-900 bg-slate-900/10 p-5 space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Engineering Quality Metrics
                </h4>

                <div className="space-y-4.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-350">
                        Code Quality Rating
                      </span>
                      <span className="font-semibold text-white">
                        {project.codeQuality}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-900">
                      <div
                        className="h-1.5 rounded-full bg-indigo-500 transition-all duration-300"
                        style={{ width: `${project.codeQuality}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-350">
                        Test Suite Coverage
                      </span>
                      <span className="font-semibold text-white">
                        {project.testCoverage}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-900">
                      <div
                        className="h-1.5 rounded-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${project.testCoverage}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-350">
                        Overall Engineering Health
                      </span>
                      <span className="font-semibold text-white">
                        {project.engineeringHealth}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-900">
                      <div
                        className="h-1.5 rounded-full bg-amber-500 transition-all duration-300"
                        style={{ width: `${project.engineeringHealth}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture diagram description */}
              <div className="rounded-xl border border-slate-900/50 bg-slate-950 p-4">
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Monorepo Deployment Integration
                </h5>
                <p className="text-xs text-slate-350 leading-relaxed">
                  This project compiles using Next.js App Router and distributes
                  shared types from
                  <code className="text-indigo-400 bg-indigo-950/20 px-1.5 py-0.5 rounded mx-1 text-[10px]">
                    packages/types
                  </code>
                  within the global TurboRepo pipeline. Health metrics are
                  fetched during workspace CI pipeline runs.
                </p>
              </div>
            </div>
          )}

          {activeTab === "ai" && (
            <div className="space-y-6">
              {/* Recommendations Banner */}
              <div className="rounded-xl border border-indigo-950/50 bg-gradient-to-tr from-indigo-950/20 to-slate-950 p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-16 w-16 bg-indigo-500/5 rounded-full blur-xl" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
                  DevFlow AI Intelligence Layer
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  DevFlow analyses the code base repository, open bugs, and SDG
                  project metrics to generate real-time innovation advisory
                  reports.
                </p>
              </div>

              {/* Dynamic Mock Recommendations list */}
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-900 bg-slate-900/20 p-4 flex gap-3">
                  <div className="text-amber-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-white">
                      Optimize SDG Coverage
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      We recommend aligning your offline curriculum library to
                      Goal 5 (Gender Equality) by targeting specialized digital
                      content to girls in remote communities.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-900 bg-slate-900/20 p-4 flex gap-3">
                  <div className="text-indigo-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-white">
                      Engineering Health Improvement
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Your test coverage is currently at {project.testCoverage}
                      %. Resolving outstanding lint alerts will boost the
                      engineering readiness score to a higher tier.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-900 bg-slate-900/20 p-4 flex gap-3">
                  <div className="text-cyan-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-white">
                      Innovation Readiness Boost
                    </h5>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Deploying containerized microservices to your staging
                      environment will help raise the Technology Readiness Level
                      (TRL) from{" "}
                      {project.readinessScore >= 80 ? "Level 8" : "Level 5"} to
                      production-ready status.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

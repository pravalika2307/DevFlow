import React, { useState } from "react";
import {
  InnovationProject,
  TeamMember,
  ProjectStage,
  ProjectPriority,
} from "../../types/innovation";

interface ProjectFormProps {
  project?: InnovationProject | null; // If provided, we are editing
  onSave: (project: InnovationProject) => void;
  onClose: () => void;
}

const AVAILABLE_SDG_GOALS = [
  "Goal 1: No Poverty",
  "Goal 2: Zero Hunger",
  "Goal 3: Good Health and Well-being",
  "Goal 4: Quality Education",
  "Goal 5: Gender Equality",
  "Goal 6: Clean Water and Sanitation",
  "Goal 7: Affordable and Clean Energy",
  "Goal 8: Decent Work and Economic Growth",
  "Goal 9: Industry, Innovation and Infrastructure",
  "Goal 10: Reduced Inequalities",
  "Goal 11: Sustainable Cities and Communities",
  "Goal 12: Responsible Consumption and Production",
  "Goal 13: Climate Action",
  "Goal 14: Life Below Water",
  "Goal 15: Life on Land",
  "Goal 16: Peace, Justice and Strong Institutions",
  "Goal 17: Partnerships for the Goals",
];

const INNOVATION_THEMES = [
  "Education",
  "Clean Water",
  "Sustainability",
  "Health",
  "Clean Energy",
  "Agriculture",
  "Social Inclusion",
  "Infrastructure",
];

export function ProjectForm({ project, onSave, onClose }: ProjectFormProps) {
  // Field States
  const [name, setName] = useState(project ? project.name : "");
  const [problemStatement, setProblemStatement] = useState(
    project ? project.problemStatement : "",
  );
  const [proposedSolution, setProposedSolution] = useState(
    project ? project.proposedSolution : "",
  );
  const [innovationTheme, setInnovationTheme] = useState(
    project ? project.innovationTheme : INNOVATION_THEMES[0],
  );
  const [selectedSdgs, setSelectedSdgs] = useState<string[]>(
    project ? project.sdgGoals : [],
  );
  const [targetBeneficiaries, setTargetBeneficiaries] = useState(
    project ? project.targetBeneficiaries : "",
  );
  const [expectedImpact, setExpectedImpact] = useState(
    project ? project.expectedImpact : "",
  );
  const [successMetrics, setSuccessMetrics] = useState(
    project ? project.successMetrics : "",
  );
  const [projectStage, setProjectStage] = useState<ProjectStage>(
    project ? project.projectStage : "Ideation",
  );
  const [timeline, setTimeline] = useState(project ? project.timeline : "");
  const [priority, setPriority] = useState<ProjectPriority>(
    project ? project.priority : "Medium",
  );

  // Scores
  const [innovationScore, setInnovationScore] = useState(
    project ? project.innovationScore : 80,
  );
  const [engineeringHealth, setEngineeringHealth] = useState(
    project ? project.engineeringHealth : 80,
  );
  const [projectProgress, setProjectProgress] = useState(
    project ? project.projectProgress : 50,
  );
  const [impactScore, setImpactScore] = useState(
    project ? project.impactScore : 80,
  );
  const [readinessScore, setReadinessScore] = useState(
    project ? project.readinessScore : 50,
  );

  // Engineering stats
  const codeQuality = project ? project.codeQuality : 80;
  const testCoverage = project ? project.testCoverage : 80;
  const buildStatus = project ? project.buildStatus : "passing";
  const openIssuesCount = project ? project.openIssuesCount : 0;

  // Team Member State
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(
    project ? project.teamMembers : [],
  );
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");

  // Error State
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSdgToggle = (goal: string) => {
    setSelectedSdgs((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal],
    );
  };

  const handleAddMember = () => {
    if (!newMemberName.trim() || !newMemberRole.trim()) return;
    setTeamMembers((prev) => [
      ...prev,
      { name: newMemberName.trim(), role: newMemberRole.trim() },
    ]);
    setNewMemberName("");
    setNewMemberRole("");
  };

  const handleRemoveMember = (idx: number) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = "Project name is required";
    else if (name.trim().length < 3)
      errs.name = "Project name must be at least 3 characters";

    if (!problemStatement.trim())
      errs.problemStatement = "Problem statement is required";
    else if (problemStatement.trim().length < 10)
      errs.problemStatement = "Must be at least 10 characters";

    if (!proposedSolution.trim())
      errs.proposedSolution = "Proposed solution is required";
    else if (proposedSolution.trim().length < 10)
      errs.proposedSolution = "Must be at least 10 characters";

    if (!targetBeneficiaries.trim())
      errs.targetBeneficiaries = "Target beneficiaries list is required";
    if (!expectedImpact.trim())
      errs.expectedImpact = "Expected impact details are required";
    if (!successMetrics.trim())
      errs.successMetrics = "Success metrics definition is required";
    if (!timeline.trim()) errs.timeline = "Timeline range is required";

    // Numerical scores checks
    if (innovationScore < 0 || innovationScore > 100)
      errs.innovationScore = "Must be between 0 and 100";
    if (engineeringHealth < 0 || engineeringHealth > 100)
      errs.engineeringHealth = "Must be between 0 and 100";
    if (projectProgress < 0 || projectProgress > 100)
      errs.projectProgress = "Must be between 0 and 100";
    if (impactScore < 0 || impactScore > 100)
      errs.impactScore = "Must be between 0 and 100";
    if (readinessScore < 0 || readinessScore > 100)
      errs.readinessScore = "Must be between 0 and 100";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const savedProject: InnovationProject = {
      id: project ? project.id : `proj-${Date.now()}`,
      name: name.trim(),
      problemStatement: problemStatement.trim(),
      proposedSolution: proposedSolution.trim(),
      innovationTheme,
      sdgGoals: selectedSdgs,
      targetBeneficiaries: targetBeneficiaries.trim(),
      expectedImpact: expectedImpact.trim(),
      successMetrics: successMetrics.trim(),
      projectStage,
      teamMembers,
      timeline: timeline.trim(),
      priority,
      innovationScore,
      engineeringHealth,
      projectProgress,
      impactScore,
      readinessScore,
      codeQuality,
      testCoverage,
      buildStatus,
      openIssuesCount,
      empathise: project
        ? project.empathise
        : {
            targetUser: targetBeneficiaries.trim(),
            userPersona: "",
            goals: "",
            pains: "",
            behaviours: "",
            needs: "",
          },
      define: project
        ? project.define
        : {
            problemStatement: problemStatement.trim(),
            opportunityStatement: "",
            howMightWe: "",
            successMetrics: successMetrics.trim(),
          },
      ideate: project ? project.ideate : [],
      prototype: project ? project.prototype : [],
      test: project ? project.test : [],
      innovationScores: project
        ? project.innovationScores
        : {
            problemClarity: 70,
            innovation: innovationScore,
            feasibility: readinessScore,
            socialImpact: impactScore,
            aiReadiness: 70,
            scalability: 70,
            sustainability: 70,
          },
    };

    onSave(savedProject);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-6 bg-slate-900/50">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {project ? "Edit Innovation Project" : "New Innovation Project"}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Configure alignment goals, scores, and SDG attributes.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-xl border ${
                  errors.name ? "border-rose-500" : "border-slate-800"
                } bg-slate-950 py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                placeholder="e.g. Solar Literacy Offline Drive"
              />
              {errors.name && (
                <p className="text-[10px] text-rose-400 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Innovation Theme
              </label>
              <select
                value={innovationTheme}
                onChange={(e) => setInnovationTheme(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-4 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                {INNOVATION_THEMES.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Problem & Solution */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Problem Statement
              </label>
              <textarea
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                rows={3}
                className={`w-full rounded-xl border ${
                  errors.problemStatement
                    ? "border-rose-500"
                    : "border-slate-800"
                } bg-slate-950 py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none`}
                placeholder="What community problem does this project tackle?"
              />
              {errors.problemStatement && (
                <p className="text-[10px] text-rose-400 mt-1">
                  {errors.problemStatement}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Proposed Solution
              </label>
              <textarea
                value={proposedSolution}
                onChange={(e) => setProposedSolution(e.target.value)}
                rows={3}
                className={`w-full rounded-xl border ${
                  errors.proposedSolution
                    ? "border-rose-500"
                    : "border-slate-800"
                } bg-slate-950 py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none`}
                placeholder="How does your tech or innovation resolve this issue?"
              />
              {errors.proposedSolution && (
                <p className="text-[10px] text-rose-400 mt-1">
                  {errors.proposedSolution}
                </p>
              )}
            </div>
          </div>

          {/* Target, Impact & Success Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Target Beneficiaries
              </label>
              <input
                type="text"
                value={targetBeneficiaries}
                onChange={(e) => setTargetBeneficiaries(e.target.value)}
                className={`w-full rounded-xl border ${
                  errors.targetBeneficiaries
                    ? "border-rose-500"
                    : "border-slate-800"
                } bg-slate-950 py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none`}
                placeholder="Who benefits? (e.g. Rural Children)"
              />
              {errors.targetBeneficiaries && (
                <p className="text-[10px] text-rose-400 mt-1">
                  {errors.targetBeneficiaries}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Expected Impact
              </label>
              <input
                type="text"
                value={expectedImpact}
                onChange={(e) => setExpectedImpact(e.target.value)}
                className={`w-full rounded-xl border ${
                  errors.expectedImpact ? "border-rose-500" : "border-slate-800"
                } bg-slate-950 py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none`}
                placeholder="What is the long-term impact?"
              />
              {errors.expectedImpact && (
                <p className="text-[10px] text-rose-400 mt-1">
                  {errors.expectedImpact}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Success Metrics
              </label>
              <input
                type="text"
                value={successMetrics}
                onChange={(e) => setSuccessMetrics(e.target.value)}
                className={`w-full rounded-xl border ${
                  errors.successMetrics ? "border-rose-500" : "border-slate-800"
                } bg-slate-950 py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none`}
                placeholder="e.g. 5,000 processed liters/day"
              />
              {errors.successMetrics && (
                <p className="text-[10px] text-rose-400 mt-1">
                  {errors.successMetrics}
                </p>
              )}
            </div>
          </div>

          {/* Timeline, Stage, Priority */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Timeline Range
              </label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className={`w-full rounded-xl border ${
                  errors.timeline ? "border-rose-500" : "border-slate-800"
                } bg-slate-950 py-2.5 px-4 text-xs text-white placeholder-slate-600 focus:border-indigo-500 focus:outline-none`}
                placeholder="e.g. Q1 - Q3 2026"
              />
              {errors.timeline && (
                <p className="text-[10px] text-rose-400 mt-1">
                  {errors.timeline}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Project Stage
              </label>
              <select
                value={projectStage}
                onChange={(e) =>
                  setProjectStage(e.target.value as ProjectStage)
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-4 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Ideation">Ideation</option>
                <option value="Prototyping">Prototyping</option>
                <option value="Validation">Validation</option>
                <option value="Scaling">Scaling</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as ProjectPriority)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-4 text-xs text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* SDG Selectors */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              UN SDG Goals Target
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-slate-800 bg-slate-950 p-3 rounded-xl">
              {AVAILABLE_SDG_GOALS.map((goal) => {
                const checked = selectedSdgs.includes(goal);
                return (
                  <label
                    key={goal}
                    className={`flex items-center gap-2 rounded-lg p-2 text-xs border ${
                      checked
                        ? "bg-indigo-950/20 border-indigo-500/30 text-white"
                        : "border-transparent text-slate-400"
                    } hover:bg-slate-900 cursor-pointer transition-all`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleSdgToggle(goal)}
                      className="rounded border-slate-800 text-indigo-500 focus:ring-0 focus:ring-offset-0 focus:outline-none"
                    />
                    <span className="truncate">{goal}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Innovation and Alignment Scores */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-3 border-b border-slate-800/80 pb-2">
              Innovation & Alignment Weights
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Innovation Score
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={innovationScore}
                  onChange={(e) => setInnovationScore(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Eng Health
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={engineeringHealth}
                  onChange={(e) => setEngineeringHealth(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Progress %
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={projectProgress}
                  onChange={(e) => setProjectProgress(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Impact Score
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={impactScore}
                  onChange={(e) => setImpactScore(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Readiness Score
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={readinessScore}
                  onChange={(e) => setReadinessScore(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Team Members List */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-3 border-b border-slate-800/80 pb-2">
              Team Configurations
            </h4>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Member Name"
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white placeholder-slate-700"
                />
                <input
                  type="text"
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  placeholder="Role (e.g. Sorter Developer)"
                  className="flex-1 rounded-xl border border-slate-800 bg-slate-950 py-2 px-3 text-xs text-white placeholder-slate-700"
                />
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="rounded-xl bg-slate-800 px-4 text-xs font-semibold text-white hover:bg-slate-750 border border-slate-700 transition-colors"
                >
                  Add
                </button>
              </div>

              {teamMembers.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {teamMembers.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/60 py-1 pl-3 pr-2 text-xs"
                    >
                      <span className="text-white font-medium">
                        {member.name}
                      </span>
                      <span className="text-slate-500">({member.role})</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="rounded-md p-0.5 text-slate-500 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-800 p-6 bg-slate-900/50">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-800 px-4 py-2 text-xs font-semibold text-slate-350 hover:bg-slate-850 hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 text-xs font-semibold text-white hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-600/10 transition-all"
          >
            {project ? "Save Project" : "Create Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

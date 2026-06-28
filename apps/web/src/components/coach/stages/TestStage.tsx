import React, { useState } from "react";
import { InnovationProject, TestRecord } from "../../../types/innovation";

interface TestStageProps {
  project: InnovationProject;
  onUpdate: (records: TestRecord[]) => void;
}

export function TestStage({ project, onUpdate }: TestStageProps) {
  const [records, setRecords] = useState<TestRecord[]>(project.test);

  // Form states
  const [testUsers, setTestUsers] = useState("");
  const [feedback, setFeedback] = useState("");
  const [improvements, setImprovements] = useState("");
  const [pendingIssues, setPendingIssues] = useState("");
  const [lessonsLearned, setLessonsLearned] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!testUsers.trim()) errs.testUsers = "Test users cohort is required";
    if (!feedback.trim()) errs.feedback = "Feedback text is required";
    if (!improvements.trim())
      errs.improvements = "Identified improvements are required";
    if (!lessonsLearned.trim())
      errs.lessonsLearned = "Lessons learned are required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newRecord: TestRecord = {
      id: `test-${Date.now()}`,
      testUsers: testUsers.trim(),
      feedback: feedback.trim(),
      improvements: improvements.trim(),
      pendingIssues: pendingIssues.trim() || "None",
      lessonsLearned: lessonsLearned.trim(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newRecord, ...records]; // Chronological order (latest first)
    setRecords(updated);
    onUpdate(updated);

    // Reset Form
    setTestUsers("");
    setFeedback("");
    setImprovements("");
    setPendingIssues("");
    setLessonsLearned("");
    setErrors({});
  };

  const handleRemoveRecord = (id: string) => {
    const updated = records.filter((r) => r.id !== id);
    setRecords(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Stage 5: Test
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Perform user testing and collect feedback. Log observations
          chronologically to drive design iterations.
        </p>
      </div>

      {/* Chronological feedback log */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          User Feedback Log (Latest First)
        </h4>

        {records.length > 0 ? (
          <div className="space-y-4">
            {records.map((rec) => (
              <div
                key={rec.id}
                className="rounded-xl border border-border-default bg-bg-card p-5 space-y-4 animate-fade-in-up hover:border-border-accent transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      Tested with: {rec.testUsers}
                    </span>
                    <span className="text-[9px] text-slate-500 block mt-1 font-bold uppercase tracking-wider">
                      Date logged: {rec.createdAt}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveRecord(rec.id)}
                    className="text-slate-500 hover:text-rose-accent p-1 rounded transition-colors"
                    aria-label="Remove testing record"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                  <div className="space-y-3">
                    <div className="rounded-lg bg-bg-base p-3 border border-border-default">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        User Feedback & Reactions
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {rec.feedback}
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-base p-3 border border-border-default">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        Lessons Learned
                      </span>
                      <p className="text-slate-350 leading-relaxed">
                        {rec.lessonsLearned}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-lg bg-bg-base p-3 border border-border-default">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        Identified Improvements
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {rec.improvements}
                      </p>
                    </div>

                    <div className="rounded-lg bg-bg-base p-3 border border-border-default">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-rose-accent block mb-1">
                        Pending Issues / Bugs
                      </span>
                      <p className="text-rose-accent leading-relaxed font-semibold">
                        {rec.pendingIssues}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">
            No user testing records logged. Register your feedback below!
          </p>
        )}
      </div>

      {/* Add testing logs form */}
      <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-5 space-y-4 shadow-lg">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-accent border-b border-border-default pb-2">
          Record User Testing Feedback
        </h4>

        <form
          onSubmit={handleAddRecord}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Testing User Cohort
              </label>
              <input
                type="text"
                value={testUsers}
                onChange={(e) => setTestUsers(e.target.value)}
                className={`w-full df-input px-3 py-2.5 ${
                  errors.testUsers ? "border-rose-accent" : ""
                }`}
                placeholder="e.g. 5 local school teachers"
              />
              {errors.testUsers && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.testUsers}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                User Feedback Summary
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={3}
                className={`w-full df-input p-3 ${
                  errors.feedback ? "border-rose-accent" : ""
                }`}
                placeholder="What did the users say during tests?"
              />
              {errors.feedback && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.feedback}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Lessons Learned
              </label>
              <textarea
                value={lessonsLearned}
                onChange={(e) => setLessonsLearned(e.target.value)}
                rows={2}
                className={`w-full df-input p-3 ${
                  errors.lessonsLearned ? "border-rose-accent" : ""
                }`}
                placeholder="What design flaws or behaviors did you discover?"
              />
              {errors.lessonsLearned && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.lessonsLearned}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Actionable Improvements Identified
              </label>
              <textarea
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                rows={3}
                className={`w-full df-input p-3 ${
                  errors.improvements ? "border-rose-accent" : ""
                }`}
                placeholder="What specific changes are needed to the prototype?"
              />
              {errors.improvements && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.improvements}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Outstanding Issues / Bugs (Optional)
              </label>
              <textarea
                value={pendingIssues}
                onChange={(e) => setPendingIssues(e.target.value)}
                rows={3}
                className="w-full df-input p-3"
                placeholder="List any remaining bugs or constraints."
              />
            </div>
          </div>

          <div className="md:col-span-2 pt-2 text-right">
            <button type="submit" className="df-btn df-btn-primary px-5 py-2.5">
              Add Testing Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

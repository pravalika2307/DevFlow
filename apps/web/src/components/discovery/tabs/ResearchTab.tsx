import React, { useState } from "react";
import {
  UserResearchRecord,
  ResearchRecordType,
} from "../../../types/discovery";

interface ResearchTabProps {
  records: UserResearchRecord[];
  onUpdate: (records: UserResearchRecord[]) => void;
}

const RECORD_TYPES: {
  value: ResearchRecordType;
  label: string;
  color: string;
}[] = [
  {
    value: "Interview",
    label: "User Interview",
    color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  },
  {
    value: "Survey",
    label: "Survey Notes",
    color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  },
  {
    value: "Observation",
    label: "Observation Log",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    value: "FieldNote",
    label: "Field Notes",
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    value: "PainPoint",
    label: "Pain Point Card",
    color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
  {
    value: "Quote",
    label: "User Quote",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  {
    value: "AffinityNote",
    label: "Affinity Cluster",
    color: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  },
];

export function ResearchTab({ records, onUpdate }: ResearchTabProps) {
  const [type, setType] = useState<ResearchRecordType>("Interview");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!title.trim()) errs.title = "Record title is required";
    if (!content.trim()) errs.content = "Content description is required";
    if (!author.trim()) errs.author = "Author name is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newRecord: UserResearchRecord = {
      id: `rec-${Date.now()}`,
      type,
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [newRecord, ...records];
    onUpdate(updated);

    window.dispatchEvent(
      new CustomEvent("devflow-task-complete", {
        detail: { task: "add-observation" },
      }),
    );

    // Reset Form
    setTitle("");
    setContent("");
    setAuthor("");
    setErrors({});
  };

  const handleRemoveRecord = (id: string) => {
    const updated = records.filter((r) => r.id !== id);
    onUpdate(updated);
  };

  const getTypeStyle = (val: string) => {
    const found = RECORD_TYPES.find((t) => t.value === val);
    return found
      ? found.color
      : "bg-slate-500/10 text-slate-400 border-slate-500/20";
  };

  const getTypeLabel = (val: string) => {
    const found = RECORD_TYPES.find((t) => t.value === val);
    return found ? found.label : val;
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          User Research Records
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Catalog client interviews, survey parameters, site observations, and
          direct quotes chronologically.
        </p>
      </div>

      {/* Timeline logs */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Chronological Research Timeline (Latest First)
        </h4>

        {records.length > 0 ? (
          <div className="relative pl-6 border-l border-border-default space-y-6">
            {records.map((rec) => (
              <div key={rec.id} className="relative animate-fade-in-up">
                {/* Timeline Bullet */}
                <div className="absolute -left-[30px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-bg-base border-2 border-blue-accent">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-accent" />
                </div>

                <div className="rounded-xl border border-border-default bg-bg-card p-5 space-y-3 shadow-md hover:border-border-accent transition-colors">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${getTypeStyle(
                          rec.type,
                        )}`}
                      >
                        {getTypeLabel(rec.type)}
                      </span>
                      <h5 className="text-xs font-bold text-white tracking-tight">
                        {rec.title}
                      </h5>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                        Logged: {rec.createdAt}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRecord(rec.id)}
                        className="text-slate-500 hover:text-rose-accent p-1 rounded transition-colors"
                        aria-label="Remove record"
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
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {rec.content}
                  </p>

                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider text-right">
                    Recorded by:{" "}
                    <span className="text-blue-accent lowercase font-medium text-xs ml-1">
                      {rec.author}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">
            No research records logged. Add one below!
          </p>
        )}
      </div>

      {/* Input Form */}
      <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-5 space-y-4 shadow-lg">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-accent border-b border-border-default pb-2">
          Add Research Record
        </h4>

        <form
          onSubmit={handleAddRecord}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Record Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ResearchRecordType)}
                className="w-full df-input py-2.5 px-3 cursor-pointer text-xs font-semibold"
              >
                {RECORD_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={`w-full df-input px-3 py-2.5 ${
                  errors.author ? "border-rose-accent" : ""
                }`}
                placeholder="Innovator name..."
              />
              {errors.author && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.author}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Record Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full df-input px-3 py-2.5 ${
                  errors.title ? "border-rose-accent" : ""
                }`}
                placeholder="e.g. Interview with Fatima"
              />
              {errors.title && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.title}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Content Details / Observations
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={7}
                className={`w-full df-input p-3 ${
                  errors.content ? "border-rose-accent" : ""
                }`}
                placeholder="What did you observe or record during this research session?"
              />
              {errors.content && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.content}
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-2 pt-2 text-right">
            <button type="submit" className="df-btn df-btn-primary px-5 py-2.5">
              Add Timeline Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

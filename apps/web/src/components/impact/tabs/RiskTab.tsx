import React, { useState } from "react";
import { RiskItem } from "../../../types/impact";

interface RiskTabProps {
  risks: RiskItem[];
  onUpdate: (risks: RiskItem[]) => void;
}

const RISK_CATEGORIES = [
  "Technical",
  "Financial",
  "Operational",
  "Ethical",
  "Privacy",
  "Adoption",
  "Accessibility",
] as const;
const SEVERITIES = ["Low", "Medium", "High"] as const;

export function RiskTab({ risks, onUpdate }: RiskTabProps) {
  const [category, setCategory] = useState<RiskItem["category"]>("Technical");
  const [severity, setSeverity] = useState<RiskItem["severity"]>("Medium");
  const [description, setDescription] = useState("");
  const [mitigation, setMitigation] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddRisk = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!description.trim()) errs.description = "Risk description is required";
    if (!mitigation.trim())
      errs.mitigation = "Mitigation recommendation is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newRisk: RiskItem = {
      category,
      severity,
      description: description.trim(),
      mitigation: mitigation.trim(),
    };

    const updated = [...risks, newRisk];
    onUpdate(updated);

    // Reset Form
    setDescription("");
    setMitigation("");
    setErrors({});
  };

  const handleRemoveRisk = (idx: number) => {
    const updated = risks.filter((_, i) => i !== idx);
    onUpdate(updated);
  };

  const getSeverityStyle = (val: string) => {
    switch (val) {
      case "High":
        return "bg-rose-accent/10 text-rose-accent border-rose-accent/20";
      case "Medium":
        return "bg-amber-accent/10 text-amber-accent border-amber-accent/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Risk Assessment & Mitigation
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Catalog risk factors across technical, privacy, and operational
          categories, outlining explicit mitigation loops.
        </p>
      </div>

      {/* Risks List */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Risk & Mitigation Matrix
        </h4>

        {risks.length > 0 ? (
          <div className="space-y-4">
            {risks.map((risk, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border-default bg-bg-card p-5 space-y-3 shadow-md hover:border-border-accent transition-colors animate-fade-in-up"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="df-badge df-badge-blue">
                      {risk.category} Category
                    </span>
                    <span
                      className={`rounded border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getSeverityStyle(
                        risk.severity,
                      )}`}
                    >
                      {risk.severity} Severity
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveRisk(idx)}
                    className="text-slate-555 hover:text-rose-accent p-1 rounded transition-colors"
                    aria-label="Remove risk"
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-lg bg-bg-base/40 p-3 border border-border-default">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Risk Description
                    </span>
                    <p className="text-slate-300 leading-relaxed font-medium">
                      {risk.description}
                    </p>
                  </div>
                  <div className="rounded-lg bg-bg-base/40 p-3 border border-border-default">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-accent block mb-1">
                      Mitigation Plan
                    </span>
                    <p className="text-slate-300 leading-relaxed font-semibold">
                      {risk.mitigation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">
            No risks analyzed yet. Log one below!
          </p>
        )}
      </div>

      {/* Form */}
      <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-5 space-y-4 shadow-lg">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-accent border-b border-border-default pb-2">
          Add Risk Analysis
        </h4>

        <form
          onSubmit={handleAddRisk}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Risk Classification
              </label>
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value as RiskItem["category"])
                }
                className="w-full df-input py-2.5 px-3 cursor-pointer text-xs font-semibold"
              >
                {RISK_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Severity Level
              </label>
              <select
                value={severity}
                onChange={(e) =>
                  setSeverity(e.target.value as RiskItem["severity"])
                }
                className="w-full df-input py-2.5 px-3 cursor-pointer text-xs font-semibold"
              >
                {SEVERITIES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Threat Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={`w-full df-input p-3 ${
                  errors.description ? "border-rose-accent" : ""
                }`}
                placeholder="What failure vector exists?"
              />
              {errors.description && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Mitigation Response Strategy
              </label>
              <textarea
                value={mitigation}
                onChange={(e) => setMitigation(e.target.value)}
                rows={7}
                className={`w-full df-input p-3 ${
                  errors.mitigation ? "border-rose-accent" : ""
                }`}
                placeholder="What engineering or procedural control bypasses or absorbs this risk?"
              />
              {errors.mitigation && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.mitigation}
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-2 pt-2 text-right">
            <button type="submit" className="df-btn df-btn-primary px-5 py-2.5">
              Add Risk Mitigation Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

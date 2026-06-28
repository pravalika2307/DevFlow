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
        return "bg-rose-500/10 text-rose-450 border-rose-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-900 pb-3">
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
                className="rounded-xl border border-slate-900 bg-slate-900/10 p-5 space-y-3"
              >
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-indigo-400">
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
                    className="text-slate-550 hover:text-rose-455 p-1 rounded transition-colors"
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
                  <div className="rounded-lg bg-slate-950 p-3 border border-slate-900">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Risk Description
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {risk.description}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-950 p-3 border border-slate-900">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-450 block mb-1">
                      Mitigation Plan
                    </span>
                    <p className="text-slate-350 leading-relaxed font-semibold">
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
      <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-5 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-900 pb-2">
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
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
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
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
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
                className={`w-full rounded-xl border ${
                  errors.description ? "border-rose-500" : "border-slate-800"
                } bg-slate-950 py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500`}
                placeholder="What failure vector exists?"
              />
              {errors.description && (
                <p className="text-[10px] text-rose-400 mt-1">
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
                className={`w-full rounded-xl border ${
                  errors.mitigation ? "border-rose-500" : "border-slate-800"
                } bg-slate-950 py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500`}
                placeholder="What engineering or procedural control bypasses or absorbs this risk?"
              />
              {errors.mitigation && (
                <p className="text-[10px] text-rose-400 mt-1">
                  {errors.mitigation}
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-2 pt-2 text-right">
            <button
              type="submit"
              className="rounded-xl bg-indigo-650 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-600 shadow-md shadow-indigo-600/10 transition-all"
            >
              Add Risk Mitigation Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

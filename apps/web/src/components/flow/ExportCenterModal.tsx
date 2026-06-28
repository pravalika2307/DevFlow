import React, { useState } from "react";
import { InnovationProject } from "../../types/innovation";

interface ExportCenterModalProps {
  project: InnovationProject;
  onClose: () => void;
}

export function ExportCenterModal({
  project,
  onClose,
}: ExportCenterModalProps) {
  const [exportType, setExportType] = useState<
    "summary" | "council" | "impact" | "all"
  >("summary");
  const [isExporting, setIsExporting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleExport = () => {
    setIsExporting(true);
    setSuccessMsg("");

    setTimeout(() => {
      setIsExporting(false);
      const filename = `${project.name
        .toLowerCase()
        .replace(/\s+/g, "_")}_${exportType}_report.json`;

      // Simulate file download by creating a virtual blob
      const fileData = {
        projectName: project.name,
        theme: project.innovationTheme,
        stage: project.projectStage,
        score: project.innovationScore,
        readiness: project.readinessScore,
        exportTimestamp: new Date().toISOString(),
        exportType,
      };

      const blob = new Blob([JSON.stringify(fileData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setSuccessMsg(`Successfully generated and downloaded ${filename}!`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base/80 backdrop-blur-md p-4">
      <div
        className="w-full max-w-md rounded-2xl border border-border-default bg-bg-surface p-6 space-y-6 relative overflow-hidden shadow-2xl shadow-glow-blue/10 animate-fade-in-scale"
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-title"
      >
        <div className="flex justify-between items-center border-b border-border-default pb-3">
          <h3
            id="export-title"
            className="text-xs font-bold text-white uppercase tracking-widest"
          >
            Solve for Tomorrow Export Center
          </h3>
          <button
            onClick={onClose}
            aria-label="Close export dialog"
            className="text-slate-500 hover:text-white transition-colors text-lg focus:ring-2 focus:ring-blue-accent outline-none rounded-lg p-0.5"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-slate-400 leading-relaxed font-semibold">
            Select the report classification you want to compile. The Export
            Center packs all metrics, checklists, and advisor summaries.
          </p>

          <div className="space-y-2">
            {[
              {
                id: "summary" as const,
                title: "Executive Summary Sheet",
                desc: "One-page pitch overview.",
              },
              {
                id: "council" as const,
                title: "NOVA Council Evaluation Report",
                desc: "Complete 8-advisor consensus matrix.",
              },
              {
                id: "impact" as const,
                title: "Impact & SDG Dashboard",
                desc: "UN SDG weights and reach metrics.",
              },
              {
                id: "all" as const,
                title: "Full Innovation dossier",
                desc: "All phases, research logs, and risk registers.",
              },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex gap-3 items-start p-3 rounded-xl border cursor-pointer transition-all ${
                  exportType === opt.id
                    ? "bg-blue-accent/10 border-blue-accent text-white"
                    : "bg-bg-card border-border-default hover:bg-white/[0.02] text-slate-450"
                }`}
              >
                <input
                  type="radio"
                  name="exportType"
                  checked={exportType === opt.id}
                  onChange={() => setExportType(opt.id)}
                  className="mt-1 accent-blue-accent focus:ring-2 focus:ring-blue-accent outline-none"
                />
                <div>
                  <span className="text-xs font-bold block">{opt.title}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5 leading-relaxed font-semibold">
                    {opt.desc}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {successMsg && (
            <p className="text-xs font-semibold text-emerald-accent bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl text-center">
              {successMsg}
            </p>
          )}
        </div>

        <div className="flex gap-3 justify-end pt-3 border-t border-border-default">
          <button
            onClick={onClose}
            className="df-btn df-btn-ghost"
            style={{ padding: "8px 16px" }}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="df-btn df-btn-primary"
            style={{ padding: "8px 18px" }}
          >
            {isExporting ? (
              <>
                <svg
                  className="animate-spin h-3.5 w-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Compiling...
              </>
            ) : (
              "Generate Report"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

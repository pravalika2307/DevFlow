import React, { useState } from "react";
import { InnovationProject, PrototypeVersion } from "../../../types/innovation";

interface PrototypeStageProps {
  project: InnovationProject;
  onUpdate: (versions: PrototypeVersion[]) => void;
}

export function PrototypeStage({ project, onUpdate }: PrototypeStageProps) {
  const [versions, setVersions] = useState<PrototypeVersion[]>(
    project.prototype,
  );

  // New Version form states
  const [version, setVersion] = useState("");
  const [figmaLink, setFigmaLink] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [screenshots, setScreenshots] = useState("");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddVersion = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    if (!version.trim()) errs.version = "Version is required (e.g. v1.0.0)";
    if (!figmaLink.trim()) errs.figmaLink = "Figma file URL is required";
    if (!githubRepo.trim()) errs.githubRepo = "GitHub repository is required";
    if (!screenshots.trim())
      errs.screenshots = "Screenshot description is required";
    if (!notes.trim()) errs.notes = "Prototype notes are required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newVersion: PrototypeVersion = {
      id: `proto-${Date.now()}`,
      version: version.trim(),
      figmaLink: figmaLink.trim(),
      githubRepo: githubRepo.trim(),
      demoUrl: demoUrl.trim() || "http://localhost:3000",
      screenshots: screenshots.trim(),
      notes: notes.trim(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updated = [...versions, newVersion];
    setVersions(updated);
    onUpdate(updated);

    // Reset Form
    setVersion("");
    setFigmaLink("");
    setGithubRepo("");
    setDemoUrl("");
    setScreenshots("");
    setNotes("");
    setErrors({});
  };

  const handleRemoveVersion = (id: string) => {
    const updated = versions.filter((v) => v.id !== id);
    setVersions(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Stage 4: Prototype
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Develop and track rapid experimental designs. Document repositories,
          designs, and notes in an evolution timeline.
        </p>
      </div>

      {/* Evolution timeline */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Prototype Evolution Timeline
        </h4>

        {versions.length > 0 ? (
          <div className="relative pl-6 border-l border-border-default space-y-6">
            {versions.map((ver) => (
              <div key={ver.id} className="relative animate-fade-in-up">
                {/* Bullet */}
                <div className="absolute -left-[30px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-bg-base border-2 border-blue-accent">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-accent animate-ping" />
                </div>

                <div className="rounded-xl border border-border-default bg-bg-card p-5 space-y-3 shadow-md hover:border-border-accent transition-colors">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="df-badge df-badge-blue">
                        {ver.version}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        Released: {ver.createdAt}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveVersion(ver.id)}
                      className="text-slate-500 hover:text-rose-accent p-1 rounded transition-colors"
                      aria-label="Remove version"
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

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {ver.notes}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <div className="truncate">
                      <span className="text-slate-500">Figma Design:</span>{" "}
                      <a
                        href={ver.figmaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-accent hover:underline lowercase font-medium text-xs"
                      >
                        {ver.figmaLink}
                      </a>
                    </div>
                    <div className="truncate">
                      <span className="text-slate-500">GitHub Repo:</span>{" "}
                      <a
                        href={ver.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-accent hover:underline lowercase font-medium text-xs"
                      >
                        {ver.githubRepo}
                      </a>
                    </div>
                    {ver.demoUrl && (
                      <div className="truncate sm:col-span-2">
                        <span className="text-slate-500">Deployment Demo:</span>{" "}
                        <a
                          href={ver.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-accent hover:underline lowercase font-medium text-xs"
                        >
                          {ver.demoUrl}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg bg-bg-base p-2.5 border border-border-default text-[10px] text-slate-400 leading-relaxed font-medium">
                    <strong>Interface Screenshots Layout:</strong>{" "}
                    {ver.screenshots}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">
            No prototypes built yet. Define one below!
          </p>
        )}
      </div>

      {/* Add prototype release form */}
      <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-5 space-y-4 shadow-lg">
        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-accent border-b border-border-default pb-2">
          Log Prototype Version Release
        </h4>

        <form
          onSubmit={handleAddVersion}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Prototype Version
              </label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className={`w-full df-input px-3 py-2.5 ${
                  errors.version ? "border-rose-accent" : ""
                }`}
                placeholder="e.g. v1.0.0"
              />
              {errors.version && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.version}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Figma Frame Link
              </label>
              <input
                type="text"
                value={figmaLink}
                onChange={(e) => setFigmaLink(e.target.value)}
                className={`w-full df-input px-3 py-2.5 ${
                  errors.figmaLink ? "border-rose-accent" : ""
                }`}
                placeholder="https://figma.com/..."
              />
              {errors.figmaLink && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.figmaLink}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                GitHub Repository URL
              </label>
              <input
                type="text"
                value={githubRepo}
                onChange={(e) => setGithubRepo(e.target.value)}
                className={`w-full df-input px-3 py-2.5 ${
                  errors.githubRepo ? "border-rose-accent" : ""
                }`}
                placeholder="https://github.com/..."
              />
              {errors.githubRepo && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.githubRepo}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Deployment / Demo URL (Optional)
              </label>
              <input
                type="text"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full df-input px-3 py-2.5"
                placeholder="https://demo-site.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Screenshot / Screen Mock Details
              </label>
              <input
                type="text"
                value={screenshots}
                onChange={(e) => setScreenshots(e.target.value)}
                className={`w-full df-input px-3 py-2.5 ${
                  errors.screenshots ? "border-rose-accent" : ""
                }`}
                placeholder="Describe screen layouts..."
              />
              {errors.screenshots && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.screenshots}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Release Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className={`w-full df-input p-3 ${
                  errors.notes ? "border-rose-accent" : ""
                }`}
                placeholder="What improvements were made in this release?"
              />
              {errors.notes && (
                <p className="text-[10px] text-rose-accent mt-1">
                  {errors.notes}
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-2 pt-2 text-right">
            <button type="submit" className="df-btn df-btn-primary px-5 py-2.5">
              Add Release to Timeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React from "react";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onNewProjectClick: () => void;
  onDemoModeClick: () => void;
  onExportCenterClick: () => void;
  activeModule: "dashboard" | "discovery" | "impact" | "council";
  onModuleChange: (
    module: "dashboard" | "discovery" | "impact" | "council",
  ) => void;
}

export function Navbar({
  searchQuery,
  onSearchChange,
  onNewProjectClick,
  onDemoModeClick,
  onExportCenterClick,
  activeModule,
  onModuleChange,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Side: Brand Logo & Navigation */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
              <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 blur-sm opacity-50" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                DevFlow{" "}
                <span className="text-[10px] uppercase tracking-widest bg-indigo-950/50 text-indigo-400 px-2 py-0.5 rounded border border-indigo-900/30">
                  OS
                </span>
              </h1>
              <p className="text-[10px] text-slate-455 font-medium">
                AI Innovation Operating System
              </p>
            </div>
          </div>

          <div className="h-6 w-[1px] bg-slate-800" />

          <nav className="flex gap-2">
            <button
              onClick={() => onModuleChange("dashboard")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wide transition-all border ${
                activeModule === "dashboard"
                  ? "bg-slate-900 border-slate-800 text-white"
                  : "bg-transparent border-transparent text-slate-455 hover:text-white"
              }`}
            >
              Innovation Workspace
            </button>
            <button
              onClick={() => onModuleChange("discovery")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wide transition-all border ${
                activeModule === "discovery"
                  ? "bg-slate-900 border-slate-800 text-white"
                  : "bg-transparent border-transparent text-slate-455 hover:text-white"
              }`}
            >
              Problem Discovery
            </button>
            <button
              onClick={() => onModuleChange("impact")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wide transition-all border ${
                activeModule === "impact"
                  ? "bg-slate-900 border-slate-800 text-white"
                  : "bg-transparent border-transparent text-slate-455 hover:text-white"
              }`}
            >
              Impact Intelligence
            </button>
            <button
              onClick={() => onModuleChange("council")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold tracking-wide transition-all border ${
                activeModule === "council"
                  ? "bg-slate-900 border-slate-800 text-white"
                  : "bg-transparent border-transparent text-slate-455 hover:text-white"
              }`}
            >
              AI Council
            </button>
          </nav>
        </div>

        {/* Center: Search Field */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search innovation theme, SDG goal, priority, name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/50 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Right Side: Primary Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onDemoModeClick}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-indigo-400 hover:text-white hover:border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Launch Demo Mode
          </button>

          <button
            onClick={onExportCenterClick}
            className="rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Export Center
          </button>

          <button
            onClick={onNewProjectClick}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/15 hover:from-indigo-500 hover:to-violet-500 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            New Innovation Project
          </button>

          <div className="h-8 w-[1px] bg-slate-800" />

          {/* User Profile Info */}
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col text-right">
              <span className="text-xs font-medium text-white">
                Guest Innovator
              </span>
              <span className="text-[10px] text-slate-500">
                Workspace Member
              </span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-indigo-400">
              GI
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

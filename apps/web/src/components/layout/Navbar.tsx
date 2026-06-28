import React, { useState } from "react";

type Module = "dashboard" | "discovery" | "impact" | "council";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onNewProjectClick: () => void;
  onDemoModeClick: () => void;
  onExportCenterClick: () => void;
  activeModule: Module;
  onModuleChange: (module: Module) => void;
}

const NAV_ITEMS: { id: Module; label: string; shortLabel: string }[] = [
  { id: "dashboard", label: "Innovation Workspace", shortLabel: "Workspace" },
  { id: "discovery", label: "Problem Discovery", shortLabel: "Discovery" },
  { id: "impact", label: "Impact Intelligence", shortLabel: "Impact" },
  { id: "council", label: "AI Council", shortLabel: "Council" },
];

export function Navbar({
  searchQuery,
  onSearchChange,
  onNewProjectClick,
  onDemoModeClick,
  onExportCenterClick,
  activeModule,
  onModuleChange,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-slate-950/85 backdrop-blur-xl"
        role="banner"
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 gap-4">
          {/* ── Brand ─────────────────────────────────────── */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25"
              aria-hidden="true"
            >
              <svg
                className="h-5 w-5"
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
              <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 blur-md opacity-40" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">
                  DevFlow
                </span>
                <span className="text-[9px] uppercase tracking-widest bg-indigo-950/60 text-indigo-400 px-1.5 py-0.5 rounded-md border border-indigo-900/40 font-semibold">
                  OS
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">
                AI Innovation Operating System
              </p>
            </div>
          </div>

          {/* ── Desktop Nav ───────────────────────────────── */}
          <nav
            className="hidden lg:flex items-center gap-0.5 bg-slate-900/60 rounded-xl border border-white/[0.06] p-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                aria-current={activeModule === item.id ? "page" : undefined}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 ${
                  activeModule === item.id
                    ? "bg-indigo-600/20 text-indigo-300 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* ── Search ────────────────────────────────────── */}
          <div className="flex-1 max-w-xs hidden md:block">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-3.5 w-3.5 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                placeholder="Search projects…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search innovation projects"
                className="input-premium w-full py-2 pl-9 pr-3 text-xs"
              />
            </div>
          </div>

          {/* ── Actions ───────────────────────────────────── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Demo Mode */}
            <button
              onClick={onDemoModeClick}
              aria-label="Launch Samsung Solve for Tomorrow demo mode"
              className="hidden sm:flex items-center gap-1.5 rounded-xl border border-indigo-500/25 bg-indigo-500/8 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/15 hover:border-indigo-500/40 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              <span className="live-dot" aria-hidden="true" />
              Demo Mode
            </button>

            {/* Export */}
            <button
              onClick={onExportCenterClick}
              aria-label="Open export center"
              title="Export Center"
              className="hidden sm:flex items-center justify-center h-8 w-8 rounded-xl border border-white/[0.08] bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>

            {/* New Project CTA */}
            <button
              onClick={onNewProjectClick}
              aria-label="Create new innovation project"
              className="btn-glow inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 sm:px-4 py-2 text-xs font-semibold text-white hover:from-indigo-500 hover:to-violet-500 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="hidden sm:inline">New Project</span>
              <span className="sm:hidden">New</span>
            </button>

            {/* Divider + Avatar */}
            <div
              className="h-7 w-px bg-white/[0.08] hidden sm:block"
              aria-hidden="true"
            />
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-[10px] font-bold text-white shadow-md shadow-indigo-600/20 cursor-default shrink-0"
              title="Guest Innovator – Workspace Member"
              aria-label="User avatar: Guest Innovator"
            >
              GI
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden flex items-center justify-center h-8 w-8 rounded-xl border border-white/[0.08] bg-slate-900/60 text-slate-400 hover:text-white transition-all"
            >
              {mobileMenuOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ────────────────────────────────── */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-t border-white/[0.06] bg-slate-950/95 backdrop-blur-xl animate-fade-in-up"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onModuleChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  aria-current={activeModule === item.id ? "page" : undefined}
                  className={`nav-item w-full text-left ${
                    activeModule === item.id ? "active" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-white/[0.06] flex flex-col gap-2">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-3.5 w-3.5 text-slate-500"
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
                  type="search"
                  placeholder="Search projects…"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  aria-label="Search innovation projects"
                  className="input-premium w-full py-2 pl-9 pr-3 text-xs"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onDemoModeClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 rounded-xl border border-indigo-500/25 bg-indigo-500/8 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/15 transition-all"
                >
                  Demo Mode
                </button>
                <button
                  onClick={() => {
                    onExportCenterClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 rounded-xl border border-white/[0.08] bg-slate-900/60 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-all"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

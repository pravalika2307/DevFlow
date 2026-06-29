import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Module = "dashboard" | "discovery" | "impact" | "council" | "galaxy";

interface SidebarProps {
  activeModule: Module;
  onModuleChange: (mod: Module) => void;
  activeCoachProject: boolean;
  onLaunchCoach: () => void;
  onExportCenterClick: () => void;
  onDemoModeClick: () => void;
  onResourcesClick: () => void;
  onSettingsClick: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  activeModule,
  onModuleChange,
  activeCoachProject,
  onLaunchCoach,
  onExportCenterClick,
  onDemoModeClick,
  onResourcesClick,
  onSettingsClick,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const sidebarItems = [
    { id: "dashboard", label: "Workspace", icon: "🏠", isTab: true },
    { id: "galaxy", label: "Innovation Galaxy", icon: "🌌", isTab: true },
    { id: "discovery", label: "Problem Discovery", icon: "💡", isTab: true },
    {
      id: "coach",
      label: "Design Thinking",
      icon: "🎯",
      isTab: false,
      action: onLaunchCoach,
    },
    { id: "impact", label: "Impact Intelligence", icon: "🌍", isTab: true },
    { id: "council", label: "NOVA Council", icon: "🤖", isTab: true },
    {
      id: "reports",
      label: "Reports & Export",
      icon: "📊",
      isTab: false,
      action: onExportCenterClick,
    },
    {
      id: "demo",
      label: "Samsung Demo Center",
      icon: "🎬",
      isTab: false,
      action: onDemoModeClick,
    },
    {
      id: "resources",
      label: "Resources",
      icon: "📚",
      isTab: false,
      action: onResourcesClick,
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙",
      isTab: false,
      action: onSettingsClick,
    },
  ];

  const handleItemClick = (item: (typeof sidebarItems)[number]) => {
    if (item.isTab) {
      onModuleChange(item.id as Module);
    } else if (item.action) {
      item.action();
    }
    onCloseMobile();
  };

  const isItemActive = (id: string) => {
    if (id === "coach") return activeCoachProject;
    if (activeCoachProject) return false;
    return activeModule === id;
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 bg-bg-surface/90 backdrop-blur-xl border border-border-default md:rounded-2xl shadow-2xl relative overflow-hidden select-none">
      {/* Glow highlight orb */}
      <div className="absolute top-[-50px] left-[-50px] w-36 h-36 rounded-full bg-blue-accent/5 filter blur-3xl pointer-events-none" />

      {/* Brand & Section links */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 px-4 py-2 border-b border-border-default pb-5">
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            style={{ flexShrink: 0 }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="devflow-logo-grad-sidebar"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path
              d="M4 3h8a9 9 0 0 1 9 9a9 9 0 0 1-9 9H4V3zm4 4v10h5l4-5l-4-5H8zm3 5l-3-3v6l3-3z"
              fill="url(#devflow-logo-grad-sidebar)"
              fillRule="evenodd"
            />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <h2
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: "white",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              DevFlow
            </h2>
            <span
              style={{
                fontSize: 8.5,
                color: "var(--text-tertiary)",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                lineHeight: 1.2,
              }}
            >
              Innovation Operating System
            </span>
          </div>
        </div>

        <nav className="space-y-1.5">
          {sidebarItems.map((item) => {
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all ${
                  active
                    ? "bg-blue-accent/15 border-blue-accent/35 text-white shadow-lg shadow-glow-blue/5"
                    : "bg-transparent border-transparent text-slate-400 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                <span className="text-xs font-bold tracking-tight truncate">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Streak Card, Profile & Connectivity Status */}
      <div className="space-y-4 pt-4 border-t border-border-default">
        {/* Innovation Streak Card */}
        <div className="rounded-xl border border-border-default bg-bg-card/65 p-3 space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-1">⚡ Streak</span>
            <span className="text-blue-accent font-extrabold">5 Days</span>
          </div>
          <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-accent to-violet-accent"
              style={{ width: "70%" }}
            />
          </div>
          <span className="text-[9px] text-slate-500 block font-semibold">
            Next Milestone: 7-Day Matrix
          </span>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3 px-2">
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, var(--blue) 0%, var(--violet) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              boxShadow: "0 0 12px rgba(59,130,246,0.2)",
              flexShrink: 0,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <div className="truncate">
            <span className="text-xs font-bold text-white block truncate leading-tight">
              Pravalika
            </span>
            <span className="text-[9px] text-slate-500 font-bold uppercase block tracking-wider">
              Workspace Admin
            </span>
          </div>
        </div>

        {/* Connectivity status */}
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border-default bg-bg-card/30">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-accent"></span>
          </span>
          <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">
            Live Connect / API Active
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bottom-0 p-4 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile drawer backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onCloseMobile}
            className="fixed inset-0 z-40 bg-black md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 w-64 z-50 md:hidden bg-bg-base"
          >
            {sidebarContent}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

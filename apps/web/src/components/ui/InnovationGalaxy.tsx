import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InnovationProject } from "../../types/innovation";

interface InnovationGalaxyProps {
  projects: InnovationProject[];
  onBack: () => void;
}

const THEME_COLORS: Record<
  string,
  { base: string; glow: string; gradient: string }
> = {
  "Healthcare & Well-being": {
    base: "#fda4af",
    glow: "rgba(244,63,94,0.6)",
    gradient: "from-rose-400 to-pink-600",
  },
  "Education & Literacy": {
    base: "#93c5fd",
    glow: "rgba(59,130,246,0.6)",
    gradient: "from-blue-400 to-indigo-600",
  },
  "Clean Energy & Water": {
    base: "#6ee7b7",
    glow: "rgba(16,185,129,0.6)",
    gradient: "from-emerald-400 to-teal-600",
  },
  "Sustainable Agriculture": {
    base: "#fcd34d",
    glow: "rgba(245,158,11,0.6)",
    gradient: "from-amber-400 to-orange-600",
  },
  Default: {
    base: "#c4b5fd",
    glow: "rgba(139,92,246,0.6)",
    gradient: "from-violet-400 to-purple-600",
  },
};

const STAGE_ORBITS: Record<string, number> = {
  Ideation: 120,
  Prototyping: 200,
  Validation: 280,
  Scaling: 360,
};

export function InnovationGalaxy({ projects, onBack }: InnovationGalaxyProps) {
  const [selectedProject, setSelectedProject] =
    useState<InnovationProject | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(100); // 0 to 100% size

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const getThemeConfig = (theme: string) => {
    return THEME_COLORS[theme] || THEME_COLORS.Default;
  };

  return (
    <div className="flex h-screen flex-col bg-bg-base text-text-primary overflow-hidden relative select-none">
      {/* Galaxy Canvas Header */}
      <div className="flex items-center justify-between border-b border-border-default bg-bg-surface/80 backdrop-blur-md px-6 py-4 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="df-btn df-btn-ghost"
            style={{ padding: "6px 12px", fontSize: 12 }}
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
          <div className="h-6 w-[1px] bg-border-default" />
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              Innovation Galaxy Map
              <span className="df-badge df-badge-cyan">
                Interactive Orbiter
              </span>
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">
              Every innovation mapped as a living planet in the DevFlow solar
              ecosystem.
            </p>
          </div>
        </div>

        {/* Playback Controls & Zoom */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-bg-card border border-border-default rounded-xl p-1.5">
            <button
              onClick={() => {
                setPlaybackTime(0);
                setIsPlaying(true);
              }}
              disabled={isPlaying}
              className="df-btn df-btn-ghost"
              style={{ padding: "4px 8px", fontSize: 10 }}
            >
              {isPlaying ? "Simulating..." : "Play Evolution"}
            </button>
            <div className="h-4 w-[1px] bg-border-default" />
            <button
              onClick={() => setZoomLevel((prev) => Math.max(0.6, prev - 0.1))}
              className="df-btn df-btn-ghost text-slate-400 hover:text-white"
              style={{ padding: "2px 8px" }}
            >
              -
            </button>
            <span className="text-[10px] font-bold text-slate-500 w-12 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((prev) => Math.min(1.8, prev + 0.1))}
              className="df-btn df-btn-ghost text-slate-400 hover:text-white"
              style={{ padding: "2px 8px" }}
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-2 bg-bg-card border border-border-default rounded-xl p-1.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 pl-1">
              Rotation
            </span>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-20 accent-blue-accent cursor-pointer h-1 rounded-full bg-white/10"
            />
          </div>
        </div>
      </div>

      {/* Main Galaxy Orbit Area */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Ambient background Nebulae */}
        <div
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-30 animate-pulse"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(6,182,212,0.1) 0%, transparent 50%)",
          }}
        />

        {/* Orbit Grid */}
        <div
          className="relative transition-transform duration-300"
          style={{
            transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
            width: 800,
            height: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Central System Star: AI core */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 32px rgba(59,130,246,0.45)",
                "0 0 52px rgba(139,92,246,0.6)",
                "0 0 32px rgba(59,130,246,0.45)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-600 to-violet-600 flex items-center justify-center border border-white/20"
          >
            <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center backdrop-blur-sm border border-white/10 text-white font-black text-xs tracking-wider">
              CORE
            </div>
            {/* Holographic rings */}
            <div className="absolute inset-0 rounded-full border border-blue-400/30 scale-125 animate-ping opacity-25" />
            <div className="absolute inset-0 rounded-full border border-violet-400/30 scale-150 animate-pulse opacity-20" />
          </motion.div>

          {/* Render 4 Orbit Tracks */}
          {Object.entries(STAGE_ORBITS).map(([stage, diameter]) => (
            <div
              key={stage}
              style={{
                width: diameter * 2,
                height: diameter * 2,
                border: "1px dashed rgba(255,255,255,0.06)",
              }}
              className="absolute rounded-full flex items-center justify-center"
            >
              {/* Orbiting text label */}
              <span className="absolute top-1 text-[8px] font-bold tracking-widest text-slate-600 uppercase">
                {stage} Stage
              </span>
            </div>
          ))}

          {/* Render Project Planets */}
          {projects.map((proj, idx) => {
            const orbitRad = STAGE_ORBITS[proj.projectStage] || 200;
            // Space planets around the orbit circle
            const angle =
              (idx * (360 / Math.max(projects.length, 1)) * Math.PI) / 180;
            const x = Math.cos(angle) * orbitRad;
            const y = Math.sin(angle) * orbitRad;

            const theme = getThemeConfig(proj.innovationTheme);
            const readiness = proj.innovationScore || 70;

            // Apply playbacks size factor
            const currentSize = Math.max(
              12,
              (readiness / 3) * (playbackTime / 100),
            );

            return (
              <motion.div
                key={proj.id}
                className="absolute cursor-pointer group"
                style={{
                  left: 400 + x - currentSize / 2,
                  top: 400 + y - currentSize / 2,
                  width: currentSize,
                  height: currentSize,
                }}
                whileHover={{ scale: 1.15 }}
                onClick={() => setSelectedProject(proj)}
              >
                {/* Planet Body */}
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-tr ${theme.gradient} border border-white/20 transition-shadow duration-300 relative`}
                  style={{
                    boxShadow: `0 0 ${currentSize * 0.8}px ${theme.glow}`,
                  }}
                >
                  {/* Orbiting Satellite (Moon = Milestones completed) */}
                  {proj.projectProgress > 50 && (
                    <div
                      className="absolute w-2 h-2 rounded-full bg-white/80 border border-black animate-spin"
                      style={{
                        top: -8,
                        left: -8,
                        transformOrigin: `${currentSize / 2 + 8}px ${
                          currentSize / 2 + 8
                        }px`,
                        animationDuration: "3s",
                      }}
                    />
                  )}

                  {/* Atmosphere Glow Rings */}
                  <div
                    className="absolute inset-[-4px] rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      boxShadow: `0 0 12px ${theme.glow}`,
                    }}
                  />
                </div>

                {/* Inline Hover Label */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-black/90 border border-border-default px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity text-[9px] font-bold text-white whitespace-nowrap z-30"
                  style={{
                    transform: `rotate(${-rotation}deg) translateX(-50%)`,
                  }}
                >
                  {proj.name} ({readiness}%)
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Planet Details Side Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ x: 380, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 380, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 bottom-0 w-80 bg-bg-surface/90 backdrop-blur-xl border-l border-border-default p-6 z-30 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="df-badge df-badge-blue">
                  {selectedProject.innovationTheme}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  &times;
                </button>
              </div>

              <h2 className="text-sm font-bold text-white mb-2 leading-relaxed">
                {selectedProject.name}
              </h2>
              <p className="text-[11px] text-slate-400 mb-6 leading-relaxed">
                {selectedProject.problemStatement}
              </p>

              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-bg-card border border-border-default space-y-1">
                  <span className="df-section-label block">
                    Design Thinking Stage
                  </span>
                  <span className="text-xs font-bold text-white block mt-1">
                    {selectedProject.projectStage}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-bg-card border border-border-default space-y-2">
                  <span className="df-section-label block">
                    Galaxy Parameters
                  </span>
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>Maturity Size (Innovation)</span>
                    <span className="text-blue-accent font-bold">
                      {selectedProject.innovationScore}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>Glow Index (SDG Impact)</span>
                    <span className="text-emerald-accent font-bold">
                      {selectedProject.impactScore || 85}%
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-bg-card border border-border-default space-y-1">
                  <span className="df-section-label block">
                    Proposed Solution
                  </span>
                  <span className="text-[10px] text-slate-400 block leading-relaxed mt-1">
                    {selectedProject.proposedSolution}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="w-full df-btn df-btn-primary py-2.5 text-xs"
            >
              Focus Planet
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

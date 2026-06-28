import React from "react";

interface MetricCardProps {
  title: string;
  value: number;
  description: string;
  variant: "indigo" | "emerald" | "amber" | "rose" | "violet";
  icon: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  description,
  variant,
  icon,
}: MetricCardProps) {
  const themes = {
    indigo: {
      text: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      glow: "shadow-indigo-500/5",
      gradient: "from-indigo-500 to-indigo-600",
      progressBg: "bg-indigo-950/50",
    },
    emerald: {
      text: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      glow: "shadow-emerald-500/5",
      gradient: "from-emerald-500 to-emerald-600",
      progressBg: "bg-emerald-950/50",
    },
    amber: {
      text: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      glow: "shadow-amber-500/5",
      gradient: "from-amber-500 to-amber-600",
      progressBg: "bg-amber-950/50",
    },
    rose: {
      text: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      glow: "shadow-rose-500/5",
      gradient: "from-rose-500 to-rose-600",
      progressBg: "bg-rose-950/50",
    },
    violet: {
      text: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      glow: "shadow-violet-500/5",
      gradient: "from-violet-500 to-violet-600",
      progressBg: "bg-violet-950/50",
    },
  };

  const theme = themes[variant];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${theme.border} bg-slate-900/40 p-5 shadow-lg ${theme.glow} backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-slate-700/60`}
    >
      {/* Background radial glow */}
      <div
        className={`absolute -right-12 -top-12 h-24 w-24 rounded-full ${theme.bg} blur-2xl`}
      />

      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-white">
            {value}%
          </h3>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.bg} ${theme.text} border ${theme.border}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-4">
        {/* Progress Bar Track */}
        <div className={`h-1.5 w-full rounded-full ${theme.progressBg}`}>
          {/* Progress Bar fill */}
          <div
            className={`h-1.5 rounded-full bg-gradient-to-r ${theme.gradient} transition-all duration-500`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>

      <p className="mt-3 text-[10px] text-slate-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

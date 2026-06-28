import React, { useEffect, useRef, useState } from "react";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";

interface MetricCardProps {
  title: string;
  value: number;
  description: string;
  variant: "indigo" | "emerald" | "amber" | "rose" | "violet";
  icon: React.ReactNode;
}

const themes = {
  indigo: {
    text: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    glow: "shadow-indigo-500/10",
    gradient: "from-indigo-500 to-violet-500",
    progressBg: "bg-indigo-950/60",
    ambient: "bg-indigo-500",
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/10",
    gradient: "from-emerald-500 to-teal-500",
    progressBg: "bg-emerald-950/60",
    ambient: "bg-emerald-500",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/10",
    gradient: "from-amber-500 to-orange-500",
    progressBg: "bg-amber-950/60",
    ambient: "bg-amber-500",
  },
  rose: {
    text: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    glow: "shadow-rose-500/10",
    gradient: "from-rose-500 to-pink-500",
    progressBg: "bg-rose-950/60",
    ambient: "bg-rose-500",
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    glow: "shadow-violet-500/10",
    gradient: "from-violet-500 to-purple-500",
    progressBg: "bg-violet-950/60",
    ambient: "bg-violet-500",
  },
};

export function MetricCard({
  title,
  value,
  description,
  variant,
  icon,
}: MetricCardProps) {
  const theme = themes[variant];
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const animated = useAnimatedCounter(value, 900, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border ${theme.border} bg-slate-900/40 p-5 shadow-lg ${theme.glow} backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-700/60 hover:shadow-xl animate-fade-in-up`}
      role="region"
      aria-label={`${title}: ${value}%`}
    >
      {/* Ambient glow orb */}
      <div
        className={`ambient-glow -right-10 -top-10 h-20 w-20 ${theme.ambient}`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block">
            {title}
          </span>
          <h3
            className={`mt-1.5 text-2xl font-black tracking-tight text-white tabular-nums ${
              visible ? "animate-count-up" : "opacity-0"
            }`}
          >
            {animated}
            <span className="text-base font-bold text-slate-400 ml-0.5">%</span>
          </h3>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme.bg} ${theme.text} border ${theme.border}`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <div className="progress-bar">
          <div
            className={`progress-bar-fill bg-gradient-to-r ${theme.gradient}`}
            style={{ width: visible ? `${value}%` : "0%" }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <p className="mt-3 text-[11px] text-slate-500 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}

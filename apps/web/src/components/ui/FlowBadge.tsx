import React from "react";

export interface FlowBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "indigo" | "emerald" | "amber" | "rose" | "slate";
}

export function FlowBadge({ 
  className = "", 
  children, 
  variant = "indigo", 
  ...props 
}: FlowBadgeProps) {
  const baseStyles = "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border";
  
  const variants = {
    indigo: "bg-indigo-950/40 text-indigo-400 border-indigo-900/30",
    emerald: "bg-emerald-950/40 text-emerald-400 border-emerald-900/30",
    amber: "bg-amber-950/40 text-amber-400 border-amber-900/30",
    rose: "bg-rose-950/40 text-rose-400 border-rose-900/30",
    slate: "bg-slate-950/40 text-slate-400 border-slate-900/40",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

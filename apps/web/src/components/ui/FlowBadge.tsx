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
  const baseStyles =
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border";

  const variants = {
    indigo: "df-badge-blue",
    emerald: "df-badge-emerald",
    amber: "df-badge-amber",
    rose: "df-badge-rose",
    slate: "bg-white/[0.04] text-slate-450 border-white/[0.06]",
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

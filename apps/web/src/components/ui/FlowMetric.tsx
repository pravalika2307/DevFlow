import React from "react";
import { FlowCard, FlowCardContent } from "./FlowCard";

export interface FlowMetricProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: React.ReactNode;
  className?: string;
}

export function FlowMetric({
  label,
  value,
  description,
  icon,
  trend,
  className = "",
}: FlowMetricProps) {
  return (
    <FlowCard className={className}>
      <FlowCardContent className="pt-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
          {icon && <div className="text-slate-400">{icon}</div>}
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white font-mono">{value}</span>
          {trend}
        </div>
        {description && (
          <p className="text-[10px] text-slate-500 mt-1">{description}</p>
        )}
      </FlowCardContent>
    </FlowCard>
  );
}

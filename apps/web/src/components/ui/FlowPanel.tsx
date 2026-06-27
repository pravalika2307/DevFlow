import React from "react";

export interface FlowPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
  padded?: boolean;
}

export function FlowPanel({
  className = "",
  children,
  bordered = true,
  padded = true,
  ...props
}: FlowPanelProps) {
  return (
    <div
      className={`bg-[#090d16] ${
        bordered ? "border-r border-slate-900/60" : ""
      } ${padded ? "p-6" : ""} flex flex-col h-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

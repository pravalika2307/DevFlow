import React from "react";

export interface FlowCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FlowCard({ className = "", children, ...props }: FlowCardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-[#090d16]/30 backdrop-blur-md text-slate-100 shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function FlowCardHeader({ className = "", children, ...props }: FlowCardProps) {
  return (
    <div className={`flex flex-col gap-1.5 p-6 border-b border-slate-900/60 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function FlowCardTitle({ className = "", children, ...props }: FlowCardProps) {
  return (
    <h3 className={`text-base font-bold tracking-tight text-white ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function FlowCardDescription({ className = "", children, ...props }: FlowCardProps) {
  return (
    <p className={`text-xs text-slate-400 ${className}`} {...props}>
      {children}
    </p>
  );
}

export function FlowCardContent({ className = "", children, ...props }: FlowCardProps) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function FlowCardFooter({ className = "", children, ...props }: FlowCardProps) {
  return (
    <div className={`flex items-center p-6 pt-0 border-t border-slate-900/60 ${className}`} {...props}>
      {children}
    </div>
  );
}

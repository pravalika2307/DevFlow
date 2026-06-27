import React from "react";
import { FlowCard, FlowCardContent } from "./FlowCard";

export interface FlowTableProps extends React.HTMLAttributes<HTMLTableElement> {
  headers: string[];
}

export function FlowTable({
  headers,
  children,
  className = "",
  ...props
}: FlowTableProps) {
  return (
    <FlowCard className="overflow-hidden">
      <FlowCardContent className="p-0">
        <table
          className={`w-full border-collapse text-left text-xs ${className}`}
          {...props}
        >
          <thead>
            <tr className="border-b border-slate-900 bg-slate-950/30 text-slate-400 font-semibold uppercase tracking-wider">
              {headers.map((header) => (
                <th key={header} className="px-6 py-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900/60">{children}</tbody>
        </table>
      </FlowCardContent>
    </FlowCard>
  );
}

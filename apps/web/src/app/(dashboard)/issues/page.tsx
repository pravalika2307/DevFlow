"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { CheckCircle2, Search, AlertCircle, ArrowUpRight } from "lucide-react";

interface Issue {
  id: string;
  number: string;
  title: string;
  repo: string;
  priority: "P0" | "P1" | "P2" | "P3";
  state: "open" | "closed";
}

const issues: Issue[] = [
  { id: "i1", number: "142", title: "Configure Alembic environment to discover model packages", repo: "devflow-backend", priority: "P1", state: "open" },
  { id: "i2", number: "140", title: "Docker Container connection timed out under local network load", repo: "devflow-worker", priority: "P0", state: "open" },
  { id: "i3", number: "135", title: "Enable ESLint configuration settings inside packages config", repo: "devflow-frontend", priority: "P2", state: "closed" },
];

export default function IssuesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Issues Board</h1>
        <p className="text-slate-400 text-sm mt-1">Track task assignments, prioritizations, and workflow status.</p>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-900 max-w-md">
        <Search size={16} className="text-slate-500" />
        <input 
          type="text" 
          placeholder="Filter issues..." 
          className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full"
        />
      </div>

      {/* Issues List layout */}
      <div className="space-y-4">
        {issues.map((issue) => (
          <Card key={issue.id} className="bg-[#090d16]/30 border-slate-900 hover:border-slate-800 transition-colors duration-150">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 shrink-0">
                    <CheckCircle2 size={16} className={issue.state === "open" ? "text-slate-500" : "text-emerald-400"} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      #{issue.number}: {issue.title}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-500">
                      <span className="font-mono">{issue.repo}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <AlertCircle size={12} className={issue.priority === "P0" ? "text-rose-500" : "text-amber-500"} />
                        {issue.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  issue.state === "open" 
                    ? "bg-slate-950/60 text-slate-400 border border-slate-900" 
                    : "bg-emerald-950/40 text-emerald-400 border border-emerald-900/30"
                }`}>
                  {issue.state}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

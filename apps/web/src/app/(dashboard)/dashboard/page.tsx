"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Sparkles, GitPullRequest, Database, Clock, TrendingDown } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Title section */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Command Center</h1>
        <p className="text-slate-400 text-sm mt-1">
          Proactive indicators and engineering metrics overview.
        </p>
      </div>

      {/* KPI Tiles row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Card className="bg-[#090d16]/30 border-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">PR Cycle Time</span>
              <Clock size={16} className="text-indigo-400" />
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">14.2h</span>
              <span className="flex items-center text-xs font-semibold text-emerald-400 gap-0.5">
                <TrendingDown size={12} />
                8.4%
              </span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Average time from PR opening to merge</p>
          </CardContent>
        </Card>

        <Card className="bg-[#090d16]/30 border-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active PRs</span>
              <GitPullRequest size={16} className="text-violet-400" />
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">24</span>
              <span className="text-[10px] text-slate-500 font-semibold">12 needing reviews</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Open pull requests across tracked repos</p>
          </CardContent>
        </Card>

        <Card className="bg-[#090d16]/30 border-slate-900">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Connected Repos</span>
              <Database size={16} className="text-emerald-400" />
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">8</span>
              <span className="text-[10px] text-slate-500 font-semibold">All healthy</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Repositories actively synchronized</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights and activity placeholders */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* AI Panel */}
        <Card className="lg:col-span-2 bg-gradient-to-br from-[#090d16]/60 to-[#030712] border-indigo-950/40 relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[150px] h-[150px] rounded-full bg-indigo-500/5 blur-[40px] pointer-events-none" />
          <CardHeader className="flex flex-row items-center gap-2">
            <Sparkles size={18} className="text-indigo-400 animate-pulse" />
            <div>
              <CardTitle className="text-base font-bold text-white">Proactive AI Insights</CardTitle>
              <CardDescription className="text-xs text-slate-400">Deterministic code and process evaluations.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3.5 p-3.5 rounded-lg bg-indigo-950/20 border border-indigo-900/40 text-xs">
              <div className="h-2 w-2 rounded-full bg-amber-500 mt-1 shrink-0" />
              <div>
                <span className="font-semibold text-indigo-300 block mb-0.5">Velocity Alert - Review Delay</span>
                <span className="text-slate-400 leading-relaxed">
                  Merge velocity on <code className="text-indigo-300 font-mono">devflow-backend</code> dropped 12% last week due to stale reviews on module security filters.
                </span>
              </div>
            </div>
            <div className="flex gap-3.5 p-3.5 rounded-lg bg-indigo-950/20 border border-indigo-900/40 text-xs">
              <div className="h-2 w-2 rounded-full bg-indigo-400 mt-1 shrink-0" />
              <div>
                <span className="font-semibold text-indigo-300 block mb-0.5">VCS Review Bottleneck Risk</span>
                <span className="text-slate-400 leading-relaxed">
                  PR #14 has 12 comments with 4 reviews pending merge. Action recommended to resolve review deadlock.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity feed placeholder */}
        <Card className="bg-[#090d16]/30 border-slate-900">
          <CardHeader>
            <CardTitle className="text-base font-bold text-white">Recent Activity</CardTitle>
            <CardDescription className="text-xs text-slate-400">Ingested events across repositories.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-slate-500">2h ago</span>
              <span className="text-slate-200">
                <strong className="text-white">coder_dev</strong> merged PR #14 on <code className="text-slate-400">devflow-backend</code>
              </span>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-slate-500">4h ago</span>
              <span className="text-slate-200">
                <strong className="text-white">reviewer_team</strong> requested changes on PR #12
              </span>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <span className="text-slate-500">5h ago</span>
              <span className="text-slate-200">
                <strong className="text-white">coder_dev</strong> pushed 3 commits to <code className="text-slate-400">main</code>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

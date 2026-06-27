"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import {
  GitPullRequest,
  Search,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

interface PullRequest {
  id: string;
  number: number;
  title: string;
  repo: string;
  author: string;
  comments: number;
  reviews: number;
  state: "open" | "merged" | "closed";
}

const prs: PullRequest[] = [
  {
    id: "pr1",
    number: 14,
    title: "Core security encryption integration for VCS credentials",
    repo: "devflow-backend",
    author: "coder_dev",
    comments: 12,
    reviews: 4,
    state: "merged",
  },
  {
    id: "pr2",
    number: 12,
    title: "Refactor global navigation layouts using feature modularity",
    repo: "devflow-frontend",
    author: "coder_dev",
    comments: 4,
    reviews: 1,
    state: "open",
  },
  {
    id: "pr3",
    number: 9,
    title: "Optimize ECharts wrapper and resize event listeners",
    repo: "devflow-frontend",
    author: "coder_dev",
    comments: 1,
    reviews: 1,
    state: "merged",
  },
];

export default function PullRequestsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Pull Requests
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Monitor review velocity, merge times, and code metrics.
        </p>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-900 max-w-md">
        <Search size={16} className="text-slate-500" />
        <input
          type="text"
          placeholder="Search pull requests..."
          className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full"
        />
      </div>

      {/* PR Table outline */}
      <Card className="bg-[#090d16]/30 border-slate-900 overflow-hidden">
        <CardContent className="p-0">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-900 bg-slate-950/30 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Pull Request</th>
                <th className="px-6 py-4">Repository</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Comments</th>
                <th className="px-6 py-4">Reviews</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60">
              {prs.map((pr) => (
                <tr
                  key={pr.id}
                  className="hover:bg-slate-900/10 cursor-pointer transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <GitPullRequest
                        size={16}
                        className={
                          pr.state === "merged"
                            ? "text-emerald-400"
                            : "text-indigo-400"
                        }
                      />
                      <div>
                        <span className="font-semibold text-white block">
                          #{pr.number}: {pr.title}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400">
                    {pr.repo}
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-medium">
                    @{pr.author}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-slate-400 font-mono">
                      <MessageSquare size={12} />
                      {pr.comments}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-slate-400 font-mono">
                      <ShieldCheck size={12} />
                      {pr.reviews}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        pr.state === "merged"
                          ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/30"
                          : "bg-indigo-950/40 text-indigo-400 border border-indigo-900/30"
                      }`}
                    >
                      {pr.state}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

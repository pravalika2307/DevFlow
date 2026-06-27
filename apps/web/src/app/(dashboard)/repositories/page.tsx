"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Database, Plus, Search, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Repository {
  name: string;
  fullName: string;
  language: string;
  defaultBranch: string;
  syncStatus: "synced" | "syncing" | "failed";
  isActive: boolean;
}

const repos: Repository[] = [
  {
    name: "devflow-backend",
    fullName: "devflow/devflow-backend",
    language: "Python",
    defaultBranch: "main",
    syncStatus: "synced",
    isActive: true,
  },
  {
    name: "devflow-frontend",
    fullName: "devflow/devflow-frontend",
    language: "TypeScript",
    defaultBranch: "main",
    syncStatus: "synced",
    isActive: true,
  },
  {
    name: "devflow-worker",
    fullName: "devflow/devflow-worker",
    language: "Python",
    defaultBranch: "main",
    syncStatus: "syncing",
    isActive: true,
  },
  {
    name: "devflow-docs",
    fullName: "devflow/devflow-docs",
    language: "Markdown",
    defaultBranch: "main",
    syncStatus: "failed",
    isActive: false,
  },
];

export default function RepositoriesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Repositories
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Connect and configure tracked code repositories.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Import Repository
        </Button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-900 max-w-md">
        <Search size={16} className="text-slate-500" />
        <input
          type="text"
          placeholder="Filter repositories..."
          className="bg-transparent border-none outline-none text-sm text-white placeholder-slate-500 w-full"
        />
      </div>

      {/* Repositories grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {repos.map((repo) => (
          <Card
            key={repo.name}
            className="bg-[#090d16]/30 border-slate-900 hover:border-slate-800 transition-colors duration-150"
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                    <Database size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      {repo.name}
                      <a
                        href={`https://github.com/${repo.fullName}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-slate-300"
                      >
                        <ExternalLink size={12} />
                      </a>
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      {repo.fullName}
                    </p>
                  </div>
                </div>
                {/* Active switch mockup */}
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      repo.syncStatus === "synced"
                        ? "bg-emerald-950/40 text-emerald-400 border border-emerald-900/30"
                        : repo.syncStatus === "syncing"
                          ? "bg-amber-950/40 text-amber-400 border border-amber-900/30 animate-pulse"
                          : "bg-rose-950/40 text-rose-400 border border-rose-900/30"
                    }`}
                  >
                    {repo.syncStatus}
                  </span>
                </div>
              </div>

              {/* Repo metadata */}
              <div className="mt-6 flex items-center justify-between text-xs text-slate-400 border-t border-slate-900/60 pt-4">
                <div className="flex items-center gap-4">
                  <span>
                    Lang:{" "}
                    <strong className="text-slate-200">{repo.language}</strong>
                  </span>
                  <span>
                    Branch:{" "}
                    <code className="text-slate-300 font-mono">
                      {repo.defaultBranch}
                    </code>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">Tracking</span>
                  <input
                    type="checkbox"
                    checked={repo.isActive}
                    onChange={() => {}}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 accent-indigo-600 cursor-pointer"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

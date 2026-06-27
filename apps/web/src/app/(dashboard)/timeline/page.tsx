"use client";

import React from "react";
import { Clock, GitCommit, GitPullRequest, Database } from "lucide-react";

interface TimelineEvent {
  id: string;
  type: "commit" | "pr" | "repo";
  time: string;
  title: string;
  desc: string;
  actor: string;
}

const events: TimelineEvent[] = [
  {
    id: "e1",
    type: "pr",
    time: "2 hours ago",
    title: "Pull Request #14 Merged",
    desc: "Core security encryption integration for VCS credentials in devflow-backend",
    actor: "coder_dev",
  },
  {
    id: "e2",
    type: "commit",
    time: "4 hours ago",
    title: "3 commits pushed to main",
    desc: "Added AES-256 GCM encryption helpers in app/core/security.py",
    actor: "coder_dev",
  },
  {
    id: "e3",
    type: "repo",
    time: "1 day ago",
    title: "Repository devflow-worker Connected",
    desc: "Successfully linked organization repo and initialized delta sync configuration",
    actor: "manager_admin",
  },
];

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Activity Timeline
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Chronological history of repository events and updates.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l border-slate-900 ml-4 pl-8 space-y-8 py-4">
        {events.map((event) => {
          let Icon = Clock;
          let iconColor = "bg-slate-900 text-slate-400 border-slate-800";
          if (event.type === "commit") {
            Icon = GitCommit;
            iconColor = "bg-violet-950/60 text-violet-400 border-violet-900/40";
          } else if (event.type === "pr") {
            Icon = GitPullRequest;
            iconColor = "bg-indigo-950/60 text-indigo-400 border-indigo-900/40";
          } else if (event.type === "repo") {
            Icon = Database;
            iconColor =
              "bg-emerald-950/60 text-emerald-400 border-emerald-900/40";
          }

          return (
            <div key={event.id} className="relative">
              {/* Event Marker Icon */}
              <span
                className={`absolute -left-12 top-0 flex h-8 w-8 items-center justify-center rounded-full border ${iconColor} z-10`}
              >
                <Icon size={14} />
              </span>

              {/* Event Details Card */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-sm font-bold text-white">
                    {event.title}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {event.time}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                  {event.desc}
                </p>
                <span className="text-[10px] text-indigo-400 font-semibold mt-1">
                  Triggered by @{event.actor}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

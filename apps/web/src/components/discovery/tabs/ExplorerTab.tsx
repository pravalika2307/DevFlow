import React, { useState } from "react";
import { ProblemExplorerData } from "../../../types/discovery";

interface ExplorerTabProps {
  data: ProblemExplorerData;
  onUpdate: (explorer: ProblemExplorerData) => void;
}

export function ExplorerTab({ data, onUpdate }: ExplorerTabProps) {
  const [initialProblem, setInitialProblem] = useState(data.initialProblem);
  const [industry, setIndustry] = useState(data.industry);
  const [location, setLocation] = useState(data.location);
  const [targetUsers, setTargetUsers] = useState(data.targetUsers);

  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    root: true,
    hidden: false,
    stakeholder: false,
    solutions: false,
    failures: false,
    opportunities: false,
  });

  const [isExpanded, setIsExpanded] = useState(data.rootCauses.length > 0);

  const toggleSection = (sec: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sec]: !prev[sec],
    }));
  };

  const handleExpandProblem = () => {
    if (
      !initialProblem.trim() ||
      !industry.trim() ||
      !location.trim() ||
      !targetUsers.trim()
    ) {
      alert("Please fill in all target explorer fields first!");
      return;
    }

    // Simulate AI problem expansion based on industry/problem inputs
    const isEdtech =
      industry.toLowerCase().includes("ed") ||
      initialProblem.toLowerCase().includes("learn") ||
      initialProblem.toLowerCase().includes("school");
    const isWater =
      industry.toLowerCase().includes("water") ||
      initialProblem.toLowerCase().includes("filtr") ||
      initialProblem.toLowerCase().includes("salin");

    let root: string[] = [];
    let hidden: string[] = [];
    let stake: string[] = [];
    let solutions: string[] = [];
    let whyFailures: string[] = [];
    let opportunities: string[] = [];

    if (isEdtech) {
      root = [
        "Inadequate cellular towers and broadband infrastructure in remote sectors.",
        "High cost of commercial cellular data packs relative to daily agricultural wages.",
        "Lack of central grid power supply at household level.",
      ];
      hidden = [
        "Teachers lack technology literacy to download modules in advance.",
        "Smartphone priority is assigned to primary earners, not learning children.",
      ];
      stake = [
        "Students",
        "School Teachers",
        "Village Councils",
        "Educational NGOs",
      ];
      solutions = [
        "Physical textbooks distribution",
        "Weekly digital content mobile vans",
      ];
      whyFailures = [
        "Physical logistics are slow, expensive, and books decay rapidly.",
        "Mobile vans offer low contact time per child and are delayed by heavy monsoons.",
      ];
      opportunities = [
        "Broadcasting containerized lessons locally using low-cost WiFi routers.",
        "Designing self-powered solar servers that operate 100% offline.",
      ];
    } else if (isWater) {
      root = [
        "Rising seawater encroachment leaking saline fluids into fresh aquifers.",
        "Decline of coastal mangrove wetlands that block saline flows.",
      ];
      hidden = [
        "Commercial shrimp farmers pumping seawater inland.",
        "Depletion of groundwater reservoirs from excessive drilling.",
      ];
      stake = [
        "Household Families",
        "Shrimp Cooperatives",
        "Health Officers",
        "Pond Managers",
      ];
      solutions = [
        "Buying bottled water shipments",
        "Boiling saline water on firewood",
      ];
      whyFailures = [
        "Bottled water costs are too high, exhausting 35% of daily wages.",
        "Boiling does not extract salt and causes severe respiratory smoke inhalation.",
      ];
      opportunities = [
        "Layered sand-charcoal gravity filter stacks made of cheap local materials.",
        "Deploying local solar-still condensation panels.",
      ];
    } else {
      root = [
        "High complexity of automated mechanical sorting elements.",
        "Manual labor exposure to chemical residues.",
      ];
      hidden = [
        "Disorganized waste disposal habits among municipal households.",
        "Low financial margins on recycled low-density polyethylenes.",
      ];
      stake = [
        "Sorting Operators",
        "Recycling Centers",
        "Municipal Agencies",
        "Waste Collectives",
      ];
      solutions = ["Manual sorting lines", "NIR Spectroscopy sensor sorters"];
      whyFailures = [
        "Manual sorting is slow, toxic, and subject to high worker turnover.",
        "NIR hardware is extremely expensive and complex to assemble locally.",
      ];
      opportunities = [
        "Deploying Edge CV microcontrollers running lightweight neural nets.",
        "Retrofitting pneumatic conveyor nozzles to standard conveyor belts.",
      ];
    }

    const expandedExplorer: ProblemExplorerData = {
      initialProblem: initialProblem.trim(),
      industry: industry.trim(),
      location: location.trim(),
      targetUsers: targetUsers.trim(),
      rootCauses: root,
      hiddenCauses: hidden,
      stakeholders: stake,
      existingSolutions: solutions,
      whyFailures: whyFailures,
      innovationOpportunities: opportunities,
    };

    onUpdate(expandedExplorer);
    setIsExpanded(true);
  };

  const sections = [
    {
      id: "root",
      label: "Root Causes",
      data: data.rootCauses,
      color: "border-indigo-500/20 text-indigo-400",
    },
    {
      id: "hidden",
      label: "Possible Hidden Causes",
      data: data.hiddenCauses,
      color: "border-amber-500/20 text-amber-400",
    },
    {
      id: "stakeholder",
      label: "Stakeholders",
      data: data.stakeholders,
      color: "border-blue-500/20 text-blue-400",
    },
    {
      id: "solutions",
      label: "Existing Solutions",
      data: data.existingSolutions,
      color: "border-emerald-500/20 text-emerald-400",
    },
    {
      id: "failures",
      label: "Why Existing Solutions Fail",
      data: data.whyFailures,
      color: "border-rose-500/20 text-rose-400",
    },
    {
      id: "opportunities",
      label: "Opportunities for Innovation",
      data: data.innovationOpportunities,
      color: "border-cyan-500/20 text-cyan-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-border-default pb-3">
        <h3 className="text-base font-bold text-white tracking-tight font-sans">
          Problem Explorer
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Specify core problem vectors and let DevFlow expand them into roots,
          stakeholder mappings, and innovation levers.
        </p>
      </div>

      {/* Explorer Inputs */}
      <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-5 space-y-4 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Industry Sector
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full df-input px-3 py-2.5"
              placeholder="e.g. EdTech, Clean Water"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Geographical Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full df-input px-3 py-2.5"
              placeholder="e.g. Rural India, Coastal Bangladesh"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Target User Demographics
            </label>
            <input
              type="text"
              value={targetUsers}
              onChange={(e) => setTargetUsers(e.target.value)}
              className="w-full df-input px-3 py-2.5"
              placeholder="e.g. Students without internet"
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Initial Problem Statement
          </label>
          <textarea
            value={initialProblem}
            onChange={(e) => setInitialProblem(e.target.value)}
            rows={3}
            className="w-full df-input p-3"
            placeholder="Describe the problem you want to explore..."
          />
        </div>

        <div className="pt-2 text-right">
          <button
            type="button"
            onClick={handleExpandProblem}
            className="df-btn df-btn-primary ml-auto"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            AI Expand & Analyse Problem
          </button>
        </div>
      </div>

      {/* Expandable outputs cards */}
      {isExpanded && (
        <div className="space-y-3 animate-fade-in-up">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Analyse Output Matrix
          </h4>

          <div className="space-y-2">
            {sections.map((sec) => {
              const open = expandedSections[sec.id];
              return (
                <div
                  key={sec.id}
                  className="rounded-xl border border-border-default bg-bg-card overflow-hidden transition-all shadow-md"
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(sec.id)}
                    className="w-full text-left px-5 py-3.5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                  >
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        sec.color.split(" ")[1]
                      }`}
                    >
                      {sec.label}
                    </span>
                    <svg
                      className={`h-4 w-4 text-slate-500 transform transition-transform ${
                        open ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>

                  {open && (
                    <div className="px-6 pb-4 pt-2 border-t border-border-default bg-bg-base/40">
                      {sec.data.length > 0 ? (
                        <ul className="space-y-2 list-disc pl-4 text-xs text-slate-300 leading-relaxed font-medium">
                          {sec.data.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-slate-500 italic">
                          No details compiled.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

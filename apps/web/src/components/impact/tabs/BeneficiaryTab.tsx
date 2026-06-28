import React, { useState } from "react";
import { BeneficiaryData } from "../../../types/impact";

interface BeneficiaryTabProps {
  data: BeneficiaryData;
  onUpdate: (data: BeneficiaryData) => void;
}

export function BeneficiaryTab({ data, onUpdate }: BeneficiaryTabProps) {
  const [primary, setPrimary] = useState(data.primary);
  const [secondary, setSecondary] = useState(data.secondary);
  const [estimatedUsers, setEstimatedUsers] = useState(data.estimatedUsers);
  const [geoReach, setGeoReach] = useState(data.geoReach);
  const [ageGroups, setAgeGroups] = useState(data.ageGroups);
  const [incomeGroups, setIncomeGroups] = useState(data.incomeGroups);
  const [accessibilityNeeds, setAccessibilityNeeds] = useState(
    data.accessibilityNeeds,
  );

  const handleSave = () => {
    onUpdate({
      primary: primary.trim(),
      secondary: secondary.trim(),
      estimatedUsers: estimatedUsers.trim(),
      geoReach: geoReach.trim(),
      ageGroups: ageGroups.trim(),
      incomeGroups: incomeGroups.trim(),
      accessibilityNeeds: accessibilityNeeds.trim(),
    });
  };

  const cards = [
    {
      label: "Primary Beneficiaries",
      val: primary,
      color: "border-indigo-500/20 text-indigo-400",
    },
    {
      label: "Secondary Stakeholders",
      val: secondary,
      color: "border-purple-500/20 text-purple-400",
    },
    {
      label: "Expected Active Users count",
      val: estimatedUsers,
      color: "border-blue-500/20 text-blue-400",
    },
    {
      label: "Geographical Reach",
      val: geoReach,
      color: "border-emerald-500/20 text-emerald-400",
    },
    {
      label: "Age Group Segmentation",
      val: ageGroups,
      color: "border-amber-500/20 text-amber-400",
    },
    {
      label: "Income Bands",
      val: incomeGroups,
      color: "border-rose-500/20 text-rose-400",
    },
    {
      label: "Special Accessibility Needs",
      val: accessibilityNeeds,
      color: "border-cyan-500/20 text-cyan-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-900 pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">
          Beneficiary Analysis
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Specify target populations, regional access constraints, and income
          profiles.
        </p>
      </div>

      {/* Visual representations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-slate-900 bg-slate-900/10 p-5 space-y-2"
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-wider block ${
                c.color.split(" ")[1]
              }`}
            >
              {c.label}
            </span>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {c.val || (
                <span className="italic text-slate-500">
                  Not defined yet. Enter details in the editor below.
                </span>
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Editor block */}
      <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-5 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-slate-900 pb-2">
          Update Beneficiary Details
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-semibold text-slate-450 uppercase tracking-wider mb-2">
              Primary Beneficiaries
            </label>
            <input
              type="text"
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Rural students without grid connection"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-450 uppercase tracking-wider mb-2">
              Secondary Beneficiaries
            </label>
            <input
              type="text"
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Village teachers"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-450 uppercase tracking-wider mb-2">
              Estimated Users Volume
            </label>
            <input
              type="text"
              value={estimatedUsers}
              onChange={(e) => setEstimatedUsers(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. 15,000 active students"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-450 uppercase tracking-wider mb-2">
              Geographical Reach
            </label>
            <input
              type="text"
              value={geoReach}
              onChange={(e) => setGeoReach(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Kolar region, Karnataka"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-450 uppercase tracking-wider mb-2">
              Age Groups
            </label>
            <input
              type="text"
              value={ageGroups}
              onChange={(e) => setAgeGroups(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. 8 to 15 years old"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-450 uppercase tracking-wider mb-2">
              Income Groups
            </label>
            <input
              type="text"
              value={incomeGroups}
              onChange={(e) => setIncomeGroups(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Under $2/day"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[10px] font-semibold text-slate-450 uppercase tracking-wider mb-2">
              Accessibility Needs
            </label>
            <input
              type="text"
              value={accessibilityNeeds}
              onChange={(e) => setAccessibilityNeeds(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Kannada audio narration"
            />
          </div>
        </div>

        <div className="pt-2 text-right">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-indigo-650 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-600 shadow-md shadow-indigo-600/10 transition-all"
          >
            Save Beneficiary Details
          </button>
        </div>
      </div>
    </div>
  );
}

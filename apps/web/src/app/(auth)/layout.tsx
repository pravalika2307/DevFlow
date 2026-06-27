import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#030712]">
      {/* Visual panel (Hidden on small screens) */}
      <div className="hidden md:flex md:w-1/2 relative bg-[#090d16] border-r border-slate-900 flex-col justify-between p-12 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-violet-500/10 blur-[120px]" />

        {/* Branding header */}
        <div className="flex items-center gap-2.5 z-10">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            D
          </div>
          <span className="text-xl font-bold tracking-tight text-white bg-gradient-to-r from-indigo-200 to-slate-200 bg-clip-text text-transparent">
            DevFlow
          </span>
        </div>

        {/* Dynamic Tagline Info */}
        <div className="my-auto z-10 max-w-md">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-400 border border-indigo-900/50 mb-6">
            ✨ Now with AI Analytics
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Engineering Intelligence Platform.
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Monitor repositories, tracking review cycles, issues speed, commit frequencies, and team metrics automatically in one dashboard.
          </p>
        </div>

        {/* Footer info */}
        <div className="text-xs text-slate-500 z-10">
          © {new Date().getFullYear()} DevFlow Inc. Google DeepMind Pair Programming.
        </div>
      </div>

      {/* Forms Section */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 z-10 relative">
        {/* Mobile-only background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[80px] md:hidden" />
        <div className="w-full max-w-md z-10">{children}</div>
      </div>
    </div>
  );
}

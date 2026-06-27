import React from "react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="px-6 lg:px-16 h-20 flex items-center justify-between border-b border-slate-900/60 backdrop-blur-md sticky top-0 z-50 bg-[#030712]/80">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            D
          </div>
          <span className="text-xl font-bold tracking-tight text-white">DevFlow</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-150"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-150 shadow-md shadow-indigo-600/10 cursor-pointer"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-24 pb-20 px-6 lg:px-16 overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-400 border border-indigo-900/50">
              ⚡ GitHub Integration Active
            </span>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
              Unified Engineering <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-200 bg-clip-text text-transparent">
                Intelligence Platform
              </span>
            </h1>

            <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
              DevFlow monitors repository performance, cycle times, PR velocity, and active review feedback with interactive visuals and AI summaries.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-150 shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                Start Free Trial
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-150 cursor-pointer"
              >
                Live Demo
              </Link>
            </div>

            {/* Mock Dashboard Preview */}
            <div className="mt-16 rounded-xl border border-slate-800 bg-[#090d16]/30 p-2.5 backdrop-blur-md shadow-2xl shadow-indigo-900/5 max-w-4xl mx-auto">
              <div className="rounded-lg border border-slate-800/80 bg-[#040810] aspect-[16/9] overflow-hidden flex flex-col">
                {/* Header Mock */}
                <div className="h-10 border-b border-slate-900 px-4 flex items-center justify-between bg-slate-950/40">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  </div>
                  <span className="text-[10px] font-medium text-slate-500">devflow.io/dashboard</span>
                  <div className="w-8" />
                </div>
                
                {/* Dashboard Content mock layout */}
                <div className="flex-1 flex p-4 gap-4">
                  {/* Mock Sidebar */}
                  <div className="w-32 border-r border-slate-900 pr-4 flex flex-col gap-2">
                    <span className="h-6 rounded bg-slate-900 w-full animate-pulse" />
                    <span className="h-6 rounded bg-slate-900 w-4/5 animate-pulse" />
                    <span className="h-6 rounded bg-slate-900 w-11/12 animate-pulse" />
                  </div>
                  
                  {/* Mock Content */}
                  <div className="flex-1 flex flex-col gap-4">
                    {/* KPI row */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-16 rounded-lg border border-slate-900 bg-slate-950/60 p-3 flex flex-col gap-1.5">
                        <span className="h-2 rounded bg-slate-950 w-2/3" />
                        <span className="h-5 rounded bg-indigo-950/60 w-1/2" />
                      </div>
                      <div className="h-16 rounded-lg border border-slate-900 bg-slate-950/60 p-3 flex flex-col gap-1.5">
                        <span className="h-2 rounded bg-slate-950 w-2/3" />
                        <span className="h-5 rounded bg-violet-950/60 w-1/2" />
                      </div>
                      <div className="h-16 rounded-lg border border-slate-900 bg-slate-950/60 p-3 flex flex-col gap-1.5">
                        <span className="h-2 rounded bg-slate-950 w-2/3" />
                        <span className="h-5 rounded bg-slate-900 w-1/2" />
                      </div>
                    </div>
                    {/* Chart Mock */}
                    <div className="flex-1 rounded-lg border border-slate-900 bg-slate-950/40 p-4 flex flex-col justify-end gap-2">
                      <div className="flex justify-between items-end h-28 gap-2">
                        <span className="w-full bg-slate-900 rounded-t h-[40%]" />
                        <span className="w-full bg-indigo-900/60 rounded-t h-[70%]" />
                        <span className="w-full bg-violet-900/60 rounded-t h-[50%]" />
                        <span className="w-full bg-indigo-600 rounded-t h-[90%]" />
                        <span className="w-full bg-violet-600 rounded-t h-[65%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-20 px-6 lg:px-16 border-t border-slate-900/60 bg-[#050811]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center text-white mb-12">
              Engineered for Enterprise Visibility
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-950/40 backdrop-blur">
                <div className="h-10 w-10 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-400 font-bold mb-4">
                  📊
                </div>
                <h3 className="text-lg font-bold text-white mb-2">KPI Dashboard</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Track PR Cycle Times, Deployment Frequencies, Lead Times, and repository activity metrics in real-time.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-950/40 backdrop-blur">
                <div className="h-10 w-10 rounded-lg bg-violet-600/10 flex items-center justify-center text-violet-400 font-bold mb-4">
                  🤖
                </div>
                <h3 className="text-lg font-bold text-white mb-2">AI Summaries</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Acquire deterministic AI summaries on pull request changes, review feedback depth, and repository bottlenecks.
                </p>
              </div>

              <div className="p-6 rounded-xl border border-slate-800/80 bg-slate-950/40 backdrop-blur">
                <div className="h-10 w-10 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-400 font-bold mb-4">
                  🔒
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Secure Credentialing</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Securely connect GitHub accounts with AES-256 GCM database encryption and role-based access control.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 px-6 lg:px-16 text-center text-sm text-slate-500 bg-[#030712]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-slate-850 flex items-center justify-center font-bold text-xs text-white">
              D
            </div>
            <span className="font-semibold text-slate-400">DevFlow</span>
          </div>
          <div>© {new Date().getFullYear()} DevFlow. Built by Google DeepMind Pair Programming co-pilot.</div>
        </div>
      </footer>
    </div>
  );
}

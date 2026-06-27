"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  GitPullRequest,
  Database,
  CheckCircle2,
  Clock,
  Settings,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Menu,
  X,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { FlowModal } from "@/components/ui/FlowModal";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const navItems: NavItem[] = [
  { name: "Command Center", href: "/dashboard", icon: LayoutDashboard },
  { name: "Repositories", href: "/repositories", icon: Database },
  { name: "Pull Requests", href: "/pull-requests", icon: GitPullRequest },
  { name: "Issues Board", href: "/issues", icon: CheckCircle2 },
  { name: "Activity Timeline", href: "/timeline", icon: Clock },
  { name: "Workspace Settings", href: "/settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getBreadcrumb = () => {
    const active = navItems.find((item) => pathname.startsWith(item.href));
    return active ? active.name : "Overview";
  };

  return (
    <div className="flex h-screen bg-[#030712] overflow-hidden text-slate-100 font-sans">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#090d16] border-r border-slate-900 transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-sm text-white shadow-lg">
              D
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              DevFlow
            </span>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Workspace selector mock */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-950/40 border border-slate-900 cursor-pointer hover:bg-slate-950/70 transition-colors duration-150">
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                Workspace
              </span>
              <span className="text-sm font-medium text-slate-200">
                DevFlow Core
              </span>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 space-y-1.5 px-3 py-3 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-600/10 text-indigo-400 border-l-2 border-indigo-500"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-indigo-400" : "text-slate-400"}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer User controls */}
        <div className="p-4 border-t border-slate-900/60 flex flex-col gap-2">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-indigo-950 border border-indigo-900/60 flex items-center justify-center text-xs font-bold text-indigo-400 overflow-hidden">
              {user?.profile?.avatar_url ? (
                <Image
                  src={user.profile.avatar_url}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserIcon size={16} />
              )}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-slate-200 truncate">
                {user?.username || "Guest User"}
              </span>
              <span className="text-xs text-slate-500 truncate">
                {user?.email || "guest@devflow.io"}
              </span>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="flex items-center gap-2.5 px-3 py-2 w-full rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/20 transition-colors duration-150 text-left"
          >
            <LogOut size={14} />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-900 bg-[#090d16]/30 backdrop-blur-md z-30">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
              <span className="text-slate-500">Workspace</span>
              <span>/</span>
              <span className="text-slate-200">{getBreadcrumb()}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Trigger */}
            <div
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-900 text-xs text-slate-400 cursor-pointer hover:border-slate-800 transition-all duration-150"
            >
              <Search size={14} />
              <span>Search Command...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-500">
                ⌘K
              </kbd>
            </div>

            {/* Notification bell */}
            <button className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 relative">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500" />
            </button>
          </div>
        </header>

        {/* Content scroll area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative z-20">
          {children}
        </main>
      </div>

      {/* Command Palette Modal */}
      <FlowModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="Command Palette"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-950/60 border border-slate-900 text-slate-400">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search pages, repositories, or actions..."
              className="bg-transparent border-none outline-none text-xs text-white placeholder-slate-600 w-full focus:ring-0"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
              Go To
            </span>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-900/60 text-xs font-semibold text-slate-300 hover:text-white transition-colors duration-150"
                >
                  <span className="flex items-center gap-2">
                    <item.icon size={14} className="text-slate-400" />
                    {item.name}
                  </span>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] text-slate-500 font-mono">
                    ⏎
                  </kbd>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </FlowModal>
    </div>
  );
}

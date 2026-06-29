import React from "react";
import { DevFlowLogo } from "../ui/DevFlowLogo";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onNewProjectClick: () => void;
  onDemoModeClick: () => void;
  onExportCenterClick: () => void;
  onMobileMenuToggle?: () => void;
}

export function Navbar({
  searchQuery,
  onSearchChange,
  onNewProjectClick,
  onDemoModeClick,
  onExportCenterClick,
  onMobileMenuToggle,
}: NavbarProps) {
  return (
    <>
      {/* ── Floating Header ───────────────────────────────── */}
      <header
        className="sticky top-0 z-50"
        style={{ padding: "12px 16px 0" }}
        role="banner"
      >
        <div
          className="df-glass"
          style={{
            borderRadius: 18,
            border: "1px solid var(--border-accent)",
            padding: "0 20px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05) inset",
          }}
        >
          {/* Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <DevFlowLogo size={32} />
            <div className="df-hide-mobile">
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 900,
                    color: "white",
                    letterSpacing: "-0.02em",
                  }}
                >
                  DevFlow
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: "rgba(59,130,246,0.1)",
                    color: "#60a5fa",
                    border: "1px solid rgba(59,130,246,0.2)",
                    padding: "1px 5px",
                    borderRadius: 5,
                  }}
                >
                  OS
                </span>
              </div>
              <p
                style={{
                  fontSize: 9,
                  color: "var(--text-tertiary)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                Innovation Operating System
              </p>
            </div>
          </div>

          {/* Center Space */}
          <div className="flex-1 md:block hidden" />

          {/* Search */}
          <div
            style={{ flex: 1, maxWidth: 280, position: "relative" }}
            className="df-hide-tablet df-hide-presenter"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-tertiary)"
              strokeWidth="2"
              style={{
                position: "absolute",
                left: 11,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="search"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search innovation projects"
              className="df-input"
              style={{
                width: "100%",
                paddingLeft: 34,
                paddingRight: 12,
                paddingTop: 7,
                paddingBottom: 7,
              }}
            />
          </div>

          {/* Right actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            {/* Demo Mode */}
            <button
              onClick={onDemoModeClick}
              className="df-btn df-btn-subtle df-hide-mobile"
              style={{ padding: "6px 12px", fontSize: 12 }}
              aria-label="Launch Samsung demo mode"
            >
              <span
                className="df-live-dot"
                aria-hidden="true"
                style={{ width: 6, height: 6 }}
              />
              Demo
            </button>

            {/* Export */}
            <button
              onClick={onExportCenterClick}
              className="df-btn df-btn-ghost df-hide-mobile df-hide-presenter"
              style={{ width: 34, height: 34, padding: 0 }}
              aria-label="Export center"
              title="Export Center"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
            </button>

            {/* New Project */}
            <button
              onClick={onNewProjectClick}
              className="df-btn df-btn-primary df-hide-presenter"
              style={{ padding: "7px 14px", fontSize: 12 }}
              aria-label="Create new innovation project"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="df-hide-mobile">New Project</span>
              <span style={{ display: "none" }} className="df-show-mobile">
                New
              </span>
            </button>

            {/* Divider */}
            <div
              style={{
                width: 1,
                height: 28,
                background: "var(--border)",
                margin: "0 4px",
              }}
              aria-hidden="true"
            />

            {/* Avatar */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, var(--blue) 0%, var(--violet) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                boxShadow: "0 0 12px rgba(59,130,246,0.2)",
                cursor: "default",
                flexShrink: 0,
              }}
              title="Pravalika – Workspace Admin"
              aria-label="User avatar: Pravalika"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={onMobileMenuToggle || (() => {})}
              className="df-btn df-btn-ghost md:hidden"
              style={{ width: 34, height: 34, padding: 0 }}
              aria-label="Open sidebar menu"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

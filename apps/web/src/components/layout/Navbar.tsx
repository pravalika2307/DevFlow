import React from "react";

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
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background:
                  "linear-gradient(135deg, var(--blue) 0%, var(--violet) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(59,130,246,0.35)",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 4h6a8 8 0 0 1 8 8l-4 4h-4l4-4H8v8H5V4z" />
              </svg>
            </div>
            <div className="df-hide-mobile">
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  DevFlow
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: "var(--blue-dim)",
                    color: "#93c5fd",
                    border: "1px solid var(--blue-border)",
                    padding: "2px 6px",
                    borderRadius: 6,
                  }}
                >
                  OS
                </span>
              </div>
              <p
                style={{
                  fontSize: 10,
                  color: "var(--text-tertiary)",
                  fontWeight: 500,
                  marginTop: 1,
                }}
              >
                AI Innovation OS
              </p>
            </div>
          </div>

          {/* Center Space */}
          <div className="flex-1 md:block hidden" />

          {/* Search */}
          <div
            style={{ flex: 1, maxWidth: 280, position: "relative" }}
            className="df-hide-tablet"
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
              className="df-btn df-btn-ghost df-hide-mobile"
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
              className="df-btn df-btn-primary"
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
                fontSize: 12,
                fontWeight: 800,
                color: "white",
                boxShadow: "0 0 12px rgba(59,130,246,0.3)",
                cursor: "default",
                flexShrink: 0,
              }}
              title="Pravalika – Workspace Admin"
              aria-label="User avatar: Pravalika"
            >
              P
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

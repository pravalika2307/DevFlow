import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Module = "dashboard" | "discovery" | "impact" | "council";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onNewProjectClick: () => void;
  onDemoModeClick: () => void;
  onExportCenterClick: () => void;
  activeModule: Module;
  onModuleChange: (module: Module) => void;
}

const NAV_ITEMS: { id: Module; label: string; shortLabel: string }[] = [
  { id: "dashboard", label: "Workspace", shortLabel: "Work" },
  { id: "discovery", label: "Discovery", shortLabel: "Disc" },
  { id: "impact", label: "Impact", shortLabel: "Imp" },
  { id: "council", label: "AI Council", shortLabel: "AI" },
];

export function Navbar({
  searchQuery,
  onSearchChange,
  onNewProjectClick,
  onDemoModeClick,
  onExportCenterClick,
  activeModule,
  onModuleChange,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

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
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
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

          {/* Center Nav — pill group */}
          <nav
            style={{
              display: "flex",
              gap: 2,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 3,
            }}
            role="navigation"
            aria-label="Main navigation"
            className="df-hide-mobile"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                aria-current={activeModule === item.id ? "page" : undefined}
                style={{
                  padding: "6px 14px",
                  borderRadius: 9,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  cursor: "pointer",
                  border: "none",
                  outline: "none",
                  transition: "all 200ms var(--ease-out)",
                  background:
                    activeModule === item.id
                      ? "var(--blue-dim)"
                      : "transparent",
                  color:
                    activeModule === item.id
                      ? "#93c5fd"
                      : "var(--text-tertiary)",
                  boxShadow:
                    activeModule === item.id
                      ? "inset 0 0 0 1px var(--blue-border)"
                      : "none",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

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
              onClick={() => setMobileOpen((o) => !o)}
              className="df-btn df-btn-ghost"
              style={{ width: 34, height: 34, padding: 0 }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.svg
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
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
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile Dropdown ─────────────────────────────── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top" }}
              className="df-glass"
              role="navigation"
              aria-label="Mobile navigation"
              tabIndex={-1}
              onKeyDown={(e) => {
                if (e.key === "Escape") setMobileOpen(false);
              }}
            >
              <div
                style={{
                  borderRadius: 14,
                  border: "1px solid var(--border-accent)",
                  padding: 12,
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onModuleChange(item.id);
                      setMobileOpen(false);
                    }}
                    className={`df-nav-item${
                      activeModule === item.id ? " active" : ""
                    }`}
                    aria-current={activeModule === item.id ? "page" : undefined}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="df-divider" style={{ margin: "4px 0" }} />
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="search"
                    placeholder="Search projects…"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    aria-label="Search"
                    className="df-input"
                    style={{ flex: 1, padding: "8px 12px", fontSize: 13 }}
                  />
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button
                    onClick={() => {
                      onDemoModeClick();
                      setMobileOpen(false);
                    }}
                    className="df-btn df-btn-subtle"
                    style={{ flex: 1, justifyContent: "center", fontSize: 12 }}
                  >
                    Demo Mode
                  </button>
                  <button
                    onClick={() => {
                      onExportCenterClick();
                      setMobileOpen(false);
                    }}
                    className="df-btn df-btn-ghost"
                    style={{ flex: 1, justifyContent: "center", fontSize: 12 }}
                  >
                    Export
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

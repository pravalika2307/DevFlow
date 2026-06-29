"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetDemo: () => void;
  onStartTour: (type: "general" | "samsung") => void;
}

type TabType = "about" | "help" | "shortcuts" | "release";

export function SettingsCenterModal({
  isOpen,
  onClose,
  onResetDemo,
  onStartTour,
}: SettingsCenterModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("about");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(8px)",
          }}
          aria-hidden="true"
        />

        {/* Modal panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            top: "10%",
            bottom: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(680px, 94vw)",
            borderRadius: 24,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.65)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  color: "var(--blue)",
                  textTransform: "uppercase",
                }}
              >
                ✦ Operations Control Center
              </span>
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  margin: "4px 0 0",
                }}
              >
                DevFlow Settings & Guides
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-tertiary)",
                cursor: "pointer",
                fontSize: 18,
                padding: 4,
              }}
              aria-label="Close settings modal"
            >
              ×
            </button>
          </div>

          {/* Navigation Tabs */}
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.02)",
              borderBottom: "1px solid var(--border)",
              padding: "0 12px",
            }}
          >
            {(["about", "help", "shortcuts", "release"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "14px 16px",
                  background: "transparent",
                  border: "none",
                  borderBottom:
                    activeTab === tab
                      ? "2px solid var(--blue)"
                      : "2px solid transparent",
                  color:
                    activeTab === tab
                      ? "var(--text-primary)"
                      : "var(--text-tertiary)",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 150ms ease",
                }}
              >
                {tab === "shortcuts"
                  ? "Shortcuts"
                  : tab === "release"
                    ? "System Info"
                    : tab}
              </button>
            ))}
          </div>

          {/* Body Content */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 24,
              fontSize: 13,
              color: "var(--text-secondary)",
            }}
          >
            {activeTab === "about" && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 800,
                      marginBottom: 6,
                    }}
                  >
                    Our Mission
                  </h3>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>
                    To democratize structured human-centered innovation. DevFlow
                    empowers students, developers, and teams to build
                    sustainable solutions backed by real SDG impact analysis and
                    cognitive AI council feedback.
                  </p>
                </div>
                <div>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 800,
                      marginBottom: 6,
                    }}
                  >
                    The Vision
                  </h3>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>
                    An AI Innovation Mentor on every developer&apos;s desk. We
                    bridge the gap between abstract brainstorming and technical,
                    compliance-ready project formulations.
                  </p>
                </div>
                <div>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 800,
                      marginBottom: 6,
                    }}
                  >
                    Samsung Solve for Tomorrow Inspiration
                  </h3>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>
                    DevFlow was custom-tailored to align with the core
                    requirements of Samsung Solve for Tomorrow. It ensures
                    student innovations address one or more of the 17 UN
                    Sustainable Development Goals (SDGs) and are verified across
                    technical, ethical, and scaling metrics.
                  </p>
                </div>
                <div>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 800,
                      marginBottom: 6,
                    }}
                  >
                    Core Capabilities
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.7 }}>
                    <li>
                      <strong>Problem Discovery</strong>: Drill down to root
                      causes with five-stage diagnostic Whys.
                    </li>
                    <li>
                      <strong>Design Thinking Coach</strong>: Formulate user
                      personas, empathy cards, and iterations.
                    </li>
                    <li>
                      <strong>Multi-Agent AI Council</strong>: Run automated
                      evaluations with expert AI consensus reports.
                    </li>
                    <li>
                      <strong>Innovation Galaxy</strong>: Beautiful spatial
                      representations of all active designs.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "help" && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <h3
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: 800,
                    marginBottom: 4,
                  }}
                >
                  Help & Frequently Asked Questions
                </h3>

                <div>
                  <h4
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 700,
                      margin: "0 0 4px",
                    }}
                  >
                    How do I start a new project?
                  </h4>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>
                    Click the <strong>New Project</strong> button in the top
                    navigation bar, select an Innovation Theme (like Healthcare
                    or Clean Water), and enter basic scope information.
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 700,
                      margin: "0 0 4px",
                    }}
                  >
                    What is the Innovation Galaxy?
                  </h4>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>
                    A visual representation where active projects orbit a
                    central system star. The distance matches the project stage
                    (Ideation closer, Scaling further out).
                  </p>
                </div>

                <div>
                  <h4
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 700,
                      margin: "0 0 4px",
                    }}
                  >
                    What is the AI Council?
                  </h4>
                  <p style={{ margin: 0, lineHeight: 1.6 }}>
                    A panel of 8 AI agents (Software Engineer, Financial
                    Advisor, Ethicist, etc.) that parses your scope, runs
                    multi-agent evaluations, and returns a verified Readiness
                    Score.
                  </p>
                </div>

                <div
                  style={{
                    marginTop: 8,
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: "rgba(59,130,246,0.06)",
                    border: "1px solid rgba(59,130,246,0.15)",
                  }}
                >
                  <span style={{ fontWeight: 800, color: "var(--blue)" }}>
                    💡 Interactive Onboarding
                  </span>
                  <p
                    style={{
                      margin: "6px 0 10px",
                      fontSize: 12,
                      lineHeight: 1.5,
                    }}
                  >
                    You can launch or restart the guided step-by-step tour
                    anytime to learn details about page elements.
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => {
                        onStartTour("general");
                        onClose();
                      }}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: "var(--blue)",
                        border: "none",
                        color: "white",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      General Tour
                    </button>
                    <button
                      onClick={() => {
                        onStartTour("samsung");
                        onClose();
                      }}
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid var(--border)",
                        color: "white",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Samsung Presentation Tour
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shortcuts" && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <h3
                  style={{
                    color: "var(--text-primary)",
                    fontWeight: 800,
                    margin: 0,
                  }}
                >
                  System Hotkeys
                </h3>
                <p style={{ margin: 0 }}>
                  Use these rapid keyboard combinations to navigate DevFlow
                  instantly from anywhere in the application.
                </p>

                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: 12,
                    textAlign: "left",
                    marginTop: 8,
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: "1px solid var(--border)",
                        color: "var(--text-primary)",
                      }}
                    >
                      <th style={{ padding: "8px 12px", fontWeight: 800 }}>
                        Shortcut
                      </th>
                      <th style={{ padding: "8px 12px", fontWeight: 800 }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 12px" }}>
                        <kbd
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            padding: "2px 6px",
                            borderRadius: 4,
                            fontStyle: "normal",
                            fontWeight: 800,
                          }}
                        >
                          Ctrl + K
                        </kbd>{" "}
                        or{" "}
                        <kbd
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            padding: "2px 6px",
                            borderRadius: 4,
                            fontStyle: "normal",
                            fontWeight: 800,
                          }}
                        >
                          /
                        </kbd>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        Focus project search input
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 12px" }}>
                        <kbd
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            padding: "2px 6px",
                            borderRadius: 4,
                            fontStyle: "normal",
                            fontWeight: 800,
                          }}
                        >
                          Alt + D
                        </kbd>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        Navigate to Main Workspace
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 12px" }}>
                        <kbd
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            padding: "2px 6px",
                            borderRadius: 4,
                            fontStyle: "normal",
                            fontWeight: 800,
                          }}
                        >
                          Alt + G
                        </kbd>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        Navigate to Innovation Galaxy
                      </td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "10px 12px" }}>
                        <kbd
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            padding: "2px 6px",
                            borderRadius: 4,
                            fontStyle: "normal",
                            fontWeight: 800,
                          }}
                        >
                          Alt + R
                        </kbd>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        Open Reports & Export center
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 12px" }}>
                        <kbd
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            padding: "2px 6px",
                            borderRadius: 4,
                            fontStyle: "normal",
                            fontWeight: 800,
                          }}
                        >
                          Esc
                        </kbd>
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        Dismiss overlays, forms, and slide-outs
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "release" && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 800,
                      marginBottom: 8,
                    }}
                  >
                    System Information
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      fontSize: 12,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        paddingBottom: 6,
                      }}
                    >
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Product Version
                      </span>
                      <strong style={{ color: "var(--text-primary)" }}>
                        v1.0.0 (Release Candidate 1)
                      </strong>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        paddingBottom: 6,
                      }}
                    >
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Release Date
                      </span>
                      <strong style={{ color: "var(--text-primary)" }}>
                        June 29, 2026
                      </strong>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        paddingBottom: 6,
                      }}
                    >
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Build Signature
                      </span>
                      <strong style={{ color: "var(--text-primary)" }}>
                        DF-RELEASE-20260629-M8
                      </strong>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                        paddingBottom: 6,
                      }}
                    >
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Execution Engine
                      </span>
                      <strong style={{ color: "var(--text-primary)" }}>
                        Next.js 16 (Turbopack compile)
                      </strong>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingBottom: 6,
                      }}
                    >
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Demo Dataset Integrity
                      </span>
                      <strong style={{ color: "var(--emerald)" }}>
                        Verified Clean
                      </strong>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: 16,
                    marginTop: 4,
                  }}
                >
                  <h3
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 800,
                      marginBottom: 6,
                    }}
                  >
                    Samsung Presentation Controls
                  </h3>
                  <p
                    style={{ fontSize: 12, marginBottom: 12, lineHeight: 1.5 }}
                  >
                    Restore all default projects, clearances, and SDG alignment
                    statistics instantly for the next judge cycle.
                  </p>
                  <button
                    onClick={() => {
                      onResetDemo();
                      onClose();
                    }}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 12,
                      border: "none",
                      background: "var(--rose)",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 4px 12px rgba(244, 63, 94, 0.3)",
                      transition: "transform 100ms ease",
                    }}
                  >
                    Reset System Dataset
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer (Built with AI + Design Thinking) */}
          <div
            style={{
              padding: "16px 24px",
              borderTop: "1px solid var(--border)",
              background: "rgba(0,0,0,0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 11,
              color: "var(--text-tertiary)",
            }}
          >
            <span>DevFlow OS • Version 1.0.0</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "var(--text-tertiary)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--text-tertiary)"
                  strokeWidth="2.2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
                Crafted by{" "}
                <span style={{ color: "var(--violet)", fontWeight: 700 }}>
                  Pravalika Palle
                </span>
              </span>
              <span>|</span>
              <span style={{ color: "var(--blue-accent)", fontWeight: 800 }}>
                NovaForge AI
              </span>
              <span>|</span>
              <span>© 2026 DevFlow OS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

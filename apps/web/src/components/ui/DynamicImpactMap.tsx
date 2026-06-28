import React, { useState } from "react";
import { InnovationProject } from "../../types/innovation";

interface DynamicImpactMapProps {
  projects: InnovationProject[];
}

const SDG_NODES = [
  { id: "sdg3", label: "SDG 3: Good Health", color: "#e53e3e", x: 100, y: 70 },
  {
    id: "sdg4",
    label: "SDG 4: Quality Education",
    color: "#c53030",
    x: 260,
    y: 60,
  },
  { id: "sdg6", label: "SDG 6: Clean Water", color: "#3182ce", x: 420, y: 65 },
  {
    id: "sdg7",
    label: "SDG 7: Affordable Energy",
    color: "#dd6b20",
    x: 580,
    y: 70,
  },
  {
    id: "sdg11",
    label: "SDG 11: Sustainable Cities",
    color: "#d69e2e",
    x: 740,
    y: 80,
  },
];

const COMMUNITY_NODES = [
  { id: "c1", label: "Rural Schools", x: 80, y: 330 },
  { id: "c2", label: "Coastal NGOs", x: 240, y: 340 },
  { id: "c3", label: "Arid Communities", x: 400, y: 335 },
  { id: "c4", label: "Urban Municipalities", x: 580, y: 340 },
  { id: "c5", label: "Primary Care Clinics", x: 720, y: 330 },
];

export function DynamicImpactMap({ projects }: DynamicImpactMapProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Generate dynamic connections between projects and SDGs/Communities
  const connections: {
    from: { x: number; y: number };
    to: { x: number; y: number };
    active: boolean;
  }[] = [];

  const projectNodes = projects.map((p, idx) => {
    // Lay out project nodes horizontally in the middle layer
    const x = 150 + idx * 160;
    const y = 200;
    return {
      id: p.id,
      name: p.name,
      x,
      y,
      sdgGoals: p.sdgGoals,
      theme: p.innovationTheme,
    };
  });

  projectNodes.forEach((pNode) => {
    // Map project to SDGs
    SDG_NODES.forEach((sNode) => {
      const match = pNode.sdgGoals.some(
        (g) =>
          sNode.label.toLowerCase().includes(g.toLowerCase()) ||
          (g.toLowerCase().includes("water") && sNode.id === "sdg6") ||
          (g.toLowerCase().includes("health") && sNode.id === "sdg3") ||
          (g.toLowerCase().includes("education") && sNode.id === "sdg4"),
      );
      if (match) {
        connections.push({
          from: { x: pNode.x, y: pNode.y },
          to: { x: sNode.x, y: sNode.y },
          active: hoveredNode === pNode.id || hoveredNode === sNode.id,
        });
      }
    });

    // Map project to Communities
    COMMUNITY_NODES.forEach((cNode) => {
      const match =
        (pNode.name.toLowerCase().includes("water") && cNode.id === "c2") ||
        (pNode.name.toLowerCase().includes("school") && cNode.id === "c1") ||
        (pNode.name.toLowerCase().includes("health") && cNode.id === "c5") ||
        (pNode.name.toLowerCase().includes("waste") && cNode.id === "c4") ||
        (pNode.theme.toLowerCase().includes("energy") && cNode.id === "c3");
      if (match) {
        connections.push({
          from: { x: pNode.x, y: pNode.y },
          to: { x: cNode.x, y: cNode.y },
          active: hoveredNode === pNode.id || hoveredNode === cNode.id,
        });
      }
    });
  });

  return (
    <div className="rounded-2xl border border-border-default bg-bg-surface/50 p-5 space-y-4 shadow-lg overflow-hidden relative">
      <style>{`
        @keyframes pulse-flow {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-flow-active {
          animation: pulse-flow 1.2s linear infinite;
          stroke-dasharray: 6 4;
        }
        .animate-flow-inactive {
          stroke-dasharray: 4 6;
          opacity: 0.15;
        }
      `}</style>

      <div className="flex justify-between items-center border-b border-border-default pb-2">
        <span className="df-section-label">
          Interactive Impact & SDG Matrix
        </span>
        <span className="text-[10px] uppercase font-bold text-slate-500">
          Node Mapper
        </span>
      </div>

      <div className="relative w-full h-[400px] bg-bg-base/40 rounded-xl border border-border-default overflow-hidden flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 820 400"
          className="absolute inset-0 pointer-events-none"
        >
          {/* Draw connecting lines */}
          {connections.map((conn, idx) => (
            <line
              key={idx}
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke={conn.active ? "var(--blue)" : "rgba(255,255,255,0.06)"}
              strokeWidth={conn.active ? 1.5 : 0.8}
              className={
                conn.active ? "animate-flow-active" : "animate-flow-inactive"
              }
            />
          ))}
        </svg>

        {/* SDG Nodes (Top Layer) */}
        {SDG_NODES.map((node) => (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute rounded-xl border p-2 cursor-pointer transition-all hover:scale-105"
            style={{
              left: node.x - 60,
              top: node.y - 20,
              width: 120,
              backgroundColor:
                hoveredNode === node.id ? `${node.color}15` : "var(--bg-card)",
              borderColor:
                hoveredNode === node.id ? node.color : "var(--border)",
            }}
          >
            <div className="flex items-center gap-1.5 justify-center">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: node.color }}
              />
              <span className="text-[9px] font-bold text-white truncate max-w-full">
                {node.label}
              </span>
            </div>
          </div>
        ))}

        {/* Project Nodes (Middle Layer) */}
        {projectNodes.map((node) => (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute rounded-full border flex items-center justify-center p-3 cursor-pointer transition-all hover:scale-105"
            style={{
              left: node.x - 45,
              top: node.y - 45,
              width: 90,
              height: 90,
              backgroundColor:
                hoveredNode === node.id
                  ? "rgba(59,130,246,0.1)"
                  : "var(--bg-card)",
              borderColor:
                hoveredNode === node.id ? "var(--blue)" : "var(--border)",
              boxShadow:
                hoveredNode === node.id
                  ? "0 0 14px rgba(59,130,246,0.25)"
                  : "none",
            }}
          >
            <span className="text-[9px] font-bold text-white text-center leading-tight truncate max-w-full">
              {node.name.split(" ")[0]}
            </span>
          </div>
        ))}

        {/* Target Communities Nodes (Bottom Layer) */}
        {COMMUNITY_NODES.map((node) => (
          <div
            key={node.id}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="absolute rounded-xl border p-2.5 cursor-pointer transition-all hover:scale-105"
            style={{
              left: node.x - 65,
              top: node.y - 20,
              width: 130,
              backgroundColor:
                hoveredNode === node.id
                  ? "rgba(139,92,246,0.1)"
                  : "var(--bg-card)",
              borderColor:
                hoveredNode === node.id ? "var(--violet)" : "var(--border)",
            }}
          >
            <div className="flex items-center gap-1.5 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-accent" />
              <span className="text-[9px] font-bold text-white truncate max-w-full">
                {node.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

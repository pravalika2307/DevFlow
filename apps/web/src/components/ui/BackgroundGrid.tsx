import React from "react";

/**
 * BackgroundGrid – subtle animated dot-grid + aurora glow
 * Absolutely positioned behind all content. Purely decorative.
 */
export function BackgroundGrid() {
  return (
    <div className="df-bg-grid" aria-hidden="true">
      {/* Dot grid SVG pattern */}
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.08)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Aurora glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "10%",
          width: "60vw",
          height: "60vw",
          maxWidth: 700,
          maxHeight: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(59,130,246,0.055) 0%, transparent 65%)",
          animation: "aurora 22s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "5%",
          width: "50vw",
          height: "50vw",
          maxWidth: 600,
          maxHeight: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.045) 0%, transparent 65%)",
          animation: "aurora 28s ease-in-out infinite reverse",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "40%",
          right: "20%",
          width: "35vw",
          height: "35vw",
          maxWidth: 400,
          maxHeight: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(6,182,212,0.035) 0%, transparent 65%)",
          animation: "aurora 18s ease-in-out infinite 6s",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

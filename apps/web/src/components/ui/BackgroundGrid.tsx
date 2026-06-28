import React from "react";

const STARS = [
  { x: "12%", y: "15%", r: 0.8, delay: "0s" },
  { x: "45%", y: "8%", r: 1.0, delay: "1.2s" },
  { x: "78%", y: "22%", r: 0.6, delay: "0.5s" },
  { x: "88%", y: "12%", r: 0.8, delay: "2.1s" },
  { x: "25%", y: "30%", r: 0.5, delay: "0.8s" },
  { x: "60%", y: "28%", r: 1.2, delay: "1.7s" },
  { x: "18%", y: "45%", r: 0.9, delay: "2.3s" },
  { x: "70%", y: "40%", r: 0.7, delay: "0.2s" },
  { x: "92%", y: "55%", r: 0.5, delay: "1.9s" },
  { x: "32%", y: "60%", r: 1.1, delay: "3.0s" },
  { x: "50%", y: "68%", r: 0.8, delay: "0.9s" },
  { x: "10%", y: "72%", r: 0.6, delay: "1.5s" },
  { x: "82%", y: "78%", r: 1.0, delay: "2.6s" },
  { x: "28%", y: "85%", r: 0.5, delay: "0.4s" },
  { x: "65%", y: "88%", r: 0.9, delay: "1.1s" },
  { x: "95%", y: "92%", r: 0.7, delay: "2.0s" },
  { x: "5%", y: "32%", r: 1.0, delay: "1.4s" },
  { x: "54%", y: "48%", r: 0.6, delay: "2.8s" },
  { x: "38%", y: "20%", r: 0.8, delay: "0.3s" },
  { x: "80%", y: "62%", r: 0.5, delay: "1.6s" },
];

export function BackgroundGrid() {
  return (
    <div className="df-bg-grid" aria-hidden="true">
      <style>{`
        @keyframes star-pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.7; }
        }
      `}</style>

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
            <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.06)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      {/* Tiny star field */}
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {STARS.map((star, idx) => (
          <circle
            key={idx}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill="#ffffff"
            style={{
              animation: `star-pulse 5s ease-in-out infinite`,
              animationDelay: star.delay,
            }}
          />
        ))}
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
            "radial-gradient(ellipse at center, rgba(59,130,246,0.04) 0%, transparent 65%)",
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
            "radial-gradient(ellipse at center, rgba(139,92,246,0.035) 0%, transparent 65%)",
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
            "radial-gradient(ellipse at center, rgba(6,182,212,0.03) 0%, transparent 65%)",
          animation: "aurora 18s ease-in-out infinite 6s",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

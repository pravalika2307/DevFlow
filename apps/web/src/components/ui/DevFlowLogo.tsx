import React from "react";

interface DevFlowLogoProps {
  size?: number;
  variant?: "color" | "monochrome" | "white";
}

export function DevFlowLogo({
  size = 32,
  variant = "color",
}: DevFlowLogoProps) {
  // Determine fill style based on variant
  let fillStyle = "url(#devflow-brand-grad-logo)";
  if (variant === "monochrome") {
    fillStyle = "currentColor";
  } else if (variant === "white") {
    fillStyle = "#ffffff";
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="devflow-brand-grad-logo"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#7C4DFF" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <path
        d="M4 3h8a9 9 0 0 1 9 9a9 9 0 0 1-9 9H4V3zm4 4v10h5l4-5l-4-5H8zm3 5l-3-3v6l3-3z"
        fill={fillStyle}
        fillRule="evenodd"
      />
    </svg>
  );
}

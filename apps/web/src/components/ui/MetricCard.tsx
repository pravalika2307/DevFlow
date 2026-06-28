import React, { useEffect, useRef, useState } from "react";
import { ProgressRing, MiniSparkline } from "./ProgressRing";
import { useAnimatedCounter } from "../../hooks/useAnimatedCounter";

interface MetricCardProps {
  title: string;
  value: number;
  description: string;
  variant: "blue" | "violet" | "cyan" | "emerald" | "amber" | "rose";
  icon: React.ReactNode;
  trend?: number[]; // sparkline data
  trendUp?: boolean;
}

const VARIANT_CONFIG = {
  blue: {
    color: "var(--blue)",
    glow: "df-card-glow-blue",
    text: "#93c5fd",
    badge: "df-badge-blue",
    trackColor: "rgba(59,130,246,0.1)",
  },
  violet: {
    color: "var(--violet)",
    glow: "df-card-glow-violet",
    text: "#c4b5fd",
    badge: "df-badge-violet",
    trackColor: "rgba(139,92,246,0.1)",
  },
  cyan: {
    color: "var(--cyan)",
    glow: "df-card-glow-cyan",
    text: "#67e8f9",
    badge: "df-badge-cyan",
    trackColor: "rgba(6,182,212,0.1)",
  },
  emerald: {
    color: "var(--emerald)",
    glow: "df-card-glow-emerald",
    text: "#6ee7b7",
    badge: "df-badge-emerald",
    trackColor: "rgba(16,185,129,0.1)",
  },
  amber: {
    color: "var(--amber)",
    glow: "",
    text: "#fcd34d",
    badge: "df-badge-amber",
    trackColor: "rgba(245,158,11,0.1)",
  },
  rose: {
    color: "var(--rose)",
    glow: "",
    text: "#fda4af",
    badge: "df-badge-rose",
    trackColor: "rgba(244,63,94,0.1)",
  },
};

const DEFAULT_TRENDS: Record<string, number[]> = {
  blue: [62, 68, 65, 72, 74, 71, 78, 75, 80, 77],
  violet: [55, 60, 58, 63, 66, 64, 68, 70, 72, 74],
  cyan: [48, 52, 55, 51, 57, 60, 58, 62, 64, 67],
  emerald: [70, 72, 69, 74, 75, 78, 76, 80, 82, 85],
  amber: [50, 54, 52, 56, 55, 58, 60, 57, 62, 60],
  rose: [45, 48, 50, 47, 52, 55, 53, 57, 60, 62],
};

export function MetricCard({
  title,
  value,
  description,
  variant,
  icon,
  trend,
  trendUp = true,
}: MetricCardProps) {
  const cfg = VARIANT_CONFIG[variant];
  const sparkData = trend ?? DEFAULT_TRENDS[variant];

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const animated = useAnimatedCounter(value, 1000, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`df-card ${cfg.glow} relative overflow-hidden p-5 flex flex-col gap-4 animate-fade-in-up`}
      role="region"
      aria-label={`${title}: ${value}%`}
    >
      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${cfg.color}22 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Top row: icon + ring */}
      <div className="flex items-center justify-between">
        {/* Icon */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `rgba(255,255,255,0.04)`,
            border: `1px solid var(--border)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: cfg.text,
          }}
          aria-hidden="true"
        >
          {icon}
        </div>

        {/* Progress Ring */}
        <div style={{ position: "relative" }}>
          <ProgressRing
            value={value}
            size={64}
            strokeWidth={3.5}
            color={cfg.color}
            trackColor={cfg.trackColor}
            animated={visible}
          />
          {/* Percentage in centre */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
              color: cfg.text,
              letterSpacing: "-0.02em",
            }}
          >
            {animated}%
          </div>
        </div>
      </div>

      {/* Title + value */}
      <div>
        <span className="df-section-label">{title}</span>
        <div className="flex items-end gap-2 mt-1.5">
          <span
            className={`df-stat-value ${
              visible ? "animate-count-up" : "opacity-0"
            }`}
            style={{ fontSize: 26 }}
          >
            {animated}
          </span>
          <span
            style={{
              fontSize: 13,
              color: "var(--text-tertiary)",
              marginBottom: 3,
              fontWeight: 600,
            }}
          >
            / 100
          </span>
        </div>
      </div>

      {/* Sparkline + trend */}
      <div className="flex items-center justify-between">
        <MiniSparkline data={sparkData} color={cfg.color} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            fontSize: 11,
            fontWeight: 700,
            color: trendUp ? "var(--emerald)" : "var(--rose)",
          }}
        >
          {trendUp ? (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          ) : (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 4.5l-15 15m0 0H19.5m-15 0V8.25"
              />
            </svg>
          )}
          <span>
            +{Math.abs(sparkData[sparkData.length - 1] - sparkData[0])}%
          </span>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 11,
          color: "var(--text-tertiary)",
          lineHeight: 1.5,
          marginTop: -8,
        }}
      >
        {description}
      </p>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DevFlowLogo } from "./DevFlowLogo";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2200; // Smooth 2.2s cinematic load sequence
    const intervalTime = 25;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-[#030712] flex flex-col items-center justify-between p-12 select-none"
    >
      {/* Background Depth Layers & Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,77,255,0.05)_0%,rgba(59,130,246,0.03)_50%,transparent_100%)] pointer-events-none" />

      {/* Ambient floating depth particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: i % 2 === 0 ? 3 : 5,
              height: i % 2 === 0 ? 3 : 5,
              left: `${15 + i * 14}%`,
              top: `${20 + ((i * 13) % 60)}%`,
              filter: "blur(1px)",
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: 5 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Top Spacer to balance vertical alignment */}
      <div />

      {/* Center Launch Content */}
      <div className="flex flex-col items-center text-center space-y-8 z-10 max-w-sm w-full">
        {/* Custom Logo with breathing animation */}
        <motion.div
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.95, 1, 0.95],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DevFlowLogo size={76} />
        </motion.div>

        {/* Typography Wordmark */}
        <div className="space-y-2.5">
          <h1
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            DevFlow
          </h1>
          <p
            style={{
              fontSize: 10.5,
              color: "var(--text-tertiary)",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Innovation Operating System
          </p>
        </div>

        {/* Cinematic Line Loader & Status */}
        <div className="w-full space-y-4 pt-4">
          <div className="h-[2px] w-full bg-white/[0.04] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#7C4DFF] to-[#3B82F6] transition-all duration-[25ms] ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <motion.span
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              fontSize: 11,
              color: "var(--text-tertiary)",
              fontWeight: 500,
              letterSpacing: "0.02em",
              display: "block",
            }}
          >
            Building tomorrow&apos;s innovations...
          </motion.span>
        </div>
      </div>

      {/* Footer Branding */}
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: "var(--text-tertiary)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          opacity: 0.5,
        }}
      >
        Powered by NovaForge AI
      </div>
    </motion.div>
  );
}

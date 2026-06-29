import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DevFlowLogo } from "./DevFlowLogo";

interface BootSequenceProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  "Initializing DevFlow OS...",
  "Loading Innovation Workspace...",
  "Connecting NOVA Council...",
  "Synchronizing Design Thinking Engine...",
  "NOVA Innovation System Ready.",
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    let currentLineIdx = 0;
    const interval = setInterval(() => {
      if (currentLineIdx < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[currentLineIdx]]);
        currentLineIdx++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500); // Wait 500ms before transition
      }
    }, 280);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] bg-bg-base flex flex-col items-center justify-center font-mono p-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)] pointer-events-none" />

      {/* Premium custom logo */}
      <div className="mb-8 relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DevFlowLogo size={64} />
        </motion.div>
      </div>

      <div className="w-full max-w-sm space-y-2 border border-border-default bg-bg-card/45 backdrop-blur-md rounded-2xl p-5 shadow-2xl relative overflow-hidden">
        {/* Soft grid lines inside loading card */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

        <div className="space-y-1.5 min-h-[110px]">
          {lines.map((line, idx) => {
            const isLast = idx === BOOT_LINES.length - 1;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={`text-[10px] leading-relaxed tracking-wider ${
                  isLast
                    ? "text-blue-accent font-black"
                    : "text-slate-400 font-semibold"
                }`}
              >
                <span className="text-blue-accent/60 mr-1.5">&gt;</span>
                {line}
              </motion.div>
            );
          })}
        </div>

        {/* Loading track progress */}
        <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-blue-accent to-violet-accent"
          />
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SaveState = "idle" | "saving" | "saved" | "offline";

interface AutoSaveIndicatorProps {
  lastSaved: number | null; // timestamp
  isSaving: boolean;
  isOffline?: boolean;
}

export function AutoSaveIndicator({
  lastSaved,
  isSaving,
  isOffline = false,
}: AutoSaveIndicatorProps) {
  const [state, setState] = useState<SaveState>("idle");
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      if (isOffline) {
        setState("offline");
        return;
      }
      if (isSaving) {
        setState("saving");
        if (hideTimer.current) clearTimeout(hideTimer.current);
        return;
      }
      if (lastSaved) {
        setState("saved");
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => setState("idle"), 3500);
      }
    }, 0);
    return () => {
      clearTimeout(t);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isSaving, lastSaved, isOffline]);

  const config: Record<
    SaveState,
    { label: string; color: string; dot?: string }
  > = {
    idle: { label: "", color: "transparent" },
    saving: { label: "Saving…", color: "var(--text-tertiary)" },
    saved: { label: "Saved", color: "var(--emerald)" },
    offline: { label: "Offline — changes pending", color: "var(--amber)" },
  };

  const { label, color } = config[state];

  return (
    <AnimatePresence>
      {state !== "idle" && (
        <motion.div
          key={state}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.2 }}
          aria-live="polite"
          aria-label={label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11,
            fontWeight: 600,
            color: "var(--text-secondary)",
            flexShrink: 0,
          }}
        >
          {state === "saving" ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                display: "block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                border: "1.5px solid var(--text-tertiary)",
                borderTopColor: "transparent",
              }}
              aria-hidden="true"
            />
          ) : (
            <span
              style={{
                display: "block",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
          )}
          <span style={{ color }}>{label}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook that external consumers can use to control the indicator
export function useAutoSave() {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);

  const triggerSave = () => {
    setIsSaving(true);
    const t = setTimeout(() => {
      setIsSaving(false);
      setLastSaved(Date.now());
    }, 800);
    return () => clearTimeout(t);
  };

  return { isSaving, lastSaved, triggerSave };
}

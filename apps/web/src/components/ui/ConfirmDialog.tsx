"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "neutral";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Focus management — focus cancel button on open (safer default)
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => cancelRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Escape key to cancel
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      // Focus trap: Tab cycles between two buttons
      if (e.key === "Tab") {
        const focused = document.activeElement;
        if (e.shiftKey) {
          if (focused === cancelRef.current) {
            e.preventDefault();
            confirmRef.current?.focus();
          }
        } else {
          if (focused === confirmRef.current) {
            e.preventDefault();
            cancelRef.current?.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onCancel]);

  const accentColor =
    variant === "danger"
      ? "var(--rose)"
      : variant === "warning"
        ? "var(--amber)"
        : "var(--blue)";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="confirm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(6px)",
              zIndex: 1100,
            }}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="confirm-dialog"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            aria-describedby="confirm-message"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1101,
              width: "min(400px, 90vw)",
              borderRadius: 20,
              background: "var(--bg-card)",
              border: `1px solid ${accentColor}33`,
              boxShadow: `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${accentColor}15`,
              overflow: "hidden",
            }}
          >
            {/* Top accent */}
            <div
              style={{
                height: 3,
                background: `linear-gradient(90deg, ${accentColor} 0%, transparent 100%)`,
              }}
            />

            <div style={{ padding: "24px 24px 20px" }}>
              {/* Icon + Title */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: `${accentColor}18`,
                    border: `1px solid ${accentColor}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {variant === "danger"
                    ? "🗑️"
                    : variant === "warning"
                      ? "⚠️"
                      : "ℹ️"}
                </div>
                <h2
                  id="confirm-title"
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    margin: 0,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {title}
                </h2>
              </div>

              {/* Message */}
              <p
                id="confirm-message"
                style={{
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  margin: "0 0 20px",
                }}
              >
                {message}
              </p>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  ref={cancelRef}
                  onClick={onCancel}
                  style={{
                    flex: 1,
                    padding: "9px 16px",
                    borderRadius: 10,
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text-secondary)",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 150ms ease",
                  }}
                >
                  {cancelLabel}
                </button>
                <button
                  ref={confirmRef}
                  onClick={onConfirm}
                  style={{
                    flex: 1,
                    padding: "9px 16px",
                    borderRadius: 10,
                    border: "none",
                    background: accentColor,
                    color: "#fff",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: `0 4px 16px ${accentColor}44`,
                    transition: "all 150ms ease",
                  }}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

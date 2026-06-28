import React from "react";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { BackgroundGrid } from "@/components/ui/BackgroundGrid";

export const metadata: Metadata = {
  title: "DevFlow OS — AI Innovation Operating System",
  description:
    "DevFlow OS is an AI-powered innovation platform for students, startups, NGOs, and teams. Design Thinking, Problem Discovery, Impact Intelligence, and Multi-Agent AI Council — all in one workspace.",
  keywords: [
    "AI",
    "Innovation",
    "Design Thinking",
    "SDG",
    "Samsung Solve for Tomorrow",
  ],
  authors: [{ name: "DevFlow Team" }],
  creator: "DevFlow OS",
  openGraph: {
    title: "DevFlow OS — AI Innovation Operating System",
    description:
      "Premium AI-powered innovation workspace. Design Thinking. Impact Intelligence. AI Council.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{ position: "relative" }}>
        <BackgroundGrid />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}

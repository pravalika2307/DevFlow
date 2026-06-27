import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FlowBadge } from "./FlowBadge";

describe("FlowBadge Component", () => {
  it("renders the children successfully", () => {
    render(<FlowBadge>Active</FlowBadge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    const { container } = render(
      <FlowBadge variant="emerald">Success</FlowBadge>,
    );
    const spanElement = container.querySelector("span");
    expect(spanElement?.className).toContain("bg-emerald-950/40");
    expect(spanElement?.className).toContain("text-emerald-400");
  });
});

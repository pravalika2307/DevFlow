import React from "react";

export function SharedComponentPlaceholder() {
  return React.createElement(
    "div",
    {
      className:
        "p-4 rounded-lg bg-slate-900 border border-slate-800 text-white",
    },
    "Shared component placeholder from @devflow/ui",
  );
}

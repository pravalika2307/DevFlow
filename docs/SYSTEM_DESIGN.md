# System Design & Components Specification Guide

This guide defines the design tokens, component rules, UX guidelines, accessibility (a11y) standards, and layout principles implemented across DevFlow OS.

---

## 1. Samsung Solve for Tomorrow Aesthetics

DevFlow OS uses a Samsung-inspired design system styled exclusively in Vanilla CSS. The visual signature features a clean, responsive layout built with glassmorphic depth elements and vivid cyan/violet/blue gradients.

### Design Color Tokens

```css
:root {
  --bg-base: #030712; /* Dark background canvas */
  --bg-card: #0f172a80; /* Transparent glass slate card */
  --border: #1e293b; /* Muted slate divider borders */
  --blue: #3b82f6; /* Primary blue accent */
  --blue-accent: #60a5fa; /* Hover blue highlight */
  --violet: #8b5cf6; /* Secondary violet accent */
  --emerald: #10b981; /* High-confidence / Done states */
  --rose: #f43f5e; /* High-risk / Destructive actions */
  --text-primary: #f8fafc; /* White high-contrast typography */
  --text-secondary: #cbd5e1; /* Soft grey secondary descriptions */
  --text-tertiary: #64748b; /* Dimmed slate metadata labels */
}
```

---

## 2. Component Design Specifications

### Glassmorphic Slates

Cards, banners, and sidebar panels must incorporate high-transparency backdrops combined with deep filters to maintain readable text overlays:

- **Properties**: `background: var(--bg-card)`, `backdrop-filter: blur(12px)`, `border: 1px solid rgba(255,255,255,0.05)`.
- **Active state glows**: Add a neon glow boundary (`box-shadow: 0 0 16px rgba(59,130,246,0.15)`).

### Metric Counter Rings (`ProgressRing.tsx`)

Visual indicator showing development scores (Readiness, Health, Progress):

- **Structure**: Concentric SVG tracks displaying progress percentage.
- **Accents**: Neon glow stroke matching the project state color (e.g. green for scaling, blue for prototyping).

---

## 3. Accessibility & Interaction Controls

### OS Reduced Motion Controls

DevFlow respects user operating system preferences for reduced motion by disabling transitions, animations, and keyframes when requested:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Dialog Focus Management (`ConfirmDialog.tsx` & `MilestoneSuccessModal.tsx`)

1. **Initial Focus Selection**: Dialogs auto-focus the non-destructive action (Cancel/Dismiss) or primary action upon mounting to avoid screen reader misalignment.
2. **Keyboard Focus Trap**: Inside open modals, Tab and Shift+Tab key listeners cycle focus targets exclusively within the modal's children, preventing keyboard focus from escaping to background links.
3. **Escape to Exit**: Listening to `Escape` keypress events to safely close current modal screens.

---

## 4. Hydration & Client Guard Rules

To ensure client components render identically to pre-rendered server layouts, use the client hydration barrier pattern. Avoid accessing the browser document, window object, or local storage database during the initial component render.

```typescript
const [hasHydrated, setHasHydrated] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => {
    setHasHydrated(true);
  }, 0);
  return () => clearTimeout(timer);
}, []);
```

_Note: Using `setTimeout` prevents cascading render warnings inside ESLint validation hooks._

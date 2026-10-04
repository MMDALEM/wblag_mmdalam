"use client";

import { SunIcon, MoonIcon } from "./icons";

// The initial theme is applied before paint by the inline script in ThemeScript.
export default function ThemeToggle({ label }: { label: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
  };

  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={label} title={label}>
      <SunIcon className="theme-icon-sun" />
      <MoonIcon className="theme-icon-moon" />
    </button>
  );
}

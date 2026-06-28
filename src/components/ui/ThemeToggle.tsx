"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * ThemeToggle — flips data-theme on <html> and remembers the choice.
 * The initial value is set BEFORE paint by an inline script in layout.tsx,
 * so there is no flash of the wrong theme.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  const flip = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("trini-theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={flip}
      role="switch"
      aria-checked={theme === "light"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`theme-toggle ${className}`}
    >
      <span className="theme-toggle__thumb" aria-hidden="true">
        {mounted ? (theme === "dark" ? "🌙" : "☀️") : ""}
      </span>
    </button>
  );
}

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "modern-edge-theme";

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(KEY) as Theme | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
    apply(initial);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
    localStorage.setItem(KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      aria-pressed={theme === "dark"}
      className={`group inline-flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:text-primary ${className}`}
    >
      <span className="relative block h-4 w-4">
        <svg
          viewBox="0 0 16 16"
          className="absolute inset-0 h-4 w-4 transition-opacity duration-300 dark:opacity-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          aria-hidden="true"
        >
          <circle cx="8" cy="8" r="3.25" />
          <path d="M8 .8v2M8 13.2v2M.8 8h2M13.2 8h2M3 3l1.4 1.4M11.6 11.6L13 13M13 3l-1.4 1.4M4.4 11.6L3 13" />
        </svg>
        <svg
          viewBox="0 0 16 16"
          className="absolute inset-0 h-4 w-4 opacity-0 transition-opacity duration-300 dark:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          aria-hidden="true"
        >
          <path d="M13.5 10.2A5.8 5.8 0 0 1 5.8 2.5 5.8 5.8 0 1 0 13.5 10.2Z" />
        </svg>
      </span>
    </button>
  );
}

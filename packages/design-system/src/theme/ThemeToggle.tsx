"use client";

import * as React from "react";
import { ThemeIcon } from "../icons";
import styles from "./ThemeToggle.module.css";

export type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "dashboard-theme";

function parseTheme(value: string | null): ThemeMode | null {
  return value === "light" || value === "dark" ? value : null;
}

function readTheme(): ThemeMode {
  if (typeof document === "undefined") {
    return "light";
  }

  const htmlTheme = parseTheme(document.documentElement.getAttribute("data-theme"));
  if (htmlTheme) {
    return htmlTheme;
  }

  if (typeof window !== "undefined") {
    const storedTheme = parseTheme(window.localStorage.getItem(THEME_STORAGE_KEY));
    if (storedTheme) {
      return storedTheme;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  }

  return "light";
}

function applyTheme(theme: ThemeMode): void {
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", theme);
  }

  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}

export type ThemeToggleProps = {
  label?: string;
  ariaLabel?: string;
};

export function ThemeToggle({
  label = "Theme",
  ariaLabel = "Toggle theme",
}: ThemeToggleProps) {
  const [theme, setTheme] = React.useState<ThemeMode>(() => readTheme());

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={styles.toggle}
      onClick={() => {
        setTheme((current) => (current === "dark" ? "light" : "dark"));
      }}
    >
      <ThemeIcon className={styles.icon} size={16} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}

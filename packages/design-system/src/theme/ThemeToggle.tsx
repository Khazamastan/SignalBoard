"use client";

import * as React from "react";
import { ThemeIcon } from "../icons";
import styles from "./ThemeToggle.module.css";
import {
  applyTheme,
  readThemeFromBrowser,
  type ThemeMode,
} from "./theme-preferences";
export type { ThemeMode } from "./theme-preferences";

export type ThemeToggleProps = {
  label?: string;
  ariaLabel?: string;
};

export function ThemeToggle({
  label = "Theme",
  ariaLabel = "Toggle theme",
}: ThemeToggleProps) {
  const [theme, setTheme] = React.useState<ThemeMode>(() => readThemeFromBrowser());
  const nextTheme = theme === "dark" ? "light" : "dark";

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={styles.toggle}
      onClick={() => setTheme(nextTheme)}
    >
      <ThemeIcon className={styles.icon} size={16} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}

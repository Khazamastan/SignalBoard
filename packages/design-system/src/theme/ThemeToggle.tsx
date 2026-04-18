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
const THEME_TOGGLE_LABEL = "Theme";
const THEME_TOGGLE_ARIA_LABEL = "Toggle theme";

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<ThemeMode>(() => readThemeFromBrowser());
  const nextTheme = theme === "dark" ? "light" : "dark";

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <button
      type="button"
      aria-label={THEME_TOGGLE_ARIA_LABEL}
      className={styles.toggle}
      onClick={() => setTheme(nextTheme)}
    >
      <ThemeIcon className={styles.icon} size={16} />
      <span className={styles.label}>{THEME_TOGGLE_LABEL}</span>
    </button>
  );
}

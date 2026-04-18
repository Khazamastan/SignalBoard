"use client";

import { ThemeIcon } from "../icons";
import { useTheme } from "./ThemeProvider";
import styles from "./ThemeToggle.module.css";

export type ThemeToggleProps = {
  label?: string;
  ariaLabel?: string;
};

export function ThemeToggle({
  label = "Theme",
  ariaLabel = "Toggle theme",
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={styles.toggle}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <ThemeIcon className={styles.icon} size={16} />
      <span className={styles.label}>{label}</span>
    </button>
  );
}

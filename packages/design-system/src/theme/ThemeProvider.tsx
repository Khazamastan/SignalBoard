"use client";

import * as React from "react";

export type ThemeMode = "light" | "dark";
const THEME_STORAGE_KEY = "dashboard-theme";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

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
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.setAttribute("data-theme", theme);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<ThemeMode>(() => readTheme());

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value = React.useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.");
  }

  return context;
}

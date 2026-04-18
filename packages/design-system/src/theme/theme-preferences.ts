export type ThemeMode = "light" | "dark";

export const DEFAULT_THEME: ThemeMode = "light";
export const THEME_STORAGE_KEY = "dashboard-theme";
export const THEME_COOKIE_NAME = "dashboard-theme";

const THEME_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

const resolveThemeCookieAttributes = (): string => {
  const secureAttribute =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";

  return `Path=/; Max-Age=${THEME_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secureAttribute}`;
};

export function parseTheme(value: string | null | undefined): ThemeMode | null {
  return value === "light" || value === "dark" ? value : null;
}

export function resolveThemeFromCookie(value: string | undefined): ThemeMode {
  return parseTheme(value) ?? DEFAULT_THEME;
}

export function readThemeFromBrowser(): ThemeMode {
  if (typeof document === "undefined") {
    return DEFAULT_THEME;
  }

  const { documentElement } = document;
  const htmlTheme = parseTheme(documentElement.getAttribute("data-theme"));

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

  return DEFAULT_THEME;
}

export function applyTheme(theme: ThemeMode): void {
  if (typeof document === "undefined") {
    return;
  }

  const { documentElement } = document;
  documentElement.setAttribute("data-theme", theme);

  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.cookie = `${THEME_COOKIE_NAME}=${theme}; ${resolveThemeCookieAttributes()}`;
  }
}

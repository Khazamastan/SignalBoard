"use client";

import * as React from "react";
import {
  applyTheme,
  Badge,
  Button,
  Card,
  DataTable,
  readThemeFromBrowser,
  type ThemeMode,
} from "@design-system";
import styles from "./page.module.css";

const colorTokens = [
  { name: "Primary Light", token: "--color-primary-light" },
  { name: "Primary Base", token: "--color-primary-base" },
  { name: "Primary Dark", token: "--color-primary-dark" },
  { name: "Secondary Light", token: "--color-secondary-light" },
  { name: "Secondary Base", token: "--color-secondary-base" },
  { name: "Secondary Dark", token: "--color-secondary-dark" },
  { name: "Success", token: "--color-success" },
  { name: "Warning", token: "--color-warning" },
  { name: "Error", token: "--color-error" },
  { name: "Info", token: "--color-info" },
];

const neutralTokens = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
].map((tone) => ({
  name: `Neutral ${tone}`,
  token: `--color-neutral-${tone}`,
}));

const typographyScale = [
  { label: "XS", token: "--font-size-xs", fallback: "0.75rem" },
  { label: "SM", token: "--font-size-sm", fallback: "0.875rem" },
  { label: "MD", token: "--font-size-md", fallback: "1rem" },
  { label: "LG", token: "--font-size-lg", fallback: "1.125rem" },
  { label: "XL", token: "--font-size-xl", fallback: "1.25rem" },
  { label: "2XL", token: "--font-size-2xl", fallback: "1.5rem" },
];

const spacingScale = [
  { label: "2XS", token: "--space-2xs", fallback: "0.25rem" },
  { label: "XS", token: "--space-xs", fallback: "0.5rem" },
  { label: "SM", token: "--space-sm", fallback: "0.75rem" },
  { label: "MD", token: "--space-md", fallback: "1rem" },
  { label: "LG", token: "--space-lg", fallback: "1.5rem" },
  { label: "XL", token: "--space-xl", fallback: "2rem" },
  { label: "2XL", token: "--space-2xl", fallback: "2.5rem" },
  { label: "3XL", token: "--space-3xl", fallback: "3rem" },
];

const kpis = [
  { label: "Active Users", value: "12,480", trend: "+8.2%" },
  { label: "Net Revenue", value: "$94,300", trend: "+5.4%" },
  { label: "Open Challenges", value: "27", trend: "-3.1%" },
  { label: "Report Queue", value: "142", trend: "+1.8%" },
];

const tableRows = [
  { team: "North Ridge", status: "Healthy", score: "94", owner: "Alex" },
  { team: "Cedar Point", status: "Review", score: "82", owner: "Jordan" },
  { team: "Blue Harbor", status: "Watch", score: "73", owner: "Sam" },
  { team: "Silver Peak", status: "Healthy", score: "91", owner: "Taylor" },
  { team: "Maple Edge", status: "Review", score: "79", owner: "Riley" },
];

function trendTone(trend: string): "success" | "warning" {
  return trend.startsWith("-") ? "warning" : "success";
}

function LabContent() {
  const [theme, setTheme] = React.useState<ThemeMode>(() => readThemeFromBrowser());
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [diagnostics, setDiagnostics] = React.useState({
    primary: "",
    surface: "",
    text: "",
  });

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  React.useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const computed = getComputedStyle(root);
    const readVar = (name: string, fallback?: string) =>
      computed.getPropertyValue(name).trim() ||
      (fallback ? computed.getPropertyValue(fallback).trim() : "");

    setDiagnostics({
      primary: readVar("--color-primary-base"),
      surface: readVar("--color-surface-background", "--surface-canvas"),
      text: readVar("--color-text-primary", "--text-primary"),
    });
  }, [theme]);

  return (
    <div className={styles.page}>
      <div ref={rootRef} className={`ds-container ds-stack-lg ${styles.lab}`}>
        <Card as="header" className={`ds-rowBetween ${styles.header}`}>
          <div className="ds-stack-sm">
            <h1 className={styles.title}>Design System Lab</h1>
            <p className="ds-muted">SignalBoard token + component playground</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
          </Button>
        </Card>

        <Card className="ds-stack-md">
          <h2 className={styles.sectionTitle}>Color Grid</h2>
          <div className={styles.swatchGrid}>
            {[...colorTokens, ...neutralTokens].map((item) => (
              <Card key={item.name} as="article" className={styles.swatchCard}>
                <div
                  className={styles.swatchColor}
                  style={{ background: `var(${item.token})` }}
                />
                <p className={styles.swatchName}>{item.name}</p>
                <p className={styles.swatchToken}>{item.token}</p>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="ds-stack-md">
          <h2 className={styles.sectionTitle}>Typography Preview</h2>
          <div className="ds-stack-sm">
            {typographyScale.map((item) => (
              <Card key={item.label} as="article" className={styles.typographyRow}>
                <span className={styles.typographyLabel}>{item.label}</span>
                <span
                  className={styles.typographySample}
                  style={{ fontSize: `var(${item.token}, ${item.fallback})` }}
                >
                  The quick brown fox jumps over the lazy dog.
                </span>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="ds-stack-md">
          <h2 className={styles.sectionTitle}>Spacing Preview</h2>
          <div className={styles.spacingList}>
            {spacingScale.map((item) => (
              <div key={item.label} className={styles.spacingRow}>
                <span className={styles.spacingLabel}>{item.label}</span>
                <div className={styles.spacingPreview}>
                  <div className={styles.spacingTrack}>
                    <div
                      className={styles.spacingBar}
                      style={
                        {
                          "--space-preview": `var(${item.token}, ${item.fallback})`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                  <span className={styles.spacingToken}>{item.token}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="ds-stack-md">
          <h2 className={styles.sectionTitle}>Radius + Shadow Preview</h2>
          <div className={styles.radiusGrid}>
            <Card
              as="article"
              className={styles.radiusCard}
              style={{
                borderRadius: "var(--radius-sm, 0.375rem)",
                boxShadow: "var(--shadow-sm, 0 0 0 transparent)",
              }}
            >
              Radius SM + Shadow SM
            </Card>
            <Card
              as="article"
              className={styles.radiusCard}
              style={{
                borderRadius: "var(--radius-lg, 0.75rem)",
                boxShadow: "var(--shadow-md, 0 0 0 transparent)",
              }}
            >
              Radius LG + Shadow MD
            </Card>
            <Card
              as="article"
              className={styles.radiusCard}
              style={{
                borderRadius: "var(--radius-xl, 1rem)",
                boxShadow: "var(--shadow-lg, 0 0 0 transparent)",
              }}
            >
              Radius XL + Shadow LG
            </Card>
          </div>
        </Card>

        <Card className="ds-stack-md">
          <h2 className={styles.sectionTitle}>Surface / Text / Border Preview</h2>
          <div className={styles.surfaceGrid}>
            <Card as="article" className={styles.surfaceCard}>
              <p className={styles.surfaceHeading}>Default Surface</p>
              <p className={styles.surfaceBody}>
                text-primary + border-default + surface-default
              </p>
            </Card>
            <Card as="article" tone="muted" className={styles.surfaceCard}>
              <p className={styles.surfaceHeading}>Muted Surface</p>
              <p className={styles.surfaceBody}>
                text-secondary + border-subtle + surface-muted
              </p>
            </Card>
            <Card as="article" tone="inverse" className={styles.surfaceCard}>
              <p className={styles.surfaceHeading}>Inverse Surface</p>
              <p className={styles.surfaceBody}>
                text-inverse + border-strong + surface-inverse
              </p>
            </Card>
          </div>
        </Card>

        <Card className="ds-stack-md">
          <h2 className={styles.sectionTitle}>KPI Row</h2>
          <div className={styles.kpiGrid}>
            {kpis.map((kpi) => (
              <Card key={kpi.label} as="article" className={styles.kpiCard}>
                <p className={styles.kpiLabel}>{kpi.label}</p>
                <p className={styles.kpiValue}>{kpi.value}</p>
                <Badge tone={trendTone(kpi.trend)}>{kpi.trend}</Badge>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="ds-stack-md">
          <h2 className={styles.sectionTitle}>Table Shell</h2>
          <DataTable>
            <thead>
              <tr>
                <th scope="col">Team</th>
                <th scope="col">Status</th>
                <th scope="col">Score</th>
                <th scope="col">Owner</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.team}>
                  <th scope="row">{row.team}</th>
                  <td>{row.status}</td>
                  <td>{row.score}</td>
                  <td>{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Card>
      </div>

      <aside className={styles.diagnostics} aria-live="polite">
        <p>theme: {theme}</p>
        <p>--color-primary-base: {diagnostics.primary || "n/a"}</p>
        <p>--color-surface-background: {diagnostics.surface || "n/a"}</p>
        <p>--color-text-primary: {diagnostics.text || "n/a"}</p>
      </aside>
    </div>
  );
}

export default function LabPreview() {
  return <LabContent />;
}

import { Card } from "@design-system";
import styles from "./AnalyticsPanel.module.css";

export type AnalyticsSeries = {
  range: string;
  points: Array<{ label: string; value: number }>;
};

export function AnalyticsPanel({ series }: { series: AnalyticsSeries }) {
  const maxValue = Math.max(...series.points.map((point) => point.value));

  return (
    <div className={styles.panelCard}>
      <Card
        variant="elevated"
        stretch
        header={
          <div className={styles.headline}>
            <h2 className={styles.title}>Traffic Overview</h2>
            <span className={styles.subtitle}>Range: {series.range}</span>
          </div>
        }
      >
        <div className={styles.sparkline}>
          {series.points.map((point) => (
            <span
              key={`${point.label}-${point.value}`}
              className={styles.barWrap}
              tabIndex={0}
              aria-label={`${point.label}: ${point.value}`}
            >
              <span
                className={styles.bar}
                style={{ height: `${Math.max(14, (point.value / maxValue) * 100)}%` }}
              />
              <span className={styles.tooltip} aria-hidden>
                {point.label}: {point.value}
              </span>
            </span>
          ))}
        </div>
        <div className={styles.labels}>
          <span>{series.points[0]?.label}</span>
          <span>{series.points[Math.floor(series.points.length / 2)]?.label}</span>
          <span>{series.points[series.points.length - 1]?.label}</span>
        </div>
      </Card>
    </div>
  );
}

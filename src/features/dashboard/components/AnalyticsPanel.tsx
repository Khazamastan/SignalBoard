import { Card } from '@design-system';
import type { AnalyticsSeries } from '@/features/dashboard/types';

import {
  ANALYTICS_LABEL_MIDDLE_DIVISOR,
  ANALYTICS_PANEL_MIN_BAR_HEIGHT_PERCENT,
  ANALYTICS_PANEL_RANGE_PREFIX,
  ANALYTICS_PANEL_TITLE,
} from './stats-analytics/constants';
import styles from './AnalyticsPanel.module.css';

export type { AnalyticsSeries } from '@/features/dashboard/types';

export function AnalyticsPanel({ series }: { series: AnalyticsSeries }) {
  const maxValue = Math.max(...series.points.map((point) => point.value));
  const middleLabelIndex = Math.floor(series.points.length / ANALYTICS_LABEL_MIDDLE_DIVISOR);

  return (
    <div className={styles.panelCard}>
      <Card
        variant="elevated"
        stretch
        header={
          <div className={styles.headline}>
            <h2 className={styles.title}>{ANALYTICS_PANEL_TITLE}</h2>
            <span className={styles.subtitle}>
              {ANALYTICS_PANEL_RANGE_PREFIX}: {series.range}
            </span>
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
                style={{
                  height: `${Math.max(ANALYTICS_PANEL_MIN_BAR_HEIGHT_PERCENT, (point.value / maxValue) * 100)}%`,
                }}
              />
              <span className={styles.tooltip} aria-hidden>
                {point.label}: {point.value}
              </span>
            </span>
          ))}
        </div>
        <div className={styles.labels}>
          <span>{series.points[0]?.label}</span>
          <span>{series.points[middleLabelIndex]?.label}</span>
          <span>{series.points[series.points.length - 1]?.label}</span>
        </div>
      </Card>
    </div>
  );
}

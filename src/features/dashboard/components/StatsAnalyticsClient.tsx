'use client';

import { useState } from 'react';

import { Button, Card } from '@design-system';
import type { RangeKey } from '@/shared/types/api';
import {
  ANALYTICS_CHART_SKELETON_BAR_HEIGHTS,
  DASHBOARD_RANGE_OPTIONS,
} from '@/features/dashboard/constants';
import { classNames } from '@/shared/utils/class-names';

import { AnalyticsPanel } from './AnalyticsPanel';
import { StatsGrid } from './StatsGrid';
import { STATS_ANALYTICS_SECTION_ARIA_LABEL } from './stats-analytics/constants';
import type { StatsAnalyticsClientProps } from './stats-analytics/types';
import { useStatsAnalyticsQuery } from './stats-analytics/useStatsAnalyticsQuery';
import { useStatsCardsQuery } from './stats-analytics/useStatsCardsQuery';
import styles from './StatsAnalyticsSection.module.css';

const ranges: RangeKey[] = DASHBOARD_RANGE_OPTIONS;

export function StatsAnalyticsClient({ initialStats, initialAnalytics }: StatsAnalyticsClientProps) {
  const [range, setRange] = useState<RangeKey>(initialAnalytics.range);
  const {
    data: analyticsData,
    isLoading: isAnalyticsLoading,
    error: analyticsError,
  } = useStatsAnalyticsQuery({
    range,
    initialAnalytics,
  });
  const { data: statsData, error: statsError } = useStatsCardsQuery({
    initialStats,
  });

  const stats = statsData ?? initialStats;
  const analytics = analyticsData ?? initialAnalytics;

  return (
    <section className={styles.section} aria-label={STATS_ANALYTICS_SECTION_ARIA_LABEL}>
      <StatsGrid stats={stats} />

      <div className={styles.rangeRow}>
        {ranges.map((rangeOption) => (
          <div
            key={rangeOption}
            className={classNames(styles.rangeButton, rangeOption === range && styles.activeRange)}
          >
            <Button
              variant="ghost"
              size="small"
              onClick={() => {
                if (rangeOption !== range) {
                  setRange(rangeOption);
                }
              }}
              disabled={isAnalyticsLoading && rangeOption === range}
            >
              {rangeOption}
            </Button>
          </div>
        ))}
      </div>

      <div className={styles.analyticsShell}>
        <AnalyticsPanel series={analytics} />

        {isAnalyticsLoading ? (
          <div className={styles.skeletonOverlay} aria-hidden>
            <div className={styles.skeletonChart}>
              <Card
                variant="elevated"
                stretch
                header={
                  <div className={styles.skeletonHeadline}>
                    <span className={classNames(styles.skeletonBar, styles.skeletonTitle)} />
                    <span className={classNames(styles.skeletonBar, styles.skeletonMeta)} />
                  </div>
                }
              >
                <div className={styles.skeletonSparkline}>
                  {ANALYTICS_CHART_SKELETON_BAR_HEIGHTS.map((height, index) => (
                    <span
                      key={`analytics-skeleton-${height}-${index}`}
                      className={classNames(styles.skeletonBar, styles.skeletonChartBar)}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className={styles.skeletonLabels}>
                  <span className={classNames(styles.skeletonBar, styles.skeletonLabel)} />
                  <span className={classNames(styles.skeletonBar, styles.skeletonLabel)} />
                  <span className={classNames(styles.skeletonBar, styles.skeletonLabel)} />
                </div>
              </Card>
            </div>
          </div>
        ) : null}
      </div>

      {statsError ? <p className={styles.error}>{statsError}</p> : null}
      {analyticsError ? <p className={styles.error}>{analyticsError}</p> : null}
    </section>
  );
}

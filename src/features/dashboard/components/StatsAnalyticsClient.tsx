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
import type { StatsAnalyticsClientProps } from './stats-analytics/types';
import { useStatsAnalyticsQuery } from './stats-analytics/useStatsAnalyticsQuery';
import styles from './StatsAnalyticsSection.module.css';

const ranges: RangeKey[] = DASHBOARD_RANGE_OPTIONS;

export function StatsAnalyticsClient({ initialAnalytics }: StatsAnalyticsClientProps) {
  const { range: initialRange } = initialAnalytics;
  const [range, setRange] = useState<RangeKey>(initialRange);
  const {
    data: analyticsData,
    isLoading: isAnalyticsLoading,
    error: analyticsError,
  } = useStatsAnalyticsQuery({
    range,
    initialAnalytics,
  });

  const analytics = analyticsData ?? initialAnalytics;

  return (
    <>
      <div className={styles.rangeRow}>
        {ranges.map((rangeOption) => {
          const isActive = rangeOption === range;

          return (
            <div key={rangeOption} className={styles.rangeButton}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                size="small"
                aria-pressed={isActive}
                onClick={() => !isActive && setRange(rangeOption)}
                disabled={isAnalyticsLoading && isActive}
              >
                {rangeOption}
              </Button>
            </div>
          );
        })}
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

      {analyticsError ? <p className={styles.error}>{analyticsError}</p> : null}
    </>
  );
}

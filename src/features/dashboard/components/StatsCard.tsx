import type { ComponentType } from 'react';
import type { IconProps } from '@design-system';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Card,
  ConversionIcon,
  RevenueIcon,
  SessionsIcon,
  UsersIcon,
} from '@design-system';
import type { StatCardData } from '@/features/dashboard/types';

import styles from './StatsCard.module.css';

const iconByMetric: Record<StatCardData['icon'], ComponentType<IconProps>> = {
  users: UsersIcon,
  revenue: RevenueIcon,
  sessions: SessionsIcon,
  conversion: ConversionIcon,
};

export type { StatCardData } from '@/features/dashboard/types';

export function StatsCard({ data }: { data: StatCardData }) {
  const trendClass = data.trend.direction === 'up' ? styles.up : styles.down;
  const trendArrow = data.trend.direction === 'up' ? ArrowUpIcon : ArrowDownIcon;
  const MetricIcon = iconByMetric[data.icon];
  const TrendArrowIcon = trendArrow;

  return (
    <div className={styles.card}>
      <Card hoverable stretch>
        <div className={styles.layout}>
          <span className={styles.icon} aria-hidden>
            <MetricIcon className={styles.metricIcon} />
          </span>

          <div className={styles.details}>
            <p className={styles.metric}>{data.metric}</p>
            <p className={styles.value}>{data.value}</p>
            <span className={`${styles.trend} ${trendClass}`}>
              <TrendArrowIcon className={styles.trendArrowIcon} aria-hidden />
              {data.trend.percentage}%
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}

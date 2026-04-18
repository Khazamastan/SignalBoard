import type { ComponentType } from "react";
import type { IconProps } from "@design-system";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Card,
  ConversionIcon,
  RevenueIcon,
  SessionsIcon,
  UsersIcon,
} from "@design-system";
import styles from "./StatsCard.module.css";

export type StatCardData = {
  id: string;
  metric: string;
  value: string;
  trend: {
    direction: "up" | "down";
    percentage: number;
  };
  icon: "users" | "revenue" | "sessions" | "conversion";
};

const ICON_BY_METRIC: Record<StatCardData["icon"], ComponentType<IconProps>> = {
  users: UsersIcon,
  revenue: RevenueIcon,
  sessions: SessionsIcon,
  conversion: ConversionIcon,
};

export function StatsCard({ data }: { data: StatCardData }) {
  const trendClass = data.trend.direction === "up" ? styles.up : styles.down;
  const TrendArrowIcon = data.trend.direction === "up" ? ArrowUpIcon : ArrowDownIcon;
  const MetricIcon = ICON_BY_METRIC[data.icon];

  return (
    <div className={styles.card}>
      <Card variant="default" hoverable stretch>
        <div className={styles.layout}>
          <span className={styles.icon} aria-hidden>
            <MetricIcon className={styles.metricIcon} />
          </span>

          <div>
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

import type { StatCardData } from '@/features/dashboard/types';

import { STATS_GRID_ARIA_LABEL } from './stats-analytics/constants';
import { StatsCard } from './StatsCard';
import styles from './StatsGrid.module.css';

export function StatsGrid({ stats }: { stats: StatCardData[] }) {
  return (
    <section aria-label={STATS_GRID_ARIA_LABEL} className={styles.grid}>
      {stats.map((statItem) => (
        <StatsCard key={statItem.id} data={statItem} />
      ))}
    </section>
  );
}

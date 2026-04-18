import type { StatCardData } from '@/features/dashboard/types';
import { t } from '@/shared/i18n';

import { StatsCard } from './StatsCard';
import styles from './StatsGrid.module.css';

export function StatsGrid({ stats }: { stats: StatCardData[] }) {

  return (
    <section aria-label={t('dashboard.stats.gridAria')} className={styles.grid}>
      {stats.map((statItem) => (
        <StatsCard key={statItem.id} data={statItem} />
      ))}
    </section>
  );
}

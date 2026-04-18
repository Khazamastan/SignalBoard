import type { StatCardData } from "./StatsCard";
import { StatsCard } from "./StatsCard";
import styles from "./StatsGrid.module.css";

export function StatsGrid({ stats }: { stats: StatCardData[] }) {
  return (
    <section aria-label="Key metrics" className={styles.grid}>
      {stats.map((statItem) => (
        <StatsCard key={statItem.id} data={statItem} />
      ))}
    </section>
  );
}

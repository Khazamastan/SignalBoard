import styles from './DashboardStreamingFallbacks.module.css';

const statCardSkeletonIds = ['1', '2', '3', '4'] as const;
const tableColumnSkeletonIds = ['1', '2', '3', '4', '5', '6', '7'] as const;
const tableRowSkeletonIds = ['1', '2', '3', '4', '5', '6', '7', '8'] as const;
const pageControlSkeletonIds = ['1', '2', '3', '4', '5'] as const;

type BlockProps = {
  className?: string;
};

const SkeletonBlock = ({ className }: BlockProps) => {
  return <span className={`${styles.surface} ${styles.shimmer} ${className ?? ''}`} aria-hidden />;
};

export function StatsAnalyticsSectionFallback() {
  return (
    <section className={styles.section} aria-busy aria-live="polite" aria-label="Loading analytics">
      <div className={styles.statsGrid}>
        {statCardSkeletonIds.map((id) => (
          <article key={id} className={styles.statCard}>
            <SkeletonBlock className={styles.statLine} />
            <SkeletonBlock className={styles.statMetric} />
            <SkeletonBlock className={styles.statTrend} />
          </article>
        ))}
      </div>

      <div className={styles.rangeRow}>
        <SkeletonBlock className={styles.rangeChip} />
        <SkeletonBlock className={styles.rangeChip} />
        <SkeletonBlock className={styles.rangeChip} />
      </div>

      <article className={styles.analyticsCard}>
        <div className={styles.analyticsHeader}>
          <SkeletonBlock className={styles.analyticsTitle} />
          <SkeletonBlock className={styles.analyticsMeta} />
        </div>

        <SkeletonBlock className={styles.analyticsGraph} />

        <div className={styles.analyticsLabels}>
          <SkeletonBlock className={styles.analyticsLabel} />
          <SkeletonBlock className={styles.analyticsLabel} />
          <SkeletonBlock className={styles.analyticsLabel} />
        </div>
      </article>
    </section>
  );
}

export function UsersTableSectionFallback() {
  return (
    <section className={styles.section} aria-busy aria-live="polite" aria-label="Loading users table">
      <div className={styles.tableHeader}>
        <SkeletonBlock className={styles.tableTitle} />
        <SkeletonBlock className={styles.tableSearch} />
      </div>

      <div className={styles.tableShell}>
        <div className={styles.tableHead}>
          {tableColumnSkeletonIds.map((columnId) => (
            <SkeletonBlock key={`head-${columnId}`} className={styles.headCell} />
          ))}
        </div>

        {tableRowSkeletonIds.map((rowId) => (
          <div key={`row-${rowId}`} className={styles.tableRow}>
            {tableColumnSkeletonIds.map((columnId) => (
              <SkeletonBlock key={`cell-${rowId}-${columnId}`} className={styles.bodyCell} />
            ))}
          </div>
        ))}
      </div>

      <div className={styles.paginationRow}>
        <SkeletonBlock className={styles.pageInfo} />
        <div className={styles.pageControls}>
          {pageControlSkeletonIds.map((id) => (
            <SkeletonBlock key={`page-${id}`} className={styles.pageControl} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ChallengesContentFallback() {
  return (
    <section className={styles.section} aria-busy aria-live="polite" aria-label="Loading challenges">
      <div className={styles.challengeHeader}>
        <SkeletonBlock className={styles.challengeTitle} />
        <SkeletonBlock className={styles.challengeSubtitle} />
      </div>

      <SkeletonBlock className={styles.challengeCard} />
      <SkeletonBlock className={styles.challengeCard} />
    </section>
  );
}

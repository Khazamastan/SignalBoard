import { Suspense } from 'react';

import { ChallengesContentFallback } from '@/features/dashboard/components/DashboardStreamingFallbacks';
import { StatsCard } from '@/features/dashboard/components/StatsCard';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import { Card } from '@design-system';

import styles from './page.module.css';

const frameWidths = ['20rem', '48rem', '90rem', '160rem'] as const;

async function ChallengesContent() {
  const statsData = await dashboardService.getStatsResponse();
  const sampleCard = statsData.data[0];

  return (
    <div className={styles.page}>
      <section>
        <h1 className={styles.title}>Part D Challenges</h1>
        <p className={styles.subtitle}>
          Completed: Challenge 2 (Container Queries) and Challenge 4 (Fluid Typography & Spacing
          System).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Challenge 2 · Container Queries</h2>

        <div className={styles.demoGrid}>
          <Card variant="default">
            <h3>Sidebar-width container</h3>
            <StatsCard data={sampleCard} />
          </Card>

          <Card variant="default">
            <h3>Main-content container</h3>
            <StatsCard data={sampleCard} />
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Challenge 4 · Fluid Typography & Spacing</h2>

        <Card variant="default">
          <div className={styles.specimen}>
            <div className={styles.sizeRow}>
              <span className={styles.xxlarge}>Display / 2xl</span>
              <span className={styles.large}>Large heading / lg</span>
              <span className={styles.medium}>Body copy / md</span>
              <span className={styles.small}>Support text / xs</span>
            </div>

            <p>
              Spacing and type tokens use `clamp(min, preferred, max)` so they scale continuously
              from mobile to large displays without breakpoint jumps.
            </p>
          </div>

          <div className={styles.frames}>
            {frameWidths.map((width) => (
              <div key={width} className={styles.frame}>
                <p>Frame width: {width}</p>
                <div className={styles.cardFlow} style={{ width }}>
                  <StatsCard data={sampleCard} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

export default function ChallengesPage() {
  return (
    <Suspense fallback={<ChallengesContentFallback />}>
      <ChallengesContent />
    </Suspense>
  );
}

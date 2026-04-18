import { Suspense } from 'react';

import { ChallengesContentFallback } from '@/features/dashboard/components/DashboardStreamingFallbacks';
import { StatsCard } from '@/features/dashboard/components/StatsCard';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import { Card } from '@design-system';

import styles from './page.module.css';

const frameWidths = ['20rem', '48rem', '90rem', '160rem'] as const;
const CHALLENGES_PAGE_COPY = {
  pageTitle: 'Part D Challenges',
  pageSubtitle:
    'Completed: Challenge 2 (Container Queries) and Challenge 4 (Fluid Typography & Spacing System).',
  challenge2Title: 'Challenge 2 · Container Queries',
  challenge2SidebarLabel: 'Sidebar-width container',
  challenge2MainLabel: 'Main-content container',
  challenge4Title: 'Challenge 4 · Fluid Typography & Spacing',
  fluidSpecimen:
    'Spacing and type tokens use `clamp(min, preferred, max)` so they scale continuously from mobile to large displays without breakpoint jumps.',
  frameWidthLabel: 'Frame width',
} as const;

async function ChallengesContent() {
  const statsData = await dashboardService.getStatsResponse();
  const sampleCard = statsData.data[0];

  return (
    <div className={styles.page}>
      <section>
        <h1 className={styles.title}>{CHALLENGES_PAGE_COPY.pageTitle}</h1>
        <p className={styles.subtitle}>{CHALLENGES_PAGE_COPY.pageSubtitle}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{CHALLENGES_PAGE_COPY.challenge2Title}</h2>

        <div className={styles.demoGrid}>
          <Card variant="default">
            <h3>{CHALLENGES_PAGE_COPY.challenge2SidebarLabel}</h3>
            <StatsCard data={sampleCard} />
          </Card>

          <Card variant="default">
            <h3>{CHALLENGES_PAGE_COPY.challenge2MainLabel}</h3>
            <StatsCard data={sampleCard} />
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{CHALLENGES_PAGE_COPY.challenge4Title}</h2>

        <Card variant="default">
          <div className={styles.specimen}>
            <div className={styles.sizeRow}>
              <span className={styles.xxlarge}>Display / 2xl</span>
              <span className={styles.large}>Large heading / lg</span>
              <span className={styles.medium}>Body copy / md</span>
              <span className={styles.small}>Support text / xs</span>
            </div>

            <p>
              {CHALLENGES_PAGE_COPY.fluidSpecimen}
            </p>
          </div>

          <div className={styles.frames}>
            {frameWidths.map((width) => (
              <div key={width} className={styles.frame}>
                <p>
                  {CHALLENGES_PAGE_COPY.frameWidthLabel}: {width}
                </p>
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

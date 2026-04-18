import { Suspense } from 'react';

import { ChallengesContentFallback } from '@/features/dashboard/components/DashboardStreamingFallbacks';
import { StatsCard } from '@/features/dashboard/components/StatsCard';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import { t } from '@/shared/i18n';
import { Card } from '@design-system';

import styles from './page.module.css';

const frameWidths = ['20rem', '48rem', '90rem', '160rem'] as const;

async function ChallengesContent() {
  const statsData = await dashboardService.getStatsResponse();
  const sampleCard = statsData.data[0];

  return (
    <div className={styles.page}>
      <section>
        <h1 className={styles.title}>{t('page.challenges.title')}</h1>
        <p className={styles.subtitle}>{t('page.challenges.subtitle')}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('page.challenges.challenge2Title')}</h2>

        <div className={styles.demoGrid}>
          <Card>
            <h3>{t('page.challenges.challenge2SidebarLabel')}</h3>
            <StatsCard data={sampleCard} />
          </Card>

          <Card>
            <h3>{t('page.challenges.challenge2MainLabel')}</h3>
            <StatsCard data={sampleCard} />
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('page.challenges.challenge4Title')}</h2>

        <Card>
          <div className={styles.specimen}>
            <div className={styles.typeSpecimen}>
              <h1 className={styles.specimenH1}>{t('page.challenges.specimen.display')}</h1>
              <h2 className={styles.specimenH2}>{t('page.challenges.specimen.large')}</h2>
              <h3 className={styles.specimenH3}>{t('page.challenges.specimen.medium')}</h3>
              <h4 className={styles.specimenH4}>H4</h4>
              <h5 className={styles.specimenH5}>H5</h5>
              <h6 className={styles.specimenH6}>H6</h6>
              <p className={styles.specimenBody}>{t('page.challenges.fluidSpecimen')}</p>
              <small className={styles.specimenSmall}>{t('page.challenges.specimen.small')}</small>
            </div>
          </div>

          <div className={styles.frames}>
            {frameWidths.map((width) => (
              <div key={width} className={styles.frame}>
                <p>
                  {t('page.challenges.frameWidthLabel')}: {width}
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

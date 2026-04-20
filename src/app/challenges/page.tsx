import { Suspense } from 'react';

import { ChallengesContentFallback } from '@/features/dashboard/components/DashboardStreamingFallbacks';
import { StatsCard } from '@/features/dashboard/components/StatsCard';
import { dashboardService } from '@/features/dashboard/data/dashboard-service';
import { t } from '@/shared/i18n';
import { Card } from '@design-system';

import styles from './page.module.css';

const previewWidths = [320, 768, 1440, 2560] as const;

type TypeSpecimenProps = {
  bodyText: string;
  className?: string;
  displayText: string;
  largeText: string;
  mediumText: string;
  smallText: string;
};

function TypeSpecimen({
  bodyText,
  className,
  displayText,
  largeText,
  mediumText,
  smallText,
}: TypeSpecimenProps) {
  const specimenClassName = className ? `${styles.typeSpecimen} ${className}` : styles.typeSpecimen;

  return (
    <div className={specimenClassName}>
      <h1 className={styles.specimenH1}>{displayText}</h1>
      <h2 className={styles.specimenH2}>{largeText}</h2>
      <h3 className={styles.specimenH3}>{mediumText}</h3>
      <h4 className={styles.specimenH4}>H4</h4>
      <h5 className={styles.specimenH5}>H5</h5>
      <h6 className={styles.specimenH6}>H6</h6>
      <p className={styles.specimenBody}>{bodyText}</p>
      <small className={styles.specimenSmall}>{smallText}</small>
    </div>
  );
}

async function ChallengesContent() {
  const statsData = await dashboardService.getStatsResponse();
  const sampleCard = statsData.data[0];
  const bodyText = t('page.challenges.fluidSpecimen');
  const displayText = t('page.challenges.specimen.display');
  const largeText = t('page.challenges.specimen.large');
  const mediumText = t('page.challenges.specimen.medium');
  const smallText = t('page.challenges.specimen.small');

  return (
    <div className={styles.page}>
      <section>
        <h1 className={styles.title}>{t('page.challenges.title')}</h1>
        <p className={styles.subtitle}>{t('page.challenges.subtitle')}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('page.challenges.challenge2Title')}</h2>

        <div className={styles.demoGrid}>
          <aside className={styles.sidebarDemo}>
            <Card>
              <h3 className={styles.demoLabel}>{t('page.challenges.challenge2SidebarLabel')}</h3>
              <StatsCard data={sampleCard} />
            </Card>
          </aside>

          <section className={styles.mainDemo}>
            <Card>
              <h3 className={styles.demoLabel}>{t('page.challenges.challenge2MainLabel')}</h3>
              <StatsCard data={sampleCard} />
            </Card>
          </section>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t('page.challenges.challenge4Title')}</h2>

        <Card>
          <div className={styles.formulaBlock}>
            <h3 className={styles.formulaTitle}>{t('page.challenges.formulaTitle')}</h3>
            <p className={styles.formulaText}>{t('page.challenges.formulaViewportRange')}</p>
            <p className={styles.formulaText}>{t('page.challenges.formulaTokenRule')}</p>
            <p className={styles.formulaCode}>{t('page.challenges.formulaEquation')}</p>
            <p className={styles.formulaCode}>{t('page.challenges.formulaMath')}</p>
          </div>

          <div className={styles.specimen}>
            <div className={styles.specimenPanel}>
              <TypeSpecimen
                bodyText={bodyText}
                displayText={displayText}
                largeText={largeText}
                mediumText={mediumText}
                smallText={smallText}
              />
            </div>
          </div>

          <div className={styles.frames}>
            {previewWidths.map((width) => (
              <div key={width} className={styles.frame}>
                <p className={styles.frameLabel}>
                  {t('page.challenges.frameWidthLabel')}: {width}px
                </p>
                <div className={styles.framePreview} style={{ width: `${width}px` }}>
                  <div className={styles.frameLayout}>
                    <TypeSpecimen
                      bodyText={bodyText}
                      className={styles.frameTypeSpecimen}
                      displayText={displayText}
                      largeText={largeText}
                      mediumText={mediumText}
                      smallText={smallText}
                    />
                  </div>
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

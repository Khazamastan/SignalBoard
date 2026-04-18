import { Card } from '@design-system';
import { t } from '@/shared/i18n';

import styles from './page.module.css';

export default function ReportsPage() {

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>{t('page.reports.title')}</h1>
        <p className={styles.subtitle}>{t('page.reports.subtitle')}</p>
      </section>

      <section className={styles.grid}>
        <Card variant="default" header={<h2>{t('page.reports.recentTitle')}</h2>}>
          <div className={styles.cardContent}>
            <p className={styles.meta}>{t('page.reports.recentEmpty')}</p>
          </div>
        </Card>

        <Card variant="default" header={<h2>{t('page.reports.scheduledTitle')}</h2>}>
          <div className={styles.cardContent}>
            <p className={styles.meta}>{t('page.reports.scheduledEmpty')}</p>
          </div>
        </Card>
      </section>
    </div>
  );
}

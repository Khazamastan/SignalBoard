import { Card } from '@design-system';

import styles from './page.module.css';

const REPORTS_PAGE_COPY = {
  title: 'Reports',
  subtitle:
    'This is a lightweight reports area placeholder for future export and scheduled reporting workflows.',
  recentReportsTitle: 'Recent Reports',
  recentReportsEmptyState: 'No generated reports yet.',
  scheduledReportsTitle: 'Scheduled Reports',
  scheduledReportsEmptyState: 'No schedules configured.',
} as const;

export default function ReportsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>{REPORTS_PAGE_COPY.title}</h1>
        <p className={styles.subtitle}>{REPORTS_PAGE_COPY.subtitle}</p>
      </section>

      <section className={styles.grid}>
        <Card variant="default" header={<h2>{REPORTS_PAGE_COPY.recentReportsTitle}</h2>}>
          <div className={styles.cardContent}>
            <p className={styles.meta}>{REPORTS_PAGE_COPY.recentReportsEmptyState}</p>
          </div>
        </Card>

        <Card variant="default" header={<h2>{REPORTS_PAGE_COPY.scheduledReportsTitle}</h2>}>
          <div className={styles.cardContent}>
            <p className={styles.meta}>{REPORTS_PAGE_COPY.scheduledReportsEmptyState}</p>
          </div>
        </Card>
      </section>
    </div>
  );
}

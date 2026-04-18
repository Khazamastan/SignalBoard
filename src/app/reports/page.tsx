import { Card } from '@design-system';

import styles from './page.module.css';

export default function ReportsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Reports</h1>
        <p className={styles.subtitle}>
          This is a lightweight reports area placeholder for future export and scheduled reporting
          workflows.
        </p>
      </section>

      <section className={styles.grid}>
        <Card variant="default" header={<h2>Recent Reports</h2>}>
          <div className={styles.cardContent}>
            <p className={styles.meta}>No generated reports yet.</p>
          </div>
        </Card>

        <Card variant="default" header={<h2>Scheduled Reports</h2>}>
          <div className={styles.cardContent}>
            <p className={styles.meta}>No schedules configured.</p>
          </div>
        </Card>
      </section>
    </div>
  );
}

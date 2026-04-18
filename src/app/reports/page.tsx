import { Card } from "@design-system";
import { AppShell } from "@/features/dashboard/layout/AppShell";
import styles from "./page.module.css";

export default function ReportsPage() {
  return (
    <AppShell>
      <section className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.title}>Reports</h1>
          <p className={styles.subtitle}>
            This is a lightweight reports area placeholder for future export and
            scheduled reporting workflows.
          </p>
        </header>

        <div className={styles.grid}>
          <Card className={styles.panel}>
            <h2 className={styles.panelTitle}>Recent Reports</h2>
            <div className={styles.panelBody}>No generated reports yet.</div>
          </Card>

          <Card className={styles.panel}>
            <h2 className={styles.panelTitle}>Scheduled Reports</h2>
            <div className={styles.panelBody}>No schedules configured.</div>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}

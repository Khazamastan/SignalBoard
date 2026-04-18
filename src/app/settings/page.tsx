import { Card } from '@design-system';

import styles from './page.module.css';

export default function SettingsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>
          Basic settings placeholders are ready here for profile, preferences, and notification
          controls.
        </p>
      </section>

      <section className={styles.stack}>
        <Card variant="default">
          <div className={styles.row}>
            <div>
              <h2>Profile</h2>
              <p className={styles.description}>Update name, email, and organization details.</p>
            </div>
            <span className={styles.badge}>Coming soon</span>
          </div>
        </Card>

        <Card variant="default">
          <div className={styles.row}>
            <div>
              <h2>Notifications</h2>
              <p className={styles.description}>Manage report and system alerts.</p>
            </div>
            <span className={styles.badge}>Coming soon</span>
          </div>
        </Card>
      </section>
    </div>
  );
}

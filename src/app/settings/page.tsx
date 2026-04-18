import { Card } from '@design-system';

import styles from './page.module.css';

const SETTINGS_PAGE_COPY = {
  title: 'Settings',
  subtitle:
    'Basic settings placeholders are ready here for profile, preferences, and notification controls.',
  profileTitle: 'Profile',
  profileDescription: 'Update name, email, and organization details.',
  notificationsTitle: 'Notifications',
  notificationsDescription: 'Manage report and system alerts.',
  comingSoon: 'Coming soon',
} as const;

export default function SettingsPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>{SETTINGS_PAGE_COPY.title}</h1>
        <p className={styles.subtitle}>{SETTINGS_PAGE_COPY.subtitle}</p>
      </section>

      <section className={styles.stack}>
        <Card variant="default">
          <div className={styles.row}>
            <div>
              <h2>{SETTINGS_PAGE_COPY.profileTitle}</h2>
              <p className={styles.description}>{SETTINGS_PAGE_COPY.profileDescription}</p>
            </div>
            <span className={styles.badge}>{SETTINGS_PAGE_COPY.comingSoon}</span>
          </div>
        </Card>

        <Card variant="default">
          <div className={styles.row}>
            <div>
              <h2>{SETTINGS_PAGE_COPY.notificationsTitle}</h2>
              <p className={styles.description}>{SETTINGS_PAGE_COPY.notificationsDescription}</p>
            </div>
            <span className={styles.badge}>{SETTINGS_PAGE_COPY.comingSoon}</span>
          </div>
        </Card>
      </section>
    </div>
  );
}

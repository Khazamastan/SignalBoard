import { Card } from '@design-system';
import { t } from '@/shared/i18n';

import styles from './page.module.css';

export default function SettingsPage() {

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>{t('page.settings.title')}</h1>
        <p className={styles.subtitle}>{t('page.settings.subtitle')}</p>
      </section>

      <section className={styles.stack}>
        <Card>
          <div className={styles.row}>
            <div>
              <h2>{t('page.settings.profileTitle')}</h2>
              <p className={styles.description}>{t('page.settings.profileDescription')}</p>
            </div>
            <span className={styles.badge}>{t('page.settings.comingSoon')}</span>
          </div>
        </Card>

        <Card>
          <div className={styles.row}>
            <div>
              <h2>{t('page.settings.notificationsTitle')}</h2>
              <p className={styles.description}>{t('page.settings.notificationsDescription')}</p>
            </div>
            <span className={styles.badge}>{t('page.settings.comingSoon')}</span>
          </div>
        </Card>
      </section>
    </div>
  );
}

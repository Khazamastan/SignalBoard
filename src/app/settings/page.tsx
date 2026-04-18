import { Card } from "@design-system";
import { AppShell } from "@/features/dashboard/layout/AppShell";
import styles from "./page.module.css";

const SETTINGS_BLOCKS = [
  {
    title: "Profile",
    description: "Update name, email, and organization details.",
  },
  {
    title: "Notifications",
    description: "Manage report and system alerts.",
  },
];

export default function SettingsPage() {
  return (
    <AppShell>
      <section className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.title}>Settings</h1>
          <p className={styles.subtitle}>
            Basic settings placeholders are ready here for profile, preferences,
            and notification controls.
          </p>
        </header>

        <div className={styles.blocks}>
          {SETTINGS_BLOCKS.map((block) => (
            <Card key={block.title} className={styles.settingCard}>
              <div className={styles.settingBody}>
                <h2 className={styles.settingTitle}>{block.title}</h2>
                <p className={styles.settingDescription}>{block.description}</p>
              </div>
              <p className={styles.settingMeta}>Coming soon</p>
            </Card>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

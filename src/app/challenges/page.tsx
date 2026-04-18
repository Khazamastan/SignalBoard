import { Card } from "@design-system";
import { StatsCard, type StatCardData } from "@/features/dashboard/components/StatsCard";
import { AppShell } from "@/features/dashboard/layout/AppShell";
import styles from "./page.module.css";

const FRAME_WIDTHS = ["20rem", "48rem", "90rem", "160rem"] as const;

const SAMPLE_STAT: StatCardData = {
  id: "sample-users",
  metric: "Total Users",
  value: "48,392",
  trend: { direction: "up", percentage: 12.4 },
  icon: "users",
};

export default function ChallengesPage() {
  return (
    <AppShell>
      <div className={styles.page}>
        <section>
          <h1 className={styles.title}>Part D Challenges</h1>
          <p className={styles.subtitle}>
            Completed: Challenge 2 (Container Queries) and Challenge 4 (Fluid
            Typography &amp; Spacing System).
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Challenge 2 · Container Queries</h2>

          <div className={styles.demoGrid}>
            <Card variant="default">
              <h3>Sidebar-width container</h3>
              <StatsCard data={SAMPLE_STAT} />
            </Card>

            <Card variant="default">
              <h3>Main-content container</h3>
              <StatsCard data={SAMPLE_STAT} />
            </Card>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Challenge 4 · Fluid Typography &amp; Spacing
          </h2>

          <Card variant="default">
            <div className={styles.specimen}>
              <div className={styles.sizeRow}>
                <span className={styles.xxlarge}>Display / 2xl</span>
                <span className={styles.large}>Large heading / lg</span>
                <span className={styles.medium}>Body copy / md</span>
                <span className={styles.small}>Support text / xs</span>
              </div>

              <p>
                Spacing and type tokens use `clamp(min, preferred, max)` so they
                scale continuously from mobile to large displays without breakpoint
                jumps.
              </p>
            </div>

            <div className={styles.frames}>
              {FRAME_WIDTHS.map((width) => (
                <div key={width} className={styles.frame}>
                  <p>Frame width: {width}</p>
                  <div className={styles.cardFlow} style={{ width }}>
                    <StatsCard data={SAMPLE_STAT} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

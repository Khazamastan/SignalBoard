import { ArrowUpIcon, Card, UsersIcon } from "@design-system";
import { AppShell } from "@/features/dashboard/layout/AppShell";
import styles from "./page.module.css";

const FRAME_WIDTHS = ["20rem", "48rem", "90rem"] as const;

export default function ChallengesPage() {
  return (
    <AppShell>
      <section className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.title}>Part D Challenges</h1>
          <p className={styles.subtitle}>
            Completed: Challenge 2 (Container Queries) and Challenge 4 (Fluid
            Typography &amp; Spacing System).
          </p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Challenge 2 - Container Queries</h2>

          <div className={styles.containerGrid}>
            <Card className={styles.panel}>
              <h3 className={styles.panelTitle}>Sidebar-width container</h3>

              <Card className={styles.metricCard}>
                <div className={styles.metricIcon}>
                  <UsersIcon size={30} />
                </div>
                <p className={styles.metricLabel}>Total Users</p>
                <p className={styles.metricValue}>48,392</p>
                <p className={styles.metricTrend}>
                  <ArrowUpIcon size={16} /> 12.4%
                </p>
              </Card>
            </Card>

            <Card className={styles.panel}>
              <h3 className={styles.panelTitle}>Main-content container</h3>

              <Card className={styles.metricWide}>
                <div className={styles.metricIcon}>
                  <UsersIcon size={28} />
                </div>
                <div className={styles.metricWideBody}>
                  <p className={styles.metricLabel}>Total Users</p>
                  <p className={styles.metricValue}>48,392</p>
                  <p className={styles.metricTrend}>
                    <ArrowUpIcon size={16} /> 12.4%
                  </p>
                </div>
              </Card>
            </Card>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Challenge 4 - Fluid Typography &amp; Spacing
          </h2>

          <Card className={styles.typeCard}>
            <div className={styles.typeScale}>
              <p className={styles.displaySample}>Display / 2xl</p>
              <p className={styles.headingSample}>Large heading / lg</p>
              <p className={styles.bodySample}>Body copy / md</p>
              <p className={styles.supportSample}>Support text / xs</p>
            </div>

            <div className={styles.typeBody}>
              Spacing and type tokens use `clamp(min, preferred, max)` so they
              scale continuously from mobile to large displays without breakpoint
              jumps.
            </div>

            <div className={styles.frameStack}>
              {FRAME_WIDTHS.map((frameWidth) => (
                <article
                  key={frameWidth}
                  className={styles.frame}
                  style={{ ["--frame-width" as string]: frameWidth }}
                >
                  <p className={styles.frameLabel}>Frame width: {frameWidth}</p>
                  <div className={styles.framePreview}>
                    <Card className={styles.responsiveMetric}>
                      <div className={styles.metricIcon}>
                        <UsersIcon size={28} />
                      </div>
                      <div>
                        <p className={styles.metricLabel}>Total Users</p>
                        <p className={styles.metricValue}>48,392</p>
                        <p className={styles.metricTrend}>
                          <ArrowUpIcon size={16} /> 12.4%
                        </p>
                      </div>
                    </Card>
                  </div>
                </article>
              ))}
            </div>
          </Card>
        </section>
      </section>
    </AppShell>
  );
}

import styles from './loading.module.css';

export default function Loading() {
  return (
    <section className={styles.loading} aria-live="polite" aria-busy>
      <span className={styles.srOnly}>Loading page content</span>

      <div className={styles.hero}>
        <span className={`${styles.surface} ${styles.title}`} aria-hidden />
        <span className={`${styles.surface} ${styles.subtitle}`} aria-hidden />
      </div>

      <span className={`${styles.panel} ${styles.surface}`} aria-hidden />
      <span className={`${styles.panel} ${styles.surface}`} aria-hidden />
    </section>
  );
}

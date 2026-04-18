'use client';

import { Button } from '@design-system';
import { t } from '@/shared/i18n';


export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section>
      <h1>{t('app.error.title')}</h1>
      <p>{t('app.error.description')}</p>
      <Button onClick={reset}>{t('app.error.retry')}</Button>
    </section>
  );
}

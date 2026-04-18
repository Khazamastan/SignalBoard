'use client';

import { Button } from '@design-system';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section>
      <h1>Something went wrong while loading the dashboard.</h1>
      <p>Try refreshing the data.</p>
      <Button onClick={reset}>Retry</Button>
    </section>
  );
}

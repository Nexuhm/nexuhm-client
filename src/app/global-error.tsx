'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Logo from '@/assets/logo.svg';
import { Button } from '@/components/elements/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <main>
          <div className="flex justify-center py-6">
            <a href="/">
              <Logo className="h-[40px] w-[181px]" />
            </a>
          </div>

          <div className="mx-auto mt-64 max-w-lg text-center text-balance">
            <div className="font-inter text-[80px] font-semibold">500</div>
            <div className="mb-6 text-3xl">
              Oops, something went wrong!
            </div>
            <div className="mb-6">
              We've encountered an unexpected issue. We're on it! Please try
              refreshing the page or check back later.
            </div>

            <div className="flex max-w-[150px] mx-auto flex-col gap-2">
              <Button href="/">Go to Homepage</Button>
              <Button variant="tertiary" onClick={() => reset()}>
                Try again
              </Button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}

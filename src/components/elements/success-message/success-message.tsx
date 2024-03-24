import clsx from 'clsx';
import { Icon } from '@/components/elements/icon';
import { PropsWithChildren } from 'react';

export function SuccessMessage({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div
        className={clsx(
          'inline-flex items-center justify-center',
          'rounded-full bg-green bg-opacity-20 p-5',
        )}
      >
        <Icon icon="check" className="h-6 w-6 text-green" />
      </div>

      <div className="text-content-secondary">
        {children}
      </div>
    </div>
  );
}

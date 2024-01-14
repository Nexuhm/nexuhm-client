import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export function FormSection({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 gap-4 md:grid-cols-2',
        'border-b border-light-gray first:border-t-0 last:border-b-0',
        'px-10 py-6 ',
      )}
    >
      {children}
    </div>
  );
}

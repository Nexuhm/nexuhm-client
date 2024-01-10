import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface DividerProps extends PropsWithChildren {
  className?: string;
}

export function Divider({ children, className }: DividerProps) {
  return (
    <div
      className={clsx('relative flex flex-col items-center py-3', className)}
    >
      <div className="h-[1px] w-full bg-light-gray" />
      {children && (
        <div className="absolute -top-0 w-full text-center">
          <span className="mx-auto bg-white px-2">{children}</span>
        </div>
      )}
    </div>
  );
}

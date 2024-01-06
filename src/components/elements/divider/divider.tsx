import clsx from 'clsx';
import { PropsWithChildren } from 'react';

interface DividerProps extends PropsWithChildren {
  className?: string;
}

export function Divider({ children, className }: DividerProps) {
  return (
    <div
      className={clsx('py-3 flex flex-col items-center relative', className)}
    >
      <div className="h-[1px] w-full bg-light-gray" />
      {children && (
        <div className="w-full absolute -top-0 text-center">
          <span className="bg-white mx-auto px-2">{children}</span>
        </div>
      )}
    </div>
  );
}

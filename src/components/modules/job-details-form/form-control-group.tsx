import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface FormControlGroupProps extends PropsWithChildren {
  label?: string;
  required?: boolean;
  className?: string;
}

export function FormControlGroup({
  label,
  required,
  className,
  children,
}: FormControlGroupProps) {
  return (
    <div className={clsx(className, 'mb-6 last:mb-0')}>
      {label && (
        <div className="input-label" data-required={required}>
          {label}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

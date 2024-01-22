import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface FormControlGroupProps extends PropsWithChildren {
  label?: string;
  required?: boolean;
}

export function FormControlGroup({
  label,
  required,
  children,
}: FormControlGroupProps) {
  return (
    <div className="mb-6 last:mb-0">
      {label && (
        <div className="input-label" data-required={required}>
          {label}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

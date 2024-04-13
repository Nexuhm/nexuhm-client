import clsx from 'clsx';
import { ReactNode } from 'react';

interface FormProps extends React.HTMLProps<HTMLFormElement> {
  children: ReactNode;
  className?: string;
}

export function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={clsx('flex flex-col gap-4', className)} {...props}>
      {children}
    </form>
  );
}

interface FormControlGroupProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

function FormControlGroup({
  children,
  label,
  className,
}: FormControlGroupProps) {
  return (
    <div className={className}>
      {label && <div className="input-label">{label}</div>}
      <div className="flex gap-4">{children}</div>
    </div>
  );
}

Form.ControlGroup = FormControlGroup;

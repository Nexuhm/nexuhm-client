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
      {label && <div className="mb-1 font-medium">{label}</div>}
      <div className="flex gap-2">{children}</div>
    </div>
  );
}

Form.ControlGroup = FormControlGroup;

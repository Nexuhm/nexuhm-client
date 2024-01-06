import { ReactNode } from 'react';
import styles from './button.module.scss';
import clsx from 'clsx';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  className,
  variant = 'primary',
}: ButtonProps) {
  return (
    <button className={clsx(className, styles.button)} data-variant={variant}>
      {children}
    </button>
  );
}

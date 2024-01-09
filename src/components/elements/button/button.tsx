import { ComponentType, ElementType, ReactNode } from 'react';
import styles from './button.module.scss';
import clsx from 'clsx';

interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'as'> {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export function Button({
  as: Tag = 'button',
  children,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  // use link if href is provided
  Tag = props.href != null ? 'a' : Tag;

  if (Tag === 'a') {
    props.target = props.href?.startsWith('http') ? '_blank' : null;
  }

  return (
    <Tag
      className={clsx(className, styles.button)}
      data-variant={variant}
      {...props}
    >
      {children}
    </Tag>
  );
}

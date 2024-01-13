import { ElementType, ReactNode } from 'react';
import styles from './button.module.scss';
import clsx from 'clsx';

interface ButtonProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'size'> {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 'base' | 'lg';
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export function Button({
  as: Tag = 'button',
  children,
  className,
  variant = 'primary',
  size = 'base',
  ...props
}: ButtonProps) {
  // use link if href is provided
  Tag = props.href != null ? 'a' : Tag;

  if (Tag === 'a') {
    props.target = props.href?.startsWith('http') ? '_blank' : undefined;
  }

  return (
    <Tag
      className={clsx(className, styles.button)}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      {children}
    </Tag>
  );
}

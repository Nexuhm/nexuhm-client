'use client';

import { ElementType, ReactNode, forwardRef } from 'react';
import styles from './button.module.scss';
import clsx from 'clsx';
import { Icon, IconName } from '../icon';
import { Spinner } from '../spinner';

interface ButtonBaseProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'size'> {
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'alert';
  size?: 'xs' | 'base' | 'lg';
  type?: 'button' | 'submit' | 'reset' | undefined;
}

interface ButtonProps extends ButtonBaseProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  loading?: boolean;
  size?: 'xs' | 'base' | 'lg';
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export const Button = forwardRef(
  (
    {
      as: Tag = 'button',
      children,
      className,
      variant = 'primary',
      size = 'base',
      loading,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    // use link if href is provided
    Tag = props.href != null ? 'a' : Tag;

    if (Tag === 'button') {
      props.type = props.type || 'button';
    }

    return (
      <Tag
        ref={ref}
        className={clsx(className, styles.button)}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {children}

        {loading && <Spinner className="ml-2" color="white" size={15} />}
      </Tag>
    );
  },
);

Button.displayName = 'Button';

interface IconButtonProps extends ButtonBaseProps {
  icon: IconName;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'base',
      icon,
      ...props
    }: IconButtonProps,
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(styles.button, styles.iconButton, className)}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        <Icon icon={icon} className="h-5 w-5" />
      </button>
    );
  },
);

'use client';

import { ElementType, ReactNode, forwardRef } from 'react';
import styles from './button.module.scss';
import clsx from 'clsx';
import { Icon, IconName } from '../icon';
import { Spinner } from '../spinner';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link'
  | 'alert'
  | 'green';

export interface ButtonBaseProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'size'> {
  className?: string;
  variant?: ButtonVariant;
  ghost?: boolean;
  size?: 'xs' | 'base' | 'lg';
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export interface ButtonProps extends ButtonBaseProps {
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
      ghost = false,
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
        data-ghost={ghost}
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
  shape?: 'rounded' | 'square';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'base',
      shape = 'rounded',
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
        data-shape={shape}
        {...props}
      >
        <Icon icon={icon} className="h-5 w-5" />
      </button>
    );
  },
);

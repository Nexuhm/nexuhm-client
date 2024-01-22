import { ElementType, ReactNode, forwardRef } from 'react';
import styles from './button.module.scss';
import clsx from 'clsx';
import { Icon, IconName } from '../icon';

interface ButtonBaseProps
  extends Omit<React.HTMLProps<HTMLButtonElement>, 'as' | 'size'> {
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 'base' | 'lg';
  type?: 'button' | 'submit' | 'reset' | undefined;
}

interface ButtonProps extends ButtonBaseProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
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
      </Tag>
    );
  },
);

interface IconButtonProps extends ButtonBaseProps {
  icon: IconName;
}

export function IconButton({
  children,
  className,
  variant = 'primary',
  size = 'base',
  icon,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={clsx(className, styles.button, styles.iconButton)}
      data-variant={variant}
      data-size={size}
      {...props}
    >
      <Icon icon={icon} className="h-5 w-5" />
    </button>
  );
}

import React, { PropsWithChildren } from 'react';
import styles from './input.module.scss';
import clsx from 'clsx';

export interface InputWrapperProps extends PropsWithChildren {
  label?: string;
  className?: string;
  containerClassName?: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  prefix?: string;
  variant?: 'gray';
}

export function InputWrapper({
  label,
  required,
  className,
  children,
  containerClassName,
  htmlFor,
  error,
  prefix,
  variant,
  ...props
}: InputWrapperProps) {
  return (
    <div
      {...props}
      className={clsx(className, {
        [styles.errorState]: !!error,
      })}
    >
      {label && (
        <label
          htmlFor={htmlFor}
          className="input-label"
          data-required={required}
        >
          {label}
        </label>
      )}

      <div
        className={clsx(containerClassName, styles.inputContainer)}
        data-variant={variant}
      >
        {prefix && <span className="mr-1 text-sm">{prefix}</span>}

        {children}
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

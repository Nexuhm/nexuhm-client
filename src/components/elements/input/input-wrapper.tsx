import React, { PropsWithChildren } from 'react';
import styles from './input.module.scss';
import clsx from 'clsx';

export interface InputWrapperProps extends PropsWithChildren {
  label?: string;
  className?: string;
  containerClassName?: string;
  htmlFor?: string;
  error?: string;
}

export function InputWrapper({
  label,
  className,
  children,
  containerClassName,
  htmlFor,
  error,
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
        <label htmlFor={htmlFor} className="mb-1 inline-block text-sm">
          {label}
        </label>
      )}

      <div className={clsx(containerClassName, styles.inputContainer)}>
        {children}
      </div>

      <p className={styles.errorMessage}>{error}</p>
    </div>
  );
}

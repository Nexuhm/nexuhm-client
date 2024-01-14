import React from 'react';
import styles from './input.module.scss';
import clsx from 'clsx';

interface InputWrapperProps extends React.HTMLProps<HTMLDivElement> {
  label?: string;
  className?: string;
  containerClassName?: string;
}

export function InputWrapper({
  label,
  className,
  children,
  containerClassName,
  ...props
}: InputWrapperProps) {
  return (
    <div className={className} {...props}>
      {label && (
        <label htmlFor="email" className="mb-1 inline-block text-sm">
          {label}
        </label>
      )}

      <div className={clsx(containerClassName, styles.inputContainer)}>
        {children}
      </div>
    </div>
  );
}

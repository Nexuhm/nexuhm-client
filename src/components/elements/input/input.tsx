import React, { forwardRef } from 'react';
import styles from './input.module.scss';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => (
    <div>
      {label && (
        <label htmlFor="email" className="mb-1 inline-block">
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        <input
          id="email"
          className="w-full bg-transparent text-sm outline-none"
          {...props}
          ref={ref}
        />
      </div>
    </div>
  ),
);

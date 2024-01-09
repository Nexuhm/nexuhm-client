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
          className="text-sm bg-transparent outline-none w-full"
          {...props}
          ref={ref}
        />
      </div>
    </div>
  ),
);

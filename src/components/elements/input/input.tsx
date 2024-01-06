import React from 'react';
import styles from './input.module.scss';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label htmlFor="email" className="mb-1 inline-block">
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        <input
          id="email"
          className="text-sm bg-transparent outline-none"
          {...props}
        />
      </div>
    </div>
  );
}

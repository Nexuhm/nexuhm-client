import React, { forwardRef, useId } from 'react';
import styles from './input.module.scss';
import { Icon, IconName } from '../icon';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  icon?: IconName;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, className, label, icon, ...props }, ref) => {
    const _id = useId();

    if (!id) {
      id = _id;
    }

    return (
      <div className={className}>
        {label && (
          <label htmlFor="email" className="mb-1 inline-block">
            {label}
          </label>
        )}

        <div className={styles.inputContainer}>
          {icon && (
            <label htmlFor={id} className='mr-1'>
              <Icon icon={icon} className="w-6 text-content-secondary" />
            </label>
          )}
          <input
            id={id}
            className="w-full bg-transparent text-sm outline-none"
            {...props}
            ref={ref}
          />
        </div>
      </div>
    );
  },
);

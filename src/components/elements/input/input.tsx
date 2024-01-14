import React, { forwardRef, useId } from 'react';
import { Icon } from '../icon';
import { InputWrapper } from './input-wrapper';
import { InputProps } from './types';

export const Input = forwardRef<HTMLInputElement, InputProps<HTMLInputElement>>(
  ({ id, className, label, prefix, icon, ...props }, ref) => {
    const _id = useId();

    if (!id) {
      id = _id;
    }

    return (
      <InputWrapper
        label={label}
        className={className}
        containerClassName="h-10"
      >
        {icon && (
          <label htmlFor={id} className="mr-1">
            <Icon icon={icon} className="w-6 text-content-secondary" />
          </label>
        )}

        {prefix && <span className="mr-1 text-sm">{prefix}</span>}

        <input
          id={id}
          ref={ref}
          className="w-full bg-transparent text-sm outline-none"
          {...props}
        />
      </InputWrapper>
    );
  },
);

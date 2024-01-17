import React, { forwardRef, useId } from 'react';
import { Icon } from '../icon';
import { InputWrapper } from './input-wrapper';
import { InputProps } from './types';
import clsx from 'clsx';

export const Input = forwardRef<HTMLInputElement, InputProps<HTMLInputElement>>(
  (
    { id, className, containerClassName, label, prefix, icon, error, ...props },
    ref,
  ) => {
    const _id = useId();

    if (!id) {
      id = _id;
    }

    return (
      <InputWrapper
        label={label}
        htmlFor={id}
        error={error}
        className={className}
        containerClassName={clsx(containerClassName, 'h-10')}
      >
        {icon && (
          <label htmlFor={id} className="mr-1 transition-all">
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

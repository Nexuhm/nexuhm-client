'use client';

import React, { forwardRef, useId } from 'react';
import { Icon } from '../icon';
import { InputWrapper } from './input-wrapper';
import { InputProps } from './types';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  InputProps<HTMLTextAreaElement>
>(
  (
    {
      id,
      className,
      label,
      icon,
      containerClassName,
      error,
      variant,
      hint,
      ...props
    },
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
        hint={hint}
        variant={variant}
        className={className}
        containerClassName={containerClassName}
        required={props.required}
      >
        {icon && (
          <label htmlFor={id} className="mr-1 transition-all">
            <Icon icon={icon} className="w-6 text-content-secondary" />
          </label>
        )}
        <textarea ref={ref} id={id} {...props} />
      </InputWrapper>
    );
  },
);

Textarea.displayName = 'Textarea';

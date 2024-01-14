import React, { forwardRef, useId } from 'react';
import { Icon } from '../icon';
import { InputWrapper } from './input-wrapper';
import { InputProps } from './types';

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  InputProps<HTMLTextAreaElement>
>(({ id, className, label, icon, ...props }, ref) => {
  const _id = useId();

  if (!id) {
    id = _id;
  }

  return (
    <InputWrapper label={label} className={className}>
      {icon && (
        <label htmlFor={id} className="mr-1">
          <Icon icon={icon} className="w-6 text-content-secondary" />
        </label>
      )}
      <textarea ref={ref} id={id} {...props} />
    </InputWrapper>
  );
});

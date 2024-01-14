import { PropsWithChildren } from 'react';
import { FormSection } from './form-section';

export interface FormControlGroupProps extends PropsWithChildren {
  title: string;
  description: string;
  required?: boolean;
}

export function FormControlGroup({
  title,
  description,
  required,
  children,
}: FormControlGroupProps) {
  return (
    <FormSection>
      <div>
        <strong className="mb-1 leading-6">
          {title} {required && '*'}
        </strong>
        <div className="leading-6">{description}</div>
      </div>

      <div>{children}</div>
    </FormSection>
  );
}

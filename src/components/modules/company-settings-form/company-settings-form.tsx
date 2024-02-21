import { Button } from '@/components/elements/button';
import { ReactNode } from 'react';

export interface CompanySettingsFormProps {
  title: string;
  description: string;
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
  isSubmitting: boolean;
}

export function CompanySettingsForm({
  title,
  description,
  onSubmit,
  isSubmitting,
  children,
}: CompanySettingsFormProps) {
  return (
    <div className="p-6 card-container">
      <div className="mb-2">
        <div className="font-inter text-xl font-medium">{title}</div>
        <div className="text-sm text-content-secondary">{description}</div>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {children}

        <div>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

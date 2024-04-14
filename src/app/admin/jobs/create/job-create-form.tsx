'use client';

import { useEffect } from 'react';
import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import {
  JobDetailsForm,
  JobDetailsFormBase,
} from '@/components/modules/job-details-form';

export function JobCreateForm({ onSubmit, defaultValues }: JobDetailsFormBase) {
  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      e.returnValue = '';

      // Display a confirmation dialog with 'Yes' and 'No' buttons
      return 'Are you sure you want to leave?';
    };

    window.addEventListener('beforeunload', handler);

    return () => {
      return window.removeEventListener('beforeinput', handler);
    };
  }, []);

  return (
    <>
      <JobDetailsForm
        id="job-create-form"
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />

      <div className="mt-6">
        <div className="flex justify-end gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button type="submit" form="job-create-form">
            <Icon icon="check" className="2-5 h-5" />
            Preview
          </Button>
        </div>
      </div>
    </>
  );
}

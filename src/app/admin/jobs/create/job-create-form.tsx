'use client';

import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import {
  JobDetailsForm,
  JobDetailsFormBase,
} from '@/components/modules/job-details-form';

export function JobCreateForm({ onSubmit, defaultValues }: JobDetailsFormBase) {
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

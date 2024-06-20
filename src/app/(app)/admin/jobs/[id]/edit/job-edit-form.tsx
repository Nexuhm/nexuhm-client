'use client';

import { client } from '@/base/services/clients/browser-client';
import { JobSchema } from '@/base/types/jobs';
import { Button, IconButton } from '@/components/elements/button';
import { JobDetailsForm } from '@/components/modules/job-details-form';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export function JobEditForm({ defaultValues }: { defaultValues: JobSchema }) {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (val: JobSchema) => {
    setLoading(true);
    try {
      await client.post(`/admin/jobs/${params.id}/edit`, val);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between text-3xl font-medium">
        Edit job
        <IconButton
          variant="secondary"
          icon="close"
          onClick={() => router.push(`/admin/jobs/${params.id}`)}
        />
      </div>

      <JobDetailsForm
        id="job-edit-form"
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      />

      <div className="mx-auto max-w-[800px] px-10">
        <div className="flex justify-end gap-2">
          <Button variant="secondary" href={`/admin/jobs/${params.id}`}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="job-edit-form"
            loading={loading}
            disabled={loading}
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { client } from '@/base/services/clients/browser-client';
import { Button } from '@/components/elements/button';
import { JobStatusChip } from '@/components/elements/job-status-chip/job-status-chip';
import { useParams } from 'next/navigation';

export default function JobActions({ job }: { job: any }) {
  const params = useParams();
  const postingUrl = `https://${job.company.slug}.${process.env.NEXT_PUBLIC_DOMAIN}/jobs/${job.slug}`;

  const handleToggleState = async () => {
    await client.post(`/admin/jobs/${params.id}/state`, {
      state: job.state === 'draft' ? 'published' : 'draft',
    });

    location.reload();
  };

  return (
    <div className="mb-4 flex">
      <div className="flex items-center gap-4 text-2xl font-medium">
        {job.title}
        <JobStatusChip state={job.state} />
      </div>

      <div className="ml-auto flex gap-4">
        <Button
          variant={job.state === 'published' ? 'alert' : 'green'}
          onClick={() => handleToggleState()}
        >
          {job.state === 'published' ? 'Make Draft' : 'Publish'}
        </Button>
        <Button target="_blank" href={postingUrl} variant="secondary">
          View Job Post
        </Button>
        <Button variant="secondary" href={`/admin/jobs/${params.id}`}>
          Edit Job
        </Button>
      </div>
    </div>
  );
}

import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { JobStatusChip } from '@/components/elements/job-status-chip/job-status-chip';
import { JobCandidates } from './candidates';
import { client } from '@/base/services/clients/server-client';
import { format } from 'date-fns';
import { formatEmploymentTypeLabel } from '@/base/utils';

async function getData(id: string) {
  const data = await client.get(`/admin/jobs/${id}`);
  return data;
}

export default async function JobDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const jobDetails = await getData(params.id);

  return (
    <div className="container max-w-7xl">
      <div className="mb-8">
        <div className="mb-4 flex">
          <div className="flex items-center gap-4 text-2xl font-medium">
            {jobDetails.title}
            <JobStatusChip state={jobDetails.state} />
          </div>

          <div className="ml-auto flex gap-4">
            <Button
              target="_blank"
              href={`/${jobDetails.company.slug}/jobs/${jobDetails.slug}`}
              variant="secondary"
            >
              View Job Post
            </Button>
            <Button variant="secondary" href={`/admin/jobs/${params.id}`}>
              Edit Job
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-white px-6 py-8">
          <div className="inline-flex items-center gap-2">
            <Icon icon="calendar" className="w-5" /> Posted{' '}
            {format(jobDetails.createdAt, 'dd MMM yyyy')}
          </div>

          <div className="inline-flex items-center gap-2">
            <Icon icon="location" className="w-5" /> {jobDetails.location}
          </div>

          <div className="inline-flex items-center gap-2">
            <Icon icon="clock" className="w-5" /> 40 hrs/wk
          </div>

          <div className="inline-flex items-center gap-2">
            <Icon icon="case" className="w-5" />{' '}
            {formatEmploymentTypeLabel(jobDetails.employmentType)}
          </div>
        </div>
      </div>

      <JobCandidates />
    </div>
  );
}

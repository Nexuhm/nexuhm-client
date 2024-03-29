import { Icon } from '@/components/elements/icon';
import { JobCandidates } from './candidates';
import { client } from '@/base/services/clients/server-client';
import { format } from 'date-fns';
import { formatEmploymentTypeLabel } from '@/base/utils';
import JobActions from './job-actions';

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
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  });

  return (
    <div className="container max-w-7xl">
      <div className="mb-8">
        <JobActions job={jobDetails} />

        <div className="flex items-center justify-between p-6 card-container">
          <div className="inline-flex items-center gap-2">
            <Icon icon="calendar" className="w-5" /> Posted{' '}
            {format(jobDetails.createdAt, 'dd MMM yyyy')}
          </div>

          <div className="inline-flex items-center gap-2">
            <Icon icon="location" className="w-5" /> {jobDetails.location}
          </div>

          <div className="inline-flex items-center gap-2">
            <Icon icon="cash" className="w-5" />{' '}
            {formatter.formatRange(
              jobDetails.salary?.min,
              jobDetails.salary?.max,
            )}
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

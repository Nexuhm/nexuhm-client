import React from 'react';
import { client } from '@/base/services/clients/server-client';
import { formatEmploymentTypeLabel } from '@/base/utils';
import { JobApplicationForm } from '@/components/modules/job-application-form';

async function getData(jobSlug: string) {
  const jobDetails = await client.get(`/jobs/${jobSlug}`);

  return jobDetails;
}

export default async function JobApplicationPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const jobDetails = await getData(params.slug);

  return (
    <div className="py-20">
      <div className="mx-auto max-w-lg">
        <div className="mb-6">
          <div className="text-[40px] font-medium">{jobDetails.title}</div>
          <div className="">
            {formatEmploymentTypeLabel(jobDetails.employmentType)} •{' '}
            {jobDetails.location}
          </div>
        </div>

        <JobApplicationForm />
      </div>
    </div>
  );
}

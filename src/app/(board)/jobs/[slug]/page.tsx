import { client } from '@/base/services/clients/server-client';
import { JobPosting } from '@/base/types/jobs';
import { CompanyDetails } from '@/base/types/company';
import { JobPostingTemplate } from '@/components/modules/job-posting';

interface CompanyData {
  company?: CompanyDetails;
  jobDetails: JobPosting;
}

async function getData(jobSlug: string): Promise<CompanyData> {
  const jobDetails = await client.get(`/jobs/${jobSlug}`);
  const company = jobDetails?.isStealth
    ? null
    : await client.get(`/company/${jobDetails.company.slug}`);
    
  return {
    company,
    jobDetails,
  };
}

export default async function JobDetailsPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const data = await getData(params.slug);
  const { company, jobDetails } = data;

  return (
    <div className="container mx-auto max-w-5xl pt-16">
      <JobPostingTemplate job={jobDetails} company={company} />
    </div>
  );
}

import { client } from '@/base/services/clients/server-client';
import { JobPosting } from '@/base/types/jobs';
import { CompanyDetails } from '@/base/types/company';
import { JobPostingTemplate } from '@/components/modules/job-posting';

interface CompanyData {
  company: CompanyDetails;
  jobDetails: JobPosting;
}

async function getData(
  jobSlug: string,
  companySlug: string,
): Promise<CompanyData> {
  const [company, jobDetails] = await Promise.all([
    client.get(`/company/${companySlug}`),
    client.get(`/jobs/${jobSlug}`),
  ]);

  return {
    company,
    jobDetails,
  };
}

export default async function JobDetailsPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const data = await getData(params.slug, params.company);
  const { company, jobDetails } = data;

  return (
    <div className="container mx-auto max-w-5xl pt-16">
      <JobPostingTemplate job={jobDetails} company={company} />
    </div>
  );
}

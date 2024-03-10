import clsx from 'clsx';
import Image from 'next/image';
import { client } from '@/base/services/clients/server-client';
import { AnimatedSection } from '@/components/elements/animated-section';
import { Button } from '@/components/elements/button';
import { CareersPageProps } from '@/base/schemas/company';
import { JobPosting } from '@/base/types/jobs';
import { CompanyDetails } from '@/base/types/company';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { JobPostingCard } from '@/components/elements/job-posting-card';
import { FollowCompany } from '../follow-company';

interface CompanyData {
  company: CompanyDetails & { careersPage: CareersPageProps };
  jobPostings: JobPosting[];
}

async function getData(slug: string): Promise<CompanyData> {
  const [company, jobPostings] = await Promise.all([
    client.get(`/company/${slug}`),
    client.get(`/company/${slug}/openings`),
  ]);

  return {
    company,
    jobPostings,
  };
}

export default async function CompanyJobListingPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const slug = params.company;
  const data = await getData(slug);
  const { company } = data;

  return (
    <div className="container mx-auto max-w-7xl">
      <FollowCompany />

      <AnimatedSection
        threshold={0.6}
        className={clsx('transition-all  duration-1000 ease-in-out')}
        defaultClassName="translate-y-20 opacity-0"
        activeClassName="opacity-100 translate-y-0"
      >
        <div className="mb-10">
          <div className="text-medium mb-4 text-6xl">
            Careers at {company.name}
          </div>
          <div className="mb-4 max-w-xl">
            {company.careersPage.companyMission}
          </div>
          <Button>Contact</Button>
        </div>

        <div className="flex flex-col gap-6">
          {data.jobPostings.map((item, index) => (
            <JobPostingCard
              key={index}
              title={item.title}
              description={item.description}
              url={`/jobs/${item.slug}`}
            />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}

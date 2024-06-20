import clsx from 'clsx';
import { AnimatedSection } from '@/components/elements/animated-section';
import { Button } from '@/components/elements/button';
import { CareersPageProps } from '@/base/schemas/company';
import { JobPosting } from '@/base/types/jobs';
import { CompanyDetails } from '@/base/types/company';
import { JobPostingCard } from '@/components/elements/job-posting-card';
import { FollowCompany } from './follow-company';

export interface JobBoardTemplateProps {
  posts: JobPosting[];
  company?: CompanyDetails & { careersPage: CareersPageProps };
}

export async function JobBoardTemplate({
  company,
  posts,
}: JobBoardTemplateProps) {
  return (
    <div className="container mx-auto max-w-7xl">
      <FollowCompany links={company?.careersPage?.socialLinks} />

      <AnimatedSection
        threshold={0.6}
        className={clsx('transition-all  duration-1000 ease-in-out')}
        defaultClassName="translate-y-20 opacity-0"
        activeClassName="opacity-100 translate-y-0"
      >
        <div className="mb-10">
          <div className="text-medium mb-4 text-6xl">
            Careers at {company?.name || "Nexuhm"}
          </div>
          <div className="mb-4 max-w-6xl">
            {company?.careersPage.companyMission}
          </div>
          <Button>Contact</Button>
        </div>

        <div className="flex flex-col gap-6">
          {posts.map((item, index) => (
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

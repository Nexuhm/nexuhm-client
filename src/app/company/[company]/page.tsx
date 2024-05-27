import clsx from 'clsx';
import Image from 'next/image';
import { client } from '@/base/services/clients/server-client';
import { AnimatedSection } from '@/components/elements/animated-section';
import { Button } from '@/components/elements/button';
import { CareersPageProps } from '@/base/schemas/company';
import { JobPosting } from '@/base/types/jobs';
import { CompanyDetails } from '@/base/types/company';
import { JobPostingCard } from '@/components/elements/job-posting-card';
import { FollowCompany, SocialPlatform } from './follow-company';

interface CompanyData {
  company: CompanyDetails & { careersPage: CareersPageProps };
  jobPostings: JobPosting[];
}

async function getData(slug: string): Promise<CompanyData> {
  const [company, jobPostings] = await Promise.all([
    client.get(`/company/${slug}`),
    client.get(`/company/${slug}/openings?limit=4`),
  ]);

  return {
    company,
    jobPostings,
  };
}

export default async function CompanyCareersPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const slug = params.company;
  const data = await getData(slug);
  const { company } = data;

  return (
    <div className="container mx-auto max-w-7xl px-4 pb-20 sm:px-6 overflow-hidden">
      <FollowCompany links={company.careersPage.socialLinks} />

      <AnimatedSection
        threshold={0.3}
        className={clsx(
          'mx-auto max-w-3xl pb-6 pt-10 text-center',
          'transition-all  duration-1000 ease-in-out',
        )}
        defaultClassName="-translate-x-40 opacity-0"
        activeClassName="opacity-100 translate-x-0"
      >
        <div className="mb-4 text-6xl font-medium">
          {company.careersPage.title}
        </div>

        <p className="mb-4 text-xl">{company.careersPage.companyMission}</p>

        <div className="flex justify-center gap-4">
          <Button>Contact</Button>
          <Button
            href={'/jobs'}
            className="!border-content-primary !bg-content-primary hover:!bg-opacity-70"
          >
            Job Openings
          </Button>
        </div>
      </AnimatedSection>

      <AnimatedSection
        threshold={0.5}
        className={clsx('py-6', 'transition-all  duration-1000 ease-in-out')}
        defaultClassName="translate-y-20 opacity-0"
        activeClassName="opacity-100 translate-y-0"
      >
        <div className="flex gap-6">
          {company.careersPage.heroImages.map((image) => (
            <div className="relative h-[448px] w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                className="object-cover"
                src={image}
                alt=""
                fill
                priority
              />
            </div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection
        threshold={0.6}
        className={clsx('py-20', 'transition-all  duration-1000 ease-in-out')}
        defaultClassName="translate-x-40 opacity-0"
        activeClassName="opacity-100 translate-x-0"
      >
        <div className="grid grid-cols-1 items-center gap-20 md:grid-cols-2">
          <div>
            <div className="mb-4 text-3xl font-medium">Workplace & culture</div>
            <p className="text-xl">{company.careersPage.workplaceCulture}</p>
          </div>
          {company.careersPage.mediaGallery.length >= 1 && (
            <div className="p-4">
              <div className="relative h-[448px] w-full overflow-hidden rounded-3xl shadow-xl">
                <Image
                  className="object-cover"
                  src={company.careersPage.mediaGallery[0]}
                  alt=""
                  fill
                  priority
                />
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>

      <AnimatedSection
        threshold={0.6}
        className={clsx('py-20', 'transition-all  duration-1000 ease-in-out')}
        defaultClassName="-translate-x-40 opacity-0"
        activeClassName="opacity-100 translate-x-0"
      >
        <div className="mb-10 text-3xl font-medium">Company benefits</div>
        <div className="mb-10 text-[28px]">With us, you get</div>
        <div className="p-4">
          <ul className="list-disc columns-2 flex-col space-y-10 pl-8">
            {company.careersPage.companyBenefits
              .filter((i) => i.value)
              .map(({ value }, index) => (
                <li key={index} className="max-w-md">
                  {value}
                </li>
              ))}
          </ul>
        </div>
      </AnimatedSection>

      <AnimatedSection
        threshold={0.6}
        className={clsx('transition-all  duration-1000 ease-in-out')}
        defaultClassName="translate-y-20 opacity-0"
        activeClassName="opacity-100 translate-y-0"
      >
        <div className="text-medium mb-10 text-6xl">Open positions</div>

        <div className="flex flex-col gap-6">
          {data.jobPostings.map((item) => (
            <JobPostingCard
              key={item.slug}
              title={item.title}
              description={item.description}
              url={`/jobs/${item.slug}`}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a className="font-medium text-blue" href="/">
            See All
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
}

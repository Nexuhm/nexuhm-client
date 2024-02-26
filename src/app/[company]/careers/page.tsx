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

export default async function CareersPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const slug = params.company;
  const data = await getData(slug);
  const { company } = data;

  return (
    <div className="container mx-auto max-w-7xl pb-20 font-poppins">
      <div className="flex items-center justify-between">
        <div className="relative h-[50px] w-[150px]">
          <Image
            className="object-contain"
            src={data.company.logo}
            priority
            fill
            alt=""
          />
        </div>

        <div className="flex gap-4">
          <Button variant="secondary" className="!text-blue">
            Follow Company on{' '}
            <FontAwesomeIcon className="ml-2 w-4" icon={faTwitter} />
          </Button>

          <Button variant="secondary" className="!w-[40px] !px-0 !text-blue">
            <FontAwesomeIcon className="w-4" icon={faFacebook} />
          </Button>
        </div>
      </div>
      <AnimatedSection
        threshold={0.3}
        className={clsx(
          'mx-auto max-w-3xl pb-6 pt-20 text-center',
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
          <Button className="!bg-content-primary hover:!bg-opacity-70">
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
              title={item.title}
              description={item.description}
              url={`/${params.company}/jobs/${item.slug}`}
            />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}

interface JobPostingCardProps {
  title: string;
  description: string;
  url: string;
}

function JobPostingCard({ title, description, url }: JobPostingCardProps) {
  return (
    <div className="flex flex-col gap-4 border-b p-6">
      <div className="text-2xl font-bold">{title}</div>

      <div>{description}</div>

      <div className="flex items-center">
        <div className="flex gap-4">
          <div className="rounded-full border px-3 py-1.5">Remote</div>
          <div className="rounded-full border px-3 py-1.5">Full time</div>
        </div>

        <div className="ml-auto">
          <Button href={url} className="!rounded-full">
            View Jobs
          </Button>
        </div>
      </div>
    </div>
  );
}

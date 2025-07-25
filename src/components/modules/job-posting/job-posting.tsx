'use client';

import { JobPosting } from '@/base/types/jobs';
import { marked } from 'marked';
import { CompanyDetails } from '@/base/types/company';
import { Button } from '@/components/elements/button';
import styles from './job-posting.module.scss';
import { Sidebar } from './sidebar';
import { usePathname } from 'next/navigation';

interface JobPostingTemplateProps {
  job: JobPosting;
  company?: CompanyDetails;
}

export function JobPostingTemplate({ job, company }: JobPostingTemplateProps) {
  const {
    title,
    description,
    salary,
    location,
    employmentType,
    content,
    publishedAt,
    isStealth,
  } = job;
  const html = marked(content);
  const pathname = usePathname();

  return (
    <div>
      <div className="flex flex-col gap-6 px-4 md:flex-row md:gap-10 md:px-6">
        <div className="flex-1">
          <div className="mb-4 flex flex-col gap-6">
            <h1 className="text-5xl font-semibold">{title}</h1>
            <div className="text-lg">{description}</div>
          </div>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="hidden flex-col justify-between gap-4 py-4 md:flex md:flex-row">
            <Button variant="primary" href={`${pathname}/apply`}>
              Apply for this position
            </Button>
          </div>
        </div>

        <div className="flex-1 md:max-w-[280px]">
          <Sidebar
            salary={salary}
            location={location}
            employmentType={employmentType}
            company={isStealth ? undefined : company}
            publishedAt={publishedAt}
          />
        </div>
      </div>
    </div>
  );
}

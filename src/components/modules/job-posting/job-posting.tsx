import { JobPosting } from '@/base/types/jobs';
import { marked } from 'marked';
import { CompanyDetails } from '@/base/types/company';
import { Button } from '@/components/elements/button';
import styles from './job-posting.module.scss';
import { Sidebar } from './sidebar';

interface JobPostingTemplateProps {
  company: CompanyDetails;
  job: JobPosting;
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
  } = job;
  const html = marked(content);

  return (
    <div>
      <div className="flex flex-col gap-6 md:gap-10 md:flex-row md:px-6 px-4">
        <div className="flex-1">
          <div className="mb-4 flex flex-col gap-6">
            <h1 className="text-5xl font-semibold">{title}</h1>
            <div className="text-lg">{description}</div>
          </div>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="hidden md:flex gap-4 flex-col justify-between py-4 md:flex-row">
            <Button variant="primary">
              Apply for this position
            </Button>
            <Button variant="secondary">
              Learn more about us
            </Button>
          </div>
        </div>

        <div className="md:max-w-[280px] flex-1">
          <Sidebar
            salary={salary}
            location={location}
            employmentType={employmentType}
            company={company}
            publishedAt={publishedAt}
          />
        </div>
      </div>
    </div>
  );
}


'use client';

import { JobSchema } from '@/base/types/jobs';
import { Button } from '@/components/elements/button';
import { marked } from 'marked';
import styles from './job-posting.module.scss';

export function JobPostingTemplate({
  title,
  description,
  salary,
  employmentType,
  location,
  content,
}: JobSchema) {
  const html = marked(content);

  return (
    <div className="font-poppins mx-auto max-w-3xl py-10">
      <Heading
        title={title}
        location={location}
        salary={salary}
        description={description}
      />

      <Actions />

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <Actions />
    </div>
  );
}

interface HeadingProps {
  title: string;
  location: string;
  salary: JobSchema['salary'];
  description?: string;
}

function Heading({ title, location, salary, description }: HeadingProps) {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  });

  return (
    <div className="mb-6">
      <h1 className="text-[40px] font-bold">{title}</h1>
      <div className="mb-6 text-[28px] font-semibold leading-[36px]">
        <div>{location}</div>
        <div>
          {formatter.format(salary.min)}{' '}
          {salary?.max ? `- ${formatter.format(salary.max)}` : ''}
        </div>
      </div>

      <div className="text-xl font-semibold">{description}</div>
    </div>
  );
}

function Actions() {
  return (
    <div className="flex justify-between py-6">
      <Button>Apply for the position</Button>
      <Button variant="secondary">Learn more about us</Button>
    </div>
  );
}

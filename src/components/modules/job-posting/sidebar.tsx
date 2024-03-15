'use client';

import { JobSchema } from '@/base/types/jobs';
import { CompanyDetails } from '@/base/types/company';
import Image from 'next/image';
import { Button } from '@/components/elements/button';
import clsx from 'clsx';
import { formatEmploymentTypeLabel } from '@/base/utils';
import { format } from 'date-fns';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  company: CompanyDetails;
  location: string;
  employmentType: JobSchema['employmentType'];
  salary: JobSchema['salary'];
  publishedAt?: Date;
}

export function Sidebar({
  company,
  employmentType,
  location,
  salary,
  publishedAt,
}: SidebarProps) {
  const pathname = usePathname();

  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  });

  return (
    <div className="flex flex-col justify-between gap-4 rounded-lg border p-6 py-6 md:max-w-[280px]">
      <div className="flex flex-col gap-2">
        <div className="relative h-10 w-full">
          {company.logo && (
            <Image
              className="object-contain"
              src={company.logo}
              alt={company?.name}
              fill
            />
          )}
        </div>

        <div className="text-center text-2xl font-semibold">{company.name}</div>

        <a
          href=""
          className={clsx(
            'inline-block w-full rounded-lg border border-transparent hover:border-light-gray',
            'px-2 py-2 text-center font-inter font-semibold transition-all',
          )}
        >
          Learn more about us
        </a>

        <Button href={`${pathname}/apply`}>Apply for this position</Button>
      </div>

      <div className="border-t border-light-gray py-2"></div>

      <div>
        <div className="mb-2 text-sm text-content-primary">Job Type</div>
        <div className="font-medium">
          {formatEmploymentTypeLabel(employmentType)}
        </div>
      </div>

      <div>
        <div className="mb-2 text-sm text-content-primary">Location</div>
        <div className="font-medium">{location}</div>
      </div>

      <div>
        <div className="mb-2 text-sm text-content-primary">Salary</div>
        <div className="font-medium">
          {formatter.formatRange(salary.min, salary.max)}
        </div>
      </div>

      {publishedAt && (
        <div>
          <div className="mb-2 text-sm text-content-primary">Published At</div>
          <div className="font-medium">
            {format(publishedAt, 'MMM DD, YYYY')}
          </div>
        </div>
      )}
    </div>
  );
}

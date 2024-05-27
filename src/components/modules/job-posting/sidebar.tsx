'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { JobSchema } from '@/base/types/jobs';
import { CompanyDetails } from '@/base/types/company';
import { Button } from '@/components/elements/button';
import { formatCurrency, formatEmploymentTypeLabel } from '@/base/utils';
import { format } from 'date-fns';
import { usePathname } from 'next/navigation';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share';
import {
  faFacebook,
  faFacebookF,
  faLinkedinIn,
  faTwitch,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { faX } from '@fortawesome/free-solid-svg-icons';

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
          {formatCurrency(salary.min, salary?.max, salary?.currency)}
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

      <div className="border-t border-light-gray"></div>

      <div className='text-center'>
        <div className="mb-2 text-sm font-medium">Share this opportunity:</div>
        <div className="flex gap-2 justify-center">
          <FacebookShareButton
            url={pathname}
            className="rounded-md border border-blue px-2 py-1 text-xs text-blue"
            resetButtonStyle={false}
          >
            <FontAwesomeIcon className="w-4" icon={faFacebookF} />
          </FacebookShareButton>

          <TwitterShareButton
            url={pathname}
            className="rounded-md border border-blue px-2 py-1 text-blue"
            resetButtonStyle={false}
          >
            <FontAwesomeIcon className="w-4" icon={faXTwitter} />
          </TwitterShareButton>

          <LinkedinShareButton
            url={pathname}
            className="rounded-md border border-blue px-2 py-1 text-blue"
            resetButtonStyle={false}
          >
            <FontAwesomeIcon className="w-4" icon={faLinkedinIn} />
          </LinkedinShareButton>
        </div>
      </div>
    </div>
  );
}

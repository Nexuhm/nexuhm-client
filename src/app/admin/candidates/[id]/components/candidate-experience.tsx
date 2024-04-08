'use client';

import { client } from '@/base/services/clients/browser-client';
import { Button } from '@/components/elements/button';
import { Spinner } from '@/components/elements/spinner';
import { isValid, format } from 'date-fns';
import Markdown from 'markdown-to-jsx';
import useSWR from 'swr';

interface CandidatesExperienceData {
  experiences: ExperienceCardProps[];
  resume: string;
}

export function CandidatesExperience({ candidateId }: { candidateId: string }) {
  const { data, isLoading } = useSWR(
    `/admin/candidates/${candidateId}/experiences`,
    (url) => client.get<CandidatesExperienceData>(url),
  );

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center text-xl font-semibold">
          Experience
        </div>

        <Button
          href={data?.resume}
          target="_blank"
          variant="secondary"
          className="inline-flex items-center"
        >
          Download CV
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-[75px] items-center justify-center">
          <Spinner size={50} />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data?.experiences?.map((item) => <ExperienceCard {...item} />)}
        </div>
      )}
    </div>
  );
}

interface ExperienceCardProps {
  jobPosition: string;
  organization: string;
  summary: string;
  startDate: string;
  endDate: string;
}

export function ExperienceCard({
  jobPosition,
  summary,
  organization,
  startDate,
  endDate,
}: ExperienceCardProps) {
  const formatDate = (date: string) => {
    return format(new Date(date),  "MMM yyyy");
  };
  return (
    <div className="py-4">
      <div className="mb-4 flex items-center justify-between gap-8">
        <div className="text-base font-semibold">
          {organization} - {jobPosition}
        </div>
        <div className="text-xs italic text-content-tertiary flex-shrink-0">
          {formatDate(startDate)} -{' '}
          {isValid(endDate) ? formatDate(endDate) : 'Present'}
        </div>
      </div>

      <div className="prose text-sm prose-li:marker:text-content-primary">
        <Markdown>{summary || ''}</Markdown>
      </div>
    </div>
  );
}

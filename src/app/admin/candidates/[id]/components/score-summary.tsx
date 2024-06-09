'use client';

import { client } from '@/base/services/clients/browser-client';
import { ApplicationProcessingState } from '@/base/types/candidates';
import { Icon } from '@/components/elements/icon';
import { Rating } from '@/components/elements/rating/rating';
import { Spinner } from '@/components/elements/spinner';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';
import { marked } from 'marked';
import useSWR from 'swr';

interface ScoreSummaryData {
  score: number;
  description: string;
  cultureScore: number;
  skillScore: number;
  skillSummary: string;
  cultureSummary: string;
  processingState: ApplicationProcessingState;
}

export function ScoreSummary({ candidateId }: { candidateId: string }) {
  const { data, isLoading } = useSWR(
    `/admin/candidates/${candidateId}/score`,
    (url) => client.get<ScoreSummaryData>(url),
  );

  if (isLoading) {
    return (
      <div className="mb-6 flex h-[180px] items-center justify-center rounded-lg bg-white">
        <Spinner size={50} />
      </div>
    );
  }

  if (data?.processingState !== ApplicationProcessingState.Completed) {
    return (
      <div className="mx-auto mb-6 h-[180px] rounded-lg bg-white p-5">
        <div className="mx-auto max-w-lg text-center">
          <div
            className={clsx(
              'mb-3 inline-flex items-center justify-center',
              'rounded-full bg-blue bg-opacity-20 p-2',
            )}
          >
            <Icon icon="clock" className="h-10 w-10 text-blue" />
          </div>

          <div className="text-center text-content-secondary">
            Currently processing candidate's resume, cover letter, and video
            resume. Please wait for the analysis to complete.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-lg bg-white p-4">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-5">
          <span className="text-xl font-medium">Candidate score</span>
          <Rating rate={data?.score} />
        </div>

        <Markdown className="text-content-secondary prose [&>p]:mb-4">
          {data?.description || 'N/A'}
        </Markdown>
      </div>
      <div className="flex flex-col gap-5">
        <Accordion
          label={`Culture Score ${data?.cultureScore || 0}/10`}
          content={data?.cultureSummary}
        />

        <Accordion
          label={`Skill Score ${data?.skillScore}/10`}
          content={data?.skillSummary}
        />
      </div>
    </div>
  );
}

function Accordion({ label, content }: { label: string; content: string }) {
  const html = content ? marked(content) : '';

  return (
    <Disclosure as="div" defaultOpen>
      {({ open }) => (
        <>
          <Disclosure.Button className="mb-2 flex w-full items-center justify-between">
            <div className="font-medium">{label}</div>
            <Icon
              icon="chevron-down"
              className={clsx(
                'w-6 text-content-secondary transition-all',
                open && 'rotate-180',
              )}
            />
          </Disclosure.Button>

          <Disclosure.Panel className="text-content-secondary">
            <div
              dangerouslySetInnerHTML={{ __html: html }}
              className="[&>p]:mb-4"
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

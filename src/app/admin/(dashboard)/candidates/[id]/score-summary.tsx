'use client';

import { Icon } from '@/components/elements/icon';
import { Rating } from '@/components/elements/rating/rating';
import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';

interface ScoreSummaryProps {
  score: number;
  description: string;
  cultureScore: number;
  skillScore: number;
  skillSummary: string;
  cultureSummary: string;
}

export function ScoreSummary({
  score,
  description,
  cultureScore,
  skillScore,
  cultureSummary,
  skillSummary,
}: ScoreSummaryProps) {
  return (
    <div className="mb-6 rounded-lg bg-white p-4">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-5">
          <span className="text-xl font-medium">Candidate score</span>
          <Rating rate={score} />
        </div>

        <div className="text-content-secondary">{description}</div>
      </div>

      <div className="flex flex-col gap-5">
        <Accordion
          label={`Culture Score ${cultureScore}/10`}
          content={cultureSummary}
        />

        <Accordion
          label={`Skill Score ${skillScore}/10`}
          content={skillSummary}
        />
      </div>
    </div>
  );
}

function Accordion({ label, content }: { label: string; content: string }) {
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
            {content}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

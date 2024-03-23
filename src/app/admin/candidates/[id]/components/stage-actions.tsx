'use client';

import useSWR from 'swr';
import { RecruitmentStage } from '@/base/types/candidates';
import { CandidateStatus } from '@/components/modules/candidate-status';
import { InterviewBookAction } from './actions/interview-booking-action';
import { client } from '@/base/services/clients/browser-client';
import { SubmitFeedbackAction } from './actions/submit-feedback-action';
import { OfferFeedbackAction } from './actions/offer-action';
import { ConfirmHireAction } from './actions/confirm-hire';

interface StageActionsProps {
  candidateId: string;
}

export function StageActions({ candidateId }: StageActionsProps) {
  const { data, mutate } = useSWR(
    `/admin/candidates/${candidateId}/stage`,
    (url) => client.get(url),
  );

  const stages = [
    'applied',
    'interview',
    'awaiting',
    'offer',
    'hired',
    'rejected',
  ] as const;

  const renderAction = () => {
    const lastStage: RecruitmentStage = data?.at(-1).stage;

    switch (lastStage) {
      case 'offer':
        return (
          <ConfirmHireAction candidateId={candidateId} onComplete={mutate} />
        );
      case 'interview':
        return (
          <SubmitFeedbackAction candidateId={candidateId} onComplete={mutate} />
        );
      case 'awaiting':
        return (
          <OfferFeedbackAction candidateId={candidateId} onComplete={mutate} />
        );
      case 'hired':
      case 'rejected':
        return null;
      case 'applied':
      default:
        return (
          <InterviewBookAction candidateId={candidateId} onComplete={mutate} />
        );
    }
  };

  const activeStage = stages[data?.length];

  return (
    <div className="mb-6 rounded-lg bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xl font-medium">Stage</span>
        {renderAction()}
      </div>

      <div className="flex gap-6">
        {stages.map((stage) => {
          const candidateStageIndex = data?.findIndex(
            (i: any) => i.stage === stage,
          );
          const candidateStage = data?.[candidateStageIndex];
          const passed = !!candidateStage?.createdAt;

          if (stage === 'rejected' && candidateStage?.createdAt == null) {
            return null;
          }

          return (
            <CandidateStatus
              key={stage}
              status={stage}
              passed={passed}
              disabled={stage !== activeStage && !passed}
              date={
                candidateStage ? new Date(candidateStage.createdAt) : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}

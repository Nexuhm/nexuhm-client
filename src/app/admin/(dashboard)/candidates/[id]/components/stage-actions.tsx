'use client';

import { RecruitmentStage } from '@/base/types/candidates';
import { CandidateStatus } from '@/components/modules/candidate-status';
import { InterviewBookAction } from './acations/interview-booking-action';
import useSWR from 'swr';
import { client } from '@/base/services/clients/browser-client';
import { SubmitFeedbackAction } from './acations/submit-feedback-action';
import { OfferFeedbackAction } from './acations/offer-action';
import { ConfirmHireAction } from './acations/confirm-hire';

interface StageActionsProps {
  candidateId: string;
}

export function StageActions({ candidateId }: StageActionsProps) {
  const { data } = useSWR(`/admin/candidates/${candidateId}/stage`, (url) =>
    client.get(url),
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
        return <ConfirmHireAction candidateId={candidateId} />;
      case 'interview':
        return <SubmitFeedbackAction candidateId={candidateId} />;
      case 'awaiting':
        return <OfferFeedbackAction candidateId={candidateId} />;
      case 'hired':
      case 'rejected':
        return null;
      case 'applied':
      default:
        return <InterviewBookAction candidateId={candidateId} />;
    }
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xl font-medium">Stage</span>
        {renderAction()}
      </div>

      <div className="flex gap-6">
        {stages.map((stage, index) => {
          const candidateStageIndex = data?.findIndex(
            (i: any) => i.stage === stage,
          );
          const candidateStage = data?.[candidateStageIndex];

          if (stage === 'rejected' && candidateStage?.createdAt == null) {
            return null;
          }

          return (
            <CandidateStatus
              status={stage}
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

'use client';

import { client } from '@/base/services/clients/browser-client';
import { RecruitmentStage } from '@/base/types/candidates';
import { Button } from '@/components/elements/button';
import { CandidateStatus } from '@/components/modules/candidate-status';

interface StageActionsProps {
  candidateId: string;
  stage?: RecruitmentStage;
}

export function StageActions({ candidateId, stage }: StageActionsProps) {
  const handleBook = async () => {
    const res = await client.post(`/admin/candidates/${candidateId}/schedule`);
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xl font-medium">Stage</span>

        {stage !== 'rejected' && (
          <div className="flex gap-5">
            <Button onClick={handleBook}>Book Interview</Button>
          </div>
        )}
      </div>

      <div className="flex gap-6">
        <CandidateStatus status="applied" date={new Date()} />
        <CandidateStatus status="interview" date={new Date()} />
        <CandidateStatus status="awaiting" />
        <CandidateStatus status="offer" />
        <CandidateStatus status="hired" />
        {stage === 'rejected' && (
          <CandidateStatus status="rejected" date={new Date()} />
        )}
      </div>
    </div>
  );
}

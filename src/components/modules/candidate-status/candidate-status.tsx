import { RecruitmentStage } from '@/base/types/candidates';
import { CandidateStatusChip } from '@/components/elements/candidate-status-chip';

import clsx from 'clsx';
import { format } from 'date-fns';

interface CandidateStatusProps {
  status: RecruitmentStage;
  date?: Date;
  active?: boolean;
}

export function CandidateStatus({
  date,
  active,
  status,
}: CandidateStatusProps) {
  return (
    <div>
      <CandidateStatusChip
        state={status}
        passed={!!date}
        className={clsx(
          !active && '!bg-surface-secondary !text-content-tertiary',
        )}
      />
      <div className="mt-3 text-xs text-content-tertiary">
        {date ? format(date, 'MMMM dd, yyyy') : '-'}
      </div>
    </div>
  );
}

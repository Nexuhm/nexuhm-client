import { RecruitmentStage } from '@/base/types/candidates';
import { CandidateStatusChip } from '@/components/elements/candidate-status-chip';

import clsx from 'clsx';
import { format } from 'date-fns';

interface CandidateStatusProps {
  status: RecruitmentStage;
  date?: Date;
}

export function CandidateStatus({ date, status }: CandidateStatusProps) {
  return (
    <div>
      <CandidateStatusChip
        state={status}
        passed={!!date}
        className={clsx(
          !date && '!bg-surface-secondary !text-content-tertiary',
        )}
      />
      <div className="mt-3 text-xs text-content-tertiary">
        {date ? format(date, 'MMMM dd, yyyy') : '-'}
      </div>
    </div>
  );
}

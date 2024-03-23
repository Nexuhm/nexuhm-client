import { RecruitmentStage } from '@/base/types/candidates';
import { CandidateStatusChip } from '@/components/elements/candidate-status-chip';
import { format } from 'date-fns';

interface CandidateStatusProps {
  status: RecruitmentStage;
  date?: Date;
  passed?: boolean;
  disabled?: boolean;
}

export function CandidateStatus({
  date,
  passed,
  disabled,
  status,
}: CandidateStatusProps) {
  return (
    <div>
      <CandidateStatusChip
        state={status}
        passed={passed}
        disabled={disabled}
      />
      <div className="mt-3 text-xs text-content-tertiary">
        {date ? format(date, 'MMMM dd, yyyy') : '-'}
      </div>
    </div>
  );
}

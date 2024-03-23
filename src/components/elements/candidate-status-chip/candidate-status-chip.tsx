import { RecruitmentStage } from '@/base/types/candidates';
import styles from './candidate-status-chip.module.scss';
import clsx from 'clsx';

interface CandidateStatusChipProps {
  state: RecruitmentStage;
  passed?: boolean;
  disabled?: boolean,
  className?: string;
}

export function CandidateStatusChip({
  state,
  passed,
  disabled,
  className,
}: CandidateStatusChipProps) {
  const labels: Record<RecruitmentStage, string> = {
    applied: 'Applied',
    awaiting: 'Awaiting Feedback',
    hired: 'Hired',
    interview: 'Intreview',
    offer: 'Offer',
    rejected: 'Rejected',
  };

  return (
    <span
      className={clsx(className, styles[state], styles.chip)}
      data-passed={passed}
      data-disabled={disabled}
    >
      {labels[state]}
    </span>
  );
}

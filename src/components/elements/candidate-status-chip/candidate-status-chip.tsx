import { ApplicationStatus } from '@/base/types/candidates';
import styles from './candidate-status-chip.module.scss';
import clsx from 'clsx';

interface CandidateStatusChipProps {
  state: ApplicationStatus;
  className?: string;
}

export function CandidateStatusChip({
  state,
  className,
}: CandidateStatusChipProps) {
  const labels: Record<ApplicationStatus, string> = {
    applied: 'Applied',
    awaiting: 'Awaiting Feedback',
    hired: 'Hired',
    interview: 'Intreview',
    offer: 'Offer',
    rejected: 'Rejected',
  };

  return (
    <span className={clsx(className, styles[state], styles.chip)}>
      {labels[state]}
    </span>
  );
}

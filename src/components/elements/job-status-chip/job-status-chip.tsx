import { JobState } from '@/base/types/jobs';
import styles from './job-status-chip.module.scss';

export function JobStatusChip({ state }: { state: JobState }) {
  const stateLabels: Record<JobState, string> = {
    draft: 'Draft',
    published: 'Published',
    filled: 'Role Filled',
  };

  return (
    <span className={styles.status} data-status={state}>
      {stateLabels[state]}
    </span>
  );
}

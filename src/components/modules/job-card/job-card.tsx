import { EmploymentType } from '@/base/types/jobs';
import styles from './job-card.module.scss';
import Link from 'next/link';
import { JobStatusChip } from '@/components/elements/job-status-chip/job-status-chip';
import { formatEmploymentTypeLabel } from '@/base/utils';

type JobState = 'draft' | 'published' | 'filled';

export interface JobCardProps {
  _id: string;
  title: string;
  location: string;
  employmentType: EmploymentType;
  totalCandidates?: number;
  newCandidates?: number;
  state: JobState;
}

export function JobCard({
  _id,
  title,
  location,
  employmentType,
  totalCandidates,
  newCandidates,
  state,
}: JobCardProps) {
  return (
    <Link
      href={`/admin/jobs/${_id}`}
      className="flex flex-col rounded-lg bg-white p-6 shadow-sm"
    >
      <div className="mb-2 flex gap-2">
        <div className={styles.tag}>
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className={styles.tag}>
          {formatEmploymentTypeLabel(employmentType)}
        </div>
      </div>

      <div className={styles.title}>{title}</div>

      <div className="mb-4 mt-auto">
        <div className="mb-1 text-content-tertiary">Candidates</div>
        <div className="flex">
          <span className={styles.candidates}>{totalCandidates || 0}</span>
          {!!newCandidates && (
            <span className={styles.newCandidates}>
              {newCandidates || 0} new
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <JobStatusChip state={state} />

        <div className="text-blue">See details {'>'}</div>
      </div>
    </Link>
  );
}

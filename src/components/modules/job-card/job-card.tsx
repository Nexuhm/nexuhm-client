import { EmploymentType } from '@/base/types/jobs';
import styles from './job-card.module.scss';

type JobState = 'draft' | 'published' | 'filled';

export interface JobCardProps {
  title: string;
  location: string;
  employmentType: EmploymentType;
  totalCandidates?: number;
  newCandidates?: number;
  state: JobState;
}

function formatEmploymentTypeLabel(type: EmploymentType): string {
  const labelMap = {
    'full-time-employment': 'Full Time',
    'part-time-employment': 'Part Time',
    freelance: 'Freelance',
    contractual: 'Contractual',
    'temporary-employment': 'Temporary',
    internship: 'Internship',
    'volunteer-work': 'Volunteer',
    'seasonal-work': 'Seasonal',
  };

  return labelMap[type];
}

export function JobCard({
  title,
  location,
  employmentType,
  totalCandidates,
  newCandidates,
  state,
}: JobCardProps) {
  const stateLabels: Record<JobState, string> = {
    draft: 'Draft',
    published: 'Published',
    filled: 'Role Filled',
  };

  return (
    <div className="rounded-lg bg-white p-6">
      <div>
        <div className="mb-2 flex gap-2">
          <span className={styles.tag}>{location}</span>

          <span className={styles.tag}>
            {formatEmploymentTypeLabel(employmentType)}
          </span>
        </div>

        <div className={styles.title}>{title}</div>

        <div className="mb-4">
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
          <div className={styles.status} data-status={state}>
            {stateLabels[state]}
          </div>
          <a href="" className="text-sm text-blue">
            See details
          </a>
        </div>
      </div>
    </div>
  );
}

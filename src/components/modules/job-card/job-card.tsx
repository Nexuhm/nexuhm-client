import styles from './job-card.module.scss';

type JobStatus = 'draft' | 'published' | 'role-filled';

export interface JobCardProps {
  title: string;
  tags: string[];
  candidates: {
    total: number;
    new: number;
  };
  status: JobStatus;
}

export function JobCard({ title, tags, candidates, status }: JobCardProps) {
  const statusLabels: Record<JobStatus, string> = {
    draft: 'Draft',
    published: 'Published',
    'role-filled': ' Role Filled',
  };

  return (
    <div className="rounded-lg bg-white p-6">
      <div>
        <div className="mb-2 flex gap-2">
          {tags.map((tag) => (
            <span className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.title}>{title}</div>

        <div className="mb-4">
          <div className="text-content-tertiary mb-1">Candidates</div>
          <div className="flex">
            <span className={styles.candidates}>{candidates.total}</span>
            {candidates.new > 0 && (
              <span className={styles.newCandidates}>{candidates.new} new</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className={styles.status} data-status={status}>
            {statusLabels[status]}
          </div>
          <a href="" className="text-sm text-blue">
            See details
          </a>
        </div>
      </div>
    </div>
  );
}

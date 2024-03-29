import { JobPostingTemplate } from '../job-posting';
import { JobSchema } from '@/base/types/jobs';
import { useCompanyContext } from '@/base/contexts/company/company-context';

export function JobPreview({ data }: { data: JobSchema }) {
  const { company } = useCompanyContext();

  return (
    <div className="max-w-6xl p-10 card-container">
      <JobPostingTemplate job={data} company={company!} />
    </div>
  );
}

import { Button } from '@/components/elements/button';
import { JobPostingTemplate } from '../job-posting';
import { JobSchema } from '@/base/types/jobs';
import { Icon } from '@/components/elements/icon';
import { Spinner } from '@/components/elements/spinner';
import { useCompanyContext } from '@/base/contexts/company/company-context';

export function JobPreview({
  data,
  loading,
  onSave,
}: {
  loading?: boolean;
  data: JobSchema;
  onSave: () => void;
}) {
  const { company } = useCompanyContext();

  return (
    <div className="max-w-6xl p-10 card-container">
      <JobPostingTemplate job={data} company={company!} />

      <div>
        <div className="flex justify-end gap-2">
          <Button variant="secondary">Cancel</Button>
          <Button variant="secondary">
            <Icon icon="edit" className="2-5 h-5" />
            Preivew
          </Button>
          <Button disabled={loading} onClick={onSave}>
            {loading ? (
              <Spinner color="white" size={15} className="mr-2" />
            ) : (
              <Icon icon="check" className="mr-1 h-5 w-5" />
            )}
            Safe draft
          </Button>
        </div>
      </div>
    </div>
  );
}

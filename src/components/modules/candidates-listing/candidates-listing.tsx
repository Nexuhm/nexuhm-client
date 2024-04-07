import { RecruitmentStage } from '@/base/types/candidates';
import { Input, Select } from '@/components/elements/input';
import { Spinner } from '@/components/elements/spinner';
import { CandidatesTable } from '@/components/modules/candidates-table';
import { inflect } from 'inflection';
import { useState } from 'react';

export function CandidateListing({
  candidates,
  loading,
}: {
  candidates: any[];
  loading?: boolean;
}) {
  const [filterState, setFilterState] = useState<RecruitmentStage | null>(null);

  const filteredData = candidates?.filter((item) => {
    if (!filterState) {
      return true;
    }

    return item.stage === filterState;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <Spinner color="#006EDF" />{' '}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex">
        <div className="text-2xl font-medium">
          {candidates.length} {inflect('Candidate', candidates.length)}
        </div>

        <div className="ml-auto flex gap-4">
          <Input
            icon="search"
            placeholder="Search by name"
            containerClassName="w-[300px] bg-white"
          />

          <Select
            placeholder="All Stages"
            className="min-w-[175px]"
            value={filterState}
            onChange={setFilterState}
            options={[
              {
                value: null,
                label: 'All Stages',
              },
              {
                value: 'applied',
                label: 'Applied',
              },
              {
                value: 'interview',
                label: 'Interview',
              },
              {
                value: 'awaiting',
                label: 'Awaiting Feedback',
              },
              {
                value: 'offer',
                label: 'Offer',
              },
              {
                value: 'hired',
                label: 'Hired',
              },
              {
                value: 'rejected',
                label: 'Rejected',
              },
            ]}
          />
        </div>
      </div>

      <div>
        <div>
          {filteredData.length === 0 ? (
            <div className="mx-auto mt-20 max-w-md text-balance text-center">
              <div className="mb-4 text-2xl font-medium">No Candidtaes</div>

              <div className="text-content-secondary">
                Here you’ll find candidates that apply to this job. Share this
                job url to promote it and start receiving applications.
              </div>
            </div>
          ) : (
            <CandidatesTable
              data={filteredData?.map((candidate: any) => ({
                id: candidate._id,
                name: `${candidate.firstname} ${candidate.lastname}`,
                score: candidate.score,
                stage: candidate.stage,
                appliedDate: candidate.createdAt,
                jobApplied: candidate.job.title,
                note: candidate.lastNote?.note,
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}

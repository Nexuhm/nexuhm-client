import { client } from '@/base/services/clients/server-client';
import { Candidate } from '@/base/types/candidates';
import { notFound } from 'next/navigation';
import { CandidateHeadline } from './components/candidate-headline';
import { StageActions } from './components/stage-actions';
import { ScoreSummary } from './components/score-summary';
import { CandidateNotes } from './components/candidate-notes';
import { CandidatesExperience } from './components/candidate-experience';
import { BackLink } from '@/components/elements/back-link/back-link';

async function getData(id: string): Promise<Candidate | null> {
  try {
    const data: Candidate = await client.get(`/admin/candidates/${id}`);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default async function CandidateDetailsPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const data = await getData(params.id);

  if (!data) {
    notFound();
  }

  return (
    <div className="container max-w-7xl">
      <BackLink className="mb-10" href={`/admin/jobs/${data.job}`}>
        All Candidates
      </BackLink>

      <CandidateHeadline
        candidateId={data.id}
        firstname={data.firstname}
        lastname={data.lastname}
        email={data.email}
        phone={data.phone}
        profession={data.profession}
        stage={data.stage}
      />

      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <StageActions candidateId={data.id} />
        </div>

        <div className="col-span-2">
          <ScoreSummary candidateId={data.id} />
        </div>

        <div>
          <CandidatesExperience candidateId={data.id} />
        </div>

        <div>
          <CandidateNotes candidateId={data.id} />
        </div>
      </div>
    </div>
  );
}

import { client } from '@/base/services/clients/server-client';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Candidate } from '@/base/types/candidates';
import { notFound } from 'next/navigation';
import { CandidateHeadline } from './candidate-headline';
import { StageActions } from './stage-actions';
import { ScoreSummary } from './score-summary';
import { CandidateNotes } from './candidate-notes';
import { CandidatesExperience } from './candidate-experience';
import Link from 'next/link';

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
      <div className="mb-10">
        <Link
          href={`/admin/jobs/${data.job}`}
          className="inline-flex items-center gap-4 text-sm font-semibold"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-3" />
          All Candidates
        </Link>
      </div>

      <CandidateHeadline
        candidateId={data.id}
        firstname={data.firstname}
        lastname={data.lastname}
        email={data.email}
        phone={data.phone}
        profession={data.profession}
        stage={data.stage}
      />

      <StageActions stage={data.stage} candidateId={data.id} />

      <ScoreSummary
        score={5}
        cultureScore={9}
        skillScore={10}
        description="The candidate's skills and cultural alignment make them a strong candidate for the role of Strategy Director - Performance Marketing. Their experience in scaling high-impact teams and driving international growth through paid acquisition channels can be an asset to the agency."
        cultureSummary="The candidate has demonstrated a commitment to diversity and inclusivity, nurturing respectful and transparent work environments. They also show a passion for emerging technologies and trends in advertising and marketing, which aligns well with the agency's values."
        skillSummary="The candidate has expertise in CRM and market strategy, performance analytics, and multi-channel marketing, which are all important skills for this role. Additionally, they have experience in leveraging data-driven insights to identify and execute high-impact campaigns, which is a key responsibility of this role."
      />

      <div className="grid grid-cols-2 gap-6">
        <div>
          <CandidatesExperience />
        </div>

        <div>
          <CandidateNotes />
        </div>
      </div>
    </div>
  );
}

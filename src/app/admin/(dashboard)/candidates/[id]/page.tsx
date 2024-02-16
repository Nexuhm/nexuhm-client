import { ApplicationStatus } from '@/base/types/candidates';
import { Button, IconButton } from '@/components/elements/button';
import { CandidateStatusChip } from '@/components/elements/candidate-status-chip/candidate-status-chip';
import { Rating } from '@/components/elements/rating/rating';
import {
  faChevronLeft,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { format } from 'date-fns';
import Link from 'next/link';

export default function CandidateDetailsPage() {
  return (
    <div className="container">
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-4 text-sm font-semibold"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-3" />
          All Candidates
        </Link>
      </div>

      <CandidateHeadline />

      <div className="mb-6 rounded-lg bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xl font-medium">Stage</span>

          <div className="flex gap-5">
            <Button variant="tertiary">Book interview</Button>
            <Button>Move to next step</Button>
          </div>
        </div>

        <div className="flex gap-6">
          <CandidateStatus status="applied" date={new Date()} />
          <CandidateStatus status="interview" date={new Date()} />
          <CandidateStatus status="awaiting" />
          <CandidateStatus status="offer" />
          <CandidateStatus status="hired" />
        </div>
      </div>

      <div className="rounded-lg bg-white p-4">
        <div className="mb-2 flex items-center gap-5">
          <span className="text-xl font-medium">Candidate score</span>
          <Rating rate={3} />
        </div>

        <div>
          The candidate's skills and cultural alignment make them a strong
          candidate for the role of Strategy Director - Performance Marketing.
          Their experience in scaling high-impact teams and driving
          international growth through paid acquisition channels can be an asset
          to the agency.
        </div>
      </div>
    </div>
  );
}

function CandidateHeadline() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <div className="mb-1 text-2xl">Malaika Brown</div>
        <div className="flex items-center gap-2 text-sm text-content-tertiary">
          <span>Sr. UX Designer</span>
          <span className="text-xl">•</span>
          <a href="" className="inline-flex items-center gap-1">
            <FontAwesomeIcon icon={faPhone} className="w-4" />
            (44) 7123 456780
          </a>
          <span className="text-xl">•</span>
          <a href="" className="inline-flex items-center gap-1">
            <FontAwesomeIcon icon={faEnvelope} className="w-4" />
            malaika.br@gmail.com
          </a>
        </div>
      </div>

      <div className="flex gap-4">
        <IconButton icon="envelope" variant="secondary" />
        <IconButton icon="vertical-dots" variant="secondary" />
      </div>
    </div>
  );
}

interface CandidateStatusProps {
  status: ApplicationStatus;
  date?: Date;
}

function CandidateStatus({ date, status }: CandidateStatusProps) {
  return (
    <div>
      <CandidateStatusChip
        state={status}
        className={clsx(
          !date && '!bg-surface-secondary !text-content-tertiary',
        )}
      />
      <div className="mt-3 text-xs text-content-tertiary">
        {date ? format(date, 'MMMM dd, yyyy') : '-'}
      </div>
    </div>
  );
}

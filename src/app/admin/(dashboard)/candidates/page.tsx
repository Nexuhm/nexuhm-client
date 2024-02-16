'use client';

import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { Input } from '@/components/elements/input';
import {
  CandidatesTable,
  JobCandidate,
} from '@/components/modules/candidates-table';

const candidates: JobCandidate[] = [
  {
    name: 'John Doe',
    rating: 5,
    stage: 'applied',
    jobApplied: 'Junior UI Designer',
    appliedDate: new Date('2023/03/15'),
    note: 'Set a note',
  },
  {
    name: 'Mathilda Bell',
    rating: 4,
    stage: 'interview',
    jobApplied: 'Job A',
    appliedDate: new Date('2023/03/15'),
    note: 'Set a note',
  },
  {
    name: 'Lee Barrett',
    rating: 3,
    stage: 'interview',
    jobApplied: 'Job B',
    appliedDate: new Date('2023/03/15'),
    note: 'Lee applied for the senior engineer role...',
  },
  {
    name: 'Marion Figueroa',
    rating: 5,
    stage: 'offer',
    jobApplied: 'UX Resercher',
    appliedDate: new Date('2023/03/14'),
    note: 'Set a note',
  },
  {
    name: 'Joseph Brooks',
    rating: 5,
    stage: 'hired',
    jobApplied: 'Junior UI Designer',
    appliedDate: new Date('2023/03/15'),
    note: 'Set a note',
  },
  {
    name: 'John Doe',
    rating: 5,
    stage: 'awaiting',
    jobApplied: 'Junior UI Designer',
    appliedDate: new Date('2023/03/15'),
    note: 'Set a note',
  },
  {
    name: 'Mathilda Bell',
    rating: 4,
    stage: 'applied',
    jobApplied: 'Junior UI Designer',
    appliedDate: new Date('2023/03/15'),
    note: 'Set a note',
  },
  {
    name: 'Lee Barrett',
    rating: 3,
    stage: 'rejected',
    jobApplied: 'Junior UI Designer',
    appliedDate: new Date('2023/03/15'),
    note: 'Set a note',
  },
  {
    name: 'Marion Figueroa',
    rating: 5,
    stage: 'applied',
    jobApplied: 'Junior UI Designer',
    appliedDate: new Date('2023/03/15'),
    note: 'Set a note',
  },
  {
    name: 'Joseph Brooks',
    rating: 5,
    stage: 'applied',
    jobApplied: 'Junior UI Designer',
    appliedDate: new Date('2023/03/15'),
    note: 'Set a note',
  },
];

export default function JobDetailsPage() {
  return (
    <div>
      <div className="mb-4 flex">
        <div className="text-2xl font-medium">
          {candidates.length} Candidates
        </div>

        <div className="ml-auto flex gap-4">
          <Input
            icon="search"
            placeholder="Search by name"
            className="w-[300px] bg-white"
          />

          <Button variant="secondary">
            <Icon icon="filter" className="mr-2 w-5" />
            Filter
          </Button>

          <Button href="/admin/candidate/create">
            <Icon icon="plus" className="mr-2 w-5" />
            Add candidate
          </Button>
        </div>
      </div>

      <div>
        <div>
          <CandidatesTable data={candidates} />
        </div>
      </div>
    </div>
  );
}

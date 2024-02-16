'use client';

import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { Input } from '@/components/elements/input';
import { JobStatusChip } from '@/components/elements/job-status-chip/job-status-chip';
import {
  CandidatesTable,
  JobCandidate,
} from '@/components/modules/candidates-table';
import { useParams } from 'next/navigation';

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
  const params = useParams();

  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 flex">
          <div className="flex items-center gap-4 text-2xl font-medium">
            UX Designer
            <JobStatusChip state="filled" />
          </div>

          <div className="ml-auto flex gap-4">
            <Button variant="secondary">View Job Post</Button>
            <Button variant="secondary" href={`/admin/jobs/${params.id}`}>
              Edit Job
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-white px-6 py-8">
          <div className="inline-flex items-center gap-2">
            <Icon icon="calendar" className="w-5" /> Posted 12 Aug 2023
          </div>

          <div className="inline-flex items-center gap-2">
            <Icon icon="location" className="w-5" /> Work from anywhere
          </div>

          <div className="inline-flex items-center gap-2">
            <Icon icon="clock" className="w-5" /> 40 hrs/wk
          </div>

          <div className="inline-flex items-center gap-2">
            <Icon icon="case" className="w-5" /> Full time
          </div>
        </div>
      </div>

      <JobCandidatesSection />
    </div>
  );
}

function JobCandidatesSection() {
  return (
    <>
      <div className="mb-4 flex">
        <div className="text-2xl font-medium">10 Specialist</div>

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
    </>
  );
}

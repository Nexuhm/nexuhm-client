'use client';

import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { Input } from '@/components/elements/input';
import { Tabs } from '@/components/elements/tabs';
import { JobCard, JobCardProps } from '@/components/modules/job-card';
import { Tab } from '@headlessui/react';
import { useState } from 'react';

type JobState = 'active' | 'archived';

interface JobTab {
  id: JobState;
  label: string;
}

const tabs: JobTab[] = [
  {
    id: 'active',
    label: 'Active',
  },
  {
    id: 'archived',
    label: 'Archived',
  },
];

const jobs: JobCardProps[] = [
  {
    title: 'Backend Developer',
    tags: ['New York', 'Full Time'],
    candidates: {
      total: 25,
      new: 6,
    },
    status: 'published',
  },
  {
    title: 'Product Manager',
    tags: ['San Francisco', 'Full Time'],
    candidates: {
      total: 35,
      new: 7,
    },
    status: 'published',
  },
  {
    title: 'Graphic Designer',
    tags: ['Los Angeles', 'Part Time'],
    candidates: {
      total: 15,
      new: 4,
    },
    status: 'published',
  },
  {
    title: 'Data Scientist',
    tags: ['Chicago', 'Full Time'],
    candidates: {
      total: 28,
      new: 9,
    },
    status: 'draft',
  },
  {
    title: 'Sales Representative',
    tags: ['Chicago', 'Full Time'],
    candidates: {
      total: 42,
      new: 11,
    },
    status: 'draft',
  },
  {
    title: 'Content Writer',
    tags: ['New York', 'Part Time'],
    candidates: {
      total: 18,
      new: 3,
    },
    status: 'draft',
  },
  {
    title: 'Software Engineer',
    tags: ['San Francisco', 'Full Time'],
    candidates: {
      total: 60,
      new: 15,
    },
    status: 'published',
  },
  {
    title: 'HR Manager',
    tags: ['Los Angeles', 'Full Time'],
    candidates: {
      total: 22,
      new: 5,
    },
    status: 'role-filled',
  },
];

export default function Page() {
  const [selectedTab, setSelectedTab] = useState<JobState>('active');

  return (
    <div>
      <div className="mb-4 flex">
        <div className="text-2xl font-medium">Jobs</div>

        <div className="ml-auto flex gap-4">
          <Input icon="search" placeholder="Search job name" />

          <Button variant="secondary">
            <Icon icon="filter" className="mr-2 w-5" />
            Filter
          </Button>

          <Button>
            <Icon icon="plus" className="mr-2 w-5" />
            Create job
          </Button>
        </div>
      </div>

      <div>
        <Tabs
          tabs={tabs}
          selected={selectedTab}
          onChange={(id) => setSelectedTab(id)}
        />

        <div className="mt-4 md-grid-cols-3 grid grid-cols-1 lg:grid-cols-4 gap-4">
          {jobs.map((item, index) => (
            <JobCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { client } from '@/base/services/browser-client';
import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { Input } from '@/components/elements/input';
import { Tabs } from '@/components/elements/tabs';
import { JobCard, JobCardProps } from '@/components/modules/job-card';
import { useEffect, useState } from 'react';

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

export default function Page() {
  const [selectedTab, setSelectedTab] = useState<JobState>('active');
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const fetchJobs = async () => {
    try {
      const data = await client.get('/jobs');
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

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

          <Button href="/admin/jobs/create">
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

        <div className="text-xlg my-5 font-medium">
          {jobs.length} Active jobs
        </div>

        <div className="md-grid-cols-3 mt-4 grid grid-cols-1 gap-4 lg:grid-cols-4">
          {jobs.map((item, index) => (
            <JobCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { client } from '@/base/services/clients/browser-client';
import { JobPostingState } from '@/base/types/jobs';
import { Button } from '@/components/elements/button';
import { Icon } from '@/components/elements/icon';
import { Input, Select } from '@/components/elements/input';
import { Spinner } from '@/components/elements/spinner';
import { Tabs } from '@/components/elements/tabs';
import { JobCard } from '@/components/modules/job-card';
import { useState } from 'react';
import useSWR from 'swr';

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
  const [filterState, setFilterState] = useState<JobPostingState | null>(null);
  const { data, isLoading } = useSWR('/admin/jobs', (url) =>
    client.get<any[]>(url),
  );

  const filteredData = data?.filter((item) => {
    if (!filterState) {
      return true;
    }

    return item.state === filterState;
  });

  return (
    <div>
      <div className="mb-4 flex">
        <div className="text-2xl font-medium">Jobs</div>

        <div className="ml-auto flex gap-4">
          <Input icon="search" placeholder="Search job name" />

          <Select
            placeholder="All Stages"
            className="min-w-[140px]"
            value={filterState}
            onChange={setFilterState}
            options={[
              {
                value: null,
                label: 'All Stages',
              },
              {
                value: JobPostingState.Published,
                label: 'Published',
              },
              {
                value: JobPostingState.Draft,
                label: 'Draft',
              },

              {
                value: JobPostingState.Filled,
                label: 'Filled',
              },
            ]}
          />

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

        {isLoading ? (
          <div className="flex w-full items-center justify-center py-20">
            <Spinner size={40} />
          </div>
        ) : (
          <>
            <div className="my-5 text-lg font-medium">
              {filteredData?.length} Active jobs
            </div>

            <div className="md-grid-cols-3 mt-4 grid grid-cols-1 gap-4 lg:grid-cols-4">
              {filteredData?.map((item, index) => (
                <JobCard key={index} {...item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

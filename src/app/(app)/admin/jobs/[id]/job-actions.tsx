'use client';

import { client } from '@/base/services/clients/browser-client';
import { Button, IconButton } from '@/components/elements/button';
import { Dialog } from '@/components/elements/dialog';
import { Dropdown } from '@/components/elements/dropdown';
import { JobStatusChip } from '@/components/elements/job-status-chip/job-status-chip';
import { Popconfirm } from '@/components/elements/popconfirm';
import { useParams } from 'next/navigation';

export default function JobActions({ job }: { job: any }) {
  const params = useParams();
  const postingUrl = `https://${job.company.slug}.${process.env.NEXT_PUBLIC_DOMAIN}/jobs/${job.slug}`;

  const handleToggleState = async () => {
    await client.post(`/admin/jobs/${params.id}/state`, {
      state: job.state === 'draft' ? 'published' : 'draft',
    });

    location.reload();
  };

  return (
    <>
      <div className="mb-4 flex">
        <div className="flex items-center gap-4 text-2xl font-medium">
          {job.title}
          <JobStatusChip state={job.state} />
        </div>

        <div className="ml-auto flex gap-2">
          <Button target="_blank" href={postingUrl} variant="secondary">
            View Job Post
          </Button>

          <Button variant="secondary" href={`/admin/jobs/${params.id}/edit`}>
            Edit Job
          </Button>

          <Dropdown>
            <Dropdown.Button
              as={IconButton}
              variant="secondary"
              shape="square"
              icon="vertical-dots"
            />
            <Dropdown.Content className="flex min-w-[200px] flex-col gap-2">
              <Dropdown.Option>Add Candidate</Dropdown.Option>

              <Popconfirm onConfirm={() => handleToggleState()}>
                {({ toggle }) => (
                  <>
                    <Dropdown.Option onClick={toggle}>
                      {job.state === 'draft' ? 'Publish' : 'Unpublish'}
                    </Dropdown.Option>

                    <Popconfirm.Dialog>
                      <Dialog.Title>
                        {job.state === 'draft' ? 'Publish' : 'Unpublish'} Job
                      </Dialog.Title>

                      <Dialog.Content className="max-w-md">
                        {job.state === 'draft' ? (
                          <>
                            Are you sure you want to publish{' '}
                            <strong>{job.title}</strong>? This expose this job
                            publicly on your listings.
                          </>
                        ) : (
                          <>
                            Are you sure you want to unpublish{' '}
                            <strong>{job.title}</strong>? This will remove this
                            job from your listings.
                          </>
                        )}
                      </Dialog.Content>

                      <Dialog.Actions>
                        <Popconfirm.CancelAction />

                        <Popconfirm.ConfirmAction
                          variant={job.state === 'draft' ? 'green' : 'alert'}
                        >
                          {job.state === 'draft'
                            ? 'Yes, publish this job'
                            : 'Yes, unpublish this job'}
                        </Popconfirm.ConfirmAction>
                      </Dialog.Actions>
                    </Popconfirm.Dialog>
                  </>
                )}
              </Popconfirm>

              <Dropdown.Option>Archive Job</Dropdown.Option>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    </>
  );
}

import { client } from '@/base/services/clients/server-client';
import { JobEditForm } from './job-edit-form';

async function getData(id: string) {
  const data = await client.get(`/admin/jobs/${id}`);
  return data;
}

export default async function JobEditPage({
  params,
}: {
  params: { id: string };
}) {
  const jobDetails = await getData(params.id);

  return (
    <div className="container max-w-7xl">
      <JobEditForm defaultValues={jobDetails} />
    </div>
  );
}

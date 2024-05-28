'use server';

import { client } from '../services/clients/server-client';
import { JobSchema } from '../types/jobs';

export async function generateJob(
  title: string,
  description: string,
  locale: string,
) {
  const res = await client.post('/admin/jobs/generate', {
    title,
    description,
    locale,
  });

  if (!res.ok) {
    const data = await res.text();
    throw Error(data);
  }

  const data = await res.json();

  return data;
}

export async function createJobDraft(job: JobSchema) {
  return client.post('/admin/jobs', job);
}

export async function getJobs() {
  const res = await client.get('/admin/jobs');
  const data = await res.json();
  return data;
}

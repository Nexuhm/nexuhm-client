'use server';

import { client } from '../services/server-client';
import { JobSchema } from '../types/jobs';

export async function generateJob(title: string, description: string) {
  const res = await client.post('/jobs/generate', { title, description });

  if (!res.ok) {
    const data = await res.text();
    throw Error(data);
  }

  const data = await res.json();

  return data;
}

export async function createJobDraft(job: JobSchema) {
  return client.post('/jobs', job);
}

export async function getJobs() {
  const res = await client.get('/jobs');
  const data = await res.json();
  return data;
}

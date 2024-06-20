import { client } from '@/base/services/clients/server-client';
import {
  JobBoardTemplate,
  JobBoardTemplateProps,
} from '@/components/templates/job-board';

async function getData(): Promise<JobBoardTemplateProps> {
  const posts = await client.get(`/jobs?page=1&pageSize=10`);

  return {
    posts,
  };
}

export default async function CompanyCareersPage({}: {}) {
  const data = await getData();
  const { company, posts } = data;

  return <JobBoardTemplate company={company} posts={posts} />;
}

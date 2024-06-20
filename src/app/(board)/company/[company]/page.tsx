import { client } from '@/base/services/clients/server-client';
import {
  JobBoardTemplate,
  JobBoardTemplateProps,
} from '@/components/templates/job-board';

async function getData(slug: string): Promise<JobBoardTemplateProps> {
  const [company, posts] = await Promise.all([
    client.get(`/company/${slug}`),
    client.get(`/company/${slug}/openings?limit=4`),
  ]);

  return {
    company,
    posts,
  };
}

export default async function CompanyCareersPage({
  params,
}: {
  params: {
    company: string;
  };
}) {
  const slug = params.company;
  const data = await getData(slug);
  const { company, posts } = data;

  return <JobBoardTemplate company={company} posts={posts} />;
}

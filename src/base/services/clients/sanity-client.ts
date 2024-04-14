import { BlogPost } from '@/base/types/blog';
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2023-05-03',
  useCdn: false,
});

export async function getPosts(): Promise<BlogPost[]> {
  const posts =
    await sanityClient.fetch(/* groq */ `*[_type == "blogPost" && !(_id in path('drafts.**'))] | order(dateTime(publishedAt) desc) {
      title,
      "slug": slug.current,
      publishedAt,
      thumbnail,
      image
    }`);

  return posts;
}

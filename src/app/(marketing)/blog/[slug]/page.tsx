import { getPosts, sanityClient } from '@/base/services/clients/sanity-client';
import { urlFor } from '@/base/utils/sanity';
import Image from 'next/image';
import { formatDate } from 'date-fns';
import { PortableText } from '@portabletext/react';
import { BlogPost } from '@/base/types/blog';

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((i) => ({
    slug: i.slug,
  }));
}

async function getPost(slug: string): Promise<BlogPost> {
  const post = await sanityClient.fetch(
    /* groq */ `*[_type == "blogPost" && slug.current == $slug && !(_id in path('drafts.**'))][0] {
        title,
        "slug": slug.current,
        content[],
        publishedAt,
        thumbnail,
        image
    }`,
    {
      slug,
    },
  );

  return post;
}

export default async function BlogPostPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const post = await getPost(params.slug);

  return (
    <div>
      <div className="container mx-auto max-w-6xl pb-10 pt-12">
        <div className="mx-auto mb-10 max-w-xl">
          <h1 className="mb-4 text-balance text-5xl font-medium">
            {post.title}
          </h1>
          <div className="text-sm text-content-tertiary">
            {formatDate(new Date(post.publishedAt), 'MMM dd, yyyy')}
          </div>
        </div>

        <div className="relative mb-10 h-[400px] w-full overflow-hidden rounded-xl lg:h-[600px]">
          <Image
            src={urlFor(post.image).url()}
            blurDataURL={urlFor(post.image).blur(70).url()}
            placeholder="blur"
            className="object-cover"
            fill
            alt=""
          />
        </div>

        <div className="prose mx-auto max-w-xl text-content-primary">
          <PortableText value={post.content} />
        </div>
      </div>
    </div>
  );
}

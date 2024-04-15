import { getPosts } from '@/base/services/clients/sanity-client';
import { urlFor } from '@/base/utils/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

export default async function BlogListingPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="container mx-auto max-w-5xl p-10">
        <h1 className="mb-12 text-5xl font-medium">Blog</h1>

        <div className="gird-cols-1 grid sm:grid-cols-2 gap-8 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-2"
            >
              <div className="relative h-[216px] w-full overflow-hidden rounded-md">
                <Image
                  src={urlFor(post.thumbnail).size(400, 400).url()}
                  className="object-cover object-center transition-all duration-300 group-hover:scale-105"
                  fill
                  alt=""
                />
              </div>

              <div className="text-sm text-content-tertiary">
                {format(new Date(post.publishedAt), 'MMM dd, yyyy')}
              </div>

              <div className="font-medium">{post.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

import { ReactNode } from 'react';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';

export interface TextAndImageProps {
  image: StaticImageData;
  title: string;
  content: ReactNode;
  layout?: 'right' | 'left';
}

export function TextAndImage({
  image,
  title,
  content,
  layout = 'left',
}: TextAndImageProps) {
  return (
    <section className='mb-44'>
      <div
        className={clsx(
          'container mx-auto flex max-w-6xl flex-col items-center gap-20 px-6 text-center md:px-8 md:text-left',
          layout === 'right' ? 'md:flex-row-reverse' : 'md:flex-row',
        )}
      >
        <div className="flex-1">
          <h2 className="mb-6 text-5xl font-medium">{title}</h2>
          <p>{content}</p>
        </div>
        <div className="flex-1">
          <div className="relative mx-auto h-[400px] w-[400px] overflow-hidden rounded-3xl border shadow-2xl">
            <Image
              className="object-cover object-center"
              src={image.src}
              fill
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

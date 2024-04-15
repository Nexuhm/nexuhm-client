import Image, { StaticImageData } from 'next/image';
import { Button } from '@/components/elements/button';

import PersonOneImage from '@/assets/images/home/person-1.webp';
import PersonTwoImage from '@/assets/images/home/person-2.webp';
import PersonThreeImage from '@/assets/images/home/person-3.webp';
import PersonFourImage from '@/assets/images/home/person-4.webp';
import PersonFiveImage from '@/assets/images/home/person-5.webp';
import PersonSixImage from '@/assets/images/home/person-6.webp';
import PersonSevenImage from '@/assets/images/home/person-7.webp';
import PersonEightImage from '@/assets/images/home/person-8.webp';
import PersonNineImage from '@/assets/images/home/person-9.webp';

import clsx from 'clsx';

export function HeroSection() {
  return (
    <section className="max-w-full overflow-hidden mb-44">
      <div className="flex max-h-[calc(100vh-150px)] overflow-hidden">
        <div className="my-auto flex-1 flex-shrink-0">
          <div className="mx-auto flex max-w-lg flex-col gap-6 xl:pt-0 pt-10 px-8 text-center sm:px-4">
            <h1 className="text-6xl font-medium italic">
              Company Culture Matters
            </h1>
            <h2 className="text-4xl font-medium">It’s as simple as that.</h2>
            <p className="font-medium">
              At Nexuhm, we keep it simple. Our recruitment ATS platform helps
              companies find, attract and hire top talent that not only has the
              skills but fits perfectly into your company culture. Easy hiring,
              happy teams, big success.
            </p>
            <div>
              <Button size="lg" href="/login">
                Get Started
              </Button>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            'flex-1 flex-shrink-0 flex-nowrap gap-6 xl:flex',
            'hidden max-w-[840px]',
          )}
        >
          <div className="flex flex-col gap-6">
            <HeroImage image={PersonTwoImage} />
            <HeroImage image={PersonOneImage} />
            <HeroImage image={PersonThreeImage} />
          </div>
          <div className="-mt-44 flex flex-col gap-6">
            <HeroImage image={PersonFourImage} />
            <HeroImage image={PersonFiveImage} />
            <HeroImage image={PersonSixImage} />
          </div>
          <div className="flex flex-col gap-6">
            <HeroImage image={PersonSevenImage} />
            <HeroImage image={PersonEightImage} />
            <HeroImage image={PersonNineImage} />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroImage({ image }: { image: StaticImageData }) {
  return (
    <div className="relative h-[438px] w-[320px]">
      <Image
        className="rounded-xl object-cover object-center"
        src={image.src}
        fill
        alt=""
        priority
      />
    </div>
  );
}

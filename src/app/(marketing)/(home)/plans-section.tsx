import { Icon } from '@/components/elements/icon';
import clsx from 'clsx';
import Link from 'next/link';

export function PlansSections() {
  return (
    <section className="bg-[#1e1d1c] py-28">
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-10 text-white">
          <h2 className="mb-6 text-4xl font-medium md:text-6xl">Choose your plan</h2>

          <p className="text-xl">
            Sign up and tell us what plan will help build your culture
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
          <Card
            title="Starting"
            price="£149/month"
            content="Learn the culture of applicants before your interviews. Create your career page with as many jobs as you need."
          />

          <Card
            title="Growing"
            price="£499/month"
            content="Enjoy extra external automated job postings, interview guides and scheduling, all powered with AI to match your culture."
          />

          <Card
            title="Scale"
            price="£899/month"
            content="You got here by building your Culture. Don’t let that slip. Discover a plan tailored for your culture needs and growth."
          />

          <Card
            className="lg:col-span-3"
            title="Built for you"
            price="Custom"
            content="We understand that you build your culture and want to support that. Let’s get you a plan that fits your culture needs."
          />
        </div>
      </div>
    </section>
  );
}

function Card({
  title,
  price,
  content,
  className,
}: {
  title: string;
  price: string;
  content: string;
  className?: string;
}) {
  return (
    <Link href="/signup" className={clsx(className, 'group hover:scale-[1.03] transition-all')}>
      <div className="flex h-full flex-col gap-4 rounded-2xl bg-white px-8 py-6 shadow-xl">
        <h3 className="text-3xl font-medium">{title}</h3>
        <h4 className="text-2xl font-medium">{price}</h4>
        <p className="leading-6 text-content-secondary">{content}</p>

        <div className="mt-auto">
          <Icon
            icon="arrow-left"
            className="ml-auto w-8 rotate-180 transition-all group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}

import clsx from 'clsx';
import { Button } from '../button';
import { Icon } from '../icon';

export interface JobPostingCardProps {
  title: string;
  description: string;
  url: string;
}

export function JobPostingCard({
  title,
  description,
  url,
}: JobPostingCardProps) {
  return (
    <a href={url} target="_blank">
      <div
        className={clsx(
          'flex flex-col gap-4 rounded-xl border border-transparent',
          'p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.08)]',
          'transition-all hover:border-light-gray',
        )}
      >
        <div className="text-2xl font-bold">{title}</div>

        <div className="max-w-6xl">{description}</div>

        <div className="flex items-center">
          <div className="flex gap-4">
            <div className="rounded-full border px-3 py-1.5">Remote</div>
            <div className="rounded-full border px-3 py-1.5">Full time</div>
          </div>

          <div className="ml-auto">
            <span
              className={clsx(
                'inline-flex !rounded-full bg-blue',
                'px-4 py-2 text-sm font-medium text-white',
              )}
            >
              View Jobs
              <Icon icon="arrow-left" className="ml-1.5 w-4 rotate-180" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

'use client';

import { useUserData } from '@/base/hooks/use-user-data';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { AreaChart } from './area-chart';
import { HorizontalBarChart } from './bar-chart';
import { DashboardCalendar } from './calendar/calendar';
import { EventTile } from './event-tile/event-tile';
import { Input } from '@/components/elements/input';

export default function AnalyticsDashboard() {
  const { data } = useUserData();

  return (
    <div className="container flex max-w-7xl flex-col gap-6">
      <div className="text-3xl font-medium">Hi {data?.firstname}</div>

      <div className="grid grid-cols-3 gap-5">
        <StatsTile title="Candidates applied to jobs" value="110" />
        <StatsTile title="No. of open roles" value="23" />
        <StatsTile title="Time to fill role" value="13 days" />
      </div>

      <div>
        <div className="mb-4 text-2xl font-medium">Analytics</div>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-9 p-4 card-container">
            <div className="mb-2 font-medium text-content-primary">
              Candidates Overview
            </div>
            <div className="text-3xl font-bold">120</div>
            <div>
              <AreaChart />
            </div>
          </div>

          <div className="col-span-3 p-4 card-container">
            <div className="mb-2 font-medium text-content-primary">
              Job Overview
            </div>
            <div>
              <HorizontalBarChart />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-4 text-2xl font-medium">Upcoming Interviews</div>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8 p-4 card-container">
            <DashboardCalendar />
          </div>

          <div className="col-span-4 p-4 card-container">
            <div className="flex flex-col gap-4">
              <Input icon="search" placeholder="Search..." />

              <div className="flex flex-col gap-4">
                <div className="font-medium">04 March</div>

                <EventTile
                  status="confirmed"
                  name="David"
                  subject="Designer Interview"
                  time="09:00"
                  cta={{
                    title: 'Upcoming Meeting in: 02:45 minutes',
                    href: '',
                    text: 'Join Meeting',
                  }}
                />

                <EventTile
                  status="canceled"
                  name="Michael"
                  subject="Senior Developer"
                  time="08:00"
                />

                <EventTile
                  status="unconfirmed"
                  name="Rose"
                  subject="HR Partner"
                  time="07:40"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatsTileProps {
  title: string;
  value?: string;
  className?: string;
  children?: ReactNode;
}

function StatsTile({ title, value, className, children }: StatsTileProps) {
  return (
    <div className={clsx(className, 'p-4 card-container')}>
      <div className="mb-2 text-content-tertiary">{title}</div>
      {value && <div className="text-3xl font-bold">{value}</div>}
      <div>{children}</div>
    </div>
  );
}

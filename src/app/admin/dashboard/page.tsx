'use client';

import { useUserData } from '@/base/hooks/use-user-data';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { AreaChart } from './area-chart';
import { HorizontalBarChart } from './bar-chart';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

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

      <div className="p-4 card-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[
            { title: 'Event 1', date: '2024-03-01' },
            { title: 'Event 2', date: '2024-03-02' },
          ]}
        />
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

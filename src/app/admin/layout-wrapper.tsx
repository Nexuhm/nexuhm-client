'use client';

import { cookies } from 'next/headers';
import { Sidebar } from '@/components/modules/main-layout';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/modules/main-layout/dashboard-header';
import { client } from '@/base/services/clients/browser-client';
import useSWR from 'swr';
import { CompanyContext } from '../../base/contexts/company-context';

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: company, isLoading } = useSWR('/admin/company', (url) =>
    client.get(url),
  );

  if (isLoading) {
    return null;
  }

  return (
    <CompanyContext.Provider value={{ company }}>
      <div className="flex">
        <Sidebar
          links={[
            { href: '/', text: 'Dashboard', icon: 'home' },
            { href: '/admin/jobs', text: 'Jobs', icon: 'case-filled' },
            { href: '/admin/candidates', text: 'Candidates', icon: 'group' },
            { href: '/admin/analytics', text: 'Analytics', icon: 'analytics' },
          ]}
        />

        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 flex justify-center bg-surface-secondary p-8 pb-32">
            {children}
          </main>
        </div>
      </div>
    </CompanyContext.Provider>
  );
}

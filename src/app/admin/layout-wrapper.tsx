'use client';

import { Sidebar } from '@/components/modules/main-layout';
import { DashboardHeader } from '@/components/modules/main-layout/dashboard-header';
import { CompanyProvider } from '@/base/contexts/company/company-context';

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CompanyProvider>
      <div className="flex">
        <Sidebar
          links={[
            { href: '/admin/dashboard', text: 'Dashboard', icon: 'analytics' },
            { href: '/admin/jobs', text: 'Jobs', icon: 'case-filled' },
            { href: '/admin/candidates', text: 'Candidates', icon: 'group' },
          ]}
        />

        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex flex-1 bg-surface-secondary p-8 pb-32">
            {children}
          </main>
        </div>
      </div>
    </CompanyProvider>
  );
}

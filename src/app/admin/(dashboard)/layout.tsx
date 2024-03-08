import { cookies } from 'next/headers';
import { Sidebar } from '@/components/modules/main-layout';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/modules/main-layout/dashboard-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('token');

  if (!token) {
    redirect('/login');
  }

  return (
    <div className="flex">
      <Sidebar
        links={[
          { href: '/', text: 'Dashboard', icon: 'home' },
          { href: '/admin/jobs', text: 'Jobs', icon: 'home' },
          { href: '/admin/candidates', text: 'Candidates', icon: 'group' },
          { href: '/admin/analytics', text: 'Analytics', icon: 'analytics' },
        ]}
      />

      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 bg-surface-secondary p-8 pb-32">{children}</main>
      </div>
    </div>
  );
}

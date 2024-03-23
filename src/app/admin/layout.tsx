import { cookies } from 'next/headers';
import { Sidebar } from '@/components/modules/main-layout';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '@/components/modules/main-layout/dashboard-header';
import DashboardLayoutWrapper from './layout-wrapper';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('token');

  if (!token) {
    redirect('/login');
  }

  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
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

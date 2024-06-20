import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardLayoutWrapper from './layout-wrapper';
import { client } from '@/base/services/clients/server-client';
import { UserRole } from '@/base/types/users';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('token');

  if (!token) {
    redirect('/login');
  }

  const onboardingData = await client.get('/users/onboarding/stage');

  if (
    onboardingData.roles.includes(UserRole.Owner) &&
    !onboardingData.onboardingStage
  ) {
    redirect('/onboarding');
  }

  return <DashboardLayoutWrapper>{children}</DashboardLayoutWrapper>;
}

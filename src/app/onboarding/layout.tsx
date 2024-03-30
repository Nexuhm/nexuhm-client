import { PropsWithChildren } from 'react';
import { OnboardingLayoutWrapper } from './layout-wrapper';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { client } from '@/base/services/clients/server-client';
import { OnboardingStage, UserRole } from '@/base/types/users';

export default async function OnboardingLayout({
  children,
}: PropsWithChildren) {
  const token = cookies().get('token');

  if (!token) {
    redirect('/login');
  }

  const data = await client.get('/users/onboarding/stage');

  // only owners can set up onboarding
  if (!data.roles.includes(UserRole.Owner)) {
    redirect('/admin');
  }

  return <OnboardingLayoutWrapper>{children}</OnboardingLayoutWrapper>;
}

import { PropsWithChildren } from 'react';
import { OnboardingLayoutWrapper } from './layout-wrapper';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function OnboardingLayout({ children }: PropsWithChildren) {
  const token = cookies().get('token');

  if (!token) {
    redirect('/login');
  }

  return <OnboardingLayoutWrapper>{children}</OnboardingLayoutWrapper>;
}

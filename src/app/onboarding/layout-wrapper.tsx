'use client';

import Logo from '@/assets/logo.svg';
import { CompanyContext } from '@/base/contexts/company';
import { client } from '@/base/services/clients/browser-client';
import { PropsWithChildren } from 'react';
import useSWR from 'swr';

export function OnboardingLayoutWrapper({ children }: PropsWithChildren) {
  const { data: company, isLoading } = useSWR('/admin/company', (url) =>
    client.get(url),
  );

  if (isLoading) {
    return null;
  }

  return (
    <CompanyContext.Provider value={{ company }}>
      <div>
        <header className="border-b border-light-gray">
          <div className="px-8 py-4">
            <Logo className="h-8 w-[145px]" />
          </div>
        </header>

        <main className="py-12">
          <div className="container mx-auto max-w-lg">{children}</div>
        </main>
      </div>
    </CompanyContext.Provider>
  );
}

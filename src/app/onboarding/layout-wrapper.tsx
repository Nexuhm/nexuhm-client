'use client';

import Logo from '@/assets/logo.svg';
import { CompanyContext } from '@/base/contexts/company';
import { client } from '@/base/services/clients/browser-client';
import { PropsWithChildren, useEffect, useState } from 'react';

export function OnboardingLayoutWrapper({ children }: PropsWithChildren) {
  const [company, setCompany] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    client
      .get('/admin/company')
      .then((data) => setCompany(data))
      .finally(() => setLoading(false));
  }, []);

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

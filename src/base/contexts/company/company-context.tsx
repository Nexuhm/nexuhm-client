import { PropsWithChildren, createContext, useContext } from 'react';
import useSWR from 'swr';
import { client } from '@/base/services/clients/browser-client';
import { CompanyDetails } from '@/base/types/company';

interface CompanyContextProps {
  company?: CompanyDetails;
}

export const CompanyContext = createContext<CompanyContextProps>({});

export function useCompanyContext() {
  return useContext(CompanyContext);
}

export function CompanyProvider({ children }: PropsWithChildren) {
  const { data: company, isLoading } = useSWR('/admin/company', (url) =>
    client.get(url),
  );

  if (isLoading) {
    return null;
  }

  return (
    <CompanyContext.Provider value={{ company }}>
      {children}
    </CompanyContext.Provider>
  );
}

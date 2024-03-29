import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
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
      {children}
    </CompanyContext.Provider>
  );
}

import { CompanyDetails } from '@/base/types/company';
import { createContext, useContext } from 'react';

interface CompanyContextProps {
  company?: CompanyDetails;
}

export const CompanyContext = createContext<CompanyContextProps>({});

export function useCompanyContext() {
  return useContext(CompanyContext);
}

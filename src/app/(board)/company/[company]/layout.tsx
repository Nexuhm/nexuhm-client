import { ReactNode } from 'react';
import { client } from '@/base/services/clients/server-client';
import BoardLayout from '../../board-layout';

async function getData(slug: string) {
  const company = await client.get(`/company/${slug}`);
  return company;
}

export default async function CompanyLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    company: string;
  };
}) {
  const company = await getData(params.company);

  return (
    <BoardLayout company={company}>
      {children}
    </BoardLayout>
  );
}

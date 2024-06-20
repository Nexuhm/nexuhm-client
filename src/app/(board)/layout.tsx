import { ReactNode } from 'react';
import { client } from '@/base/services/clients/server-client';
import { Header } from './header';
import { Footer } from './footer';

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
    <div className="flex min-h-screen flex-col">
      <Header logo={company.logo} />

      <main className="py-10 font-poppins">{children}</main>

      <Footer />
    </div>
  );
}

import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from '@/components/layouts/client/footer';

export default async function CompanyLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: {
    company: string;
  };
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="py-10 font-poppins">{children}</main>

      <Footer />
    </div>
  );
}

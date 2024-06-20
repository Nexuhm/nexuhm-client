import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';

interface BoardLayoutProps {
  children: ReactNode;
  company?: any;
}

export default async function BoardLayout({
  children,
  company,
}: BoardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header logo={company?.logo} />
      <main className="py-10 font-poppins">{children}</main>
      <Footer />
    </div>
  );
}

import { ReactNode } from 'react';
import { Footer } from '@/components/layouts/marketing/footer';
import { Header } from '@/components/layouts/marketing/header';
import { GoogleTagManager } from '@next/third-parties/google';

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="font-poppins">{children}</main>
      <Footer />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
    </div>
  );
}

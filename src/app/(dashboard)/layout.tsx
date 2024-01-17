import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { Inter, Outfit } from 'next/font/google';

import '../globals.scss';
import clsx from 'clsx';
import { Sidebar } from '@/components/modules/main-layout';
import { Header } from '@/components/modules/main-layout/header';
import { redirect } from 'next/navigation';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Nexuhm',
  description: 'Nexuhm - AI based ATS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('token');

  if (!token) {
    redirect('/login');
  }

  return (
    <html lang="en">
      <body className={clsx(inter.variable, outfit.variable, 'flex')}>
        <Sidebar
          links={[
            { href: '/', text: 'Dashboard', icon: 'home' },
            { href: '/jobs', text: 'Jobs', icon: 'home' },
            { href: '/candidates', text: 'Candidates', icon: 'group' },
            { href: '/analytics', text: 'Analytics', icon: 'analytics' },
          ]}
        />

        <div className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 bg-surface-primary p-8 pb-32">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

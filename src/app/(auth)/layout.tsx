import Logo from '@/assets/logo.svg';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nexuhm',
  description: 'Nexuhm - AI based ATS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-subtle-gray py-20 h-screen flex justify-center flex-col">
          <div className="grid md:grid-cols-2 grid-cols-1">
            {/* Logo Column */}
            <div className="flex items-center justify-center flex-col">
              <div>
                <Logo className="mb-4" width={180} height={40} />
                <p className="text-content-primary text-xl">
                  Sign in or create an account
                </p>
              </div>
            </div>

            {/* Form Column */}
            <div>{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}

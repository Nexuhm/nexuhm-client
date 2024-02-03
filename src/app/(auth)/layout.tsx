import Logo from '@/assets/logo.svg';

import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import '@/app/globals.scss';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-poppins',
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
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="flex h-screen flex-col justify-center bg-subtle-gray py-20">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Logo Column */}
            <div className="flex flex-col items-center justify-center">
              <div>
                <Logo className="mb-4" width={180} height={40} />
                <p className="text-xl text-content-primary">
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

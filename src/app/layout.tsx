import type { Metadata } from 'next';
import { Outfit, Poppins } from 'next/font/google';
import clsx from 'clsx';

import '@/app/globals.scss';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Nexuhm',
  description: 'Nexuhm - cutting edge ATS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx(outfit.variable, poppins.variable)}>
        {children}
      </body>
    </html>
  );
}

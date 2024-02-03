import type { Metadata } from 'next';

import { Inter, Outfit, Poppins } from 'next/font/google';

import '@/app/globals.scss';
import clsx from 'clsx';

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
  description: 'Nexuhm - AI based ATS.',
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

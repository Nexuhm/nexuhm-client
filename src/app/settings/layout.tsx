import { Header, Sidebar } from '@/components/layouts/account';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function AccountLayout({ children }: PropsWithChildren) {
  const token = cookies().get('token');

  if (!token) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-1 bg-surface-primary py-8">
        <div className="container mx-auto flex">
          <Sidebar />

          <main className="flex-1 pl-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

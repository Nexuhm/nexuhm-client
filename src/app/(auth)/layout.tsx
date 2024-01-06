import Logo from '@/assets/logo.svg';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
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
  );
}

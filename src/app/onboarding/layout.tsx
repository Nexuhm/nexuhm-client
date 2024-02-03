import Logo from '@/assets/logo.svg';
import { PropsWithChildren } from 'react';

export default function OnboardingLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <header className="border-b border-light-gray">
        <div className="px-8 py-4">
          <Logo className="h-8 w-[145px]" />
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto max-w-lg">{children}</div>
      </main>
    </div>
  );
}

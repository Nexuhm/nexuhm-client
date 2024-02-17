'use client';

import Logo from '@/assets/logo.svg';
import Link from 'next/link';
import { ProfileDropdown } from '@/components/modules/profile-dropdown';

export function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b border-light-gray px-8 py-3.5">
      <Link href="/">
        <Logo width={181} height={40} />
      </Link>

      <ProfileDropdown />
    </header>
  );
}

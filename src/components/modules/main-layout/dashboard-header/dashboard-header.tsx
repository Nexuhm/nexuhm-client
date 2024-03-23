'use client';

import { Icon } from '@/components/elements/icon';
import { ProfileDropdown } from '@/components/modules/profile-dropdown';

export function DashboardHeader() {
  return (
    <header className="flex w-full items-center justify-between border-b border-light-gray px-8 py-4">
      <div className="flex w-[200px] items-center rounded-lg bg-surface-primary px-3 py-2">
        <Icon icon="search" className="mr-2 w-5 text-content-secondary" />
        <input
          type="input"
          placeholder="Search..."
          className="w-full bg-transparent text-xs leading-5 outline-none"
        />
      </div>

      <ProfileDropdown />
    </header>
  );
}

import { Icon } from '@/components/elements/icon';
import Image from 'next/image';

export function Header() {
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

      <button className='flex items-center gap-2'>
        <div className="overflow-hidden rounded-full bg-light-gray">
          <Image src="/placeholder/avatar.jpg" width={40} height={40} alt="" />
        </div>

        <Icon icon="caret-down" className="w-6 text-content-primary" />
      </button>
    </header>
  );
}

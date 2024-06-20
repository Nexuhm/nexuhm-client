'use client';

import { usePathname } from 'next/navigation';
import styles from './board-layout.module.scss';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';

export function Header({ logo }: { logo?: string }) {
  const pathname = usePathname();
  const links = [
    {
      text: 'Careers',
      href: '/',
    },
    {
      text: 'Job Openings',
      href: '/jobs',
    },
  ];

  const activeIndex = links.findLastIndex((i) => pathname.startsWith(i.href));

  return (
    <header className="border-b border-light-gray">
      <div className="flex items-center px-6">
        <a href="/" className="relative h-[50px] w-[150px]">
          {logo ? (
            <Image className="object-contain" src={logo} priority fill alt="" />
          ) : (
            <Logo className="h-[40px] w-[181px]" />
          )}
        </a>

        <div className="flex flex-1 justify-center md:pr-44">
          <div className="mx-auto flex px-10">
            {links.map(({ href, text }, index) => (
              <a
                key={index}
                href={href}
                className={styles.headerLink}
                data-selected={index === activeIndex}
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

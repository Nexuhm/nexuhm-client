'use client';

import { usePathname } from 'next/navigation';
import styles from './marketing-layout.module.scss';
import Logo from '@/assets/logo.svg';

export function Header() {
  const pathname = usePathname();
  const links = [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Blog',
      href: '/blog',
    },
    {
      text: 'Contact Us',
      href: '/contact-us',
    },
  ];

  const activeIndex = links.findLastIndex((i) => pathname.startsWith(i.href));

  return (
    <header className="relative z-10 border-b border-light-gray bg-white">
      <div className="flex flex-col items-center px-6 pt-4 md:flex-row md:pt-0">
        <a href="/">
          <Logo className="h-[40px] w-[140px]" />
        </a>

        <div className="flex flex-1">
          <div className="flex px-8">
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

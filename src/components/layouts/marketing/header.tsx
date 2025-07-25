'use client';

import { usePathname } from 'next/navigation';
import styles from './marketing-layout.module.scss';
import Logo from '@/assets/logo.svg';
import { Button } from '@/components/elements/button';
import { useUserData } from '@/base/hooks/use-user-data';
import { ProfileDropdown } from '@/components/modules/profile-dropdown';
import { useMedia } from 'react-use';

export function Header() {
  const { data, isValidating } = useUserData();
  const isDesktop = useMedia('(min-width: 768px)', false);

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

  const userComponent =
    !isValidating &&
    (data ? (
      <ProfileDropdown />
    ) : (
      <div>
        <Button href="/signup" size="lg">
          Sign up
        </Button>
      </div>
    ));

  return (
    <header className="relative z-10 border-b border-light-gray bg-white">
      <div className="flex flex-col items-center px-6 pt-4 md:flex-row md:pt-0">
        <div className="mb-2 flex w-full justify-between md:mb-0 md:w-auto">
          <a href="/">
            <Logo className="h-[40px] w-[140px]" />
          </a>

          {!isDesktop && userComponent}
        </div>

        <div className="mx-auto flex w-full max-w-sm flex-1 md:mx-0 md:max-w-none md:px-8">
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

        {isDesktop && userComponent}
      </div>
    </header>
  );
}

'use client';

import Logo from '@/assets/logo.svg';
import { Icon, IconName } from '@/components/elements/icon';
import styles from './sidebar.module.scss';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  links: Array<{
    href: string;
    text: string;
    icon: IconName;
  }>;
}

export function Sidebar({ links }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebarContainer}>
      <div className="px-6 py-4">
        <Logo width={181} height={40} />
      </div>

      <ul>
        {links.map(({ href, text, icon }, index) => {
          const isActive = href === pathname;

          return (
            <li key={index}>
              <a href={href} className={styles.link} data-active={isActive}>
                <span className="inline-flex p-2">
                  <Icon icon={icon} className="mr-2 h-6 w-6" />
                  {text}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

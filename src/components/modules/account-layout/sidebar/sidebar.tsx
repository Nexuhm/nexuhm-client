'use client';

import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { sections } from './data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import styles from './sidebar.module.scss';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-[256px] flex-1 self-start rounded-xl bg-white px-3 pb-5 pt-3">
      <div className="mb-4 border-b pb-4 font-medium">Settings</div>

      <div className="flex flex-col gap-5">
        {sections.map(({ label, items }, index) => (
          <Disclosure key={index} as="div" defaultOpen>
            {({ open }) => (
              <>
                <Disclosure.Button className={styles.accordionButton}>
                  {label}
                  <FontAwesomeIcon
                    className={clsx(
                      'ml-auto w-3 transition-all',
                      open && 'rotate-180',
                    )}
                    icon={faChevronDown}
                  />
                </Disclosure.Button>

                <Disclosure.Panel as="ul" className="mt-4 flex flex-col gap-2">
                  {items.map(({ href, label }, index) => (
                    <li key={index}>
                      <a
                        href={href}
                        className={styles.sectionLink}
                        data-selected={href === pathname}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </aside>
  );
}

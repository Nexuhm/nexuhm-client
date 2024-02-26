import Logo from '@/assets/logo.svg';
import styles from './company-layout.module.scss';
import { PropsWithChildren } from 'react';

export default function CompanyLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <header className="border-b border-light-gray">
        <div className="flex items-center px-6">
          <a href="/" id="logo">
            <Logo className="w-[180px]" />
          </a>
          <div className="flex flex-1 justify-center md:pr-44">
            <div className="mx-auto flex px-10">
              <a
                href="/acme/careers"
                className={styles.headerLink}
                data-selected="true"
              >
                Careers
              </a>

              <a href="/acme/jobs" className={styles.headerLink}>
                Job Openings
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="py-10">{children}</main>
    </div>
  );
}

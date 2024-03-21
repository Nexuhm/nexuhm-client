import Link from 'next/link';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { ReactNode } from 'react';

export function BackLink({
  href,
  children,
  className,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex items-center gap-4 text-sm font-semibold',
        className,
      )}
    >
      <FontAwesomeIcon icon={faChevronLeft} className="h-3" />
      {children}
    </Link>
  );
}

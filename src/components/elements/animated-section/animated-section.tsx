'use client';

import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps extends PropsWithChildren {
  threshold?: number;
  className?: string;
  activeClassName?: string;
  defaultClassName?: string;
}

export function AnimatedSection({
  threshold = 0.5,
  className,
  defaultClassName,
  activeClassName,
  children,
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={clsx(className, inView ? activeClassName : defaultClassName)}
    >
      {children}
    </section>
  );
}

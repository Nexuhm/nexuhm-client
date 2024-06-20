import Tippy from '@tippyjs/react';
import { ReactElement, ReactNode } from 'react';
import 'tippy.js/dist/tippy.css';

interface TooltipProps {
  content?: ReactNode;
  children: ReactElement;
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <Tippy className="!rounded-xl" content={content}>
      {children}
    </Tippy>
  );
}

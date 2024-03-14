'use client';

import { PropsWithChildren, ReactNode, createContext } from 'react';
import { Dialog as HeadlessDialog } from '@headlessui/react';
import styles from './dialog.module.scss';
import clsx from 'clsx';

const DialogContext = createContext<any>({});

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Dialog({ children, open, onClose }: DialogProps) {
  return (
    <HeadlessDialog
      open={open}
      onClose={onClose}
      className={clsx(
        'fixed left-0 top-0 bg-black bg-opacity-20',
        'min-h-screen w-full',
        'flex items-center justify-center',
      )}
    >
      <HeadlessDialog.Panel className={styles.container}>
        {children}
      </HeadlessDialog.Panel>
    </HeadlessDialog>
  );
}

function DialogTitle({ children }: PropsWithChildren) {
  return (
    <HeadlessDialog.Title className="p-4 pb-0 text-xl font-semibold">
      {children}
    </HeadlessDialog.Title>
  );
}

function DialogContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx(className, 'p-4')}>{children}</div>;
}

function DialogActions({ children }: PropsWithChildren) {
  return <div className="p-4 text-right">{children}</div>;
}

Dialog.Title = DialogTitle;
Dialog.Content = DialogContent;
Dialog.Actions = DialogActions;

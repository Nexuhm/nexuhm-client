'use client';

import { Fragment, PropsWithChildren, ReactNode, createContext } from 'react';
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import styles from './dialog.module.scss';
import clsx from 'clsx';

const DialogContext = createContext<any>({});

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Dialog({ children, className, open, onClose }: DialogProps) {
  return (
    <Transition
      show={open}
      enter="transition duration-150 ease-out"
      enterFrom="transform opacity-0"
      enterTo="transform opacity-100"
      leave="transition duration-150 ease-out"
      leaveFrom="transform opacity-100"
      leaveTo="transform opacity-0"
      as={Fragment}
    >
      <HeadlessDialog
        onClose={onClose}
        className={clsx(
          'fixed left-0 top-0 bg-black bg-opacity-20',
          'min-h-screen w-full',
          'flex items-center justify-center',
        )}
      >
        <HeadlessDialog.Panel className={clsx(className, styles.container)}>
          {children}
        </HeadlessDialog.Panel>
      </HeadlessDialog>
    </Transition>
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
  return (
    <div className="flex justify-end gap-2 p-4 text-right">{children}</div>
  );
}

Dialog.Title = DialogTitle;
Dialog.Content = DialogContent;
Dialog.Actions = DialogActions;

'use client';

import {
  ElementType,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { usePopper } from 'react-popper';
import { Popover, Transition } from '@headlessui/react';
import styles from './dropdown.module.scss';
import clsx from 'clsx';

const DropdownContext = createContext<any>({});

export function Dropdown({ children }: PropsWithChildren) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles: popperStyles, attributes } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'arrow',
          options: {
            element: arrowElement,
          },
        },
        {
          name: 'offset',
          options: {
            offset: [0, 12],
          },
        },
      ],
    },
  );

  const value = {
    popperProps: {
      styles: popperStyles,
      attributes,
    },
    reference: {
      referenceElement,
      setReferenceElement,
    },
    arrow: {
      setArrowElement,
      arrowElement,
    },
    popper: {
      popperElement,
      setPopperElement,
    },
  };

  return (
    <DropdownContext.Provider value={value}>
      <Popover as="div" className="relative flex">
        {children}
      </Popover>
    </DropdownContext.Provider>
  );
}

interface DropdownButton {
  as?: ElementType<any>;
  children?: ReactNode;
  [key: string]: any;
}

function DropdownButton({ children, as, ...props }: DropdownButton) {
  const ctx = useContext(DropdownContext);

  return (
    <Popover.Button as={as} ref={ctx.reference.setReferenceElement} {...props}>
      {children}
    </Popover.Button>
  );
}

function DropdownContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ctx = useContext(DropdownContext);

  return (
    <Transition
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Popover.Panel
        ref={ctx.popper.setPopperElement}
        style={ctx.popperProps.styles.popper}
        {...ctx.popperProps.attributes.popper}
        className={clsx(styles.tooltip, className)}
      >
        {children}
      </Popover.Panel>
    </Transition>
  );
}

function DropdownOption({
  children,
  ...props
}: Omit<React.HTMLProps<HTMLButtonElement>, 'type'>) {
  return (
    <button
      type="button"
      {...props}
      className={clsx(
        'rounded-md w-full text-left hover:bg-brand-secondary p-1.5 px-2',
        props.className,
      )}
    >
      {children}
    </button>
  );
}

Dropdown.Button = DropdownButton;
Dropdown.Content = DropdownContent;
Dropdown.Option = DropdownOption;
